import { useState } from "react";
import type { Encounter, Difficulty } from "../game/types";
import type { Progress, Theme } from "../hooks/useProgress";
import { THEMES } from "../hooks/useProgress";
import { Hud } from "./Hud";

interface StartScreenProps {
  encounters: Encounter[];
  progress: Progress;
  dailyEncounterId: string;
  onStart: (encounter: Encounter) => void;
  onDismissIntro: () => void;
  onSetTheme: (theme: Theme) => void;
  onSetApiEnabled: (enabled: boolean) => void;
  onSetApiKey: (key: string) => void;
}

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  measured: "#4F8FB5",
  pointed: "#C98A3A",
  adversarial: "#D9633C",
};

// Player-facing names. Internal keys stay the same so content and saves don't break.
const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  measured: "Everyday",
  pointed: "Tense",
  adversarial: "High stakes",
};

const UNLOCK_NEEDED: Record<Difficulty, { need: number; fromDifficulty: Difficulty | null }> = {
  measured: { need: 0, fromDifficulty: null },
  pointed: { need: 3, fromDifficulty: "measured" },
  adversarial: { need: 3, fromDifficulty: "pointed" },
};

type SettingFilter = "all" | "work" | "life";

function countCompleted(encounters: Encounter[], progress: Progress, difficulty: Difficulty): number {
  return encounters.filter((e) => e.difficulty === difficulty && !!progress.completed[e.id]).length;
}

function isUnlocked(enc: Encounter, encounters: Encounter[], progress: Progress): boolean {
  const rule = UNLOCK_NEEDED[enc.difficulty];
  if (!rule.fromDifficulty) return true;
  return countCompleted(encounters, progress, rule.fromDifficulty) >= rule.need;
}

function topWeakness(weaknesses: Record<string, number>): string | null {
  let top: string | null = null;
  let max = 1; // only show if at least 2 losses against an archetype
  for (const [archetype, count] of Object.entries(weaknesses)) {
    if (count > max) {
      max = count;
      top = archetype;
    }
  }
  return top;
}

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const color = DIFFICULTY_COLOR[difficulty];
  return (
    <span
      className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
      style={{ color, border: `1px solid ${color}`, background: `${color}1A` }}
    >
      {DIFFICULTY_LABEL[difficulty]}
    </span>
  );
}

function HowToPlay({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="rounded-lg border border-line bg-ink-2 p-5">
      <h2 className="font-display text-lg text-paper">How it works</h2>
      <ol className="mt-3 flex flex-col gap-2.5">
        <li className="flex gap-3 font-body text-sm leading-relaxed text-paper-dim">
          <span className="font-mono text-xs text-paper-faint">1</span>
          <span>
            Someone across the table wants something. So do you. A landlord, a car
            salesman, your boss, your brother.
          </span>
        </li>
        <li className="flex gap-3 font-body text-sm leading-relaxed text-paper-dim">
          <span className="font-mono text-xs text-paper-faint">2</span>
          <span>
            Each turn, pick what you say next, or type your own words.{" "}
            <span className="text-paper">Respect</span> is how seriously they take
            you. <span className="text-paper">Progress</span> is how close you are
            to getting what you want.
          </span>
        </li>
        <li className="flex gap-3 font-body text-sm leading-relaxed text-paper-dim">
          <span className="font-mono text-xs text-paper-faint">3</span>
          <span>
            Fill Progress before Respect runs out. Every choice, good or bad,
            teaches you a real technique you can use the next day.
          </span>
        </li>
      </ol>
      <button
        type="button"
        onClick={onDismiss}
        className="mt-4 rounded-lg border border-accent px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors hover:bg-accent/10"
        style={{ color: "var(--accent)" }}
      >
        Got it
      </button>
    </div>
  );
}

export function StartScreen({
  encounters,
  progress,
  dailyEncounterId,
  onStart,
  onDismissIntro,
  onSetTheme,
  onSetApiEnabled,
  onSetApiKey,
}: StartScreenProps) {
  const [filter, setFilter] = useState<SettingFilter>("all");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [keyDraft, setKeyDraft] = useState(progress.settings.apiKey);
  const keySaved = keyDraft.trim() === progress.settings.apiKey && keyDraft.trim() !== "";
  const weakness = topWeakness(progress.weaknesses);
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const dailyDone = progress.dailyChallengeDate === today;

  const visible = encounters.filter(
    (e) => filter === "all" || (e.setting ?? "work") === filter
  );

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <header className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl text-paper">Closed Door</h1>
          <p className="mt-1 font-body text-sm text-paper-dim">
            Win the conversations that matter. At work, at home, everywhere.
          </p>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const idx = THEMES.findIndex((t) => t.id === progress.settings.theme);
              onSetTheme(THEMES[(idx + 1) % THEMES.length].id);
            }}
            className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-paper-faint transition-colors hover:border-paper-faint hover:text-paper-dim"
            title="Cycle theme"
          >
            {THEMES.find((t) => t.id === progress.settings.theme)?.label ?? "Dark"}
          </button>
          <button
            type="button"
            onClick={() => setSettingsOpen((o) => !o)}
            className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-paper-faint transition-colors hover:border-paper-faint hover:text-paper-dim"
          >
            Settings
          </button>
        </div>
      </header>

      {settingsOpen && (
        <div className="mb-6 rounded-lg border border-line bg-ink-2 p-5">
          <h2 className="font-display text-lg text-paper">Settings</h2>

          <div className="mt-3">
            <div className="font-body text-sm text-paper">Theme</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {THEMES.map((t) => {
                const active = progress.settings.theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onSetTheme(t.id)}
                    className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wide transition-colors"
                    style={{
                      color: active ? "var(--accent)" : "var(--paper-faint)",
                      borderColor: active ? "var(--accent)" : "var(--line)",
                      background: active
                        ? "color-mix(in srgb, var(--accent) 8%, transparent)"
                        : "transparent",
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex items-start justify-between gap-4 border-t border-line pt-4">
            <div>
              <div className="font-body text-sm text-paper">Live conversations</div>
              <p className="mt-1 max-w-md font-body text-xs leading-relaxed text-paper-dim">
                When on, the opponent becomes a live AI: it answers what you
                actually said, choice reactions adapt to the conversation, and
                typed lines are scored on their merits. Needs either an API
                key pasted below or one configured on the game's server;
                without one, the game falls back to scripted dialogue.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSetApiEnabled(!progress.settings.apiEnabled)}
              className="mt-1 flex-shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wide transition-colors"
              style={{
                color: progress.settings.apiEnabled ? "var(--accent)" : "var(--paper-faint)",
                borderColor: progress.settings.apiEnabled ? "var(--accent)" : "var(--line)",
              }}
            >
              {progress.settings.apiEnabled ? "On" : "Off"}
            </button>
          </div>

          <div className="mt-4 border-t border-line pt-4">
            <div className="font-body text-sm text-paper">Anthropic API key</div>
            <p className="mt-1 max-w-md font-body text-xs leading-relaxed text-paper-dim">
              Paste a key from console.anthropic.com to power live conversations
              from this browser. It is stored only on this device and sent only
              to Anthropic. If the game's server has its own key configured,
              you can leave this empty.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <input
                type="password"
                value={keyDraft}
                onChange={(e) => setKeyDraft(e.target.value)}
                placeholder="sk-ant-..."
                autoComplete="off"
                className="w-64 max-w-full rounded-md border border-line bg-ink px-3 py-2 font-mono text-xs text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                onClick={() => onSetApiKey(keyDraft)}
                className="rounded-md border border-accent px-3 py-2 font-mono text-[10px] uppercase tracking-wide transition-colors hover:bg-accent/10"
                style={{ color: "var(--accent)" }}
              >
                {keySaved ? "Saved" : "Save"}
              </button>
              {progress.settings.apiKey && (
                <button
                  type="button"
                  onClick={() => {
                    setKeyDraft("");
                    onSetApiKey("");
                  }}
                  className="font-mono text-[10px] uppercase tracking-wide text-paper-faint hover:text-paper-dim"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-col gap-3">
        {!progress.settings.introSeen && <HowToPlay onDismiss={onDismissIntro} />}

        <Hud lifetimeXp={progress.lifetimeXp} />

        {weakness && (
          <div className="flex items-center gap-3 rounded-lg border border-line bg-ink-2 px-4 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
              Pattern
            </span>
            <span className="font-body text-xs text-paper-dim">
              You tend to struggle against <span className="text-paper">{weakness}</span> types. Look for those conversations below.
            </span>
          </div>
        )}

        <div className="flex gap-1 self-start rounded-lg border border-line bg-ink-2 p-1">
          {(
            [
              ["all", "All"],
              ["life", "Everyday life"],
              ["work", "Work"],
            ] as [SettingFilter, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className="rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors"
              style={{
                background: filter === key ? "var(--ink-3)" : "transparent",
                color: filter === key ? "var(--paper)" : "var(--paper-faint)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visible.map((enc) => {
          const record = progress.completed[enc.id];
          const unlocked = isUnlocked(enc, encounters, progress);
          const rule = UNLOCK_NEEDED[enc.difficulty];
          const isDaily = enc.id === dailyEncounterId;

          return (
            <button
              key={enc.id}
              type="button"
              onClick={() => {
                if (unlocked) onStart(enc);
              }}
              disabled={!unlocked}
              className="group flex flex-col rounded-lg border border-line bg-ink-2 p-5 text-left transition-all hover:border-paper-faint disabled:cursor-not-allowed disabled:opacity-50"
              style={
                unlocked
                  ? undefined
                  : { filter: "saturate(0.4)" }
              }
            >
              <div className="mb-2 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <DifficultyBadge difficulty={enc.difficulty} />
                  {isDaily && !dailyDone && (
                    <span
                      className="rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
                      style={{
                        color: "var(--warn)",
                        borderColor: "color-mix(in srgb, var(--warn) 45%, transparent)",
                        background: "color-mix(in srgb, var(--warn) 12%, transparent)",
                      }}
                    >
                      Daily
                    </span>
                  )}
                  {isDaily && dailyDone && (
                    <span className="font-mono text-[10px] text-paper-faint">
                      Daily done
                    </span>
                  )}
                </div>
                <span
                  className="font-mono text-xs"
                  style={{
                    color: record ? "var(--good)" : "var(--paper-faint)",
                  }}
                >
                  {!unlocked
                    ? `Locked — finish ${rule.need} ${DIFFICULTY_LABEL[rule.fromDifficulty ?? "measured"].toLowerCase()} conversations first`
                    : record
                    ? `Best ${record.bestGrade}`
                    : "New"}
                </span>
              </div>
              <h2 className="font-display text-xl text-paper">{enc.title}</h2>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-paper-faint">
                {enc.opponent.name}
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-paper-dim">
                {enc.opponent.blurb}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
