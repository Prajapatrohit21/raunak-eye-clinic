"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { siteCopy } from "@/content/copy";
import { trackEvent } from "@/lib/analytics";
import { Phone, CalendarCheck, X } from "lucide-react";

export function StickyCallBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed || pathname?.startsWith("/admin")) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = (scrollY / docHeight) * 100;
      if (scrollPercent >= 25) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed || pathname?.startsWith("/admin")) return null;

  return (
    <div
      role="region"
      aria-label="Quick appointment and contact actions"
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#FBF7F0] border-t border-[#7A8B7A]/30 shadow-elevated px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] h-[76px] flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200"
    >
      {/* Dismiss Button */}
      <button
        type="button"
        onClick={() => setIsDismissed(true)}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#201D18]/70 hover:bg-[#E8D9C5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17F3A]"
        aria-label="Dismiss quick contact bar"
      >
        <X className="w-5 h-5" strokeWidth={1.75} />
      </button>

      {/* Action Buttons */}
      <div className="flex-1 flex items-center gap-2">
        {/* Call Now */}
        <a
          href={siteCopy.contact.phoneTel}
          onClick={() => trackEvent("call_click", { location: "sticky_mobile_bar" })}
          className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 rounded-full bg-[#C17F3A] text-[#201D18] font-bold text-xs uppercase tracking-wider shadow-resting active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-[#201D18]" strokeWidth={2} />
          <span>{siteCopy.stickyBar.callText}</span>
        </a>

        {/* Book Appointment */}
        <a
          href="#book-appointment"
          onClick={() => trackEvent("cta_click", { location: "sticky_mobile_bar" })}
          className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 rounded-full bg-[#0E4D4C] text-[#FBF7F0] font-semibold text-xs uppercase tracking-wider shadow-resting active:scale-95 transition-transform"
        >
          <CalendarCheck className="w-4 h-4 text-[#C17F3A]" strokeWidth={2} />
          <span>{siteCopy.stickyBar.bookText}</span>
        </a>
      </div>
    </div>
  );
}
