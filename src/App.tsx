import { useEffect, useMemo, useState } from "react";
import type { Difficulty, Ending, Encounter } from "./game/types";
import {
  startEncounter,
  gradeFor,
  xpForOutcome,
  type GameState,
} from "./game/engine";
import { rankFor } from "./game/ranks";
import { ENCOUNTERS } from "./content";
import { useProgress } from "./hooks/useProgress";
import { StartScreen } from "./components/StartScreen";
import { PlayScreen } from "./components/PlayScreen";
import { SceneEndScreen } from "./components/SceneEndScreen";
import { RankUpBanner } from "./components/RankUpBanner";

const ACCENT: Record<Difficulty, string> = {
  measured: "#4F8FB5",
  pointed: "#C98A3A",
  adversarial: "#D9633C",
};

type Screen = "start" | "play" | "end";

interface EndInfo {
  ending: Ending;
  grade: string;
  sceneScore: number;
  xpGained: number;
}

export default function App() {
  const { progress, updateProgress } = useProgress();
  const [screen, setScreen] = useState<Screen>("start");
  const [encounter, setEncounter] = useState<Encounter | null>(null);
  const [state, setState] = useState<GameState | null>(null);
  const [endInfo, setEndInfo] = useState<EndInfo | null>(null);
  const [rankUp, setRankUp] = useState<string | null>(null);

  // Set accent CSS variable based on current encounter difficulty.
  useEffect(() => {
    const accent = encounter ? ACCENT[encounter.difficulty] : "#4F8FB5";
    document.documentElement.style.setProperty("--accent", accent);
  }, [encounter]);

  const start = (enc: Encounter) => {
    setEncounter(enc);
    setState(startEncounter(enc, progress.lifetimeXp));
    setEndInfo(null);
    setScreen("play");
  };

  const findEnding = (enc: Encounter, s: GameState): Ending => {
    // The resolution is already in the log; recover the matching ending by result.
    const byResult = enc.endings.filter((e) => e.result === s.status);
    // Prefer one whose resolution text is present in the log.
    const resText = [...s.log]
      .reverse()
      .find((e) => e.type === "resolution")?.text;
    const matched = byResult.find((e) => e.resolution === resText);
    return matched ?? byResult[0] ?? enc.endings[enc.endings.length - 1];
  };

  const handleStateChange = (next: GameState) => {
    setState(next);
    if (next.status !== "playing" && encounter) {
      const ending = findEnding(encounter, next);
      const grade = gradeFor(ending.baseGrade, next.sceneScore);
      const xpGained = xpForOutcome(ending.result, next.sceneScore);
      const won = ending.result === "won";

      const beforeRank = rankFor(progress.lifetimeXp);
      updateProgress(encounter.id, grade, next.sceneScore, won, xpGained);
      const afterRank = rankFor(progress.lifetimeXp + Math.max(0, xpGained));
      if (afterRank !== beforeRank) setRankUp(afterRank);

      setEndInfo({ ending, grade, sceneScore: next.sceneScore, xpGained });
      setScreen("end");
    }
  };

  const playAgain = () => {
    if (encounter) start(encounter);
  };

  const pickNew = () => {
    setScreen("start");
    setEncounter(null);
    setState(null);
    setEndInfo(null);
  };

  const sortedEncounters = useMemo(() => ENCOUNTERS, []);

  return (
    <div className="min-h-screen bg-ink text-paper">
      {rankUp && (
        <RankUpBanner rankName={rankUp} onDismiss={() => setRankUp(null)} />
      )}

      {screen === "start" && (
        <StartScreen
          encounters={sortedEncounters}
          progress={progress}
          onStart={start}
        />
      )}

      {screen === "play" && encounter && state && (
        <PlayScreen
          encounter={encounter}
          state={state}
          onStateChange={handleStateChange}
          apiEnabled={progress.settings.apiEnabled}
        />
      )}

      {screen === "end" && endInfo && (
        <SceneEndScreen
          ending={endInfo.ending}
          grade={endInfo.grade}
          sceneScore={endInfo.sceneScore}
          xpGained={endInfo.xpGained}
          onPlayAgain={playAgain}
          onPickNew={pickNew}
        />
      )}
    </div>
  );
}
