'use client';

import { useState } from 'react';
import type { NotebookEntry } from '@/lib/types';

function Card({ entry }: { entry: NotebookEntry }) {
  const [open, setOpen] = useState(false);
  return (
    <button className="note-card" onClick={() => setOpen((v) => !v)}>
      <div className="scene-name">{entry.scene}</div>
      <div className="prompt">{entry.said?.trim() ? entry.said : '(deine Formulierung)'}</div>
      {!open ? (
        <div className="reveal">Korrektur zeigen ▾</div>
      ) : (
        <div className="answer">
          <div className="better">{entry.better}</div>
          {entry.note && <div className="note">{entry.note}</div>}
        </div>
      )}
    </button>
  );
}

export default function Notebook({
  entries,
  onBack,
}: {
  entries: NotebookEntry[];
  onBack: () => void;
}) {
  return (
    <div className="app">
      <div className="topbar">
        <button className="iconbtn" onClick={onBack} aria-label="Zurück">
          ←
        </button>
        <div className="brand">
          <h1 style={{ fontSize: 24 }}>Notizbuch</h1>
        </div>
        <span style={{ width: 38 }} />
      </div>

      {entries.length === 0 ? (
        <div className="empty-note">
          Noch keine Korrekturen. Übe eine Szene — deine Verbesserungen sammeln sich hier.
        </div>
      ) : (
        <div>
          {entries.map((e) => (
            <Card key={e.id} entry={e} />
          ))}
        </div>
      )}
      <div className="footer-space" />
    </div>
  );
}
