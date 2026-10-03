"use client";

import React, { useState } from "react";
import { siteCopy } from "@/content/copy";
import { CtaButton } from "@/components/cta-button";
import { Phone, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on pathname change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[#7A8B7A]/20 transition-colors ${
        mobileMenuOpen ? "bg-[#FBF7F0]" : "bg-[#FBF7F0]/95 backdrop-blur-md"
      }`}
    >
      <div className="max-w-[1200px] h-[72px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17F3A] rounded-lg p-1"
          aria-label="Raunak Eye Care Hospital Home"
        >
          <div className="bg-[#0E4D4C] px-3.5 py-1.5 rounded-lg flex flex-col items-center justify-center shadow-resting transition-transform group-hover:scale-[1.02]">
            <span className="font-serif font-semibold text-[#FBF7F0] text-xl leading-none tracking-tight">
              {siteCopy.header.brandName}
            </span>
            <span className="font-sans font-semibold text-[#C17F3A] text-[10px] tracking-[0.14em] uppercase leading-tight mt-0.5">
              {siteCopy.header.brandSubtitle}
            </span>
          </div>
        </Link>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
          {siteCopy.header.navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link py-1 ${isActive ? "text-[#0E4D4C] font-semibold" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Phone + CTA - Desktop */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={siteCopy.contact.phoneTel}
            className="flex items-center gap-2 font-sans font-semibold text-sm text-[#0E4D4C] hover:text-[#146362] transition-colors p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17F3A]"
            aria-label={`Call hospital at ${siteCopy.contact.phoneDisplay}`}
          >
            <Phone className="w-4 h-4 text-[#C17F3A]" strokeWidth={1.75} />
            <span>{siteCopy.contact.phoneDisplay}</span>
          </a>

          <CtaButton
            href="/book-appointment"
            size="sm"
            variant="primary"
            eventName="cta_click"
            eventProps={{ location: "header" }}
          >
            {siteCopy.header.ctaText}
          </CtaButton>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={siteCopy.contact.phoneTel}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8D9C5] text-[#0E4D4C] active:scale-95 transition-transform"
            aria-label={`Call hospital at ${siteCopy.contact.phoneDisplay}`}
          >
            <Phone className="w-5 h-5 text-[#0E4D4C]" strokeWidth={1.75} />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-[#201D18] hover:bg-[#E8D9C5]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17F3A]"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-sheet"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={1.75} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Full-Screen Cream Mobile Sheet */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-sheet"
          className="fixed inset-x-0 top-[72px] bottom-0 z-50 bg-[#FBF7F0] flex flex-col justify-between px-6 py-6 sm:hidden overflow-y-auto"
          style={{ height: "calc(100dvh - 72px)", backgroundColor: "#FBF7F0" }}
        >
          <nav className="flex flex-col divide-y divide-[#7A8B7A]/20" aria-label="Mobile navigation">
            {siteCopy.header.navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-serif text-2xl py-3.5 transition-colors ${
                    isActive ? "text-[#0E4D4C] font-semibold" : "font-medium text-[#201D18] hover:text-[#0E4D4C]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 flex flex-col gap-3.5 pt-6 border-t border-[#7A8B7A]/20">
            <a
              href={siteCopy.contact.phoneTel}
              className="flex items-center justify-center gap-3 min-h-[48px] rounded-full border border-[#0E4D4C] text-[#0E4D4C] font-semibold text-base bg-[#E8D9C5]/30 active:bg-[#E8D9C5]/60 transition-colors"
            >
              <Phone className="w-5 h-5 text-[#C17F3A]" strokeWidth={1.75} />
              <span>Call {siteCopy.contact.phoneDisplay}</span>
            </a>

            <CtaButton
              href="/book-appointment"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              {siteCopy.header.ctaText}
            </CtaButton>

            <p className="text-center text-xs text-[#201D18]/60 mt-2">
              Opposite SBI, near LIC — Moti Bunglow, Dewas
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
