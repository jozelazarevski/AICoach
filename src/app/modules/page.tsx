import Link from "next/link";
import { modules } from "@/data/modules";

const categories = [
  { key: "managing-up" as const, label: "Managing Up", icon: "\u2191" },
  { key: "managing-down" as const, label: "Managing Down", icon: "\u2193" },
  { key: "career-growth" as const, label: "Career Growth", icon: "\u2605" },
];

export default function ModulesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Training Modules</h1>
      <p className="text-[var(--muted)] mb-10">
        Structured lessons with real-world scenarios and exercises to build your
        leadership skills.
      </p>

      {categories.map((cat) => {
        const catModules = modules.filter((m) => m.category === cat.key);
        return (
          <section key={cat.key} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">{cat.icon}</span> {cat.label}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {catModules.map((mod) => (
                <Link
                  key={mod.slug}
                  href={`/modules/${mod.slug}`}
                  className="block p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--primary)] transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-1">{mod.title}</h3>
                  <p className="text-sm text-[var(--muted)] mb-3">
                    {mod.description}
                  </p>
                  <span className="text-xs text-[var(--primary)] font-medium">
                    {mod.lessons.length} lessons
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
