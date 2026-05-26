import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "KMK GROUP SARL",
    template: "%s | KMK GROUP SARL",
  },
  description: "Groupe multi-activités — Agriculture, Élevage, Construction, Reboisement, Location, Espaces Publicitaires",
  openGraph: {
    type: "website",
    siteName: "KMK GROUP SARL",
    images: [{ url: "/og-image.jpg" }],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "fr" | "en")) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Toaster richColors position="top-right" />
    </NextIntlClientProvider>
  );
}
