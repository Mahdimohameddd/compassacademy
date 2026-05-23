import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="Compass Academy" className="h-9 w-auto" />
          <p className="mt-6 text-sm text-muted-foreground max-w-sm leading-relaxed">
            A modern language academy designed for learners who want to speak with confidence.
          </p>
        </div>
        <div>
          <h4 className="font-mono-display text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">
            Navigate
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-brand">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-brand">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-brand">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-brand">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono-display text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>thecompassacademy@gmail.com</li>
            <li>Algeria, Birtouta</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-1 text-xs text-muted-foreground text-center sm:text-left">
          <span>© {new Date().getFullYear()} Compass Academy</span>
          
        </div>
      </div>
    </footer>
  );
}
