import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez KMK GROUP SARL a Abidjan, Cote d Ivoire. Formulaire de contact, adresse et informations pratiques.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}