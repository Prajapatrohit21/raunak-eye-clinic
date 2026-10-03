import React from "react";
import { siteCopy } from "@/content/copy";
import { Accordion } from "@/components/ui/accordion";
import { Phone } from "lucide-react";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-[#FBF7F0] py-16 md:py-24 border-b border-[#7A8B7A]/20"
    >
      <div className="max-w-[960px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="type-kicker text-[#C17F3A] mb-3 inline-block">
            {siteCopy.faq.kicker}
          </span>
          <h2
            id="faq-heading"
            className="type-h2 font-serif font-semibold text-[#201D18]"
          >
            {siteCopy.faq.headingPre}{" "}
            <span className="italic text-[#C17F3A] font-normal">
              {siteCopy.faq.headingHighlight}
            </span>
          </h2>
          <p className="type-body text-[#201D18]/80 mt-2">
            Clear, honest answers to help you prepare for your consultation in Dewas.
          </p>
        </div>

        {/* 7-Question Accessible Accordion */}
        <div className="bg-[#FBF7F0] rounded-2xl border border-[#7A8B7A]/30 p-4 md:p-8 shadow-resting">
          <Accordion items={siteCopy.faq.items} />
        </div>

        {/* Additional Help CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-[#201D18]/80">
            Have a question about a specific condition or prescription?{" "}
            <a
              href={siteCopy.contact.phoneTel}
              className="inline-flex items-center gap-1 font-semibold text-[#0E4D4C] hover:underline"
            >
              <Phone className="w-3.5 h-3.5 text-[#C17F3A]" />
              <span>Call 079876 76544 to speak with our hospital staff</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
