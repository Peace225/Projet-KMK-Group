import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import ActivitiesPreview from "@/components/sections/ActivitiesPreview";
import FlagshipProject from "@/components/sections/FlagshipProject";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import GalleryPreview from "@/components/sections/GalleryPreview";
import CTASection from "@/components/sections/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil - KMK GROUP SARL",
  description: "KMK GROUP SARL - Groupe multi-activités engagé pour le développement durable en Afrique centrale.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ActivitiesPreview />
      <FlagshipProject />
      <WhyChooseUs />
      <GalleryPreview />
      <CTASection />
    </>
  );
}
