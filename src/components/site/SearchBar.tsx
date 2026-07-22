import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { courses } from "@/lib/courses";

type Variant = "header" | "hero";

export const SearchBar = memo(function SearchBar({ variant = "header" }: { variant?: Variant }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return courses.filter((c) =>
      c.title.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }, [query]);

  const show = focused && results.length > 0;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const select = useCallback((slug: string) => {
    setQuery("");
    setFocused(false);
    navigate({ to: "/courses/$slug", params: { slug } });
  }, [navigate]);

  const isHero = variant === "hero";

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={t("header.searchPlaceholder")}
          className={`w-full ${
            isHero
              ? "h-12 pl-4 pr-24 bg-muted border border-border rounded-xl text-sm"
              : "w-72 h-10 pl-10 pr-24 bg-muted border border-border rounded-lg text-sm"
          } text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand transition-colors`}
        />
        {!isHero && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
        )}
        <button
          type="button"
          onClick={() => {
            if (results.length > 0) select(results[0].slug);
          }}
          className={`absolute right-1 top-1/2 -translate-y-1/2 ${
            isHero ? "h-9 px-4 rounded-lg text-sm" : "h-8 px-3 rounded-md text-xs"
          } bg-brand hover:bg-brand/90 text-white font-medium transition-colors`}
        >
          {t("header.searchButton")}
        </button>
      </div>
      {show && (
        <div className={`absolute left-0 right-0 top-full ${isHero ? "mt-1" : "mt-0"} bg-background border border-border rounded-b-lg overflow-hidden z-50`}>
          {results.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => select(c.slug)}
              className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors border-b border-border last:border-b-0"
            >
              <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <span className="font-medium">{c.title}</span>
                <span className="text-muted-foreground ml-2 text-xs">{c.tagline}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
