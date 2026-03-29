"use client";

import Link from "next/link";
import { modules } from "@/data/modules";
import { useState, useEffect } from "react";

interface Progress {
  [moduleSlug: string]: number[]; // array of completed lesson indices
}

export default function DashboardPage() {
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    const saved = localStorage.getItem("aicoach-progress");
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  function toggleLesson(slug: string, lessonIdx: number) {
    setProgress((prev) => {
      const current = prev[slug] || [];
      const updated = current.includes(lessonIdx)
        ? current.filter((i) => i !== lessonIdx)
        : [...current, lessonIdx];
      const next = { ...prev, [slug]: updated };
      localStorage.setItem("aicoach-progress", JSON.stringify(next));
      return next;
    });
  }

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = Object.values(progress).reduce(
    (sum, arr) => sum + arr.length,
    0
  );
  const overallPct =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const categories = [
    { key: "managing-up" as const, label: "Managing Up" },
    { key: "managing-down" as const, label: "Managing Down" },
    { key: "career-growth" as const, label: "Career Growth" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
      <p className="text-[var(--muted)] mb-8">
        Track your progress across all training modules.
      </p>

      {/* Overall progress */}
      <div className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Overall Progress</h2>
          <span className="text-2xl font-bold text-[var(--primary)]">
            {overallPct}%
          </span>
        </div>
        <div className="w-full h-3 bg-[var(--card-border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <p className="text-sm text-[var(--muted)] mt-2">
          {completedLessons} of {totalLessons} lessons completed
        </p>
      </div>

      {/* By category */}
      {categories.map((cat) => {
        const catModules = modules.filter((m) => m.category === cat.key);
        const catTotal = catModules.reduce(
          (sum, m) => sum + m.lessons.length,
          0
        );
        const catDone = catModules.reduce(
          (sum, m) => sum + (progress[m.slug]?.length || 0),
          0
        );

        return (
          <section key={cat.key} className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">{cat.label}</h2>
              <span className="text-sm text-[var(--muted)]">
                {catDone}/{catTotal} lessons
              </span>
            </div>

            {catModules.map((mod) => {
              const modDone = progress[mod.slug]?.length || 0;
              const modPct = Math.round(
                (modDone / mod.lessons.length) * 100
              );

              return (
                <div
                  key={mod.slug}
                  className="mb-4 p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Link
                      href={`/modules/${mod.slug}`}
                      className="font-medium hover:text-[var(--primary)] transition-colors"
                    >
                      {mod.title}
                    </Link>
                    <span className="text-xs text-[var(--muted)]">
                      {modPct}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[var(--card-border)] rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                      style={{ width: `${modPct}%` }}
                    />
                  </div>
                  <div className="space-y-1">
                    {mod.lessons.map((lesson, i) => {
                      const done = (progress[mod.slug] || []).includes(i);
                      return (
                        <label
                          key={i}
                          className="flex items-center gap-2 text-sm cursor-pointer hover:text-[var(--primary)] transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={done}
                            onChange={() => toggleLesson(mod.slug, i)}
                            className="accent-[var(--primary)]"
                          />
                          <span className={done ? "line-through text-[var(--muted)]" : ""}>
                            {lesson.title}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
