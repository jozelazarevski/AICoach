import { notFound } from "next/navigation";
import Link from "next/link";
import { modules, getModuleBySlug } from "@/data/modules";
import { LessonAccordion } from "@/components/lesson-accordion";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  if (!mod) notFound();

  const categoryLabel =
    mod.category === "managing-up"
      ? "Managing Up"
      : mod.category === "managing-down"
        ? "Managing Down"
        : "Career Growth";

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/modules"
        className="text-sm text-[var(--primary)] hover:underline mb-4 inline-block"
      >
        &larr; All Modules
      </Link>
      <span className="inline-block ml-3 text-xs font-medium px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
        {categoryLabel}
      </span>
      <h1 className="text-3xl font-bold mt-3 mb-2">{mod.title}</h1>
      <p className="text-[var(--muted)] mb-8">{mod.description}</p>

      <div className="space-y-4">
        {mod.lessons.map((lesson, i) => (
          <LessonAccordion key={i} lesson={lesson} index={i} />
        ))}
      </div>

      <div className="mt-10 p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
        <h3 className="font-semibold mb-2">Need personalized guidance?</h3>
        <p className="text-sm text-[var(--muted)] mb-3">
          Discuss these concepts with your AI coach for tailored advice based on
          your specific situation.
        </p>
        <Link
          href={`/coach?topic=${encodeURIComponent(mod.title)}`}
          className="inline-block px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
        >
          Talk to AI Coach
        </Link>
      </div>
    </div>
  );
}
