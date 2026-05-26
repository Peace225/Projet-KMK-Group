import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investissement",
  description: "Investissez avec KMK GROUP SARL. Opportunites de partenariat dans l agriculture et le developpement en Afrique de l Ouest.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}