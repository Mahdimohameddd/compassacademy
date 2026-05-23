import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  const status = useRouterState({ select: (s) => s.status });
  const location = useRouterState({ select: (s) => s.location.pathname });
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (status === "pending") {
      setShowSkeleton(true);
    } else {
      const t = setTimeout(() => setShowSkeleton(false), 120);
      return () => clearTimeout(t);
    }
  }, [status]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 relative">
        {showSkeleton ? (
          <PageSkeleton />
        ) : (
          <div key={location} className="animate-fade-in">
            {children}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 animate-fade-in">
      <div className="space-y-6">
        <div className="h-3 w-32 skeleton rounded-sm" />
        <div className="h-14 w-3/4 skeleton rounded-sm" />
        <div className="h-14 w-2/3 skeleton rounded-sm" />
        <div className="h-4 w-1/2 skeleton rounded-sm mt-8" />
        <div className="h-4 w-2/5 skeleton rounded-sm" />
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="h-72 skeleton rounded-md" />
          <div className="h-72 skeleton rounded-md" />
        </div>
      </div>
    </div>
  );
}
