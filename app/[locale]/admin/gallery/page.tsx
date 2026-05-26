"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, X, ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type GalleryImage = {
  id: string;
  url: string;
  title?: string | null;
  category: string;
  description?: string | null;
};

const CATEGORIES = ["agriculture", "elevage", "construction", "reboisement", "transport", "audiovisuel"];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", category: "agriculture", description: "" });
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    setLoading(true);
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setImages(data);
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

  const handleFile = async (file: File) => {
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    setUploading(false);
    if (res.ok) {
      const data = await res.json();
      setUploadedUrl(data.url);
    } else {
      toast.error("Erreur upload");
      setPreview(null);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedUrl) { toast.error("Veuillez uploader une image"); return; }
    setSaving(true);
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: uploadedUrl, ...form, order: images.length }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Image ajoutee");
      setForm({ title: "", category: "agriculture", description: "" });
      setPreview(null);
      setUploadedUrl(null);
      setShowForm(false);
      fetchImages();
    } else {
      toast.error("Erreur ajout");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette image ?")) return;
    const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Supprimee"); fetchImages(); }
  };

  const filtered = filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft size={16} /> Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-display font-bold text-dark">Galerie</h1>
              <p className="text-sm text-gray-500 mt-0.5">{images.length} image{images.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <Button className="gap-2" onClick={() => setShowForm((v) => !v)}>
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? "Annuler" : "Ajouter une image"}
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="bg-white rounded-2xl p-6 shadow-sm mb-8 space-y-4">
            <h2 className="font-semibold text-dark">Nouvelle image</h2>
            <div
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-primary-400 transition-colors"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
              {preview ? (
                <div className="relative w-full max-w-xs mx-auto aspect-video">
                  <Image src={preview} alt="apercu" fill className="object-cover rounded-lg" />
                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                      <span className="text-white text-sm">Upload en cours...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <ImageIcon size={36} />
                  <p className="text-sm">Cliquez ou glissez une image ici</p>
                  <p className="text-xs">JPG, PNG, WEBP</p>
                </div>
              )}
            </div>
            {preview && !uploading && (
              <button
                type="button"
                onClick={() => { setPreview(null); setUploadedUrl(null); }}
                className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1"
              >
                <Upload size={12} /> Changer
              </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Titre</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Titre de l'image"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Categorie</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Description (optionnel)</label>
                <Input
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Description de l'image"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => { setShowForm(false); setPreview(null); setUploadedUrl(null); }}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={saving || uploading || !uploadedUrl}>
                {saving ? "Ajout..." : "Ajouter"}
              </Button>
            </div>
          </form>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {["all", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat ? "bg-primary-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat === "all" ? "Toutes" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-500">Aucune image.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img) => (
              <div key={img.id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="relative aspect-square">
                  <Image
                    src={img.url}
                    alt={img.title ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-dark truncate">{img.title ?? "—"}</p>
                  <span className="text-xs text-gray-400 capitalize">{img.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
