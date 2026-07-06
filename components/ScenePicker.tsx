'use client';

import { useState } from 'react';
import { MODES, SCENES } from '@/lib/scenes';
import { postScene, ApiError } from '@/lib/api';
import type { ModeId, SessionScene } from '@/lib/types';
import Stars from './Stars';

export default function ScenePicker({
  mode,
  onModeChange,
  bestStars,
  onStart,
  onOpenNotebook,
  onOpenSettings,
  onUnauthorized,
  notebookCount,
}: {
  mode: ModeId;
  onModeChange: (m: ModeId) => void;
  bestStars: Record<string, number>;
  onStart: (scene: SessionScene) => void;
  onOpenNotebook: () => void;
  onOpenSettings: () => void;
  onUnauthorized: (message: string) => void;
  notebookCount: number;
}) {
  const [desc, setDesc] = useState('');
  const [building, setBuilding] = useState(false);
  const [error, setError] = useState('');

  async function buildCustom() {
    const text = desc.trim();
    if (!text || building) return;
    setBuilding(true);
    setError('');
    try {
      const s = await postScene(text);
      onStart({
        title: s.title,
        emoji: s.emoji,
        setting: s.setting,
        role: s.role,
        goal: s.goal,
        level: s.level,
        twist: s.twist,
      });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        onUnauthorized(err.message);
        return;
      }
      setError(err instanceof Error ? err.message : 'Fehler beim Erstellen der Szene.');
    } finally {
      setBuilding(false);
    }
  }

  return (
    <div className="app">
      <div className="topbar">
        <div className="brand">
          <h1>Sprechstunde</h1>
          <span className="tag">Deutsch üben</span>
        </div>
        <div className="controls" style={{ display: 'flex', gap: 6 }}>
          <button className="iconbtn" onClick={onOpenNotebook} aria-label="Notizbuch" title="Notizbuch">
            📓{notebookCount > 0 ? <sup style={{ fontSize: 9 }}>{notebookCount}</sup> : null}
          </button>
          <button className="iconbtn" onClick={onOpenSettings} aria-label="Einstellungen" title="Einstellungen">
            ⚙︎
          </button>
        </div>
      </div>

      <h2 className="section-title">Modus</h2>
      <div className="chips">
        {MODES.map((m) => (
          <button
            key={m.id}
            className={`chip ${mode === m.id ? 'active' : ''}`}
            onClick={() => onModeChange(m.id)}
          >
            {m.label}
            <small>{m.blurb}</small>
          </button>
        ))}
      </div>

      <h2 className="section-title">Eigene Szene</h2>
      <div className="builder">
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Beschreibe eine Situation, z. B. „Ich muss beim Zahnarzt einen Termin absagen.“"
          aria-label="Szenenbeschreibung"
        />
        {error && <div className="banner-error">{error}</div>}
        <button className="btn terra" onClick={buildCustom} disabled={!desc.trim() || building}>
          {building ? 'Wird erstellt …' : 'Szene erstellen & starten'}
        </button>
      </div>

      <h2 className="section-title">Szenen</h2>
      <div className="scene-grid">
        {SCENES.map((s) => (
          <button
            key={s.id}
            className="scene-card"
            onClick={() =>
              onStart({
                id: s.id,
                title: s.title,
                emoji: s.emoji,
                setting: s.setting,
                role: s.role,
                goal: s.goal,
                level: s.level,
              })
            }
          >
            <span className="emoji">{s.emoji}</span>
            <span className="title">{s.title}</span>
            <span className="goal">{s.goal}</span>
            <span className="meta">
              <span className="badge-level">{s.level}</span>
              <Stars value={bestStars[s.id] || 0} />
            </span>
          </button>
        ))}
      </div>
      <div className="footer-space" />
    </div>
  );
}
