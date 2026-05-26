"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { TrendingUp, MapPin, Users, Briefcase, Calendar } from "lucide-react";

const stats = [
  { icon: MapPin, value: 100, unit: "ha", key: "hectares" },
  { icon: TrendingUp, value: 205, unit: "M FCFA", key: "investment" },
  { icon: Users, value: 500, unit: "+", key: "jobs" },
  { icon: Briefcase, value: 50, unit: "+", key: "projects" },
  { icon: Calendar, value: 10, unit: "+", key: "years" },
];

// Composant de compteur animé premium
function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 40,
    damping: 15,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export default function StatsSection() {
  const t = useTranslations("home.stats");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-28 bg-[#FAF9F5] overflow-hidden">
      {/* Texture de fond */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary-100/30 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* En-tête de section - NOUVELLE TYPOGRAPHIE HAUTE COUTURE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-20"
        >
          <span className="text-[10px] tracking-[0.4em] font-sans font-bold text-primary-700 uppercase mb-4">
            {t.has("badge") ? t("badge") : "KMK en Chiffres"}
          </span>
          
          {/* CHANGEMENT DE POLICE ICI : font-sans, font-light (léger), tracking-wide (espacé) et uppercase (majuscules) */}
          <h2 className="text-2xl sm:text-4xl font-sans font-light text-[#1A241F] tracking-[0.08em] uppercase max-w-3xl leading-relaxed">
            {t("title")}
          </h2>
          
          <div className="w-12 h-[1px] bg-primary-600/40 mt-8" />
        </motion.div>

        {/* Grille de Chiffres Clés */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-primary-900/10 bg-white/50 backdrop-blur-sm divide-y lg:divide-y-0 lg:divide-x divide-primary-900/10 shadow-[0_20px_50px_rgba(26,36,31,0.03)]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className="relative p-8 sm:p-10 text-center lg:text-left flex flex-col justify-between items-center lg:items-start group transition-all duration-500 hover:bg-white"
            >
              {/* Icône unifiée */}
              <div className="mb-10 text-primary-700/80 group-hover:text-primary-600 group-hover:scale-110 transition-all duration-300">
                <stat.icon size={22} strokeWidth={1.2} />
              </div>

              {/* Chiffre et Unité (Conserve le Serif pour l'aspect statistique de prestige) */}
              <div className="mt-auto w-full">
                <div className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#1A241F] mb-3 flex items-baseline justify-center lg:justify-start">
                  <AnimatedNumber value={stat.value} inView={inView} />
                  <span className="text-base sm:text-lg font-serif italic text-primary-600 ml-1.5">
                    {stat.unit}
                  </span>
                </div>

                {/* Libellé */}
                <p className="text-[11px] font-sans tracking-[0.15em] font-medium text-[#1A241F]/50 uppercase group-hover:text-primary-800 transition-colors duration-300">
                  {t(stat.key as "hectares")}
                </p>
              </div>

              {/* Ligne d'animation au survol */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}