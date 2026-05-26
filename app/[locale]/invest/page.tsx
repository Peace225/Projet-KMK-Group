"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { TrendingUp, Shield, Users, Globe, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  investType: z.string().min(1),
  amount: z.string().optional(),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

export default function InvestPage() {
  const t = useTranslations("invest");
  const [loading, setLoading] = useState(false);

  const reasons = [
    { icon: TrendingUp, title: t("reason1_title"), desc: t("reason1_desc") },
    { icon: Shield, title: t("reason2_title"), desc: t("reason2_desc") },
    { icon: Users, title: t("reason3_title"), desc: t("reason3_desc") },
    { icon: Globe, title: t("reason4_title"), desc: t("reason4_desc") },
  ];

  const opportunities = [
    { title: t("opp1_title"), min: "5M FCFA", return: "18-22%", duration: "3-5 ans" },
    { title: t("opp2_title"), min: "3M FCFA", return: "15-20%", duration: "2-4 ans" },
    { title: t("opp3_title"), min: "10M FCFA", return: "20-25%", duration: "1-3 ans" },
    { title: t("opp4_title"), min: "8M FCFA", return: "22-28%", duration: "3-5 ans" },
  ];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success(t("success"));
        reset();
      } else {
        toast.error(t("error_send"));
      }
    } catch {
      toast.error(t("error_network"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/agriculture/image27.jpg')" }} />
        <div className="absolute inset-0 bg-dark/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="white" className="mb-4">Investissement</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">{t("title")}</h1>
            <p className="text-xl text-gray-300">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Why invest */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-dark mb-2">{t("why_title")}</h2>
            <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <r.icon size={22} className="text-primary-600" />
                </div>
                <h3 className="font-bold text-dark mb-2">{r.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-dark mb-2">{t("opportunities")}</h2>
            <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {opportunities.map((opp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all"
              >
                <h3 className="font-bold text-dark mb-4">{opp.title}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("min_invest")}</span>
                    <span className="font-semibold text-primary-600">{opp.min}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("estimated_return")}</span>
                    <span className="font-semibold text-accent-600">{opp.return}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("duration")}</span>
                    <span className="font-semibold text-gray-700">{opp.duration}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-primary-600">
                    <CheckCircle size={14} />
                    <span>{t("secured_contract")}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-dark mb-2">{t("form_title")}</h2>
            <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-gray-50 rounded-3xl p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("name")} *</label>
                    <Input {...register("name")} placeholder={t("your_name")} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{t("required")}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("email")} *</label>
                    <Input {...register("email")} type="email" placeholder="email@exemple.com" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{t("required")}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("phone")}</label>
                    <Input {...register("phone")} placeholder="+225 07 XX XX XX XX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("company")}</label>
                    <Input {...register("company")} placeholder={t("your_company")} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("invest_type")} *</label>
                    <select {...register("investType")} className="flex h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="">{t("select")}</option>
                      <option value="agriculture">{t("opp1_title")}</option>
                      <option value="elevage">{t("opp2_title")}</option>
                      <option value="construction">{t("opp3_title")}</option>
                      <option value="transformation">{t("opp4_title")}</option>
                      <option value="multiple">{t("opp_multiple")}</option>
                    </select>
                    {errors.investType && <p className="text-red-500 text-xs mt-1">{t("required")}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("amount")}</label>
                    <Input {...register("amount")} placeholder="Ex: 10 000 000 FCFA" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("message")} *</label>
                  <Textarea {...register("message")} placeholder={t("describe_project")} rows={5} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{t("required")}</p>}
                </div>
                <Button type="submit" disabled={loading} className="w-full gap-2" size="lg">
                  {loading ? t("sending") : t("submit")}
                  <Send size={16} />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
