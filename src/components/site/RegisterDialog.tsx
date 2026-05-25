import { useState, type ReactNode, type FormEvent } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import popupImg from "@/assets/popup.webp";
import logoImg from "@/assets/compass.svg";
import { supabase } from "@/lib/supabase";

export function RegisterDialog({
  trigger,
}: {
  trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    const { error: err } = await supabase.rpc("insert_registration", {
      p_full_name: data.get("full_name"),
      p_phone: data.get("phone"),
      p_email: data.get("email"),
      p_level: data.get("level"),
    });

    if (err) {
      console.error("Supabase insert error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
    }, 1400);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-4xl w-full p-0 overflow-hidden border-border rounded-md gap-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <div className="grid md:grid-cols-2">
          {/* Left — image */}
          <div className="hidden md:block">
            <img
              src={popupImg}
              alt=""
              className="w-full h-auto block"
            />
          </div>

          {/* Right — form */}
          <div className="p-8 md:p-10">
            {/* Logo on mobile */}
            <div className="md:hidden flex justify-center mb-4">
              <img src={logoImg} alt="Compass Academy" className="h-8 w-auto" />
            </div>
            {submitted ? (
              <div className="py-16 text-center animate-fade-in">
                <div className="mx-auto w-12 h-12 rounded-full bg-brand-soft border border-brand/30 flex items-center justify-center text-brand">
                  ✓
                </div>
                <DialogTitle className="mt-5 text-xl text-ink">Request received</DialogTitle>
                <DialogDescription className="mt-2 text-sm text-muted-foreground">
                  We&apos;ll contact you within 24 hours.
                </DialogDescription>
              </div>
            ) : (
              <>
                <DialogTitle className="text-xl text-ink">Register Now</DialogTitle>
                <DialogDescription className="mt-1 text-sm text-muted-foreground">
                  Fill in your details to get enrolled.
                </DialogDescription>

                <form onSubmit={onSubmit} className="mt-7 space-y-4">
                    {error && (
                      <p className="text-xs text-red-500">{error}</p>
                    )}
                    <Field label="Full Name">
                      <input
                        required
                        name="full_name"
                        type="text"
                        placeholder="Your full name"
                        className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand focus:bg-background transition-colors"
                      />
                    </Field>
                    <Field label="Phone Number">
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder="+213 5XX XX XX XX"
                        className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand focus:bg-background transition-colors"
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand focus:bg-background transition-colors"
                      />
                    </Field>
                    <Field label="Level you want to learn">
                      <select
                        name="level"
                        defaultValue="a1"
                        className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand focus:bg-background transition-colors"
                      >
                        <option value="a1">A1 — Beginner</option>
                        <option value="a2">A2 — Elementary</option>
                        <option value="b1">B1 — Intermediate</option>
                        <option value="b2">B2 — Upper Intermediate</option>
                        <option value="c1">C1 — Advanced</option>
                      </select>
                    </Field>

                  <button
                    type="submit"
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-brand text-primary-foreground hover:bg-foreground transition-colors px-5 py-3 rounded-sm text-sm font-medium tracking-wide uppercase"
                  >
                    Register Now
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground mb-1.5">{label}</label>
      {children}
    </div>
  );
}
