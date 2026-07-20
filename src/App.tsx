import { useEffect, useMemo, useState } from "react";
import type { Difficulty, Encounter, Ending } from "./game/types";
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
  isDaily: boolean;
  finalState: GameState;
}

function dailyEncounterId(encounters: Encounter[]): string {
  const _d = new Date();
  const today = `${_d.getFullYear()}-${String(_d.getMonth() + 1).padStart(2, "0")}-${String(_d.getDate()).padStart(2, "0")}`;
  let hash = 5381;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) + hash) + today.charCodeAt(i);
    hash |= 0;
  }
  return encounters[Math.abs(hash) % encounters.length].id;
}

export default function App() {
  const { progress, updateProgress, setApiEnabled, setTheme, dismissIntro } = useProgress();
  const [screen, setScreen] = useState<Screen>("start");
  const [encounter, setEncounter] = useState<Encounter | null>(null);
  const [state, setState] = useState<GameState | null>(null);
  const [endInfo, setEndInfo] = useState<EndInfo | null>(null);
  const [rankUp, setRankUp] = useState<string | null>(null);

  useEffect(() => {
    if (encounter) {
      document.documentElement.style.setProperty("--accent", ACCENT[encounter.difficulty]);
    } else {
      // Let the stylesheet's per-theme accent apply on the start screen.
      document.documentElement.style.removeProperty("--accent");
    }
  }, [encounter]);

  useEffect(() => {
    document.documentElement.dataset.theme = progress.settings.theme;
  }, [progress.settings.theme]);

  const dailyId = useMemo(() => dailyEncounterId(ENCOUNTERS), []);

  const start = (enc: Encounter) => {
    const prior = progress.completed[enc.id];
    const variant = prior ? prior.playCount % 3 : 0;
    setEncounter(enc);
    setState(startEncounter(enc, progress.lifetimeXp, variant));
    setEndInfo(null);
    setScreen("play");
  };

  const findEnding = (enc: Encounter, s: GameState): Ending => {
    const byResult = enc.endings.filter((e) => e.result === s.status);
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
      const isDaily = encounter.id === dailyId;

      const beforeRank = rankFor(progress.lifetimeXp);
      updateProgress(
        encounter.id,
        grade,
        next.sceneScore,
        won,
        xpGained,
        encounter.opponent.archetype,
        ending.result,
        isDaily
      );
      const dailyBonus = isDaily ? 10 : 0;
      const afterRank = rankFor(
        progress.lifetimeXp + Math.max(0, xpGained) + dailyBonus
      );
      if (afterRank !== beforeRank) setRankUp(afterRank);

      setEndInfo({
        ending,
        grade,
        sceneScore: next.sceneScore,
        xpGained,
        isDaily,
        finalState: next,
      });
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

  return (
    <div className="min-h-screen bg-ink text-paper">
      {rankUp && (
        <RankUpBanner rankName={rankUp} onDismiss={() => setRankUp(null)} />
      )}

      {screen === "start" && (
        <StartScreen
          encounters={ENCOUNTERS}
          progress={progress}
          dailyEncounterId={dailyId}
          onStart={start}
          onDismissIntro={dismissIntro}
          onSetTheme={setTheme}
          onSetApiEnabled={setApiEnabled}
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

      {screen === "end" && endInfo && encounter && (
        <SceneEndScreen
          ending={endInfo.ending}
          grade={endInfo.grade}
          sceneScore={endInfo.sceneScore}
          xpGained={endInfo.xpGained}
          dailyBonus={endInfo.isDaily}
          encounter={encounter}
          stageChoices={endInfo.finalState.stageChoices}
          onPlayAgain={playAgain}
          onPickNew={pickNew}
        />
      )}
    </div>
  );
}
