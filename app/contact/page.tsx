import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { siteCopy } from "@/content/copy";
import { Phone, MapPin, Navigation, Clock, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Raunak Eye Care Hospital | Dewas, Madhya Pradesh",
  description: "Contact Raunak Eye Care Hospital in Dewas. Call 079876 76544 or visit 121, Moti Bunglow Main Rd, opposite SBI, near LIC, Dewas MP 455001.",
};

export default function ContactPage() {
  return (
    <main id="main-content">
      {/* Breadcrumb */}
      <div className="bg-[#E8D9C5]/50 border-b border-[#7A8B7A]/20 py-3">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#201D18]/70">
            <Link href="/" className="hover:text-[#0E4D4C] hover:underline">Home</Link>
            <span>/</span>
            <span className="text-[#0E4D4C] font-medium">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Page Hero */}
      <section className="bg-[#0E4D4C] text-[#FBF7F0] py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <span className="type-kicker text-[#C17F3A] block mb-2">We are here for you</span>
          <h1 className="type-h1 font-serif font-semibold text-[#FBF7F0] mb-4">
            Contact &{" "}
            <span className="italic text-[#C17F3A] font-normal">Location</span>
          </h1>
          <p className="type-body text-[#FBF7F0]/85 max-w-xl mx-auto">
            Find us at Moti Bunglow Main Rd, opposite SBI Bank, near LIC office — right in the centre of Dewas.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-[#FBF7F0] py-14 md:py-20 border-b border-[#7A8B7A]/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {/* Phone */}
            <div className="p-6 rounded-2xl bg-[#E8D9C5] border border-[#7A8B7A]/30 flex flex-col items-center text-center shadow-resting">
              <div className="h-12 w-12 rounded-2xl bg-[#0E4D4C] flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#C17F3A]" strokeWidth={1.75} />
              </div>
              <h2 className="font-serif text-lg font-semibold text-[#0E4D4C] mb-2">Call the Hospital</h2>
              <a
                href={siteCopy.contact.phoneTel}
                className="font-bold text-xl text-[#201D18] hover:text-[#C17F3A] transition-colors"
              >
                {siteCopy.contact.phoneDisplay}
              </a>
              <p className="text-xs text-[#201D18]/70 mt-2">
                Emergency calls attended immediately
              </p>
            </div>

            {/* Address */}
            <div className="p-6 rounded-2xl bg-[#E8D9C5] border border-[#7A8B7A]/30 flex flex-col items-center text-center shadow-resting">
              <div className="h-12 w-12 rounded-2xl bg-[#0E4D4C] flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#C17F3A]" strokeWidth={1.75} />
              </div>
              <h2 className="font-serif text-lg font-semibold text-[#0E4D4C] mb-3">Our Location</h2>
              <address className="not-italic text-sm text-[#201D18]/85 leading-relaxed">
                {siteCopy.contact.addressLines.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
                <span className="block">India</span>
              </address>
              <p className="text-xs font-semibold text-[#0E4D4C] mt-3">
                {siteCopy.contact.landmark}
              </p>
            </div>

            {/* Directions */}
            <div className="p-6 rounded-2xl bg-[#E8D9C5] border border-[#7A8B7A]/30 flex flex-col items-center text-center shadow-resting">
              <div className="h-12 w-12 rounded-2xl bg-[#0E4D4C] flex items-center justify-center mb-4">
                <Navigation className="w-6 h-6 text-[#C17F3A]" strokeWidth={1.75} />
              </div>
              <h2 className="font-serif text-lg font-semibold text-[#0E4D4C] mb-3">Get Directions</h2>
              <p className="text-xs text-[#201D18]/80 leading-relaxed mb-4">
                Opposite SBI Bank on Moti Bunglow Main Rd. Easily accessible from Shivaji Nagar and the main Dewas city centre.
              </p>
              <a
                href={siteCopy.contact.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] px-6 rounded-full bg-[#0E4D4C] text-[#FBF7F0] font-semibold text-xs shadow-resting hover:bg-[#146362] transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C17F3A]" strokeWidth={1.75} />
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Full Map Embed */}
          <div className="w-full rounded-2xl overflow-hidden shadow-resting border border-[#7A8B7A]/30 bg-[#E8D9C5]/30" style={{ height: 420 }}>
            <iframe
              title="Raunak Eye Care Hospital location on Google Maps"
              src={siteCopy.contact.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FAQ for Visiting Section */}
      <section className="bg-[#E8D9C5]/30 py-14 border-b border-[#7A8B7A]/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="type-h3 font-serif font-semibold text-[#201D18] mb-8">
            Visiting Raunak Eye Care Hospital
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Clock,
                title: "Clinic Hours",
                content: "Morning and evening OPD sessions available. Call 079876 76544 to confirm current doctor timings.",
              },
              {
                icon: Phone,
                title: "Before You Come",
                content: "Call 079876 76544 to confirm availability, especially for surgical or laser procedures. Walk-ins are welcome for acute emergency cases.",
              },
              {
                icon: MapPin,
                title: "How to Reach",
                content: "We are on Moti Bunglow Main Rd, directly opposite SBI Bank and near the LIC office in Shivaji Nagar. Auto-rickshaws, shared vehicles, and private cars can access the clinic easily from Dewas bus stand.",
              },
              {
                icon: Mail,
                title: "What to Bring",
                content: "Your previous glasses, old prescriptions, medical test reports, and current medicines. For children, bring the child's vaccination card or any prior eye assessment report.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 rounded-xl bg-[#FBF7F0] border border-[#7A8B7A]/20 shadow-resting">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-[#0E4D4C] flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#C17F3A]" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#0E4D4C] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#201D18]/80 leading-relaxed">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Book CTA */}
      <section className="bg-[#0E4D4C] py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="type-h3 font-serif font-semibold text-[#FBF7F0] mb-1">
              Ready to consult with Dr Sachin Malviya?
            </h2>
            <p className="text-sm text-[#FBF7F0]/80">
              Call directly or book an appointment online — we will call you back.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={siteCopy.contact.phoneTel}
              className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-full bg-[#C17F3A] text-[#201D18] font-bold text-sm shadow-resting hover:bg-[#D48F47] transition-all"
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
              Call 079876 76544
            </a>
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-full border border-[#FBF7F0]/40 text-[#FBF7F0] font-semibold text-sm hover:bg-[#FBF7F0]/10 transition-all"
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
