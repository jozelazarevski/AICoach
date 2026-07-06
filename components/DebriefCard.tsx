'use client';

import type { Debrief } from '@/lib/types';
import Stars from './Stars';

export default function DebriefCard({
  debrief,
  stars,
  onDone,
  onReplay,
  replayLabel,
  showReplayHint,
}: {
  debrief: Debrief;
  stars: number;
  onDone: () => void;
  onReplay: () => void;
  replayLabel?: string;
  showReplayHint?: boolean;
}) {
  return (
    <div className="debrief">
      <div className="stars-big">
        <Stars value={stars} className="stars-big" />
      </div>
      <h2>Szene beendet</h2>
      <p className="result">{debrief.result}</p>

      {debrief.strengths.length > 0 && (
        <>
          <h3>Das lief gut</h3>
          <ul>
            {debrief.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </>
      )}

      {debrief.fixes.length > 0 && (
        <>
          <h3>Korrekturen</h3>
          {debrief.fixes.map((f, i) => (
            <div className="fix" key={i}>
              <div className="said">{f.said}</div>
              <div className="better">{f.better}</div>
              <div className="why">{f.why}</div>
            </div>
          ))}
        </>
      )}

      <h3>Nächste Übung</h3>
      <div className="drill">{debrief.next_drill}</div>

      <div className="actions">
        <button className="btn terra" onClick={onReplay}>
          {replayLabel || 'Nochmal – schwerer'}
        </button>
        <button className="btn ghost" onClick={onDone}>
          Fertig
        </button>
      </div>
      {showReplayHint && (
        <p style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 10, textAlign: 'center' }}>
          „Schwerer“ spielt die Szene im nächsten Modus.
        </p>
      )}
    </div>
  );
}
