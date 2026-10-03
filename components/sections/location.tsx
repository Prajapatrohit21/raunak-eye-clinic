import React from "react";
import Image from "next/image";
import { siteCopy } from "@/content/copy";
import { MapPin, Navigation, Phone } from "lucide-react";
import { CtaButton } from "@/components/cta-button";

export function Location() {
  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="bg-[#FBF7F0] py-16 md:py-24 border-b border-[#7A8B7A]/20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="type-kicker text-[#C17F3A] mb-3 inline-block">
            {siteCopy.location.kicker}
          </span>
          <h2
            id="location-heading"
            className="type-h2 font-serif font-semibold text-[#201D18]"
          >
            {siteCopy.location.headingPre}{" "}
            <span className="italic text-[#C17F3A] font-normal">
              {siteCopy.location.headingHighlight}
            </span>
          </h2>
          <p className="type-body text-[#201D18]/80 mt-2">
            Central hospital location on Moti Bunglow Main Rd, easily reachable from across Dewas district.
          </p>
        </div>

        {/* 2-Column Location Layout: Map & Address Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-resting border border-[#7A8B7A]/30 bg-[#E8D9C5]/30">
              <iframe
                title="Raunak Eye Care Hospital Google Map Location"
                src={siteCopy.contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Reception preview thumbnail */}
            <div className="mt-4 flex items-center gap-4 p-3 rounded-xl bg-[#E8D9C5]/40 border border-[#7A8B7A]/20">
              <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-[#FBF7F0]">
                <Image
                  src="/images/hospital-reception.png"
                  alt="Raunak Eye Care Hospital Reception and patient waiting lounge Dewas"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="text-xs text-[#201D18]/80">
                <span className="font-semibold text-[#0E4D4C] block">Ground Floor Reception & Waiting Area</span>
                Patient assistance desk opposite SBI Bank, Moti Bunglow Main Rd.
              </div>
            </div>
          </div>

          {/* Address Card Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#E8D9C5] border border-[#7A8B7A]/30 shadow-resting">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0E4D4C] text-[#FBF7F0]">
                  <MapPin className="w-5 h-5 text-[#C17F3A]" strokeWidth={1.75} />
                </div>
                <div>
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#0E4D4C]">
                    Hospital Address
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-[#201D18]">
                    {siteCopy.contact.hospitalName}
                  </h3>
                </div>
              </div>

              {/* Line Split Address */}
              <div className="space-y-1 text-sm md:text-base text-[#201D18]/90 font-medium mb-6 pl-1">
                {siteCopy.contact.addressLines.map((line, idx) => (
                  <p key={idx} className="leading-snug">{line}</p>
                ))}
                <p className="text-xs text-[#201D18]/70 pt-1">India</p>
              </div>

              {/* Landmark Highlight */}
              <div className="p-3.5 rounded-xl bg-[#FBF7F0] border border-[#7A8B7A]/30 mb-6">
                <p className="font-sans text-xs md:text-sm font-semibold text-[#0E4D4C]">
                  {siteCopy.contact.landmark}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#7A8B7A]/20">
              <CtaButton
                href={siteCopy.contact.directionsUrl}
                variant="primary"
                size="default"
                className="w-full gap-2"
                eventName="direction_click"
              >
                <Navigation className="w-4 h-4 text-[#C17F3A]" strokeWidth={1.75} />
                <span>{siteCopy.location.actionButton}</span>
              </CtaButton>

              <a
                href={siteCopy.contact.phoneTel}
                className="flex items-center justify-center gap-2 text-xs md:text-sm text-[#0E4D4C] font-semibold hover:underline py-1"
              >
                <Phone className="w-3.5 h-3.5 text-[#C17F3A]" strokeWidth={1.75} />
                <span>{siteCopy.location.phonePrompt}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
