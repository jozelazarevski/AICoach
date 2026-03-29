import Link from "next/link";

const features = [
  {
    title: "Managing Up",
    description:
      "Learn to communicate effectively with leadership, gain visibility, and influence decisions from below.",
    href: "/modules?focus=managing-up",
    icon: "\u2191",
  },
  {
    title: "Managing Down",
    description:
      "Master delegation, mentoring, feedback delivery, and building high-performing teams.",
    href: "/modules?focus=managing-down",
    icon: "\u2193",
  },
  {
    title: "Career Growth",
    description:
      "Develop strategies for promotion, skill building, personal branding, and navigating organizational dynamics.",
    href: "/modules?focus=career-growth",
    icon: "\u2605",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Your AI-Powered{" "}
          <span className="text-[var(--primary)]">Career Coach</span>
        </h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Structured training modules and personalized AI coaching to help you
          master managing up, managing down, and accelerating your career growth.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/modules"
            className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors"
          >
            Start Training
          </Link>
          <Link
            href="/coach"
            className="px-6 py-3 border border-[var(--primary)] text-[var(--primary)] rounded-lg font-medium hover:bg-[var(--primary)]/10 transition-colors"
          >
            Talk to AI Coach
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="block p-8 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--primary)] transition-colors"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-[var(--muted)]">{feature.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
