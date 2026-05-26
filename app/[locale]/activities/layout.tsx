import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Activites",
  description: "Agriculture, elevage, reboisement, location de vehicules, audiovisuel — les activites diversifiees de KMK GROUP SARL.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}