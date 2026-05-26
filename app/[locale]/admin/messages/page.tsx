"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar, CheckCheck, Trash2, ChevronLeft, ChevronRight, MessageSquare, MailOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Message = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

const PER_PAGE = 8;

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    const res = await fetch("/api/contact");
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const markAsRead = async (id: string) => {
    const res = await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      toast.success("Marque comme lu");
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
    } else {
      toast.error("Erreur");
    }
  };

  const deleteMessage = async (id: string) => {
    setDeletingId(id);
    const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
    setDeletingId(null);
    setConfirmId(null);
    if (res.ok) {
      toast.success("Message supprime");
      const updated = messages.filter((m) => m.id !== id);
      setMessages(updated);
      const maxPage = Math.max(1, Math.ceil(updated.length / PER_PAGE));
      if (page > maxPage) setPage(maxPage);
    } else {
      toast.error("Erreur lors de la suppression");
    }
  };

  const totalMessages = messages.length;
  const unreadCount = messages.filter((m) => !m.read).length;
  const totalPages = Math.max(1, Math.ceil(totalMessages / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = messages.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft size={16} /> Retour
            </Button>
          </Link>
          <h1 className="text-2xl font-display font-bold text-dark">Messages de contact</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <MessageSquare size={22} className="text-primary-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">{totalMessages}</div>
              <div className="text-sm text-gray-500">Messages total</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <MailOpen size={22} className="text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-dark">{unreadCount}</div>
              <div className="text-sm text-gray-500">Non lus</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Chargement...</div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-500">Aucun message.</div>
        ) : (
          <>
            <div className="space-y-3">
              {paginated.map((msg) => (
                <div key={msg.id} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${msg.read ? "border-gray-200" : "border-blue-500"}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="font-bold text-dark">{msg.name}</h3>
                        {msg.subject && <span className="text-sm text-gray-500">-- {msg.subject}</span>}
                        {!msg.read && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Nouveau</span>}
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2.5">
                        <span className="flex items-center gap-1"><Mail size={12} />{msg.email}</span>
                        {msg.phone && <span className="flex items-center gap-1"><Phone size={12} />{msg.phone}</span>}
                        <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(msg.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{msg.message}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!msg.read && (
                        <button onClick={() => markAsRead(msg.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-medium transition-colors">
                          <CheckCheck size={13} /> Lu
                        </button>
                      )}
                      {confirmId === msg.id ? (
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => deleteMessage(msg.id)} disabled={deletingId === msg.id} className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 disabled:opacity-50">
                            {deletingId === msg.id ? "..." : "Confirmer"}
                          </button>
                          <button onClick={() => setConfirmId(null)} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium hover:bg-gray-200">
                            Annuler
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmId(msg.id)} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors" title="Supprimer">
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8">
                <p className="text-sm text-gray-500">{(currentPage - 1) * PER_PAGE + 1}--{Math.min(currentPage * PER_PAGE, totalMessages)} sur {totalMessages}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-primary-600 hover:text-primary-600 disabled:opacity-30 disabled:pointer-events-none">
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium ${p === currentPage ? "bg-primary-600 text-white" : "border border-gray-300 text-gray-600 hover:border-primary-600 hover:text-primary-600"}`}>
                      {p}
                    </button>
                  ))}
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-primary-600 hover:text-primary-600 disabled:opacity-30 disabled:pointer-events-none">
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