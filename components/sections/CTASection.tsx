"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  const t = useTranslations("home.cta");
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 bg-[#FAF9F5] overflow-hidden">
      {/* Ligne de construction visuelle pour la continuité de l'exposition */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-primary-950/5 pointer-events-none hidden lg:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group bg-[#060C07] border border-white/5 p-12 sm:p-20 text-white relative overflow-hidden rounded-none shadow-[0_30px_60px_rgba(6,12,7,0.15)]"
        >
          {/* Halos de lumière de prestige diffus (Glow) en arrière-plan */}
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-primary-400/5 blur-[100px] rounded-full pointer-events-none" />

          {/* Fines lignes décoratives intérieures s'activant discrètement au survol */}
          <div className="absolute inset-4 border border-white/0 pointer-events-none transition-all duration-700 group-hover:border-white/5" />

          <div className="relative z-10 flex flex-col items-center">
            
            {/* Micro-badge de fin */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 opacity-40 group-hover:opacity-70 transition-opacity duration-500"
            >
              <Leaf size={16} strokeWidth={1.2} className="text-primary-300" />
            </motion.div>

            {/* Titre en Capitales Épurées */}
            <h2 className="text-2xl sm:text-4xl font-sans font-light tracking-[0.08em] uppercase mb-6 max-w-2xl leading-snug">
              {t("title")}
            </h2>
            
            {/* Description fine */}
            <p className="text-white/50 font-sans font-light tracking-wide text-sm sm:text-base leading-relaxed mb-12 max-w-xl mx-auto group-hover:text-white/60 transition-colors duration-500">
              {t("description")}
            </p>

            {/* Bouton d'action Haute Couture à bords droits */}
            <Link href={`/${locale}/invest`}>
              <Button 
                size="lg"
                className="gap-3 text-xs uppercase tracking-[0.2em] font-medium font-sans px-8 py-6 h-auto bg-white text-[#060C07] hover:bg-primary-100 transition-all duration-400 rounded-none shadow-2xl group/btn"
              >
                <span>{t("button")}</span>
                <ArrowUpRight size={14} className="transform transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}