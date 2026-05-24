import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import popupImg from "@/assets/popup.webp";

export function RegisterDialog({
  trigger,
  defaultCourse,
}: {
  trigger: ReactNode;
  defaultCourse?: string;
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
    }, 1400);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-border rounded-md gap-0 mx-2 sm:mx-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
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
            {submitted ? (
              <div className="py-16 text-center animate-fade-in">
                <div className="mx-auto w-12 h-12 rounded-full bg-brand-soft border border-brand/30 flex items-center justify-center text-brand">
                  ✓
                </div>
                <h3 className="mt-5 text-xl text-ink">Request received</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We&apos;ll contact you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl text-ink">Register Now</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill in your details to get enrolled.
                </p>

                <form onSubmit={onSubmit} className="mt-7 space-y-4">
                  <Field label="Full Name">
                    <input
                      required
                      type="text"
                      placeholder="Your full name"
                      className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand focus:bg-background transition-colors"
                    />
                  </Field>
                  <Field label="Phone Number">
                    <input
                      required
                      type="tel"
                      placeholder="+213 5XX XX XX XX"
                      className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand focus:bg-background transition-colors"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      placeholder="email@example.com"
                      className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand focus:bg-background transition-colors"
                    />
                  </Field>
                  <Field label="Language">
                    <select
                      defaultValue={defaultCourse ?? "english"}
                      className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand focus:bg-background transition-colors"
                    >
                      <option value="english">English — A1 to C2</option>
                      <option value="french" disabled>
                        French (coming soon)
                      </option>
                      <option value="spanish" disabled>
                        Spanish (coming soon)
                      </option>
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
