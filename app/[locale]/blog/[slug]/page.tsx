import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const t = await getTranslations("blog");

  let post = null;
  try {
    post = await prisma.post.findUnique({
      where: { slug, published: true },
      include: { category: true },
    });
  } catch {
    // DB not connected, show placeholder
  }

  if (!post) notFound();

  const title = locale === "en" && post.titleEn ? post.titleEn : post.title;
  const content = locale === "en" && post.contentEn ? post.contentEn : post.content;

  return (
    <div className="pt-20">
      {post.coverImage && (
        <div className="relative h-[50vh] w-full">
          <Image src={post.coverImage} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
            {post.category && <Badge variant="white" className="mb-3">{post.category.name}</Badge>}
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">{title}</h1>
            <div className="flex items-center gap-2 text-white/70 text-sm mt-3">
              <Calendar size={14} />
              <span>{t("published")} {formatDate(post.createdAt, locale === "fr" ? "fr-FR" : "en-US")}</span>
            </div>
          </div>
        </div>
      )}

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href={`/${locale}/blog`}>
          <Button variant="ghost" size="sm" className="mb-8 gap-2">
            <ArrowLeft size={16} /> Retour au blog
          </Button>
        </Link>
        <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
          {content.split("\n").filter(Boolean).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
