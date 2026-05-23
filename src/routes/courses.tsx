import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { CourseCard } from "@/components/site/CourseCard";
import { courses } from "@/lib/courses";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Compass Academy" },
      {
        name: "description",
        content:
          "Browse language courses at Compass Academy — English now enrolling, French and Spanish coming soon.",
      },
      { property: "og:title", content: "Courses — Compass Academy" },
      { property: "og:description", content: "Browse language courses at Compass Academy." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const location = useRouterState({ select: (s) => s.location });
  const isDetail = location.pathname.split("/").length > 2;

  if (isDetail) {
    return <Outlet />;
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-12 sm:pt-24 pb-12 sm:pb-16">
        <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-brand">
          04 — Catalogue
        </p>
        <h1 className="mt-4 sm:mt-6 font-display text-3xl sm:text-5xl md:text-7xl leading-[1.05] text-ink max-w-3xl">
          Courses — <span className="font-fancy text-brand">choose your path.</span>
        </h1>
        <p className="mt-6 sm:mt-8 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          Structured programs from beginner to advanced. Every level includes recordings, practice
          sheets, and an end-of-level certificate.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-12 sm:pb-16 grid sm:grid-cols-2 gap-6 sm:gap-8">
        {courses.map((c) => (
          <div key={c.slug} className={c.available ? "" : "opacity-60"}>
            <CourseCard course={c} />
            {!c.available && (
              <p className="mt-3 text-xs font-mono-display uppercase tracking-wider text-muted-foreground text-center">
                Coming soon
              </p>
            )}
          </div>
        ))}
      </section>
    </Layout>
  );
}
