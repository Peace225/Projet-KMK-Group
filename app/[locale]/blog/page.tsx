import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog",
  description: "Actualités et articles de KMK GROUP SARL : agriculture, élevage, développement durable en Côte d'Ivoire.",
};

import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const PER_PAGE = 6;

async function getPosts() {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const t = await getTranslations("blog");
  const locale = await getLocale();
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10));

  const allPosts = await getPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const posts = allPosts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/agriculture-moderne.jpg')" }} />
        <div className="absolute inset-0 bg-dark/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="white" className="mb-4">Blog</Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-gray-300">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allPosts.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <Skeleton className="h-48 w-full rounded-none" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link key={post.id} href={`/${locale}/blog/${post.slug}`}>
                    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col">
                      {post.coverImage && (
                        <div className="relative h-48 overflow-hidden shrink-0">
                          <Image
                            src={post.coverImage}
                            alt={locale === "en" && post.titleEn ? post.titleEn : post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        {post.category && (
                          <Badge variant="default" className="mb-3 text-xs w-fit">
                            {post.category.name}
                          </Badge>
                        )}
                        <h2 className="font-bold text-dark text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                          {locale === "en" && post.titleEn ? post.titleEn : post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                            {locale === "en" && post.excerptEn ? post.excerptEn : post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{formatDate(post.createdAt, locale === "fr" ? "fr-FR" : "en-US")}</span>
                          </div>
                          <span className="text-primary-600 font-medium flex items-center gap-1">
                            {t("read_more")} <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Link
                    href={`?page=${currentPage - 1}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${
                      currentPage === 1
                        ? "border-gray-200 text-gray-300 pointer-events-none"
                        : "border-gray-300 text-gray-600 hover:border-primary-600 hover:text-primary-600"
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </Link>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`?page=${p}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                        p === currentPage
                          ? "bg-primary-600 text-white"
                          : "border border-gray-300 text-gray-600 hover:border-primary-600 hover:text-primary-600"
                      }`}
                    >
                      {p}
                    </Link>
                  ))}

                  <Link
                    href={`?page=${currentPage + 1}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${
                      currentPage === totalPages
                        ? "border-gray-200 text-gray-300 pointer-events-none"
                        : "border-gray-300 text-gray-600 hover:border-primary-600 hover:text-primary-600"
                    }`}
                  >
                    <ChevronRight size={18} />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
