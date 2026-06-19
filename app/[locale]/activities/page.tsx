"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Sprout, Beef, Trees, Building2, Car, Megaphone, CheckCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BTP_IMGS = ["/images/btp.jpg", "/images/btp1.jpg", "/images/btp2.jpg", "/images/btp3.jpg"];
const ELEVAGE_IMGS = [
  "/images/elevage.jpg",
  "/images/boeufs.jpg", "/images/boeufs.jpg", "/images/boeufs.jpg",
  "/images/elevage-poulet.jpg", "/images/elevage-poulet1.jpg", "/images/elevage-poulet2.jpg",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ActivitiesPage() {
  const t = useTranslations("activities");
  const locale = useLocale();

  const elevageImg = "/images/boeufs.jpg";
  const btpImg = "/images/btp.jpg";

  const primaryActivities = [
    {
      id: "agriculture",
      icon: Sprout,
      image: "/images/agriculture.jpg",
      color: "from-green-500 to-green-700",
      title: t("agriculture_title"),
      desc: t("agriculture_desc"),
      impact: [t("agriculture_i1"), t("agriculture_i2"), t("agriculture_i3"), t("agriculture_i4")],
    },
    {
      id: "elevage",
      icon: Beef,
      image: elevageImg,
      color: "from-amber-500 to-amber-700",
      title: t("elevage_title"),
      desc: t("elevage_desc"),
      impact: [t("elevage_i1"), t("elevage_i2"), t("elevage_i3"), t("elevage_i4")],
    },
    {
      id: "reboisement",
      icon: Trees,
      image: "/images/reboisement.jpg",
      color: "from-emerald-500 to-emerald-700",
      title: t("reboisement_title"),
      desc: t("reboisement_desc"),
      impact: [t("reboisement_i1"), t("reboisement_i2"), t("reboisement_i3"), t("reboisement_i4")],
    },
  ];

  const secondaryActivities = [
    {
      id: "construction",
      icon: Building2,
      image: btpImg,
      color: "from-slate-500 to-slate-700",
      title: t("construction_title"),
      desc: t("construction_desc"),
      impact: [t("construction_i1"), t("construction_i2")],
    },
    {
      id: "location-voitures",
      icon: Car,
      image: "/images/location-voiture.jpg",
      color: "from-blue-500 to-blue-700",
      title: t("location_title"),
      desc: t("location_desc"),
      impact: [t("location_i1"), t("location_i2")],
    },
    {
      id: "audiovisuel",
      icon: Megaphone,
      image: "/images/panneau_pub.jpg",
      color: "from-orange-500 to-orange-700",
      title: t("audiovisuel_title"),
      desc: t("audiovisuel_desc"),
      impact: [t("audiovisuel_i1"), t("audiovisuel_i2")],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/agriculture.jpg')" }} />
        <div className="absolute inset-0 bg-dark/75" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="white" className="mb-4">{locale === "fr" ? "Nos Activités" : "Our Activities"}</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">{t("title")}</h1>
            <p className="text-xl text-gray-300">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Primary Activities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-14"
          >
            <div className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full">
              <Star size={16} className="fill-white" />
              <span className="font-semibold text-sm">{t("primary_label")}</span>
            </div>
            <div className="flex-1 h-px bg-gray-200" />
          </motion.div>

          <div className="space-y-24">
            {primaryActivities.map((activity, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={activity.id}
                  id={activity.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div className={!isEven ? "lg:order-2" : ""}>
                    <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl">
                      <Image src={activity.image} alt={activity.title} fill className="object-cover" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-20`} />
                      <div className="absolute top-4 left-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center shadow-lg`}>
                          <activity.icon size={24} className="text-white" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                          <Star size={11} className="fill-white" /> {t("primary_badge")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={!isEven ? "lg:order-1" : ""}>
                    <h2 className="text-3xl font-display font-bold text-dark mb-4">{activity.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{activity.desc}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {activity.impact.map((item, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-primary-600 shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Secondary Activities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-full">
              <span className="font-semibold text-sm">{t("secondary_label")}</span>
            </div>
            <div className="flex-1 h-px bg-gray-300" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {secondaryActivities.map((activity, i) => (
              <motion.div
                key={activity.id}
                id={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image src={activity.image} alt={activity.title} fill className="object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-30`} />
                  <div className="absolute top-4 left-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center shadow-lg`}>
                      <activity.icon size={20} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-dark mb-3">{activity.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{activity.desc}</p>
                  <div className="space-y-2">
                    {activity.impact.map((item, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-gray-400 shrink-0" />
                        <span className="text-xs text-gray-500">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
