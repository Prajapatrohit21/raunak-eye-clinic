import React from "react";
import Image from "next/image";
import { siteCopy } from "@/content/copy";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { CtaButton } from "@/components/cta-button";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[#FBF7F0] py-16 md:py-24 border-b border-[#7A8B7A]/20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Doctor Portrait Photo */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden shadow-resting border-2 border-[#FBF7F0] bg-[#E8D9C5]">
              <Image
                src="/images/dr-sachin-malviya.png"
                alt={siteCopy.about.portraitAlt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            {/* Doctor photo caption */}
            <div className="mt-3 text-center">
              <p className="text-sm font-semibold font-serif text-[#201D18]">
                Dr Sachin Malviya
              </p>
            </div>
          </div>

          {/* Right Column: Doctor Bio & Credentials */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="type-kicker text-[#C17F3A] mb-2">
              {siteCopy.about.eyebrow}
            </span>
            <h2
              id="about-heading"
              className="type-h2 font-serif font-semibold text-[#201D18] mb-6"
            >
              {siteCopy.about.headingPre}{" "}
              <span className="italic text-[#C17F3A] font-normal">
                {siteCopy.about.headingHighlight}
              </span>
            </h2>

            <p className="type-body text-[#201D18]/90 mb-6 leading-relaxed">
              {siteCopy.about.bioParagraph}
            </p>

            {/* Mission Statement Box */}
            <div className="p-5 rounded-xl bg-[#E8D9C5]/50 border-l-4 border-[#0E4D4C] mb-8">
              <p className="font-serif italic text-base md:text-lg text-[#0E4D4C] leading-snug">
                "{siteCopy.about.promise}"
              </p>
            </div>

            {/* Verified Clinical Credentials */}
            <div className="w-full mb-8">
              <h3 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#201D18]/70 mb-3">
                Clinical Focus & Verified Designations
              </h3>
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

            {/* Direct CTA */}
            <CtaButton
              href="#book-appointment"
              variant="primary"
              size="default"
              eventName="cta_click"
              eventProps={{ location: "about_section" }}
            >
              Consult with Dr Sachin Malviya
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
