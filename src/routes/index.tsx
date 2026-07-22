import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { CourseCard } from "@/components/site/CourseCard";
import { SearchBar } from "@/components/site/SearchBar";
import { courses } from "@/lib/courses";
import dodoBg from "@/assets/dodo.webp";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Compass Academy",
  url: "https://compassacademy.vercel.app",
  logo: "https://compassacademy.vercel.app/logooc.svg",
  description: "A modern minimalist language academy. Structured courses from A1 to C2, certified instructors, and an immersive learning experience.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Algiers",
    addressCountry: "DZ",
  },
  sameAs: [],
};

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
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://compassacademy.vercel.app" },
      { rel: "alternate", hrefLang: "en", href: "https://compassacademy.vercel.app?lng=en" },
      { rel: "alternate", hrefLang: "fr", href: "https://compassacademy.vercel.app?lng=fr" },
      { rel: "alternate", hrefLang: "ar", href: "https://compassacademy.vercel.app?lng=ar" },
      { rel: "alternate", hrefLang: "x-default", href: "https://compassacademy.vercel.app" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();
  const featured = courses.filter((c) => c.available);

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        {/* Mobile background image */}
        <div
          className="lg:hidden absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${dodoBg})` }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-12 sm:py-24 md:py-36">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-brand">
              {t("home.hero.label")}
            </p>
            <h1 className="mt-6 sm:mt-8 font-display text-[1.75rem] sm:text-5xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-tight text-ink">
              {t("home.hero.heading")}
            </h1>
            <p className="mt-6 sm:mt-10 max-w-xl text-sm sm:text-lg text-muted-foreground leading-relaxed">
              <span className="font-fancy text-brand">{t("home.hero.tagline")}</span>
              {" "}{t("home.hero.description")}
            </p>
            <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background hover:bg-brand transition-colors text-sm font-medium rounded-sm"
              >
                {t("home.hero.exploreCourses")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-brand transition-colors py-2"
              >
                {t("home.hero.aboutAcademy")} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {/* Mobile search */}
            <div className="mt-6 md:hidden">
              <SearchBar variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured course */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-12 sm:py-24 md:py-32">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {t("home.featured.label")}
            </p>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-display text-ink">
              {t("home.featured.heading")}
            </h2>
          </div>
          <Link
            to="/courses"
            className="text-sm border-b border-foreground hover:text-brand hover:border-brand pb-0.5 self-start sm:self-auto py-1"
          >
            {t("home.featured.allCourses")}
          </Link>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-start">
          {featured.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-t border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 sm:py-24 md:py-32">
          <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {t("home.philosophy.label")}
          </p>
          <div className="mt-8 sm:mt-12">
            <p className="font-display text-xl sm:text-3xl md:text-4xl leading-[1.25] text-ink">
              {t("home.philosophy.text")}
            </p>
            <ul className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
              {(t("home.philosophy.items", { returnObjects: true }) as string[]).map((item) => (
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
