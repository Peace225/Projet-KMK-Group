"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Award, Lightbulb, Heart, Shield } from "lucide-react";

const reasons = [
  { icon: Award, key: "expertise" },
  { icon: Lightbulb, key: "innovation" },
  { icon: Heart, key: "impact" },
  { icon: Shield, key: "transparency" },
];

export default function WhyChooseUs() {
  const t = useTranslations("home.why");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Effet de parallaxe sur le grand visuel forestier de fond
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [800, 2000], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative py-32 bg-[#060C07] text-white overflow-hidden">
      
      {/* Texture d'image immersive avec parallaxe contrôlé */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 will-change-transform"
        style={{ 
          backgroundImage: "url('/images/reboisement.jpg')",
          y: backgroundY 
        }}
      />
      
      {/* Masques de sérénité (Dégradés profonds vert-noir) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060C07] via-[#060C07]/95 to-[#060C07]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060C07]/50 via-transparent to-[#060C07]/50" />

      {/* Lignes de construction d'exposition en arrière-plan */}
      <div className="absolute inset-0 flex justify-between max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pointer-events-none opacity-5">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden lg:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* En-tête Éditorial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-24"
        >
          <span className="text-[10px] tracking-[0.4em] font-sans font-bold text-primary-400 uppercase mb-4">
            {t.has("badge") ? t("badge") : "Nos Engagements"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-sans font-light tracking-[0.08em] uppercase max-w-3xl leading-relaxed">
            {t("title")}
          </h2>
          {t.has("subtitle") && (
            <p className="text-white/50 font-sans font-light tracking-wide text-sm sm:text-base mt-4 max-w-xl">
              {t("subtitle")}
            </p>
          )}
          <div className="w-12 h-[1px] bg-white/20 mt-8" />
        </motion.div>

        {/* Grille de Raisons Minimaliste en Verre Dépoli */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.key}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: "easeOut" }}
              className="relative bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-none p-8 flex flex-col items-start text-left group transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
            >
              {/* Conteneur d'icône unifié or blanc */}
              <div className="inline-flex p-3 bg-white/[0.03] border border-white/10 text-primary-300 mb-8 transition-transform duration-500 group-hover:scale-105 group-hover:text-white">
                <reason.icon size={20} strokeWidth={1.2} />
              </div>
              
              {/* Titre de l'atout */}
              <h3 className="font-sans font-normal text-sm uppercase tracking-[0.15em] text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                {t(reason.key as "expertise")}
              </h3>
              
              {/* Description Épurée */}
              <p className="text-[#A1A1A1] font-sans font-light text-xs tracking-wide leading-relaxed transition-colors duration-300 group-hover:text-white/80">
                {t(`${reason.key}_desc` as "expertise_desc")}
              </p>

              {/* Ligne d'accent lumineuse fine au survol sur le coin supérieur droit */}
              <div className="absolute top-0 right-0 w-[1px] h-0 bg-primary-400/40 transition-all duration-500 group-hover:h-full origin-top" />
              <div className="absolute top-0 right-0 w-0 h-[1px] bg-primary-400/40 transition-all duration-500 group-hover:w-full origin-right" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}