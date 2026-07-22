import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Compass Academy" },
      {
        name: "description",
        content:
          "Compass Academy is a modern language academy built around real conversation and structured progress.",
      },
      { property: "og:title", content: "About — Compass Academy" },
      {
        property: "og:description",
        content: "A modern language academy built around real conversation.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://compassacademy.vercel.app/about" },
      { rel: "alternate", hrefLang: "en", href: "https://compassacademy.vercel.app/about?lng=en" },
      { rel: "alternate", hrefLang: "fr", href: "https://compassacademy.vercel.app/about?lng=fr" },
      { rel: "alternate", hrefLang: "ar", href: "https://compassacademy.vercel.app/about?lng=ar" },
      { rel: "alternate", hrefLang: "x-default", href: "https://compassacademy.vercel.app/about" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-6 lg:px-10 py-16 sm:py-24 md:py-36">
        <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-brand">{t("about.label")}</p>
        <h1 className="mt-4 sm:mt-6 font-display text-3xl sm:text-5xl md:text-7xl leading-[1.04] text-ink">
          {t("about.heading")}
        </h1>
        <div className="mt-10 sm:mt-16 text-sm sm:text-lg leading-relaxed text-muted-foreground">
          <p>{t("about.p1")}</p>
          <p className="mt-6">{t("about.p2")}</p>
        </div>
      </section>
    </Layout>
  );
}
