"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Post = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  category?: { name: string } | null;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch("/api/blog");
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const togglePublish = async (post: Post) => {
    const res = await fetch("/api/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    });
    if (res.ok) {
      toast.success(post.published ? "Article dépublié" : "Article publié");
      fetchPosts();
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Article supprimé");
      fetchPosts();
    }
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

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
            <h1 className="text-2xl font-display font-bold text-dark">Gestion du Blog</h1>
          </div>
          <Link href="/admin/blog/new">
            <Button className="gap-2"><Plus size={16} /> Nouvel article</Button>
          </Link>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Rechercher un article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
            Aucun article trouvé.
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Titre</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 hidden md:table-cell">Catégorie</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 hidden md:table-cell">Date</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Statut</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-dark max-w-xs truncate">{post.title}</td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                      {post.category?.name ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                      {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {post.published ? "Publié" : "Brouillon"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePublish(post)}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-primary-600 transition-colors"
                          title={post.published ? "Dépublier" : "Publier"}
                        >
                          {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors">
                            <Pencil size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
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
    </div>
  );
}
