import { useState, useRef, useEffect, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { isRTL } from "@/i18n";

const LANGS = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "ar", label: "AR", flag: "🇩🇿" },
];

export const LanguageSwitcher = memo(function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = i18n.language?.slice(0, 2) || "en";
  const currentLang = LANGS.find((l) => l.code === current) || LANGS[0];
  const others = LANGS.filter((l) => l.code !== current);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchLang = useCallback((code: string) => {
    i18n.changeLanguage(code);
    const dir = isRTL(code) ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = code;
    setOpen(false);
  }, [i18n]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="leading-none">{currentLang.flag}</span>
        <span className="tracking-wide">{currentLang.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 min-w-[52px] bg-background border border-border rounded-b-sm z-50 overflow-hidden">
          {others.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => switchLang(lang.code)}
              className="flex items-center gap-1.5 w-full text-left px-3 py-1.5 text-xs font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <span className="leading-none">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
