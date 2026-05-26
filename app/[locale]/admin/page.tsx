import { prisma } from "@/lib/prisma";
import { MessageSquare, Users, Image, FileText, UserCog } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./logout-button";

async function getStats() {
  try {
    const [messages, partners, posts, gallery, admins] = await Promise.all([
      prisma.contactMessage.count(),
      prisma.partnerRequest.count(),
      prisma.post.count(),
      prisma.galleryImage.count(),
      prisma.user.count(),
    ]);
    return { messages, partners, posts, gallery, admins };
  } catch {
    return { messages: 0, partners: 0, posts: 0, gallery: 0, admins: 0 };
  }
}

export default async function AdminPage() {
  const stats = await getStats();

  const cards = [
    { icon: MessageSquare, label: "Messages reçus", value: stats.messages, href: "/admin/messages", color: "bg-blue-500" },
    { icon: Users, label: "Demandes partenariat", value: stats.partners, href: "/admin/partners", color: "bg-green-500" },
    { icon: FileText, label: "Articles blog", value: stats.posts, href: "/admin/blog", color: "bg-purple-500" },
    { icon: Image, label: "Images galerie", value: stats.gallery, href: "/admin/gallery", color: "bg-orange-500" },
    { icon: UserCog, label: "Administrateurs", value: stats.admins, href: "/admin/users", color: "bg-rose-500" },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-dark">Dashboard Admin</h1>
              <p className="text-gray-600 mt-1">KMK GROUP SARL — Panneau d'administration</p>
            </div>
            <LogoutButton />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card, i) => (
            <Link key={i} href={card.href}>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                  <card.icon size={22} className="text-white" />
                </div>
                <div className="text-3xl font-bold text-dark mb-1">{card.value}</div>
                <div className="text-sm text-gray-600">{card.label}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-dark mb-4">Accès rapide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Voir les messages", href: "/admin/messages" },
              { label: "Demandes partenariat", href: "/admin/partners" },
              { label: "Gérer le blog", href: "/admin/blog" },
              { label: "Gérer la galerie", href: "/admin/gallery" },
              { label: "Administrateurs", href: "/admin/users" },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors text-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
