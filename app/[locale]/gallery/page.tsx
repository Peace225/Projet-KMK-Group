"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type GalleryImage = {
  id: string;
  url: string;
  title: string;
  category: string;
  order: number;
};

const categories = ["all", "agriculture", "elevage", "construction", "reboisement", "transport", "audiovisuel"];

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [dbImages, setDbImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data: GalleryImage[]) => {
        if (Array.isArray(data)) setDbImages(data);
      })
      .catch(() => {});
  }, []);

  const allImages = dbImages;

  const filtered = activeCategory === "all"
    ? allImages
    : allImages.filter((img) => img.category === activeCategory);

  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => i === null ? null : (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => i === null ? null : (i + 1) % filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next]);

  const currentImage = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="pt-20">
      <section className="relative py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/agriculture/image27.jpg')" }} />
        <div className="absolute inset-0 bg-dark/75" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="white" className="mb-4">Galerie</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">{t("title")}</h1>
            <p className="text-xl text-gray-300">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                }`}
              >
                {t(cat as "all")}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                  onClick={() => setLightboxIndex(i)}
                >
                  <Image src={img.url} alt={img.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium">{img.title}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {currentImage && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              onClick={closeLightbox}
            >
              <X size={22} />
            </button>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm select-none">
              {lightboxIndex + 1} / {filtered.length}
            </div>
            <button
              className="absolute left-3 sm:left-6 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft size={26} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl px-16 sm:px-20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImage.url}
                alt={currentImage.title}
                width={1200}
                height={800}
                className="object-contain rounded-xl max-h-[80vh] w-full"
              />
              <p className="text-white/80 text-center mt-3 font-medium">{currentImage.title}</p>
            </motion.div>
            <button
              className="absolute right-3 sm:right-6 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}