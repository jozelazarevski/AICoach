'use client';

import { useState } from 'react';
import { setAccessCode } from '@/lib/storage';

// First-visit code prompt. We don't verify against the server here — the code is
// stored and checked server-side on the first real API call. If that call returns
// 401, page.tsx bounces the user back to this gate with an error.
export default function AccessGate({
  initialError,
  onEnter,
}: {
  initialError?: string;
  onEnter: (code: string) => void;
}) {
  const [code, setCode] = useState('');
  const [error] = useState(initialError || '');

  function submit() {
    const trimmed = code.trim();
    if (!trimmed) return;
    setAccessCode(trimmed);
    onEnter(trimmed);
  }

  return (
    <div className="gate">
      <div className="gate-card">
        <h1>Sprechstunde</h1>
        <p>Gib deinen Zugangscode ein, um zu üben.</p>
        {error && <div className="err">{error}</div>}
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Zugangscode"
          autoFocus
          aria-label="Zugangscode"
        />
        <button className="btn" style={{ width: '100%' }} onClick={submit} disabled={!code.trim()}>
          Los geht's
        </button>
      </div>
    </div>
  );
}
