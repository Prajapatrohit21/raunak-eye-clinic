import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteCopy } from "@/content/copy";
import { CheckCircle2, Phone, CalendarCheck, MapPin, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Dr Sachin Malviya | Eye Surgeon & Retina Specialist | Dewas",
  description: "Dr Sachin Malviya is an eye surgeon, retina specialist, and squint surgeon at Raunak Eye Care Hospital, Moti Bunglow Main Rd, Dewas. Super-speciality care in Dewas.",
};

export default function AboutPage() {
  return (
    <main id="main-content">
      {/* Breadcrumb */}
      <div className="bg-[#E8D9C5]/50 border-b border-[#7A8B7A]/20 py-3">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#201D18]/70">
            <Link href="/" className="hover:text-[#0E4D4C] hover:underline">Home</Link>
            <span>/</span>
            <span className="text-[#0E4D4C] font-medium">About Dr Sachin Malviya</span>
          </nav>
        </div>
      </div>

      {/* Hero - Doctor + Tagline */}
      <section className="bg-[#FBF7F0] py-16 md:py-24 border-b border-[#7A8B7A]/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Portrait Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden shadow-resting border-2 border-[#E8D9C5] bg-[#E8D9C5]">
                <Image
                  src="/images/dr-sachin-malviya.png"
                  alt="Dr Sachin Malviya, eye surgeon and retina specialist at Raunak Eye Care Hospital Dewas"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <span className="font-serif text-xl font-semibold text-[#201D18]">Dr Sachin Malviya</span>
              </div>
            </div>

            {/* Bio Column */}
            <div className="lg:col-span-7">
              <span className="type-kicker text-[#C17F3A] block mb-2">
                {siteCopy.about.eyebrow}
              </span>
              <h1 className="type-h1 font-serif font-semibold text-[#201D18] mb-6">
                {siteCopy.about.headingPre}{" "}
                <span className="italic text-[#C17F3A] font-normal">
                  {siteCopy.about.headingHighlight}
                </span>
              </h1>

              <p className="type-body text-[#201D18]/90 mb-6 leading-relaxed">
                {siteCopy.about.bioParagraph}
              </p>

              {/* Mission Promise Box */}
              <div className="p-5 rounded-xl bg-[#E8D9C5]/50 border-l-4 border-[#0E4D4C] mb-8">
                <p className="font-serif italic text-base md:text-lg text-[#0E4D4C] leading-snug">
                  "{siteCopy.about.promise}"
                </p>
              </div>

              {/* Verified Credentials */}
              <div className="mb-8">
                <h2 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#201D18]/70 mb-3">
                  Clinical Designations & Qualifications
                </h2>
                <ul className="space-y-2.5" aria-label="Surgeon credentials">
                  {siteCopy.about.credentials.map((cred, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#201D18]">
                      <ShieldCheck className="w-4 h-4 text-[#0E4D4C] shrink-0 mt-0.5" strokeWidth={1.75} />
                      <span className="font-medium">
                        {cred}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/book-appointment"
                  className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-full bg-[#0E4D4C] text-[#FBF7F0] font-semibold text-sm shadow-resting hover:bg-[#146362] hover:-translate-y-0.5 hover:shadow-elevated transition-all"
                >
                  <CalendarCheck className="w-4 h-4 text-[#C17F3A]" strokeWidth={1.75} />
                  Book a Consultation
                </Link>
                <a
                  href="tel:+917987676544"
                  className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-full border border-[#0E4D4C] text-[#0E4D4C] font-semibold text-sm hover:bg-[#0E4D4C] hover:text-[#FBF7F0] transition-all"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.75} />
                  Call 079876 76544
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Images Strip */}
      <section className="bg-[#E8D9C5]/30 py-14 border-b border-[#7A8B7A]/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="type-h3 font-serif font-semibold text-[#201D18] mb-8">
            Inside Raunak Eye Care Hospital
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { src: "/images/operation-theater.png", alt: "Surgical team in operation theatre at Raunak Eye Care Hospital Dewas" },
              { src: "/images/operating-microscope.png", alt: "High-precision surgical microscope at Raunak Eye Care Hospital Dewas" },
              { src: "/images/hospital-reception.png", alt: "Reception and patient waiting area at Raunak Eye Care Hospital Dewas" },
            ].map((img) => (
              <div key={img.src} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-resting border border-[#FBF7F0]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy / Why Dr Malviya Section */}
      <section className="bg-[#FBF7F0] py-14 md:py-20 border-b border-[#7A8B7A]/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <span className="type-kicker text-[#C17F3A] block mb-2">Our Approach</span>
              <h2 className="type-h2 font-serif font-semibold text-[#201D18] mb-5">
                Why patients in Dewas choose us
              </h2>
              <p className="text-sm md:text-base text-[#201D18]/85 leading-relaxed mb-5">
                For years, families in Dewas and surrounding districts — Shajapur, Ujjain, Sehore — had to travel 90 kilometres to Indore or further to Bhopal for advanced retina or squint procedures. Raunak Eye Care Hospital was founded to change that.
              </p>
              <p className="text-sm md:text-base text-[#201D18]/85 leading-relaxed">
                Dr Malviya performs every consultation and surgical case personally. Every patient leaves understanding their diagnosis. There are no rushed consultations, no diagnostic outsourcing, and no unanswered questions.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: "Surgeon-led consultations", desc: "Dr Malviya evaluates every patient directly — not a junior resident or technician." },
                { title: "Plain-language explanations", desc: "Every diagnosis and treatment option is explained in simple Hindi or English — medical jargon is always translated." },
                { title: "Advanced equipment on site", desc: "Slit lamp microscopy, A-scan biometry, digital retinal imaging, and surgical laser in a single facility." },
                { title: "All ages, all conditions", desc: "From newborn squint assessment to senior cataract and adult retinal disease — every case is welcome." },
              ].map((point) => (
                <div key={point.title} className="flex items-start gap-4 p-5 rounded-xl bg-[#E8D9C5]/40 border border-[#7A8B7A]/20">
                  <CheckCircle2 className="w-5 h-5 text-[#C17F3A] shrink-0 mt-0.5" strokeWidth={1.75} />
                  <div>
                    <h3 className="font-serif text-base font-semibold text-[#0E4D4C] mb-1">{point.title}</h3>
                    <p className="text-xs text-[#201D18]/80 leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialities Quick Links */}
      <section className="bg-[#E8D9C5]/30 py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="type-h3 font-serif font-semibold text-[#201D18] mb-8">
            Dr Malviya's areas of clinical practice
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {siteCopy.offerings.items.map((svc) => (
              <Link
                key={svc.id}
                href={`/services/${svc.id}`}
                className="group flex flex-col p-5 rounded-xl border border-[#7A8B7A]/30 bg-[#FBF7F0] hover:border-[#0E4D4C] hover:shadow-resting transition-all"
              >
                <span className="font-serif text-base font-semibold text-[#201D18] group-hover:text-[#0E4D4C] mb-2">{svc.title}</span>
                <span className="text-xs text-[#201D18]/70 leading-relaxed flex-1">{svc.description}</span>
                <span className="mt-3 text-xs font-semibold text-[#C17F3A] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="w-3 h-3" strokeWidth={2} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Location Block */}
      <section className="bg-[#0E4D4C] py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="type-h3 font-serif font-semibold text-[#FBF7F0] mb-3">
                Visit Raunak Eye Care Hospital
              </h2>
              <div className="flex items-start gap-2 text-sm text-[#FBF7F0]/85">
                <MapPin className="w-4 h-4 text-[#C17F3A] shrink-0 mt-0.5" strokeWidth={1.75} />
                <address className="not-italic">{siteCopy.contact.fullAddress}</address>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-full bg-[#C17F3A] text-[#201D18] font-bold text-sm shadow-resting hover:bg-[#D48F47] transition-all"
              >
                Book an Appointment
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-full border border-[#FBF7F0]/40 text-[#FBF7F0] font-semibold text-sm hover:bg-[#FBF7F0]/10 transition-all"
              >
                Get Directions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
