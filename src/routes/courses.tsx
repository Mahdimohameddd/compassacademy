import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
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
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://compassacademy.vercel.app/courses" },
      { rel: "alternate", hrefLang: "en", href: "https://compassacademy.vercel.app/courses?lng=en" },
      { rel: "alternate", hrefLang: "fr", href: "https://compassacademy.vercel.app/courses?lng=fr" },
      { rel: "alternate", hrefLang: "ar", href: "https://compassacademy.vercel.app/courses?lng=ar" },
      { rel: "alternate", hrefLang: "x-default", href: "https://compassacademy.vercel.app/courses" },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const { t } = useTranslation();
  const location = useRouterState({ select: (s) => s.location });
  const isDetail = location.pathname.split("/").length > 2;

  if (isDetail) {
    return <Outlet />;
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-12 sm:pt-24 pb-12 sm:pb-16">
        <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-brand">
          {t("courses.label")}
        </p>
        <h1 className="mt-4 sm:mt-6 font-display text-3xl sm:text-5xl md:text-7xl leading-[1.05] text-ink max-w-3xl">
          {t("courses.heading")}
        </h1>
        <p className="mt-6 sm:mt-8 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          {t("courses.description")}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-12 sm:pb-16 grid sm:grid-cols-2 gap-6 sm:gap-8">
        {courses.map((c) => (
          <div key={c.slug} className={c.available ? "" : "opacity-60"}>
            <CourseCard course={c} />
            {!c.available && (
              <p className="mt-3 text-xs font-mono-display uppercase tracking-wider text-muted-foreground text-center">
                {t("courses.comingSoon")}
              </p>
            )}
          </div>
        ))}
      </section>
    </Layout>
  );
}
