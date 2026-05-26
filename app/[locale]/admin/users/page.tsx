"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, X, UserPlus, Shield, Calendar, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: "ADMIN" | "EDITOR";
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "ADMIN" });
  const [pwdModal, setPwdModal] = useState<{ id: string; email: string } | null>(null);
  const [newPwd, setNewPwd] = useState("");
  const [savingPwd, setSavingPwd] = useState(false);

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error("Email et mot de passe requis"); return; }
    if (form.password.length < 8) { toast.error("Mot de passe trop court (8 caracteres min)"); return; }
    setSaving(true);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      toast.success("Administrateur cree");
      setForm({ name: "", email: "", password: "", role: "ADMIN" });
      setShowForm(false);
      fetchUsers();
    } else {
      toast.error(data.error ?? "Erreur lors de la creation");
    }
  };

  const handleDelete = async (user: User) => {
    if (!confirm(`Supprimer ${user.email} ?`)) return;
    const res = await fetch(`/api/admin/users?id=${user.id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      toast.success("Administrateur supprime");
      fetchUsers();
    } else {
      toast.error(data.error ?? "Erreur");
    }
  };

  const handleChangePwd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwdModal) return;
    if (newPwd.length < 8) { toast.error("Mot de passe trop court (8 min)"); return; }
    setSavingPwd(true);
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pwdModal.id, password: newPwd }),
    });
    const data = await res.json();
    setSavingPwd(false);
    if (res.ok) {
      toast.success("Mot de passe mis a jour");
      setPwdModal(null);
      setNewPwd("");
    } else {
      toast.error(data.error ?? "Erreur");
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft size={16} /> Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-display font-bold text-dark">Administrateurs</h1>
              <p className="text-sm text-gray-500 mt-0.5">{users.length} compte{users.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <Button className="gap-2" onClick={() => setShowForm((v) => !v)}>
            {showForm ? <X size={16} /> : <UserPlus size={16} />}
            {showForm ? "Annuler" : "Ajouter un admin"}
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="bg-white rounded-2xl p-6 shadow-sm mb-8 space-y-4">
            <h2 className="font-semibold text-dark flex items-center gap-2">
              <Plus size={16} /> Nouvel administrateur
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Nom</label>
                <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Prenom Nom" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="admin@kmkgroup.com" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Mot de passe * (8 min)</label>
                <Input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="..." required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => set("role", e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="EDITOR">Editeur</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Annuler</Button>
              <Button type="submit" disabled={saving}>{saving ? "Creation..." : "Creer"}</Button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-500">Chargement...</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Utilisateur</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 hidden md:table-cell">Role</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 hidden md:table-cell">Cree le</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                          <span className="text-primary-700 font-semibold text-sm">
                            {(user.name ?? user.email)[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-dark">{user.name ?? "—"}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        <Shield size={11} />
                        {user.role === "ADMIN" ? "Admin" : "Editeur"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => { setPwdModal({ id: user.id, email: user.email }); setNewPwd(""); }}
                          className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Changer le mot de passe"
                        >
                          <KeyRound size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Password modal */}
      {pwdModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-dark flex items-center gap-2">
                <KeyRound size={16} /> Changer le mot de passe
              </h2>
              <button onClick={() => setPwdModal(null)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-500">
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">{pwdModal.email}</p>
            <form onSubmit={handleChangePwd} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Nouveau mot de passe (8 min)</label>
                <Input
                  type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="..."
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setPwdModal(null)}>Annuler</Button>
                <Button type="submit" disabled={savingPwd}>{savingPwd ? "Sauvegarde..." : "Enregistrer"}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}