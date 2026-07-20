import { useState } from "react";

interface FreeformInputProps {
  disabled?: boolean;
  aiLive?: boolean;
  onSubmit: (text: string) => void;
}

export function FreeformInput({ disabled, aiLive, onSubmit }: FreeformInputProps) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled || submitted) return;
    setSubmitted(true);
    onSubmit(trimmed);
  };

  const isDisabled = disabled || submitted;

  return (
    <div className="rounded-lg border border-line bg-ink-2 p-3">
      <label className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-paper-faint">
        Or say it in your own words
        {aiLive && (
          <span
            className="rounded-full border px-1.5 py-px text-[9px]"
            style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
            title="They respond to your actual words"
          >
            Live
          </span>
        )}
      </label>
      <textarea
        value={value}
        disabled={isDisabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
        }}
        rows={2}
        placeholder={
          aiLive
            ? "Type what you would actually say. They will answer you directly."
            : "Type what you would actually say."
        }
        className="w-full resize-none rounded-md border border-line bg-ink px-3 py-2 font-body text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none disabled:opacity-50"
      />
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled || !value.trim()}
          className="rounded-md border border-accent px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-paper transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ color: "var(--accent)" }}
        >
          Say it
        </button>
      </div>
    </div>
  );
}
