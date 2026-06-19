"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "activities", href: "/activities" },
  { key: "projects", href: "/projects" },
  { key: "invest", href: "/invest" },
  { key: "gallery", href: "/gallery" },
  { key: "blog", href: "/blog" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === "fr" ? "en" : "fr";
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const isActive = (href: string) => {
    const localePath = `/${locale}${href === "/" ? "" : href}`;
    return pathname === localePath || (href !== "/" && pathname.startsWith(localePath));
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // Ajout d'un fond vert forêt semi-transparent quand la navbar est transparente sur la home
        isTransparent 
          ? "bg-[#08120a]/80 backdrop-blur-md border-b border-white/5" 
          : "bg-white/95 backdrop-blur-md shadow-sm"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="KMK GROUP SARL"
              style={{
                width: "110px",
                height: "auto",
                objectFit: "contain",
                mixBlendMode: isTransparent ? "screen" : "normal",
                transition: "all 0.3s",
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href === "/" ? "" : link.href}`}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(link.href)
                    ? "bg-primary-600 text-white"
                    : isTransparent
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                )}
              >
                {t(link.key as keyof ReturnType<typeof t>)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={switchLocale}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                isTransparent ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Globe size={16} />
              <span>{locale === "fr" ? "EN" : "FR"}</span>
            </button>

            <Link href={`/${locale}/contact`} className="hidden lg:block">
              <Button size="sm" variant={isTransparent ? "white" : "default"}>
                {t("contact")}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-all",
                isTransparent ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href === "/" ? "" : link.href}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    isActive(link.href)
                      ? "bg-primary-600 text-white"
                      : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                  )}
                >
                  {t(link.key as keyof ReturnType<typeof t>)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}