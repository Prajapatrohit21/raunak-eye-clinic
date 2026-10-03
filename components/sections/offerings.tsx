import React from "react";
import { siteCopy } from "@/content/copy";
import {
  ScanEye,
  Eye,
  Microscope,
  BadgeCheck,
  ShieldCheck,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { CtaButton } from "@/components/cta-button";

const offeringIcons: Record<string, React.ElementType> = {
  ScanEye,
  Eye,
  Microscope,
  BadgeCheck,
  ShieldCheck,
  Phone,
};

export function Offerings() {
  return (
    <section
      id="services"
      aria-labelledby="offerings-heading"
      className="bg-[#FBF7F0] py-16 md:py-24 border-b border-[#7A8B7A]/20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span className="type-kicker text-[#C17F3A] mb-3">
            {siteCopy.offerings.kicker}
          </span>
          <h2
            id="offerings-heading"
            className="type-h2 font-serif font-semibold text-[#201D18] mb-5"
          >
            {siteCopy.offerings.headingPre}{" "}
            <span className="italic text-[#C17F3A] font-normal">
              {siteCopy.offerings.headingHighlight}
            </span>{" "}
            {siteCopy.offerings.headingPost}
          </h2>
          <p className="type-body text-[#201D18]/80">
            {siteCopy.offerings.subCopy}
          </p>
        </div>

        {/* 3x2 Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteCopy.offerings.items.map((item) => {
            const Icon = offeringIcons[item.iconName] || Eye;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between bg-[#FBF7F0] border border-[#7A8B7A]/30 rounded-2xl p-6 md:p-8 shadow-resting transition-all duration-150 hover:shadow-elevated hover:-translate-y-1 group"
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8D9C5] text-[#0E4D4C] transition-colors group-hover:bg-[#0E4D4C] group-hover:text-[#FBF7F0]">
                      <Icon className="w-7 h-7 text-[#0E4D4C] group-hover:text-[#C17F3A]" strokeWidth={1.75} />
                    </div>
                    <span className="text-[11px] font-sans font-semibold tracking-[0.14em] uppercase text-[#7A8B7A]">
                      Super-Speciality
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="type-h3 font-serif font-semibold text-[#201D18] mb-3 group-hover:text-[#0E4D4C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#201D18]/80 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Bullet Capabilities */}
                  <ul className="space-y-2.5 pt-4 border-t border-[#7A8B7A]/20 mb-8" aria-label={`Capabilities for ${item.title}`}>
                    {item.capabilities.map((cap, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#201D18]/85">
                        <CheckCircle2 className="w-4 h-4 text-[#C17F3A] shrink-0 mt-0.5" strokeWidth={1.75} />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conversion Route */}
                <div>
                  <CtaButton
                    href="#book-appointment"
                    variant="secondary"
                    size="sm"
                    className="w-full text-xs"
                    eventName="cta_click"
                    eventProps={{ offering: item.id }}
                  >
                    Consult for {item.title}
                  </CtaButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
