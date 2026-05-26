import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Galerie photos des realisations et activites de KMK GROUP SARL en Cote d Ivoire.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}