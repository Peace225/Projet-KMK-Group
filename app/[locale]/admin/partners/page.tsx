"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar, Building2, TrendingUp, Banknote, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Partner = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  investType?: string | null;
  amount?: string | null;
  message: string;
  status: string;
  createdAt: string;
};

const PER_PAGE = 8;

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  pending: "En attente",
  reviewed: "Examine",
  accepted: "Accepte",
  rejected: "Refuse",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function formatAmount(amount: string) {
  const num = parseFloat(amount.replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return amount + " FCFA";
  return num.toLocaleString("fr-FR") + " FCFA";
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPartners = async () => {
    setLoading(true);
    const res = await fetch("/api/partner");
    const data = await res.json();
    setPartners(data);
    setLoading(false);
  };

  useEffect(() => { fetchPartners(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch("/api/partner", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      toast.success("Statut mis a jour");
      setPartners((prev) => prev.map((p) => p.id === id ? { ...p, status } : p));
    } else {
      toast.error("Erreur lors de la mise a jour");
    }
  };

  const deletePartner = async (id: string) => {
    setDeletingId(id);
    const res = await fetch(`/api/partner?id=${id}`, { method: "DELETE" });
    setDeletingId(null);
    setConfirmId(null);
    if (res.ok) {
      toast.success("Demande supprimee");
      const updated = partners.filter((p) => p.id !== id);
      setPartners(updated);
      const maxPage = Math.max(1, Math.ceil(updated.length / PER_PAGE));
      if (page > maxPage) setPage(maxPage);
    } else {
      toast.error("Erreur lors de la suppression");
    }
  };

  const totalPages = Math.max(1, Math.ceil(partners.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = partners.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft size={16} /> Retour
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold text-dark">Demandes de partenariat</h1>
            <p className="text-sm text-gray-500 mt-0.5">{partners.length} demande{partners.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Chargement...</div>
        ) : partners.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
            Aucune demande de partenariat pour le moment.
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {paginated.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-bold text-dark text-lg">{p.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[p.status] ?? "bg-gray-100 text-gray-600"}`}>
                          {statusLabels[p.status] ?? p.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1.5"><Mail size={14} />{p.email}</span>
                        {p.phone && <span className="flex items-center gap-1.5"><Phone size={14} />{p.phone}</span>}
                        {p.company && <span className="flex items-center gap-1.5"><Building2 size={14} />{p.company}</span>}
                        {p.investType && <span className="flex items-center gap-1.5"><TrendingUp size={14} />{p.investType}</span>}
                        {p.amount && <span className="flex items-center gap-1.5"><Banknote size={14} />{formatAmount(p.amount)}</span>}
                        <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(p.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-xl p-4">{p.message}</p>
                    </div>

                    <div className="flex flex-col gap-3 shrink-0 items-end">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1 font-medium">Changer le statut</label>
                        <select
                          value={p.status}
                          onChange={(e) => updateStatus(p.id, e.target.value)}
                          className="h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          <option value="pending">En attente</option>
                          <option value="reviewed">Examine</option>
                          <option value="accepted">Accepte</option>
                          <option value="rejected">Refuse</option>
                        </select>
                      </div>

                      {confirmId === p.id ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => deletePartner(p.id)}
                            disabled={deletingId === p.id}
                            className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 disabled:opacity-50"
                          >
                            {deletingId === p.id ? "..." : "Confirmer"}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium hover:bg-gray-200"
                          >
                            Annuler
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(p.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 text-xs transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={14} /> Supprimer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8">
                <p className="text-sm text-gray-500">
                  {(currentPage - 1) * PER_PAGE + 1}--{Math.min(currentPage * PER_PAGE, partners.length)} sur {partners.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-primary-600 hover:text-primary-600 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium ${n === currentPage ? "bg-primary-600 text-white" : "border border-gray-300 text-gray-600 hover:border-primary-600 hover:text-primary-600"}`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-primary-600 hover:text-primary-600 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}