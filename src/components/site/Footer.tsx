import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import logo from "@/assets/compass.svg";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="Compass Academy" className="h-9 w-auto" />
          <p className="mt-6 text-sm text-muted-foreground max-w-sm leading-relaxed">
            {t("footer.description")}
          </p>
        </div>
        <div>
          <h4 className="font-mono-display text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">
            {t("footer.navigate")}
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-brand">{t("nav.home")}</Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-brand">{t("nav.courses")}</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-brand">{t("nav.about")}</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-brand">{t("nav.contact")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono-display text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">
            {t("footer.contactHeading")}
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>{t("footer.email")}</li>
            <li>{t("footer.address")}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-1 text-xs text-muted-foreground text-center sm:text-left">
          <span>© {new Date().getFullYear()} {t("footer.copyright")}</span>
        </div>
      </div>
    </footer>
  );
}
