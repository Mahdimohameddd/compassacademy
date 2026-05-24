import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import type { AuthSession } from "@supabase/supabase-js";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type Registration = {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  level: string;
  created_at: string;
};

function AdminPage() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setLoading(false);
    });
  }, []);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      return;
    }
    window.location.reload();
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  useEffect(() => {
    if (!session) return;
    supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setRegistrations(data);
        setLoading(false);
      });
  }, [session]);

  if (loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-5xl px-6 py-32 text-center text-muted-foreground">Loading...</div>
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout>
        <div className="mx-auto max-w-sm px-6 py-32">
          <h1 className="text-2xl font-semibold text-ink">Admin Login</h1>
          <form onSubmit={signIn} className="mt-8 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand"
            />
            <button
              type="submit"
              className="w-full bg-brand text-white py-3 rounded-sm text-sm font-medium hover:bg-foreground transition-colors"
            >
              Sign in
            </button>
          </form>
          <p className="mt-6 text-xs text-muted-foreground text-center">
            <Link to="/" className="hover:text-brand">← Back to site</Link>
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-ink">Registrations</h1>
          <button
            onClick={signOut}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign out
          </button>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{registrations.length} submissions</p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
                <th className="py-3 pr-4 font-medium">Name</th>
                <th className="py-3 pr-4 font-medium">Phone</th>
                <th className="py-3 pr-4 font-medium">Email</th>
                <th className="py-3 pr-4 font-medium">Level</th>
                <th className="py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 pr-4 text-foreground">{r.full_name}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{r.phone}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{r.email}</td>
                  <td className="py-3 pr-4">
                    <span className="px-2 py-0.5 text-xs font-medium bg-brand/10 text-brand rounded-full">
                      {r.level.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground text-xs">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {registrations.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground text-sm">
                    No registrations yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
