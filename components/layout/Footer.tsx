import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin, Instagram } from "lucide-react";

// X (formerly Twitter) logo — Lucide doesn't have it
const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const links = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "activities", href: "/activities" },
    { key: "projects", href: "/projects" },
    { key: "invest", href: "/invest" },
    { key: "blog", href: "/blog" },
  ];

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Link href={`/${locale}`}>
                <img
                  src="/logo.png"
                  alt="KMK GROUP SARL"
                  style={{
                    width: "130px",
                    height: "auto",
                    objectFit: "contain",
                    mixBlendMode: "screen",
                    cursor: "pointer",
                  }}
                />
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{t("description")}</p>
            <div className="flex gap-3">
              {[Facebook, XIcon, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">{t("links")}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href === "/" ? "" : link.href}`}
                    className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                  >
                    {tNav(link.key as "home")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Activités</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Agriculture", "Élevage", "Construction & BTP", "Reboisement", "Location de voitures", "Espaces Publicitaires"].map((a) => (
                <li key={a}>
                  <Link href={`/${locale}/activities`} className="hover:text-primary-400 transition-colors">
                    {a}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">{t("contact")}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-3">
                <MapPin size={16} className="text-primary-400 mt-0.5 shrink-0" />
                <span>Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-primary-400 mt-0.5 shrink-0" />
                <span>+225 05 55 58 22 74 / +225 01 73 91 26 26</span>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-primary-400 mt-0.5 shrink-0" />
                <span>info@kmkgroupsarl.com</span>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="text-primary-400 mt-0.5 shrink-0" />
                <span>Lun - Ven: 8h - 18h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} KMK GROUP SARL. {t("rights")}.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
