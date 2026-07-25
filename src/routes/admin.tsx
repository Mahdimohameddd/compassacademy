import { useState, useEffect, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import type { AuthSession } from "@supabase/supabase-js";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminPage,
});

type Registration = {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  level: string;
  course: string;
  status: string;
  created_at: string;
};

function AdminPage() {
  const { t } = useTranslation();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ full_name: "", phone: "", email: "", level: "", course: "" });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setLoading(false);
    });
  }, []);

  const fetchRegistrations = useCallback(async () => {
    const { data } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setRegistrations(data);
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
    fetchRegistrations();
  }, [session, fetchRegistrations]);

  async function updateStatus(id: number, status: string) {
    await supabase.from("registrations").update({ status }).eq("id", id);
    setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  async function deleteRegistration(id: number) {
    if (!window.confirm(t("admin.confirmDelete"))) return;
    await supabase.from("registrations").delete().eq("id", id);
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
  }

  function startEdit(r: Registration) {
    setEditingId(r.id);
    setEditForm({ full_name: r.full_name, phone: r.phone, email: r.email, level: r.level, course: r.course });
  }

  async function saveEdit(id: number) {
    await supabase.from("registrations").update(editForm).eq("id", id);
    setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, ...editForm } : r)));
    setEditingId(null);
  }

  function downloadCSV() {
    const headers = ["Name", "Phone", "Email", "Course", "Level", "Status", "Date"];
    const rows = registrations.map((r) => [
      r.full_name,
      r.phone,
      r.email,
      r.course || "english",
      r.level.toUpperCase(),
      r.status || "pending",
      new Date(r.created_at).toLocaleDateString(),
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.map((c) => `"${c}"`).join(",")).join("\n")];
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-5xl px-6 py-32 text-center text-muted-foreground">{t("common.loading")}</div>
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout>
        <div className="mx-auto max-w-sm px-6 py-32">
          <h1 className="text-2xl font-semibold text-ink">{t("admin.title")}</h1>
          <form onSubmit={signIn} className="mt-8 space-y-4">
            <input
              type="email"
              placeholder={t("admin.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand"
            />
            <input
              type="password"
              placeholder={t("admin.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-secondary border border-border rounded-sm px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand"
            />
            <button
              type="submit"
              className="w-full bg-brand text-white py-3 rounded-sm text-sm font-medium hover:bg-foreground transition-colors"
            >
              {t("admin.signIn")}
            </button>
          </form>
          <p className="mt-6 text-xs text-muted-foreground text-center">
            <Link to="/" className="hover:text-brand">{t("admin.backToSite")}</Link>
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-ink">{t("admin.registrations")}</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={downloadCSV}
              className="text-sm bg-brand/10 text-brand px-3 py-1.5 rounded-sm hover:bg-brand/20 transition-colors"
            >
              {t("admin.downloadCsv")}
            </button>
            <button
              onClick={signOut}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("admin.signOut")}
            </button>
          </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{registrations.length} {t("admin.submissions")}</p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
                <th className="py-3 pr-4 font-medium">{t("admin.name")}</th>
                <th className="py-3 pr-4 font-medium">{t("admin.phone")}</th>
                <th className="py-3 pr-4 font-medium">{t("admin.emailLabel")}</th>
                <th className="py-3 pr-4 font-medium">{t("admin.course")}</th>
                <th className="py-3 pr-4 font-medium">{t("admin.level")}</th>
                <th className="py-3 pr-4 font-medium">{t("admin.status")}</th>
                <th className="py-3 pr-4 font-medium">{t("admin.date")}</th>
                <th className="py-3 font-medium">{t("admin.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  {editingId === r.id ? (
                    <>
                      <td className="py-2 pr-4">
                        <input value={editForm.full_name} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} className="w-full bg-secondary border border-border rounded-sm px-2 py-1 text-sm" />
                      </td>
                      <td className="py-2 pr-4">
                        <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="w-full bg-secondary border border-border rounded-sm px-2 py-1 text-sm" />
                      </td>
                      <td className="py-2 pr-4">
                        <input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full bg-secondary border border-border rounded-sm px-2 py-1 text-sm" />
                      </td>
                      <td className="py-2 pr-4">
                        <select value={editForm.course} onChange={(e) => setEditForm({ ...editForm, course: e.target.value })} className="bg-secondary border border-border rounded-sm px-2 py-1 text-sm">
                          <option value="english">English</option>
                          <option value="spanish">Spanish</option>
                        </select>
                      </td>
                      <td className="py-2 pr-4">
                        <select value={editForm.level} onChange={(e) => setEditForm({ ...editForm, level: e.target.value })} className="bg-secondary border border-border rounded-sm px-2 py-1 text-sm">
                          <option value="a1">A1</option>
                          <option value="a2">A2</option>
                          <option value="b1">B1</option>
                          <option value="b2">B2</option>
                          <option value="c1">C1</option>
                        </select>
                      </td>
                      <td className="py-2 pr-4" />
                      <td className="py-2 pr-4" />
                      <td className="py-2 flex gap-1">
                        <button onClick={() => saveEdit(r.id)} className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded-sm hover:bg-green-500/20">{t("admin.save")}</button>
                        <button onClick={() => setEditingId(null)} className="text-xs bg-muted px-2 py-1 rounded-sm hover:bg-muted/80">{t("admin.cancel")}</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 pr-4 text-foreground">{r.full_name}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{r.phone}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{r.email}</td>
                      <td className="py-3 pr-4">
                        <span className="px-2 py-0.5 text-xs font-medium bg-brand/10 text-brand rounded-full capitalize">
                          {r.course || "english"}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="px-2 py-0.5 text-xs font-medium bg-brand/10 text-brand rounded-full">
                          {r.level.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateStatus(r.id, "accepted")}
                            className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${(r.status || "pending") === "accepted" ? "bg-green-500 text-white" : "bg-green-500/10 text-green-600 hover:bg-green-500/20"}`}
                          >
                            {t("admin.accepted")}
                          </button>
                          <button
                            onClick={() => updateStatus(r.id, "rejected")}
                            className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${(r.status || "pending") === "rejected" ? "bg-red-500 text-white" : "bg-red-500/10 text-red-600 hover:bg-red-500/20"}`}
                          >
                            {t("admin.rejected")}
                          </button>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground text-xs">
                        {new Date(r.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 flex gap-1">
                        <button onClick={() => startEdit(r)} className="text-xs bg-brand/10 text-brand px-2 py-1 rounded-sm hover:bg-brand/20">{t("admin.edit")}</button>
                        <button onClick={() => deleteRegistration(r.id)} className="text-xs bg-red-500/10 text-red-600 px-2 py-1 rounded-sm hover:bg-red-500/20">{t("admin.delete")}</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {registrations.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground text-sm">
                    {t("admin.empty")}
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
