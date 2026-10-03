import React from "react";
import Link from "next/link";
import { siteCopy } from "@/content/copy";
import { Phone, MapPin } from "lucide-react";

export function Footer() {
  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "Specialities", href: "/services" },
    { label: "About Dr Malviya", href: "/about" },
    { label: "Book Appointment", href: "/book-appointment" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/#faq" },
  ];

  return (
    <footer className="bg-[#FBF7F0] border-t border-[#7A8B7A]/30 pt-16 pb-24 md:pb-12 text-[#201D18]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#7A8B7A]/20">
          {/* Col 1: Wordmark & NAP */}
          <div className="md:col-span-5 flex flex-col items-start pr-0 md:pr-4">
            <Link href="/" aria-label="Raunak Eye Care Hospital home">
              <div className="bg-[#0E4D4C] px-3.5 py-1.5 rounded-lg flex flex-col items-center justify-center mb-4 shadow-resting hover:scale-[1.02] transition-transform">
                <span className="font-serif font-semibold text-[#FBF7F0] text-xl leading-none tracking-tight">
                  {siteCopy.header.brandName}
                </span>
                <span className="font-sans font-semibold text-[#C17F3A] text-[10px] tracking-[0.14em] uppercase leading-tight mt-0.5">
                  {siteCopy.header.brandSubtitle}
                </span>
              </div>
            </Link>

            <p className="font-serif italic text-base text-[#0E4D4C] mb-4">
              "{siteCopy.footer.tagline}"
            </p>

            <div className="space-y-2 text-xs md:text-sm text-[#201D18]/80">
              <a
                href={siteCopy.contact.phoneTel}
                className="flex items-center gap-2 font-semibold text-[#0E4D4C] hover:text-[#C17F3A] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C17F3A]" strokeWidth={1.75} />
                <span>{siteCopy.contact.phoneDisplay}</span>
              </a>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-[#C17F3A] shrink-0 mt-0.5" strokeWidth={1.75} />
                <address className="not-italic leading-relaxed">
                  {siteCopy.contact.fullAddress}
                </address>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#0E4D4C] mb-4">
              {siteCopy.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2.5 text-sm" aria-label="Footer quick navigation">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-colors hover:underline ${link.label === "Book Appointment" ? "font-semibold text-[#0E4D4C] hover:text-[#C17F3A]" : "text-[#201D18]/80 hover:text-[#0E4D4C]"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Specialities */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#0E4D4C] mb-4">
              {siteCopy.footer.specialitiesTitle}
            </h4>
            <ul className="space-y-2 text-sm text-[#201D18]/80" aria-label="Hospital specialities">
              <li><Link href="/services/retina-care" className="hover:text-[#0E4D4C] hover:underline">Retina Care & Diabetic Retinopathy</Link></li>
              <li><Link href="/services/squint-correction" className="hover:text-[#0E4D4C] hover:underline">Squint Correction (Paediatric & Adult)</Link></li>
              <li><Link href="/services/cataract-surgery" className="hover:text-[#0E4D4C] hover:underline">Micro-incision Cataract & Premium IOLs</Link></li>
              <li><Link href="/services/complete-checkup" className="hover:text-[#0E4D4C] hover:underline">Comprehensive Refraction & Glaucoma Check-up</Link></li>
              <li><Link href="/services/paediatric-care" className="hover:text-[#0E4D4C] hover:underline">Paediatric Ophthalmology & Lazy Eye Therapy</Link></li>
              <li><Link href="/services/emergency-care" className="hover:text-[#0E4D4C] hover:underline">Emergency Ocular Injury & Trauma Care</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#201D18]/60 gap-4">
          <p>{siteCopy.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <p>Moti Bunglow Main Rd, opposite SBI, Dewas, MP</p>
            <span>•</span>
            <Link href="/admin" className="text-[#0E4D4C] hover:text-[#C17F3A] hover:underline font-medium">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
