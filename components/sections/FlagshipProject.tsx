"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  { fr: "100 hectares de terres fertiles", en: "100 hectares of fertile land" },
  { fr: "Investissement de 205M FCFA", en: "Investment of 205M FCFA" },
  { fr: "Agriculture + Élevage + Transformation", en: "Agriculture + Livestock + Processing" },
  { fr: "500+ emplois directs et indirects", en: "500+ direct and indirect jobs" },
];

export default function FlagshipProject() {
  const t = useTranslations("home.flagship");
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 bg-[#FAF9F5] overflow-hidden">
      {/* Ligne de construction visuelle discrète */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-primary-900/5 pointer-events-none hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* BLOC DESCRIPTION (7 colonnes sur 12 pour donner du souffle) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <span className="text-[10px] tracking-[0.4em] font-sans font-bold text-primary-700 uppercase mb-4">
              {t("title")}
            </span>
            
            <h2 className="text-2xl sm:text-4xl font-sans font-light text-[#1A241F] tracking-[0.06em] uppercase mb-8 leading-snug">
              {t("subtitle")}
            </h2>
            
            <p className="text-primary-900/60 font-sans font-light tracking-wide text-sm sm:text-base leading-relaxed mb-10 max-w-2xl">
              {t("description")}
            </p>

            {/* Liste Institutionnelle épurée */}
            <ul className="space-y-4 mb-12 w-full">
              {highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  className="flex items-baseline gap-4 group"
                >
                  {/* Tiret minimaliste haut de gamme */}
                  <span className="text-primary-400 font-sans font-light select-none transform transition-transform duration-300 group-hover:translate-x-1">—</span>
                  <span className="text-sm font-sans font-light tracking-wide text-[#1A241F]/80 group-hover:text-[#1A241F] transition-colors duration-300">
                    {locale === "fr" ? h.fr : h.en}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Actionneur à bords droits */}
            <Link href={`/${locale}/projects`}>
              <Button 
                size="lg" 
                className="gap-3 text-xs uppercase tracking-[0.2em] font-medium font-sans px-8 py-6 h-auto bg-[#1A241F] text-white hover:bg-[#23322a] transition-all duration-300 rounded-none group border border-[#1A241F]"
              >
                {t("cta")} 
                <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Button>
            </Link>
          </motion.div>

          {/* BLOC VISUEL (5 colonnes sur 12, effet œuvre d'art encadrée) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative w-full h-[540px] flex items-center justify-center"
          >
            {/* Conteneur principal sans arrondi style Beaux-Arts */}
            <div className="relative w-full h-full overflow-hidden shadow-[0_30px_60px_rgba(26,36,31,0.06)] border border-primary-900/5">
              <Image
                src="/images/agriculture-moderne.jpg"
                alt="Projet agricole KMK GROUP"
                fill
                priority
                className="object-cover filter contrast-[102%] scale-100 group-hover:scale-102 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A241F]/30 to-transparent pointer-events-none" />
            </div>

            {/* Cartel d'Exposition Unique (Fusion des deux anciens macarons) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="absolute -bottom-6 -left-6 bg-[#1A241F] border border-white/5 p-6 shadow-2xl max-w-[240px] text-left"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-2xl font-serif font-normal text-primary-300">205M</span>
                  <span className="text-[10px] font-sans font-light tracking-wider text-white/50 block uppercase mt-0.5">FCFA investis</span>
                </div>
                <div className="w-8 h-[1px] bg-white/10" />
                <div>
                  <span className="text-2xl font-serif font-normal text-white">100</span>
                  <span className="text-[10px] font-sans font-light tracking-wider text-white/50 block uppercase mt-0.5">Hectares de cultures</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}