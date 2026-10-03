"use client";

import * as React from "react";
import { trackEvent } from "@/lib/analytics";

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const triggerId = `faq-trigger-${id}`;
  const panelId = `faq-panel-${id}`;

  const handleToggle = () => {
    if (!isOpen) {
      trackEvent("faq_open", { faqId: id, question });
    }
    onToggle();
  };

  return (
    <div className="border-b border-[#7A8B7A]/30 py-4 transition-colors">
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={handleToggle}
          className="flex w-full items-center justify-between text-left py-2 font-serif text-lg md:text-xl font-medium text-[#201D18] hover:text-[#0E4D4C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17F3A] focus-visible:ring-offset-2 rounded-lg transition-colors cursor-pointer group"
        >
          <span className="pr-4">{question}</span>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8D9C5]/50 text-[#0E4D4C] transition-transform duration-200 group-hover:bg-[#E8D9C5] ${
              isOpen ? "rotate-180 bg-[#0E4D4C] text-[#FBF7F0]" : ""
            }`}
            aria-hidden="true"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? "pt-2 pb-3 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed text-[#201D18]/85 pr-4 md:pr-10">
          {answer}
        </p>
      </div>
    </div>
  );
}

export interface AccordionProps {
  items: Array<{ id: string; question: string; answer: string }>;
  className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id || null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`divide-y divide-[#7A8B7A]/20 ${className}`}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}
