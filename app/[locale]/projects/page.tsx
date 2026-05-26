"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, TrendingUp, Users, Sprout, Beef, Factory, Building2, ShoppingCart, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  const t = useTranslations("projects");

  const investmentData = [
    { ref: "A",  sector: "Forage",                              amount: "12 000 000" },
    { ref: "B",  sector: t("agri_sector"),                      amount: "25 000 000" },
    { ref: "C",  sector: t("transform_title"),                  amount: "12 000 000" },
    { ref: "D1", sector: "Pisciculture",                        amount: "25 000 000" },
    { ref: "D2", sector: "Poulailler",                          amount: "25 000 000" },
    { ref: "D3", sector: "Caprin / Bovin / Aulacodes / Etc",    amount: "25 000 000" },
    { ref: "E",  sector: "Apiculture",                          amount: "500 000" },
    { ref: "F",  sector: "Conteneurs Frigorifiques",            amount: "21 000 000" },
    { ref: "G",  sector: "Bureaux & Logements / Magasins",      amount: "30 000 000" },
    { ref: "H",  sector: "Espace Environnemental / Écologique", amount: "30 000 000" },
  ];

  const projectSections = [
    {
      icon: Sprout,
      title: t("agri_title"),
      desc: t("agri_desc"),
      image: "/images/agriculture.jpg",
      stats: [
        { label: t("stat_hectares"), value: "60" },
        { label: t("stat_cultures"), value: "8+" },
        { label: t("stat_recoltes"), value: "2" },
      ],
    },
    {
      icon: Beef,
      title: t("elevage_title"),
      desc: t("elevage_desc"),
      image: "/images/elevage.jpg",
      stats: [
        { label: t("stat_hectares"), value: "30" },
        { label: t("stat_bovins"), value: "200+" },
        { label: t("stat_avicoles"), value: "5000+" },
      ],
    },
    {
      icon: Factory,
      title: t("transform_title"),
      desc: t("transform_desc"),
      image: "/images/transformation.jpg",
      stats: [
        { label: t("stat_capacity"), value: "5T" },
        { label: t("stat_products"), value: "15+" },
        { label: t("stat_jobs"), value: "50+" },
      ],
    },
  ];

  const btpProjects = [
    {
      icon: Building2,
      title: t("hotel_title"),
      desc: t("hotel_desc"),
      badge: t("btp_badge"),
      image: "/images/hotel.jpg",
      specs: [
        { label: t("floors"), value: "R+2" },
        { label: "Chambres", value: "50" },
        { label: "Budget", value: "510–790M FCFA" },
      ],
    },
    {
      icon: Stethoscope,
      title: t("clinic_title"),
      desc: t("clinic_desc"),
      badge: t("btp_badge"),
      image: "/images/clinique.jpg",
      specs: [
        { label: t("floors"), value: "R+4" },
        { label: "Budget", value: "645M–1,25Mrd FCFA" },
        { label: t("status"), value: t("planned") },
      ],
    },
    {
      icon: ShoppingCart,
      title: t("supermarket_title"),
      desc: t("supermarket_desc"),
      badge: t("btp_badge"),
      image: "/images/supermarche.jpg",
      specs: [
        { label: t("surface_label"), value: "2000 m²" },
        { label: t("stat_jobs"), value: "80+" },
        { label: t("status"), value: t("planned") },
      ],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/agriculture-moderne.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-dark/75" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="white" className="mb-4">Projets</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">{t("title")}</h1>
            <p className="text-xl text-gray-300">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Flagship overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl font-display font-bold text-dark mb-3">{t("flagship_title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("flagship_desc")}</p>
            <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Key info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: MapPin, label: t("location_label"), value: "Côte d'Ivoire" },
              { icon: TrendingUp, label: t("investment_label"), value: "205M FCFA" },
              { icon: Users, label: t("jobs_label"), value: "500+" },
              { icon: Sprout, label: t("surface_label"), value: "100 ha" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-primary-50 rounded-2xl p-5 text-center"
              >
                <item.icon size={24} className="text-primary-600 mx-auto mb-2" />
                <div className="font-bold text-xl text-dark">{item.value}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-16">
            {projectSections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
              >
                <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                  <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                    <Image src={section.image} alt={section.title} fill className="object-cover" />
                  </div>
                </div>
                <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                      <section.icon size={20} className="text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-dark">{section.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{section.desc}</p>
                  <div className="flex gap-6">
                    {section.stats.map((stat, j) => (
                      <div key={j} className="text-center">
                        <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BTP Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl font-display font-bold text-dark mb-3">{t("btp_section_title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("btp_section_desc")}</p>
            <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {btpProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-dark/40" />
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg">
                      <project.icon size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {project.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-dark mb-3">{project.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{project.desc}</p>
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
                    {project.specs.map((spec, j) => (
                      <div key={j} className="text-center">
                        <div className="font-bold text-primary-600 text-sm">{spec.value}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{spec.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment table */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-dark mb-2">{t("investment_table")}</h2>
            <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
            <table className="w-full">
              <thead className="bg-primary-600 text-white">
                <tr>
                  <th className="text-center px-4 py-4 font-semibold w-16">N°</th>
                  <th className="text-left px-6 py-4 font-semibold">Désignations</th>
                  <th className="text-right px-6 py-4 font-semibold">Montant (F CFA)</th>
                </tr>
              </thead>
              <tbody>
                {investmentData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3.5 text-center font-semibold text-primary-700">{row.ref}</td>
                    <td className="px-6 py-3.5 text-gray-800">{row.sector}</td>
                    <td className="px-6 py-3.5 text-right font-mono font-semibold text-gray-800">{row.amount}</td>
                  </tr>
                ))}
                <tr className="bg-primary-600 text-white font-bold">
                  <td className="px-4 py-4 text-center" />
                  <td className="px-6 py-4 text-lg">TOTAL</td>
                  <td className="px-6 py-4 text-right font-mono text-lg">205 500 000</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
