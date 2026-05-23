import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Compass Academy" },
      {
        name: "description",
        content: "Get in touch with Compass Academy to enroll or ask a question.",
      },
      { property: "og:title", content: "Contact — Compass Academy" },
      { property: "og:description", content: "Get in touch with Compass Academy." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-6 lg:px-10 py-16 sm:py-24 md:py-36">
        <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-brand">Contact</p>
        <h1 className="mt-4 sm:mt-6 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-ink">
          Let's <span className="font-fancy text-brand">talk</span>.
        </h1>
        <p className="mt-6 sm:mt-8 text-sm sm:text-lg text-muted-foreground leading-relaxed">
          Reach out to enroll, ask a question, or schedule a placement test.
        </p>

        <form className="mt-10 sm:mt-16 space-y-6 sm:space-y-8">
          <Field label="Full name" type="text" />
          <Field label="Email" type="email" />
          <Field label="Course of interest" type="text" defaultValue="English" />
          <div>
            <label className="block font-mono-display text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full bg-background border-b border-border focus:border-brand outline-none py-3 text-foreground text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-7 py-4 sm:py-3.5 bg-foreground text-background hover:bg-brand transition-colors text-sm font-medium rounded-sm"
          >
            Send message
          </button>
        </form>
      </section>
    </Layout>
  );
}

function Field({
  label,
  type,
  defaultValue,
}: {
  label: string;
  type: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block font-mono-display text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full bg-background border-b border-border focus:border-brand outline-none py-3 text-foreground text-sm sm:text-base"
      />
    </div>
  );
}
