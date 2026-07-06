'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { postChat, ApiError } from '@/lib/api';
import { MODES } from '@/lib/scenes';
import { computeStars } from '@/lib/stars';
import { newId } from '@/lib/storage';
import {
  primeVoices,
  speak,
  stopSpeaking,
  ttsSupported,
  sttSupported,
  startDictation,
} from '@/lib/speech';
import type {
  ChatResponse,
  Debrief,
  Feedback,
  ModeId,
  NotebookEntry,
  Rating,
  SessionScene,
  WireMessage,
} from '@/lib/types';
import DebriefCard from './DebriefCard';

const KICKOFF =
  '(Beginne die Szene: begrüsse den Lernenden passend in deiner Rolle und eröffne das Gespräch. Bewerte diese Eröffnung als "gut".)';

interface AiTurn {
  kind: 'ai';
  id: string;
  de: string;
  en: string;
  hint: string;
}
interface MeTurn {
  kind: 'me';
  id: string;
  text: string;
  feedback: Feedback | null;
}
type Turn = AiTurn | MeTurn;

export default function Session({
  scene,
  mode,
  onExit,
  onNotebookAdd,
  onFinished,
  onUnauthorized,
  onReplay,
  replayLabel,
}: {
  scene: SessionScene;
  mode: ModeId;
  onExit: () => void;
  onNotebookAdd: (entries: NotebookEntry[]) => void;
  onFinished: (sceneId: string | undefined, stars: number) => void;
  onUnauthorized: (message: string) => void;
  onReplay: () => void;
  replayLabel?: string;
}) {
  const rate = MODES.find((m) => m.id === mode)?.rate ?? 1.0;

  const [turns, setTurns] = useState<Turn[]>([]);
  const [goal, setGoal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [showEn, setShowEn] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [hint, setHint] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [listening, setListening] = useState(false);
  const [debrief, setDebrief] = useState<Debrief | null>(null);
  const [stars, setStars] = useState(0);
  const [error, setError] = useState('');

  // Refs holding state that must not trigger re-renders / stale closures.
  const wireRef = useRef<WireMessage[]>([]);
  const learnerTurnsRef = useRef(0);
  const ratingsRef = useRef<Rating[]>([]);
  const threadEndRef = useRef<HTMLDivElement>(null);
  const stopDictationRef = useRef<(() => void) | null>(null);
  const startedRef = useRef(false);

  const speakIfWanted = useCallback(
    (text: string) => {
      if (autoSpeak) speak(text, rate);
    },
    [autoSpeak, rate],
  );

  // Core request: send current wire + one more turn, apply the response.
  const send = useCallback(
    async (opts: { kickoff?: boolean; learnerText?: string }) => {
      setError('');
      setLoading(true);

      const wire = wireRef.current;
      if (opts.kickoff) {
        wire.push({ role: 'user', content: KICKOFF });
      } else if (opts.learnerText !== undefined) {
        wire.push({ role: 'user', content: opts.learnerText });
        learnerTurnsRef.current += 1;
      }

      try {
        const res: ChatResponse = await postChat({
          sceneId: scene.id,
          customScene: scene.id
            ? undefined
            : {
                title: scene.title,
                setting: scene.setting,
                role: scene.role,
                goal: scene.goal,
                level: scene.level,
                twist: scene.twist || '',
              },
          mode,
          messages: wire,
          turnCount: learnerTurnsRef.current,
        });

        // Apply feedback to the learner's last turn (skip on kickoff).
        if (!opts.kickoff) {
          ratingsRef.current.push(res.feedback.rating);
          setTurns((prev) => {
            const next = [...prev];
            for (let i = next.length - 1; i >= 0; i--) {
              const t = next[i];
              if (t.kind === 'me' && t.feedback === null) {
                next[i] = { ...t, feedback: res.feedback };
                break;
              }
            }
            return next;
          });
          // Correction → notebook.
          if (res.feedback.better) {
            onNotebookAdd([
              {
                id: newId(),
                scene: scene.title,
                said: opts.learnerText ?? '',
                better: res.feedback.better,
                note: res.feedback.note_en,
                ts: Date.now(),
              },
            ]);
          }
        }

        // Push the AI turn.
        const aiTurn: AiTurn = {
          kind: 'ai',
          id: newId(),
          de: res.reply_de,
          en: res.reply_en,
          hint: res.hint_de,
        };
        setTurns((prev) => [...prev, aiTurn]);
        wire.push({ role: 'assistant', content: res.reply_de });
        setGoal(res.goal_progress);
        setHint(res.hint_de);
        setShowHint(false);
        speakIfWanted(res.reply_de);

        if (res.scene_over && res.debrief) {
          const s = computeStars(ratingsRef.current, res.goal_progress);
          setStars(s);
          setDebrief(res.debrief);
          onFinished(scene.id, s);
          // Debrief fixes → notebook.
          const fixEntries: NotebookEntry[] = res.debrief.fixes.map((f) => ({
            id: newId(),
            scene: scene.title,
            said: f.said,
            better: f.better,
            note: f.why,
            ts: Date.now(),
          }));
          if (fixEntries.length) onNotebookAdd(fixEntries);
        }
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          onUnauthorized(err.message);
          return;
        }
        setError(err instanceof Error ? err.message : 'Fehler.');
        // Roll back the pushed wire user turn so a retry stays consistent.
        if (opts.kickoff || opts.learnerText !== undefined) {
          wire.pop();
          if (opts.learnerText !== undefined) learnerTurnsRef.current -= 1;
        }
      } finally {
        setLoading(false);
      }
    },
    [scene, mode, onNotebookAdd, onFinished, onUnauthorized, speakIfWanted],
  );

  // Kick off the scene once on mount.
  useEffect(() => {
    primeVoices();
    if (startedRef.current) return;
    startedRef.current = true;
    void send({ kickoff: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll to the newest turn.
  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns, loading, debrief]);

  function handleSend() {
    const text = input.trim();
    if (!text || loading || debrief) return;
    setTurns((prev) => [...prev, { kind: 'me', id: newId(), text, feedback: null }]);
    setInput('');
    void send({ learnerText: text });
  }

  function toggleMic() {
    if (listening) {
      stopDictationRef.current?.();
      return;
    }
    const stop = startDictation(
      (interim) => setInput(interim),
      (final) => {
        setListening(false);
        if (final) setInput(final);
      },
      () => setListening(false),
    );
    if (stop) {
      stopDictationRef.current = stop;
      setListening(true);
    }
  }

  function exit() {
    stopSpeaking();
    stopDictationRef.current?.();
    onExit();
  }

  if (debrief) {
    return (
      <div className="app">
        <div className="topbar">
          <button className="iconbtn" onClick={exit} aria-label="Zurück">
            ←
          </button>
          <div className="brand">
            <h1 style={{ fontSize: 22 }}>{scene.emoji}</h1>
          </div>
          <span style={{ width: 38 }} />
        </div>
        <DebriefCard
          debrief={debrief}
          stars={stars}
          onDone={exit}
          onReplay={() => {
            stopSpeaking();
            onReplay();
          }}
          replayLabel={replayLabel}
          showReplayHint
        />
      </div>
    );
  }

  return (
    <div className="app session">
      <div className="session-head">
        <div className="row">
          <button className="iconbtn" onClick={exit} aria-label="Zurück zu den Szenen">
            ←
          </button>
          <div className="who">
            <div className="title">
              {scene.emoji} {scene.title}
            </div>
            <div className="role">{scene.role}</div>
          </div>
          <div className="controls">
            <button
              className={`iconbtn ${showEn ? 'active' : ''}`}
              onClick={() => setShowEn((v) => !v)}
              aria-label="Englische Übersetzung"
              title="EN"
            >
              EN
            </button>
            {ttsSupported() && (
              <button
                className={`iconbtn ${autoSpeak ? 'active' : ''}`}
                onClick={() => {
                  setAutoSpeak((v) => {
                    if (v) stopSpeaking();
                    return !v;
                  });
                }}
                aria-label="Automatisch vorlesen"
                title="Auto-Vorlesen"
              >
                🔊
              </button>
            )}
          </div>
        </div>
        <div className="goalbar-wrap">
          <div className="goal-text">
            <span>🎯 {scene.goal}</span>
            <span>{goal}%</span>
          </div>
          <div className="goalbar">
            <span style={{ width: `${goal}%` }} />
          </div>
        </div>
      </div>

      <div className="thread">
        {turns.map((t) =>
          t.kind === 'ai' ? (
            <div key={t.id} className="turn ai">
              <div className="bubble-row">
                <div className="bubble">
                  {t.de}
                  {showEn && t.en && <div className="en">{t.en}</div>}
                </div>
                {ttsSupported() && (
                  <button
                    className="speaker"
                    onClick={() => speak(t.de, rate)}
                    aria-label="Vorlesen"
                    title="Vorlesen"
                  >
                    🔊
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div key={t.id} className="turn me">
              <div className="bubble">{t.text}</div>
              {t.feedback && t.feedback.rating !== 'gut' && (
                <div className={`fb ${t.feedback.rating}`}>
                  {t.feedback.better && (
                    <span>
                      Besser: <span className="better">{t.feedback.better}</span>
                    </span>
                  )}
                  {t.feedback.note_en && <span className="note">{t.feedback.note_en}</span>}
                </div>
              )}
              {t.feedback && t.feedback.rating === 'gut' && (
                <div className="fb gut">✓ Gut</div>
              )}
            </div>
          ),
        )}

        {loading && <div className="typing">… tippt</div>}

        {showHint && hint && (
          <div className="hint">
            <b>💡 Tipp:</b> {hint}
          </div>
        )}

        {error && <div className="banner-error">{error}</div>}

        <div ref={threadEndRef} />
      </div>

      <div className="composer">
        <div className="row">
          {sttSupported() && (
            <button
              className={`iconbtn mic ${listening ? 'listening active' : ''}`}
              onClick={toggleMic}
              aria-label="Sprechen"
              title="Sprechen"
              disabled={loading}
            >
              🎤
            </button>
          )}
          {hint && (
            <button
              className={`iconbtn ${showHint ? 'active' : ''}`}
              onClick={() => setShowHint((v) => !v)}
              aria-label="Tipp"
              title="Tipp"
              disabled={loading}
            >
              💡
            </button>
          )}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Auf Deutsch antworten …"
            rows={1}
            aria-label="Deine Antwort"
            disabled={loading}
          />
          <button
            className="send"
            onClick={handleSend}
            disabled={!input.trim() || loading}
            aria-label="Senden"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
