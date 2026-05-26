import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Propos",
  description: "Decouvrez l histoire, la vision et l equipe de KMK GROUP SARL, groupe multi-activites en Cote d Ivoire.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}