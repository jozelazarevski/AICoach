'use client';

import { exportNotebookBlob } from '@/lib/storage';

export default function Settings({
  onClose,
  onReset,
  notebookCount,
}: {
  onClose: () => void;
  onReset: () => void;
  notebookCount: number;
}) {
  function exportNotebook() {
    const { filename, url } = exportNotebookBlob();
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function confirmReset() {
    if (window.confirm('Alles zurücksetzen? Notizbuch, Sterne, Modus und Zugangscode werden gelöscht.')) {
      onReset();
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <h2>Einstellungen</h2>
        <p className="muted">
          Alles wird nur lokal in deinem Browser gespeichert. Kein Konto, keine Datenbank.
        </p>
        <div className="settings-actions">
          <button className="btn ghost" onClick={exportNotebook} disabled={notebookCount === 0}>
            Notizbuch exportieren ({notebookCount})
          </button>
          <button className="btn terra" onClick={confirmReset}>
            Alles zurücksetzen
          </button>
          <button className="btn" onClick={onClose}>
            Schliessen
          </button>
        </div>
        <div className="spacer" />
      </div>
    </div>
  );
}
