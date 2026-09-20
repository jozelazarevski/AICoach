import { useEffect, useRef, useState } from "react";
import type { Drill, Lesson } from "../../oratory/types";
import {
  micAvailable,
  speechRecognitionAvailable,
  startRecording,
  type DeliveryCapture,
  type RecorderHandle,
} from "../../oratory/delivery";
import { wordsOf } from "../../oratory/analyze";

interface SpeakDrillProps {
  lesson: Lesson;
  drill: Drill;
  /** The passage to deliver when the drill has no script of its own. */
  fallbackScript: string;
  onSubmit: (capture: DeliveryCapture) => void;
  onBack: () => void;
}

const MIN_SECONDS = 6;

/** A level meter that keeps its own history, so the room can see the shape. */
function LevelMeter({ level, history }: { level: number; history: number[] }) {
  const bars = history.slice(-60);
  return (
    <div className="rounded-lg border border-line bg-ink-2 p-4">
      <div className="flex items-end gap-[2px]" style={{ height: 64 }}>
        {bars.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${Math.max(2, Math.min(100, v * 100))}%`,
              background:
                v < 0.06 ? "var(--ink-3)" : v > 0.55 ? "var(--accent)" : "var(--paper-faint)",
            }}
          />
        ))}
        {bars.length === 0 && (
          <div className="w-full text-center font-body text-xs text-paper-faint">
            Waiting for your voice.
          </div>
        )}
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink-3">
        <div
          className="h-full rounded-full transition-[width] duration-75"
          style={{ width: `${Math.min(100, level * 100)}%`, background: "var(--accent)" }}
        />
      </div>
      <p className="mt-2 font-body text-[11px] text-paper-faint">
        Grey is silence, pale is speech, accent is your loudest. A bar chart that
        never changes height is a monotone.
      </p>
    </div>
  );
}

export function SpeakDrill({ lesson, drill, fallbackScript, onSubmit, onBack }: SpeakDrillProps) {
  const [state, setState] = useState<"idle" | "recording" | "finishing">("idle");
  const [error, setError] = useState<string | null>(null);
  const [level, setLevel] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [transcript, setTranscript] = useState("");
  const handle = useRef<RecorderHandle | null>(null);
  const startedAt = useRef(0);
  const alive = useRef(true);

  const script = drill.script ?? fallbackScript;
  const scriptWords = script ? wordsOf(script).length : 0;
  const supported = micAvailable();
  const hasRecognizer = speechRecognitionAvailable();

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      // Leaving mid-recording must still release the microphone.
      handle.current?.stop().catch(() => undefined);
      handle.current = null;
    };
  }, []);

  useEffect(() => {
    if (state !== "recording") return;
    const timer = setInterval(() => {
      setElapsed((Date.now() - startedAt.current) / 1000);
    }, 200);
    return () => clearInterval(timer);
  }, [state]);

  const begin = async () => {
    setError(null);
    setHistory([]);
    setTranscript("");
    setElapsed(0);
    try {
      const rec = await startRecording({
        onLevel: (v) => {
          if (!alive.current) return;
          setLevel(v);
          setHistory((h) => [...h.slice(-200), v]);
        },
        onTranscript: (t) => {
          if (alive.current) setTranscript(t);
        },
      });
      if (!alive.current) {
        await rec.stop();
        return;
      }
      handle.current = rec;
      startedAt.current = Date.now();
      setState("recording");
    } catch (e) {
      const message =
        e instanceof DOMException && e.name === "NotAllowedError"
          ? "The browser blocked the microphone. Allow it in the address bar and try again."
          : "The microphone could not be opened on this device.";
      setError(message);
    }
  };

  const finish = async () => {
    if (!handle.current) return;
    setState("finishing");
    const rec = handle.current;
    handle.current = null;
    const capture = await rec.stop();
    if (!alive.current) return;
    setLevel(0);
    setState("idle");
    onSubmit({ ...capture, assumedWords: scriptWords || undefined });
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 font-mono text-[11px] uppercase tracking-wide text-paper-faint transition-colors hover:text-paper-dim"
      >
        ← {lesson.title}
      </button>

      <h1 className="font-display text-3xl text-paper">{drill.title}</h1>
      <p className="mt-3 font-body text-[15px] leading-relaxed text-paper-dim">{drill.brief}</p>

      {script && (
        <div className="mt-4 rounded-lg border border-line bg-ink-2 p-5">
          <div className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
            {drill.script ? "Deliver this" : "Your own passage"}
          </div>
          <p className="mt-2 font-display text-lg leading-relaxed text-paper">{script}</p>
        </div>
      )}

      {!script && (
        <div className="mt-4 rounded-lg border border-line bg-ink-2 p-4">
          <p className="font-body text-sm leading-relaxed text-paper-dim">
            No script for this one. Speak your own words for about a minute.
          </p>
        </div>
      )}

      {!supported && (
        <div className="mt-4 rounded-lg border border-line bg-ink-2 p-4">
          <p className="font-body text-sm leading-relaxed text-paper-dim">
            This browser has no microphone access available to the page, so the
            speaking drills cannot run here. The writing drills work everywhere,
            and everything in the lesson still applies — read it aloud to
            yourself and time it against the targets.
          </p>
        </div>
      )}

      {error && (
        <div
          className="mt-4 rounded-lg border p-4"
          style={{ borderColor: "color-mix(in srgb, var(--bad) 45%, var(--line))" }}
        >
          <p className="font-body text-sm leading-relaxed" style={{ color: "var(--bad)" }}>
            {error}
          </p>
        </div>
      )}

      {supported && (
        <div className="mt-5 flex flex-col gap-4">
          {state !== "idle" && <LevelMeter level={level} history={history} />}

          <div className="flex flex-wrap items-center gap-4">
            {state === "idle" && (
              <button
                type="button"
                onClick={begin}
                className="rounded-lg border px-5 py-2.5 font-mono text-xs uppercase tracking-wide transition-colors hover:bg-accent/10"
                style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
              >
                Start recording
              </button>
            )}

            {state === "recording" && (
              <>
                <button
                  type="button"
                  onClick={finish}
                  disabled={elapsed < MIN_SECONDS}
                  className="rounded-lg border px-5 py-2.5 font-mono text-xs uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ color: "var(--bad)", borderColor: "var(--bad)" }}
                >
                  Stop and score
                </button>
                <span className="flex items-center gap-2 font-mono text-sm text-paper-dim">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: "var(--bad)" }}
                  />
                  {elapsed.toFixed(1)}s
                  {elapsed < MIN_SECONDS && (
                    <span className="text-paper-faint">· keep going</span>
                  )}
                </span>
              </>
            )}

            {state === "finishing" && (
              <span className="font-body text-sm text-paper-dim">Measuring the take…</span>
            )}
          </div>

          {state === "recording" && hasRecognizer && (
            <div className="rounded-lg border border-line bg-ink-2 p-4">
              <div className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
                Heard so far
              </div>
              <p className="mt-2 font-body text-sm leading-relaxed text-paper-dim">
                {transcript || "…"}
              </p>
            </div>
          )}

          {state === "idle" && !hasRecognizer && (
            <p className="font-body text-xs leading-relaxed text-paper-faint">
              This browser has no speech recognizer, so pace is estimated from the
              script's length instead of a transcript, and filler words are not
              counted. Pace, pauses, and range all still come from the audio.
              Chrome and Safari give you the transcript as well.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
