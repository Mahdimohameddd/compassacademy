import { useState, type ReactNode, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import popupImg from "@/assets/popup.webp";
import logoImg from "@/assets/compass.svg";
import { supabase } from "@/lib/supabase";

export function RegisterDialog({
  trigger,
}: {
  trigger: ReactNode;
}) {
  const { t } = useTranslation();
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
      setError(err.message || t("register.errorFallback"));
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
                <DialogTitle className="mt-5 text-xl text-ink">{t("register.successTitle")}</DialogTitle>
                <DialogDescription className="mt-2 text-sm text-muted-foreground">
                  {t("register.successDescription")}
                </DialogDescription>
              </div>
            ) : (
              <>
                <DialogTitle className="text-xl text-ink">{t("register.title")}</DialogTitle>
                <DialogDescription className="mt-1 text-sm text-muted-foreground">
                  {t("register.description")}
                </DialogDescription>

                <form onSubmit={onSubmit} className="mt-7 space-y-4">
                    {error && (
                      <p className="text-xs text-red-500">{error}</p>
                    )}
                    <Field label={t("register.fullName")}>
                      <input
                        required
                        name="full_name"
                        type="text"
                        placeholder={t("register.fullNamePlaceholder")}
                        className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand focus:bg-background transition-colors"
                      />
                    </Field>
                    <Field label={t("register.phone")}>
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder={t("register.phonePlaceholder")}
                        className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand focus:bg-background transition-colors"
                      />
                    </Field>
                    <Field label={t("register.email")}>
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder={t("register.emailPlaceholder")}
                        className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand focus:bg-background transition-colors"
                      />
                    </Field>
                    <Field label={t("register.level")}>
                      <select
                        name="level"
                        defaultValue="a1"
                        className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand focus:bg-background transition-colors"
                      >
                        <option value="a1">{t("register.a1")}</option>
                        <option value="a2">{t("register.a2")}</option>
                        <option value="b1">{t("register.b1")}</option>
                        <option value="b2">{t("register.b2")}</option>
                        <option value="c1">{t("register.c1")}</option>
                      </select>
                    </Field>

                  <button
                    type="submit"
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-brand text-primary-foreground hover:bg-foreground transition-colors px-5 py-3 rounded-sm text-sm font-medium tracking-wide uppercase"
                  >
                    {t("register.submit")}
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
