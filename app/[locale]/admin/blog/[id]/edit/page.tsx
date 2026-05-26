"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const fileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [form, setForm] = useState({
    title: "", titleEn: "", slug: "",
    excerpt: "", excerptEn: "",
    content: "", contentEn: "",
    coverImage: "", published: false,
  });

  const set = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/blog?id=${id}`);
      if (!res.ok) { toast.error("Article introuvable"); router.push("/admin/blog"); return; }
      const posts = await res.json();
      const post = Array.isArray(posts) ? posts.find((p: { id: string }) => p.id === id) : posts;
      if (!post) { toast.error("Article introuvable"); router.push("/admin/blog"); return; }
      setForm({
        title: post.title ?? "",
        titleEn: post.titleEn ?? "",
        slug: post.slug ?? "",
        excerpt: post.excerpt ?? "",
        excerptEn: post.excerptEn ?? "",
        content: post.content ?? "",
        contentEn: post.contentEn ?? "",
        coverImage: post.coverImage ?? "",
        published: post.published ?? false,
      });
      if (post.coverImage) setPreview(post.coverImage);
      setFetching(false);
    };
    fetchPost();
  }, [id, router]);

  const handleTitleChange = (val: string) =>
    setForm((f) => ({ ...f, title: val, slug: slugify(val) }));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    setUploading(false);
    if (res.ok) {
      const { url } = await res.json();
      set("coverImage", url);
      toast.success("Image uploadée");
    } else {
      toast.error("Erreur upload");
    }
  };

  const removeImage = () => {
    setPreview("");
    set("coverImage", "");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.content) {
      toast.error("Titre, slug et contenu sont requis");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...form }),
    });
    setLoading(false);
    if (res.ok) {
      toast.success("Article mis à jour");
      router.push("/admin/blog");
    } else {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  if (fetching) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/blog">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft size={16} /> Retour
            </Button>
          </Link>
          <h1 className="text-2xl font-display font-bold text-dark">Modifier l&apos;article</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
          {/* Titres */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Titre (FR) *</label>
              <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Titre (EN)</label>
              <Input value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} />
            </div>
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Slug *</label>
            <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
            <p className="text-xs text-gray-400">Généré automatiquement depuis le titre FR</p>
          </div>

          {/* Image upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Image de couverture</label>
            {preview ? (
              <div className="relative rounded-xl overflow-hidden h-48">
                <Image src={preview} alt="Aperçu" fill className="object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-xl h-36 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors"
              >
                <Upload size={24} className="text-gray-400" />
                <p className="text-sm text-gray-500">
                  {uploading ? "Upload en cours..." : "Cliquer pour choisir une image"}
                </p>
                <p className="text-xs text-gray-400">JPG, PNG, WEBP — max 5 Mo</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          {/* Extraits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Extrait (FR)</label>
              <Textarea rows={3} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Courte description de l'article..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Extrait (EN)</label>
              <Textarea rows={3} value={form.excerptEn} onChange={(e) => set("excerptEn", e.target.value)} placeholder="Short article description..." />
            </div>
          </div>

          {/* Contenu texte */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Contenu (FR) *</label>
              <Textarea rows={10} value={form.content} onChange={(e) => set("content", e.target.value)} required placeholder="Rédigez votre article ici..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Contenu (EN)</label>
              <Textarea rows={10} value={form.contentEn} onChange={(e) => set("contentEn", e.target.value)} placeholder="Write your article here..." />
            </div>
          </div>

          {/* Publier */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
              className="w-4 h-4 accent-primary-600"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">Publié</label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link href="/admin/blog">
              <Button type="button" variant="ghost">Annuler</Button>
            </Link>
            <Button type="submit" disabled={loading || uploading}>
              {loading ? "Sauvegarde..." : "Enregistrer les modifications"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
