'use client';

import { useEffect, useState } from 'react';
import AccessGate from '@/components/AccessGate';
import ScenePicker from '@/components/ScenePicker';
import Session from '@/components/Session';
import Notebook from '@/components/Notebook';
import Settings from '@/components/Settings';
import {
  getAccessCode,
  getMode,
  setMode as persistMode,
  getNotebook,
  addNotebookEntries,
  getBestStars,
  recordStars,
  resetAll,
  setAccessCode,
} from '@/lib/storage';
import type { ModeId, NotebookEntry, SessionScene } from '@/lib/types';

type View = 'picker' | 'session' | 'notebook';

const MODE_ORDER: ModeId[] = ['sanft', 'echt', 'schweiz'];
function harder(mode: ModeId): ModeId {
  const i = MODE_ORDER.indexOf(mode);
  return MODE_ORDER[Math.min(i + 1, MODE_ORDER.length - 1)];
}

interface ActiveSession {
  scene: SessionScene;
  mode: ModeId;
  runId: number;
}

export default function Home() {
  const [ready, setReady] = useState(false);
  const [hasCode, setHasCode] = useState(false);
  const [gateError, setGateError] = useState('');

  const [view, setView] = useState<View>('picker');
  const [mode, setModeState] = useState<ModeId>('sanft');
  const [active, setActive] = useState<ActiveSession | null>(null);
  const [notebook, setNotebook] = useState<NotebookEntry[]>([]);
  const [bestStars, setBestStars] = useState<Record<string, number>>({});
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    setHasCode(Boolean(getAccessCode()));
    setModeState(getMode());
    setNotebook(getNotebook());
    setBestStars(getBestStars());
    setReady(true);
  }, []);

  function changeMode(m: ModeId) {
    setModeState(m);
    persistMode(m);
  }

  function startScene(scene: SessionScene) {
    setActive({ scene, mode, runId: 0 });
    setView('session');
  }

  function replayHarder() {
    setActive((prev) =>
      prev ? { ...prev, mode: harder(prev.mode), runId: prev.runId + 1 } : prev,
    );
  }

  function exitSession() {
    setActive(null);
    setBestStars(getBestStars());
    setView('picker');
  }

  function handleNotebookAdd(entries: NotebookEntry[]) {
    const next = addNotebookEntries(entries);
    setNotebook(next);
  }

  function handleFinished(sceneId: string | undefined, stars: number) {
    if (sceneId) setBestStars(recordStars(sceneId, stars));
  }

  function handleUnauthorized(message: string) {
    setAccessCode('');
    setHasCode(false);
    setGateError(message || 'Falscher Zugangscode.');
    setActive(null);
    setSettingsOpen(false);
    setView('picker');
  }

  function handleReset() {
    resetAll();
    setNotebook([]);
    setBestStars({});
    setModeState('sanft');
    setActive(null);
    setSettingsOpen(false);
    setView('picker');
    setHasCode(false);
    setGateError('');
  }

  if (!ready) return null;

  if (!hasCode) {
    return (
      <AccessGate
        initialError={gateError}
        onEnter={() => {
          setGateError('');
          setHasCode(true);
        }}
      />
    );
  }

  if (view === 'session' && active) {
    const replayLabel =
      active.mode === harder(active.mode) ? 'Nochmal' : 'Nochmal – schwerer';
    return (
      <Session
        key={active.runId}
        scene={active.scene}
        mode={active.mode}
        onExit={exitSession}
        onNotebookAdd={handleNotebookAdd}
        onFinished={handleFinished}
        onUnauthorized={handleUnauthorized}
        onReplay={replayHarder}
        replayLabel={replayLabel}
      />
    );
  }

  if (view === 'notebook') {
    return <Notebook entries={notebook} onBack={() => setView('picker')} />;
  }

  return (
    <>
      <ScenePicker
        mode={mode}
        onModeChange={changeMode}
        bestStars={bestStars}
        onStart={startScene}
        onOpenNotebook={() => setView('notebook')}
        onOpenSettings={() => setSettingsOpen(true)}
        onUnauthorized={handleUnauthorized}
        notebookCount={notebook.length}
      />
      {settingsOpen && (
        <Settings
          onClose={() => setSettingsOpen(false)}
          onReset={handleReset}
          notebookCount={notebook.length}
        />
      )}
    </>
  );
}
