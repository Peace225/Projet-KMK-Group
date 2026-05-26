"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Sprout, Beef, Building2, Trees, Car, Megaphone, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const activityLabels: Record<string, { fr: string; en: string; descFr: string; descEn: string }> = {
  agriculture: {
    fr: "Agriculture",
    en: "Agriculture",
    descFr: "Culture intensive sur 100 hectares",
    descEn: "Intensive farming on 100 hectares",
  },
  elevage: {
    fr: "Élevage",
    en: "Livestock",
    descFr: "Bovins, caprins, aviculture, pisciculture & apiculture",
    descEn: "Cattle, goats, poultry, fish farming & beekeeping",
  },
  construction: {
    fr: "Construction & BTP",
    en: "Construction",
    descFr: "Projets résidentiels et commerciaux",
    descEn: "Residential and commercial projects",
  },
  reboisement: {
    fr: "Reboisement",
    en: "Reforestation",
    descFr: "50 000 arbres plantés",
    descEn: "50,000 trees planted",
  },
  "location-voitures": {
    fr: "Location de Voitures",
    en: "Car Rental",
    descFr: "Flotte de véhicules modernes",
    descEn: "Fleet of modern vehicles",
  },
  audiovisuel: {
    fr: "Espaces Publicitaires",
    en: "Advertising Spaces",
    descFr: "Location de panneaux publicitaires",
    descEn: "Billboard & advertising space rental",
  },
};

export default function ActivitiesPreview() {
  const t = useTranslations("home.activities");
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const activities = [
    { icon: Sprout, key: "agriculture", image: "/images/agriculture.jpg" },
    { icon: Beef, key: "elevage", image: "/images/elevage-boeuf.jpg" },
    { icon: Building2, key: "construction", image: "/images/btp.jpg" },
    { icon: Trees, key: "reboisement", image: "/images/reboisement.jpg" },
    { icon: Car, key: "location-voitures", image: "/images/location-voiture.jpg" },
    { icon: Megaphone, key: "audiovisuel", image: "/images/panneau_pub.jpg" },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-[#FAF9F5] overflow-hidden">
      {/* Subtile structure linéaire en arrière-plan */}
      <div className="absolute inset-0 flex justify-between max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pointer-events-none opacity-5">
        <div className="w-[1px] h-full bg-primary-950" />
        <div className="w-[1px] h-full bg-primary-950 hidden lg:block" />
        <div className="w-[1px] h-full bg-primary-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* En-tête de section Éditorial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-24"
        >
          <span className="text-[10px] tracking-[0.4em] font-sans font-bold text-primary-700 uppercase mb-4">
            {locale === "fr" ? "Secteurs d'impact" : "Sectors of Impact"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-sans font-light text-[#1A241F] tracking-[0.08em] uppercase max-w-3xl leading-relaxed">
            {t("title")}
          </h2>
          {t.has("subtitle") && (
            <p className="text-primary-900/60 font-sans font-light tracking-wide text-sm sm:text-base mt-4 max-w-xl">
              {t("subtitle")}
            </p>
          )}
          <div className="w-12 h-[1px] bg-primary-600/40 mt-8" />
        </motion.div>

        {/* Grille d'Exposition Asymétrique */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, i) => {
            const label = activityLabels[activity.key];
            return (
              <motion.div
                key={activity.key}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              >
                <Link href={`/${locale}/activities#${activity.key}`}>
                  <div className="group relative overflow-hidden bg-[#1A241F] h-[420px] cursor-pointer rounded-none border border-primary-900/5 shadow-[0_30px_60px_rgba(26,36,31,0.02)] will-change-transform transition-all duration-500 hover:shadow-[0_40px_80px_rgba(26,36,31,0.08)]">
                    
                    {/* Image Réaliste avec Parallaxe Discret / Zoom Épuré */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-70 filter grayscale-[20%] contrast-[105%] transition-transform duration-[2000ms] ease-out group-hover:scale-105 group-hover:opacity-55"
                      style={{ backgroundImage: `url('${activity.image}')` }}
                    />
                    
                    {/* Gradient Sombre Linéaire De Prestige */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A241F] via-[#1A241F]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:via-[#1A241F]/50" />
                    
                    {/* Lignes fines décoratives intérieures s'activant au survol */}
                    <div className="absolute inset-4 border border-white/0 pointer-events-none transition-all duration-700 group-hover:border-white/10" />

                    {/* Contenu textuel */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                      
                      {/* Conteneur Icône Épuré */}
                      <div className="mb-4 transform translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                          <activity.icon size={18} strokeWidth={1.2} className="text-white" />
                        </div>
                      </div>

                      {/* Titre en Lettres Capitales Fines */}
                      <h3 className="text-white font-sans font-normal text-lg uppercase tracking-[0.15em] mb-3 flex items-center justify-between w-full">
                        <span>{locale === "fr" ? label.fr : label.en}</span>
                        <ArrowUpRight size={16} className="text-white/40 transform -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                      </h3>

                      {/* Description Fine */}
                      <p className="text-white/60 font-sans font-light text-xs tracking-wide leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-white/80">
                        {locale === "fr" ? label.descFr : label.descEn}
                      </p>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bouton d'action minimaliste à bords droits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <Link href={`/${locale}/activities`}>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-3 text-xs uppercase tracking-[0.2em] font-medium font-sans px-8 py-6 h-auto bg-transparent border-primary-900/20 text-[#1A241F] hover:bg-[#1A241F] hover:text-white hover:border-[#1A241F] transition-all duration-500 rounded-none group"
            >
              <span>
                {locale === "fr" ? "Découvrir nos écosystèmes" : "Explore our ecosystems"}
              </span> 
              <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}