import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { CourseCard } from "@/components/site/CourseCard";
import { courses } from "@/lib/courses";
import ppImage from "@/assets/pp.webp";
import blackImage from "@/assets/Black.webp";
import dodoBg from "@/assets/dodo.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Compass Academy — Learn languages with confidence" },
      {
        name: "description",
        content:
          "A modern minimalist language academy. Structured courses from A1 to C2, certified instructors, and an immersive learning experience.",
      },
      { property: "og:title", content: "Compass Academy" },
      {
        property: "og:description",
        content: "Learn languages with confidence — A1 to C2.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = courses.find((c) => c.slug === "english")!;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        {/* Mobile background image */}
        <div
          className="lg:hidden absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${dodoBg})` }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-12 sm:py-24 md:py-36 grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left: Text */}
          <div className="lg:col-span-7">
            <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-brand">
              01 — Compass Academy
            </p>
            <h1 className="mt-6 sm:mt-8 font-display text-[1.75rem] sm:text-5xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-tight text-ink">
              Learn a language.
              <br />
              <span className="italic font-light text-brand">Live</span> it.
            </h1>
            <p className="mt-6 sm:mt-10 max-w-xl text-sm sm:text-lg text-muted-foreground leading-relaxed">
              <span className="font-fancy text-brand">Speak with confidence — from A1 to C2.</span>
              {" "}Structured programs, small cohorts, and instructors who care.
            </p>
            <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background hover:bg-brand transition-colors text-sm font-medium rounded-sm"
              >
                Explore courses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-brand transition-colors py-2"
              >
                About the academy <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {/* Mobile search */}
            <div className="mt-6 md:hidden relative">
              <input
                type="text"
                placeholder="Choose your next language..."
                className="w-full h-12 pl-4 pr-16 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand transition-colors"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-4 bg-brand hover:bg-brand/90 text-white text-sm font-medium rounded-lg transition-colors">
                Search
              </button>
            </div>
          </div>
          {/* Right: Image */}
          <div className="lg:col-span-5 overflow-hidden flex justify-center">
            <img
              src={ppImage}
              alt="Compass Academy"
              className="w-full max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Featured course */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-12 sm:py-24 md:py-32">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-muted-foreground">
              02 — Featured
            </p>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-display text-ink">
              Now enrolling — <span className="font-fancy text-brand">English</span>
            </h2>
          </div>
          <Link
            to="/courses"
            className="text-sm border-b border-foreground hover:text-brand hover:border-brand pb-0.5 self-start sm:self-auto py-1"
          >
            All courses
          </Link>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-start">
          <CourseCard course={featured} />
          <div className="lg:pl-12 lg:pt-10">
            <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-brand">
              The Compass Method
            </p>
            <h3 className="mt-4 sm:mt-6 font-display text-2xl sm:text-3xl md:text-4xl leading-tight text-ink">
              Real conversation. <span className="font-fancy text-brand">Real progress.</span>
            </h3>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Every level is designed around speaking, listening, grammar and vocabulary — with
              constant practice and feedback from certified instructors.
            </p>
            <Link
              to="/courses/$slug"
              params={{ slug: "english" }}
              className="mt-6 sm:mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground hover:text-brand hover:border-brand pb-0.5 py-1"
            >
              View English course <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-t border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 sm:py-24 md:py-32 grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-4 space-y-4 sm:space-y-6 overflow-hidden">
            <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-muted-foreground">
              03 — Philosophy
            </p>
            <img
              src={blackImage}
              alt="Compass Academy"
              className="w-full max-w-full h-auto rounded-2xl"
            />
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-xl sm:text-3xl md:text-4xl leading-[1.25] text-ink">
              We believe learning a language should feel like an
              <span className="text-brand italic font-light"> experience</span> — not a lecture.
              Small groups. Honest feedback. Real progress, level by level.
            </p>
            <ul className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
              {[
                "Practical English usage — not only theory",
                "Speaking and communication in every session",
                "Intensive level-based progression",
                "Active student participation",
                "Real-life language application",
                "Confidence-building environment",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                  <span className="mt-2 w-1 h-1 rounded-full bg-brand shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
