import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Projets",
  description: "Projet agricole phare de 100 hectares : agriculture moderne, elevage et transformation en Cote d Ivoire.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}