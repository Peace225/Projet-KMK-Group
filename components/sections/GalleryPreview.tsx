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
    { src: "/images/agriculture/image27.jpg", alt: locale === "fr" ? "Production Agricole" : "Agricultural Production", span: "md:col-span-2 md:row-span-2" },
    { src: "/images/elevage/image10.jpg", alt: locale === "fr" ? "Élevage Bovin" : "Cattle Livestock", span: "col-span-1" },
    { src: "/images/pub1.jpg", alt: locale === "fr" ? "Infrastructures BTP" : "Construction & BTP", span: "col-span-1" },
    { src: "/images/agriculture/image23.jpg", alt: locale === "fr" ? "Récoltes Durables" : "Sustainable Harvest", span: "col-span-1" },
    { src: "/images/oeuf.jpg", alt: "Écosystème KMK", span: "col-span-1" },
    { src: "/images/lapin.jpg", alt: "Écosystème KMK", span: "col-span-1" },
    { src: "/images/poto.jpg", alt: "Écosystème KMK", span: "col-span-1" },
    { src: "/images/pin.jpg", alt: "Écosystème KMK", span: "col-span-1" },
    { src: "/images/oberg.jpg", alt: "Écosystème KMK", span: "col-span-1" },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-[#FAF9F5] overflow-hidden">
      {/* Structure linéaire décorative */}
      <div className="absolute inset-0 flex justify-between max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pointer-events-none opacity-5">
        <div className="w-[1px] h-full bg-primary-950" />
        <div className="w-[1px] h-full bg-primary-950 hidden md:block" />
        <div className="w-[1px] h-full bg-primary-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* En-tête */}
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

        {/* Grille Bento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {previewImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
              className={`relative overflow-hidden bg-[#1A241F] group border border-primary-900/5 ${img.span || 'col-span-1'}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              />
              
              {/* Voile d'ombrage au survol */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A241F]/80 via-[#1A241F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Cartel de légende */}
              <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 flex justify-between items-center z-10">
                <div className="px-4 py-2 bg-[#1A241F]/40 backdrop-blur-md border border-white/10 text-left">
                  <p className="text-[10px] font-sans font-light tracking-[0.15em] text-white uppercase">
                    {img.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}