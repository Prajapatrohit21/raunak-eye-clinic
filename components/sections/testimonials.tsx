import React from "react";
import { siteCopy } from "@/content/copy";
import { Star } from "lucide-react";

export const SHOW_TESTIMONIALS = false;

export function Testimonials() {
  if (!SHOW_TESTIMONIALS) {
    return null;
  }

  return (
    <section
      id="reviews"
      aria-labelledby="testimonials-heading"
      className="bg-[#E8D9C5] py-16 md:py-24 border-b border-[#7A8B7A]/30"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="type-kicker text-[#0E4D4C] mb-3 inline-block">
            {siteCopy.testimonials.kicker}
          </span>
          <h2
            id="testimonials-heading"
            className="type-h2 font-serif font-semibold text-[#0E4D4C]"
          >
            {siteCopy.testimonials.headingPre}{" "}
            <span className="italic text-[#C17F3A] font-normal">
              {siteCopy.testimonials.headingHighlight}
            </span>
          </h2>
          <p className="text-xs md:text-sm text-[#201D18]/75 mt-3">
            {siteCopy.testimonials.note}
          </p>
        </div>

        {/* 3 Real Placeholder Cards on Soft Clay */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteCopy.testimonials.items.map((item) => (
            <blockquote
              key={item.id}
              className="flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-[#FBF7F0] border border-[#7A8B7A]/30 shadow-resting"
            >
              <div>
                {/* 5 Amber Stars */}
                <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#C17F3A] fill-[#C17F3A]"
                      strokeWidth={1.75}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="italic text-sm md:text-base text-[#201D18]/85 leading-relaxed mb-6 font-serif">
                  "{item.quote}"
                </p>
              </div>

              {/* Patient Attribution Cite */}
              <footer className="pt-4 border-t border-[#7A8B7A]/20">
                <cite className="not-italic flex flex-col">
                  <span className="font-sans font-semibold text-sm text-[#0E4D4C]">
                    {item.patientName}
                  </span>
                  <span className="text-xs text-[#201D18]/70 mt-0.5">
                    {item.locality}
                  </span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
