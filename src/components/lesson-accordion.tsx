"use client";

import { useState } from "react";
import type { Lesson } from "@/data/modules";

export function LessonAccordion({
  lesson,
  index,
}: {
  lesson: Lesson;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border border-[var(--card-border)] rounded-xl bg-[var(--card-bg)] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-[var(--background)] transition-colors"
      >
        <span className="font-medium">
          <span className="text-[var(--primary)] mr-2">
            Lesson {index + 1}
          </span>
          {lesson.title}
        </span>
        <span
          className="text-[var(--muted)] transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          &#9662;
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6">
          <div className="prose prose-sm max-w-none">
            <p className="text-[var(--foreground)] leading-relaxed mb-4">
              {lesson.content}
            </p>
            <div className="mt-4 p-4 rounded-lg bg-[var(--primary)]/5 border border-[var(--primary)]/20">
              <h4 className="text-sm font-semibold text-[var(--primary)] mb-2">
                Practice Exercise
              </h4>
              <p className="text-sm text-[var(--foreground)]">
                {lesson.exercise}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
