"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Sujet requis"),
  message: z.string().min(10, "Message trop court"),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: MapPin, label: "Adresse", value: "Abidjan, Côte d'Ivoire" },
  { icon: Phone, label: "Téléphone", value: "+225 05 55 58 22 74 / +225 01 73 91 26 26" },
  { icon: Mail, label: "Email", value: "info@kmkgroup.com" },
  { icon: Clock, label: "Horaires", value: "Lun–Ven: 8h–18h" },
];

export default function ContactPage() {
  const t = useTranslations("contact");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success(t("success"));
        reset();
      } else {
        toast.error(t("error" as "success"));
      }
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/apropos.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-dark/75" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="white" className="mb-4">Contact</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">{t("title")}</h1>
            <p className="text-xl text-gray-300">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
              {contactInfo.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{item.label}</p>
                    <p className="text-gray-800 font-medium mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}

              {/* Map Abidjan */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127523.63!2d-4.0083!3d5.3600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ea5311959121%3A0x3fe70ddce19221a6!2sAbidjan%2C%20C%C3%B4te%20d%27Ivoire!5e0!3m2!1sfr!2sfr!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="KMK GROUP Location - Abidjan"
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-display font-bold text-dark mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("name")} *</label>
                      <Input {...register("name")} placeholder="Jean Dupont" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("email")} *</label>
                      <Input {...register("email")} type="email" placeholder="jean@exemple.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("phone")}</label>
                    <Input {...register("phone")} placeholder="+225 07 XX XX XX XX" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("subject")} *</label>
                      <Input {...register("subject")} placeholder="Sujet de votre message" />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("message")} *</label>
                    <Textarea {...register("message")} placeholder="Votre message..." rows={6} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" disabled={loading} className="w-full gap-2" size="lg">
                    {loading ? "Envoi en cours..." : t("submit")}
                    <Send size={16} />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
