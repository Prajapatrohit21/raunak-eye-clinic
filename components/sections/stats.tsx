import React from "react";
import { siteCopy } from "@/content/copy";
import { Phone } from "lucide-react";

export function Stats() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="bg-[#0E4D4C] text-[#FBF7F0] py-16 md:py-20 border-y border-[#7A8B7A]/30"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="type-kicker text-[#C17F3A] mb-2 inline-block">
            {siteCopy.stats.kicker}
          </span>
          <h2
            id="stats-heading"
            className="type-h2 font-serif font-semibold text-[#FBF7F0]"
          >
            {siteCopy.stats.headingPre}{" "}
            <span className="italic text-[#C17F3A] font-normal">
              {siteCopy.stats.headingHighlight}
            </span>{" "}
            {siteCopy.stats.headingPost}
          </h2>
        </div>

        {/* 3 Honesty-Driven Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-[#FBF7F0]/15 pt-10">
          {siteCopy.stats.items.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-4 rounded-xl bg-[#FBF7F0]/5 border border-[#FBF7F0]/10 backdrop-blur-sm"
            >
              <div className="font-serif text-4xl md:text-5xl font-semibold text-[#C17F3A] mb-2 tracking-tight">
                {stat.metric}
              </div>
              <div className="font-sans font-semibold text-lg text-[#FBF7F0] mb-2">
                {stat.label}
              </div>
              <p className="text-xs md:text-sm text-[#FBF7F0]/80 leading-relaxed max-w-xs">
                {stat.note}
              </p>
            </div>
          ))}
        </div>

        {/* Support Note & Direct Call Line */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#FBF7F0]/15 text-xs text-[#FBF7F0]/70">
          <p className="italic">
            Verified clinical practice standards • Experience metrics:{" "}
            <span className="text-[#C17F3A] font-medium">{siteCopy.stats.verifiedNote}</span>
          </p>

          <a
            href={siteCopy.contact.phoneTel}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FBF7F0] hover:text-[#C17F3A] transition-colors p-1"
          >
            <Phone className="w-4 h-4 text-[#C17F3A]" strokeWidth={1.75} />
            <span>Consult Reception: {siteCopy.contact.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
