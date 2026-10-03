import React from "react";
import { siteCopy } from "@/content/copy";
import { Phone, ScanEye, Microscope, ShieldCheck } from "lucide-react";

const processIcons: Record<string, React.ElementType> = {
  Phone,
  ScanEye,
  Microscope,
  ShieldCheck,
};

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-[#FBF7F0] py-16 md:py-24 border-b border-[#7A8B7A]/20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="type-kicker text-[#C17F3A] mb-3 inline-block">
            {siteCopy.process.kicker}
          </span>
          <h2
            id="process-heading"
            className="type-h2 font-serif font-semibold text-[#201D18]"
          >
            {siteCopy.process.headingPre}{" "}
            <span className="italic text-[#C17F3A] font-normal">
              {siteCopy.process.headingHighlight}
            </span>{" "}
            {siteCopy.process.headingPost}
          </h2>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Dotted Amber Connecting Line (Desktop) */}
          <div
            className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#C17F3A]/60 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {siteCopy.process.steps.map((step) => {
              const Icon = processIcons[step.iconName] || Phone;
              return (
                <div
                  key={step.stepNumber}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#FBF7F0] border border-[#7A8B7A]/30 shadow-resting transition-transform hover:-translate-y-1"
                >
                  {/* Step Numeral & Icon Badge */}
                  <div className="relative mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E8D9C5] text-[#0E4D4C] shadow-resting border border-[#C17F3A]/30">
                      <Icon className="w-8 h-8 text-[#0E4D4C]" strokeWidth={1.75} />
                    </div>
                    <span className="absolute -top-3 -right-3 font-serif font-bold text-sm bg-[#0E4D4C] text-[#FBF7F0] px-2 py-0.5 rounded-full border border-[#C17F3A]">
                      {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-[#201D18] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#201D18]/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
