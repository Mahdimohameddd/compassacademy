import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import polImage from "@/assets/pol.webp";

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
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-6 lg:px-10 py-16 sm:py-24 md:py-36">
        <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-brand">About</p>
        <h1 className="mt-4 sm:mt-6 font-display text-3xl sm:text-5xl md:text-7xl leading-[1.04] text-ink">
          A modern academy for <span className="font-fancy text-brand">modern learners</span>.
        </h1>
        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div className="space-y-6 text-sm sm:text-lg leading-relaxed text-muted-foreground">
            <p>
              Compass Academy was built on a simple idea: learning a language should feel like living
              it. We combine structured curriculums with real conversation and small cohorts so every
              student gets the attention they deserve.
            </p>
            <p>
              Our instructors are certified, our materials are crafted in-house, and every level ends
              with a real evaluation — so progress is something you can see and feel, not just a
              promise.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src={polImage}
              alt="Compass Academy"
              className="w-full max-w-full h-auto"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
