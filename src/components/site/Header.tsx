import { useState, useMemo, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logooc.svg";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { courses } from "@/lib/courses";

export function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);

  const nav = useMemo(() => [
    { to: "/", label: t("nav.home") },
    { to: "/courses", label: t("nav.courses") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const, [t]);

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border animate-fade-in">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link to="/" className="inline-flex items-center gap-2 transition-opacity hover:opacity-80">
            <img src={logo} alt="Compass Academy" className="h-9 w-auto" />
          </Link>
        </div>

        {/* Center: Nav */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-10 text-sm">
          {nav.map((n) => {
            if (n.to === "/courses") {
              return (
                <div key={n.to} className="relative group">
                  <Link
                    to={n.to}
                    className="flex items-center gap-1 text-muted-foreground hover:text-brand transition-colors"
                    activeProps={{ className: "text-brand" }}
                  >
                    {n.label}
                    <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  <div className="absolute left-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="min-w-[180px] bg-background border border-border rounded-b-lg py-2">
                      {courses
                        .filter((c) => c.available)
                        .map((c) => (
                          <Link
                            key={c.slug}
                            to="/courses/$slug"
                            params={{ slug: c.slug }}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          >
                            {c.title}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={n.to}
                to={n.to}
                className="text-muted-foreground hover:text-brand transition-colors"
                activeProps={{ className: "text-brand" }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Language + Hamburger */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <LanguageSwitcher />

          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={t("header.toggleMenu")}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur animate-fade-in">
          <nav className="px-6 py-6 space-y-4">
            {nav.map((n) => {
              if (n.to === "/courses") {
                return (
                  <div key={n.to} className="space-y-3">
                    <Link
                      to={n.to}
                      className="block text-sm text-muted-foreground hover:text-brand transition-colors"
                      activeProps={{ className: "text-brand font-medium" }}
                      onClick={closeMenu}
                    >
                      {n.label}
                    </Link>
                    <div className="ml-4 space-y-2 border-l border-border pl-4">
                      {courses
                        .filter((c) => c.available)
                        .map((c) => (
                          <Link
                            key={c.slug}
                            to="/courses/$slug"
                            params={{ slug: c.slug }}
                            className="block text-sm text-muted-foreground/70 hover:text-brand transition-colors"
                            onClick={closeMenu}
                          >
                            {c.title}
                          </Link>
                        ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className="block text-sm text-muted-foreground hover:text-brand transition-colors"
                  activeProps={{ className: "text-brand font-medium" }}
                  onClick={closeMenu}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
