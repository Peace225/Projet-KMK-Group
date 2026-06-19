"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GalleryPreview() {
  const locale = useLocale();
  const t = useTranslations("gallery");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // État pour gérer l'image actuellement sélectionnée dans la visionneuse
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

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
    { src: "/images/galerry/imag.jpg", alt: locale === "fr" ? "Élevage Moderne" : "Modern Livestock", span: "col-span-1" },
    { src: "/images/galerry/image.jpg", alt: locale === "fr" ? "Champs verdoyants" : "Green Fields", span: "md:col-span-2 md:row-span-1" },
    { src: "/images/galerry/image3.jpg", alt: locale === "fr" ? "Réalisations BTP" : "Construction Projects", span: "col-span-1" },
    { src: "/images/galerry/image4.jpg", alt: locale === "fr" ? "Réalisations BTP" : "Construction Projects", span: "col-span-1" },
    { src: "/images/galerry/image5.jpg", alt: locale === "fr" ? "Réalisations BTP" : "Construction Projects", span: "col-span-1" },
    { src: "/images/galerry/image6.jpg", alt: locale === "fr" ? "Réalisations BTP" : "Construction Projects", span: "col-span-1" },
    { src: "/images/galerry/image7.jpg", alt: locale === "fr" ? "Réalisations BTP" : "Construction Projects", span: "col-span-1" },
    { src: "/images/galerry/image8.jpg", alt: locale === "fr" ? "Réalisations BTP" : "Construction Projects", span: "col-span-1" },
    { src: "/images/galerry/image9.jpg", alt: locale === "fr" ? "Réalisations BTP" : "Construction Projects", span: "col-span-1" },
    { src: "/images/galerry/Chèvres.jpg", alt: locale === "fr" ? "Elevage" : "Elevage", span: "col-span-1" },
    { src: "/images/galerry/Boeufs.jpg", alt: locale === "fr" ? "Elevage" : "Elevage", span: "col-span-1" },
    { src: "/images/galerry/image11.jpg", alt: locale === "fr" ? "Energie Solaire" : "Energie Solaire", span: "col-span-1" },
    { src: "/images/galerry/Oeufs 1.jpg", alt: locale === "fr" ? "Réalisations BTP" : "Construction Projects", span: "col-span-1" },
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
              <button
                onClick={() => setSelectedImage({ src: img.src, alt: img.alt })}
                className="block w-full h-full relative cursor-zoom-in text-left"
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
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visionneuse (Lightbox) avec Framer Motion */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 md:p-12"
          >
            {/* Conteneur supérieur forçant le bouton tout au bout à droite */}
            <div className="w-full max-w-5xl flex justify-end relative h-0">
              <button
                onClick={() => setSelectedImage(null)}
                className="z-50 p-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white transition-all duration-300 rounded-full shadow-lg"
                aria-label="Fermer"
              >
                <X size={28} />
              </button>
            </div>

            {/* Image affichée en grand */}
            <div className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain rounded-sm shadow-2xl"
                priority
              />
            </div>

            {/* Légende en bas de l'image */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 border border-white/10 backdrop-blur-md rounded-none">
              <p className="text-xs font-sans font-light tracking-[0.2em] text-white uppercase">
                {selectedImage.alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}