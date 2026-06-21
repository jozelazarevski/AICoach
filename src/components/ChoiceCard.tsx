import type { Choice } from "../game/types";

interface ChoiceCardProps {
  choice: Choice;
  disabled?: boolean;
  onSelect: (choice: Choice) => void;
}

export function ChoiceCard({ choice, disabled, onSelect }: ChoiceCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(choice)}
      className="group w-full rounded-lg border border-line bg-ink-2 p-4 text-left transition-all hover:border-accent hover:shadow-[0_0_0_1px_var(--accent)] focus:outline-none focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div
        className="mb-1 font-mono text-xs uppercase tracking-wide"
        style={{ color: "var(--accent)" }}
      >
        {choice.tag}
      </div>
      <p className="font-body text-sm leading-relaxed text-paper">
        {choice.line}
      </p>
    </button>
  );
}
