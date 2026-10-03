import React from "react";
import Image from "next/image";
import { siteCopy } from "@/content/copy";
import { CtaButton } from "@/components/cta-button";
import { MapPin, ShieldCheck, Phone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FBF7F0] pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#7A8B7A]/20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#E8D9C5]/60 border border-[#C17F3A]/30">
              <span className="type-kicker text-[#C17F3A]">
                {siteCopy.hero.kicker}
              </span>
            </div>

            {/* H1 Heading with Italic Amber Light Motif */}
            <h1 className="type-h1 font-serif font-semibold text-[#201D18] mb-6">
              {siteCopy.hero.headingPre}{" "}
              <span className="italic text-[#C17F3A] font-serif font-normal">
                {siteCopy.hero.headingHighlight}
              </span>
              {siteCopy.hero.headingPost}
            </h1>

            {/* Subcopy */}
            <p className="type-body text-[#201D18]/85 max-w-2xl mb-8">
              {siteCopy.hero.subCopy}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-6">
              <CtaButton
                href="#book-appointment"
                variant="primary"
                size="lg"
                eventName="cta_click"
                eventProps={{ location: "hero_primary" }}
              >
                {siteCopy.hero.primaryCta}
              </CtaButton>

              <CtaButton
                href={siteCopy.contact.phoneTel}
                variant="secondary"
                size="lg"
                eventName="call_click"
                eventProps={{ location: "hero_secondary" }}
                className="gap-2"
              >
                <Phone className="w-4 h-4 text-[#0E4D4C]" strokeWidth={1.75} />
                <span>{siteCopy.hero.secondaryCta}</span>
              </CtaButton>
            </div>

            {/* Trust Landmark Note */}
            <div className="flex items-center gap-2 text-sm text-[#201D18]/80 font-medium">
              <MapPin className="w-4 h-4 text-[#C17F3A] shrink-0" strokeWidth={1.75} />
              <span>{siteCopy.hero.trustNote}</span>
            </div>
          </div>

          {/* Right Column: Hero Visual with Duotone & Floating Card */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-2xl overflow-hidden shadow-resting border border-[#FBF7F0]">
              <Image
                src="/images/operating-microscope.png"
                alt={siteCopy.hero.heroImageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Deep Teal duotone overlay at 82% opacity with blend-mode multiply */}
              <div className="hero-duotone-overlay" />

              {/* Floating Cream Card Pinned to Bottom-Left */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#FBF7F0] border border-[#7A8B7A]/30 rounded-xl px-4 py-3 shadow-elevated flex items-center gap-3 backdrop-blur-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0E4D4C] text-[#FBF7F0]">
                  <ShieldCheck className="w-5 h-5 text-[#C17F3A]" strokeWidth={1.75} />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold text-xs text-[#0E4D4C] uppercase tracking-wider">
                    Super-Speciality Clinic
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#201D18]">
                    {siteCopy.hero.floatingBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
