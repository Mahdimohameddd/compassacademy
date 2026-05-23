import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Search } from "lucide-react";
import logo from "@/assets/logo.png";

export function Header() {
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ] as const;

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
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-muted-foreground hover:text-brand transition-colors"
              activeProps={{ className: "text-brand" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right: Search + Hamburger */}
        <div className="flex-1 flex items-center justify-end gap-3">
          {/* Desktop search */}
          <div className="hidden md:relative md:block">
            <input
              type="text"
              placeholder="look for your language"
              className="w-72 h-10 pl-4 pr-16 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand transition-colors"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3 bg-brand hover:bg-brand/90 text-white text-xs font-medium rounded-md transition-colors">
              Search
            </button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur animate-fade-in">
          <nav className="px-6 py-6 space-y-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="block text-sm text-muted-foreground hover:text-brand transition-colors"
                activeProps={{ className: "text-brand font-medium" }}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
