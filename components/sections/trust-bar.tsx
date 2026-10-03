import React from "react";
import { siteCopy } from "@/content/copy";
import { ShieldCheck, Stethoscope, Microscope, Eye } from "lucide-react";

const iconsMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Stethoscope,
  Microscope,
  Eye,
};

export function TrustBar() {
  return (
    <section className="bg-[#E8D9C5] border-b border-[#7A8B7A]/30 py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {siteCopy.trustBar.map((col, idx) => {
            const IconComponent = iconsMap[col.iconName] || ShieldCheck;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-2 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0E4D4C] text-[#FBF7F0] shadow-resting">
                  <IconComponent className="w-5 h-5 text-[#C17F3A]" strokeWidth={1.75} />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold text-base text-[#0E4D4C] leading-snug">
                    {col.title}
                  </span>
                  <span className="text-xs text-[#201D18]/85 leading-relaxed mt-1">
                    {col.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
