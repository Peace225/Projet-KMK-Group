"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GalleryPreview() {
  const locale = useLocale();
  const t = useTranslations("gallery");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const previewImages = [
    { src: "/images/agriculture/image27.jpg", alt: locale === "fr" ? "Production Agricole" : "Agricultural Production", span: "md:col-span-2 md:row-span-2 col-span-3 h-[300px] md:h-auto" },
    { src: "/images/elevage/image10.jpg",     alt: locale === "fr" ? "Élevage Bovin" : "Cattle Livestock", span: "col-span-1" },
    { src: "/images/btp.jpg",                 alt: locale === "fr" ? "Infrastructures BTP" : "Construction & BTP", span: "col-span-1" },
    { src: "/images/agriculture/image23.jpg", alt: locale === "fr" ? "Récoltes Durables" : "Sustainable Harvest", span: "col-span-1" },
    { src: "/images/elevage/image4.jpg",      alt: locale === "fr" ? "Écosystème KMK" : "KMK Ecosystem", span: "col-span-1" },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-[#FAF9F5] overflow-hidden">
      {/* Structure linéaire en filigrane */}
      <div className="absolute inset-0 flex justify-between max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pointer-events-none opacity-5">
        <div className="w-[1px] h-full bg-primary-950" />
        <div className="w-[1px] h-full bg-primary-950 hidden md:block" />
        <div className="w-[1px] h-full bg-primary-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* En-tête Éditorial à flux tendu */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6"
        >
          <div className="text-left">
            <span className="text-[10px] tracking-[0.4em] font-sans font-bold text-primary-700 uppercase block mb-3">
              {locale === "fr" ? "Chroniques Visuelles" : "Visual Chronicles"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-light text-[#1A241F] tracking-[0.08em] uppercase leading-none">
              {t("our_gallery")}
            </h2>
          </div>

          <Link href={`/${locale}/gallery`}>
            <Button 
              variant="outline" 
              className="text-xs uppercase tracking-[0.2em] font-medium font-sans px-6 py-5 h-auto bg-transparent border-primary-900/20 text-[#1A241F] hover:bg-[#1A241F] hover:text-white hover:border-[#1A241F] transition-all duration-400 rounded-none group gap-2"
            >
              <span>{t("see_all")}</span>
              <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Button>
          </Link>
        </motion.div>

        {/* Grille d'Exposition Fine (Changement pour 4 colonnes régulées) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[240px] md:h-[500px]">
          {previewImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className={`relative overflow-hidden bg-[#1A241F] rounded-none group border border-primary-900/5 will-change-transform ${img.span}`}
            >
              {/* Image Fine-Art */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-w-7xl) 33vw, 50vw"
                className="object-cover filter contrast-[102%] transition-transform duration-[1800ms] ease-out group-hover:scale-105"
              />
              
              {/* Voile d'ombrage linéaire au survol */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A241F]/80 via-[#1A241F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Cartel de Légende Flottant (Style Galerie d'Art) */}
              <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 flex justify-between items-center z-10">
                <div className="px-4 py-2 bg-[#1A241F]/40 backdrop-blur-md border border-white/10 text-left">
                  <p className="text-[10px] font-sans font-light tracking-[0.15em] text-white uppercase">
                    {img.alt}
                  </p>
                </div>
                <div className="w-8 h-8 bg-white text-[#1A241F] flex items-center justify-center transform scale-70 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-75">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}