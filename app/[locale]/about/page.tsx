"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Eye, Target, Leaf, Star, Shield, Zap, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
// Importez votre image locale ici si vous utilisez un bundler ou pointez simplement vers le chemin "/images/..."
// import ceoImage from "@/public/images/ceo.jpg"; 

const values = [
  { icon: Shield, key: "integrity", color: "bg-blue-100 text-blue-600" },
  { icon: Star, key: "excellence", color: "bg-accent-100 text-accent-600" },
  { icon: Zap, key: "innovation", color: "bg-purple-100 text-purple-600" },
  { icon: Leaf, key: "sustainability", color: "bg-primary-100 text-primary-600" },
];

const team = [
  // 🔥 Modification : Utilisation d'un chemin local statique vers le dossier public
  { name: "Directeur Général", role: "CEO", image: "/images/ceo.jpeg" },
  { name: "Directrice Financière", role: "CFO", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80" },
  { name: "Directeur Agricole", role: "Head of Agriculture", image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=300&q=80" },
  { name: "Directeur Technique", role: "CTO", image: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?w=300&q=80" },
];

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/Notre-histoire.jpg')" }} />
        <div className="absolute inset-0 bg-dark/75" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="white" className="mb-4">A Propos</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">{t("title")}</h1>
            <p className="text-xl text-gray-300">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl font-display font-bold text-dark mb-6">{t("story_title")}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{t("description")}</p>
              <p className="text-gray-600 leading-relaxed">{t("story_p2")}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl">
                <Image src="/images/Notre-histoire.jpg" alt="KMK GROUP - Notre Histoire" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Eye, title: t("vision"), text: t("vision_text"), color: "border-primary-600" },
              { icon: Target, title: t("mission"), text: t("mission_text"), color: "border-accent-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`bg-white rounded-2xl p-8 shadow-sm border-l-4 ${item.color}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <item.icon size={28} className="text-primary-600" />
                  <h3 className="text-2xl font-display font-bold text-dark">{item.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mot du Directeur / CEO Message */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-gray-50 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
          >
            {/* Image du directeur en local */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-64 h-64 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                <Image 
                  src={team[0].image} 
                  alt={team[0].name} 
                  fill 
                  sizes="(max-width: 768px) 256px, 224px"
                  priority
                  className="object-cover" 
                />
              </div>
            </div>
            
            {/* Texte et message */}
            <div className="md:col-span-8 relative">
              <Quote className="absolute top-0 right-0 text-primary-100 w-24 h-24 -z-10" />
              <Badge className="mb-4 bg-primary-600 hover:bg-primary-700 text-white">Le mot du CEO</Badge>
              <h2 className="text-3xl font-display font-bold text-dark mb-4">Message du Directeur Général</h2>
              <p className="text-gray-600 leading-relaxed mb-6 italic">
                &quot;Chez KMK GROUP, notre ambition est de conjuguer innovation, excellence et durabilité afin de bâtir des solutions d&apos;avenir. Grâce à l&apos;implication de nos équipes, nous transformons les défis de notre secteur en de véritables opportunités de croissance responsable.&quot;
              </p>
              <div>
                <h4 className="font-bold text-dark text-lg">{team[0].name}</h4>
                <p className="text-sm text-primary-600 font-medium tracking-wide uppercase">{team[0].role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-dark mb-2">{t("values")}</h2>
            <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full" />
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex p-4 rounded-2xl ${v.color} mb-4`}>
                  <v.icon size={28} />
                </div>
                <h3 className="font-bold text-dark">{t(v.key as "integrity")}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}