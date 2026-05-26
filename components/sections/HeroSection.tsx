"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);

  // Effet parallaxe discret sur le scroll
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "15%"]);
  const contentY = useTransform(scrollY, [0, 500], ["0px", "100px"]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Variantes pour l'animation en cascade (Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#08120a]"
    >
      {/* Background avec zoom initial lent + Parallaxe au scroll */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.55 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/images/agriculture/image30.jpg')",
          y: backgroundY,
        }}
      />

      {/* Gradients de prestige (Ambiance feutrée Vert Forêt) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08120a] via-[#08120a]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08120a]/90 via-transparent to-[#08120a]/90" />
      
      {/* Halo lumineux "Glow" en arrière-plan */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-500/15 blur-[140px] rounded-full pointer-events-none" />

      {/* Particules organiques */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[3px] h-[3px] bg-primary-300 rounded-full"
            style={{ 
              left: `${10 + i * 12}%`, 
              top: `${15 + (i % 3) * 25}%`,
              filter: "blur(1px)"
            }}
            animate={{ 
              y: [0, -40, 0], 
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 5 + i * 0.8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.3 
            }}
          />
        ))}
      </div>

      {/* Contenu Principal */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center"
      >
        {/* Badge Style Haute Couture */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <Leaf size={13} className="text-primary-400 animate-pulse" />
            <span className="text-xs font-sans font-medium tracking-[0.25em] text-white/90 uppercase">
              {t("badge")}
            </span>
          </div>
        </motion.div>

        {/* Titre Principal - NOUVELLE POLICE SANS-SERIF ULTRA MODERNE & IMPOSANTE */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-black tracking-tight text-white uppercase mb-6 max-w-5xl leading-[1.05]"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60">
            {t("title")}
          </span>
        </motion.h1>

        {/* Sous-titre - Garde une touche élégante en Serif Italic pour créer un contraste de textures */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl text-primary-200/90 font-serif italic tracking-wide mb-8 max-w-2xl"
        >
          {t("subtitle")}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl font-sans font-light leading-relaxed tracking-wide mb-12"
        >
          {t("description")}
        </motion.p>

        {/* Boutons Call to Action */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto"
        >
          <Link href={`/${locale}/activities`} className="w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full sm:w-auto gap-2 text-xs font-sans uppercase tracking-[0.2em] font-semibold px-8 py-6 h-auto bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-none shadow-[0_8px_30px_rgb(0,0,0,0.3)] group"
            >
              {t("cta_primary")}
              <ArrowUpRight size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </Link>
          
          <Link href={`/${locale}/contact`} className="w-full sm:w-auto">
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto text-xs font-sans uppercase tracking-[0.2em] font-semibold px-8 py-6 h-auto border-white/20 bg-transparent text-white hover:bg-white/5 hover:border-white/40 transition-all duration-300 rounded-none"
            >
              {t("cta_secondary")}
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Indicateur de Scroll Minimaliste */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] font-sans tracking-[0.3em] text-white/30 uppercase font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-4 bg-white"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}