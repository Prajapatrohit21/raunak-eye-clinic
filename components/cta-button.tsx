"use client";

import React from "react";
import { trackEvent, AnalyticsEventName } from "@/lib/analytics";

export interface CtaButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "amber";
  size?: "default" | "sm" | "lg";
  className?: string;
  id?: string;
  eventName?: AnalyticsEventName;
  eventProps?: Record<string, unknown>;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function CtaButton({
  children,
  href,
  variant = "primary",
  size = "default",
  className = "",
  id,
  eventName = "cta_click",
  eventProps,
  onClick,
  type = "button",
  disabled = false,
}: CtaButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold text-center rounded-full transition-all duration-150 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17F3A] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "min-h-[44px] px-5 py-2 text-xs uppercase tracking-wider font-semibold",
    default: "min-h-[48px] px-7 py-3 text-sm font-semibold tracking-wide",
    lg: "min-h-[52px] px-8 py-3.5 text-base font-semibold tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-[#0E4D4C] text-[#FBF7F0] shadow-resting hover:bg-[#146362] hover:-translate-y-0.5 hover:shadow-elevated active:translate-y-0",
    amber:
      "bg-[#C17F3A] text-[#201D18] font-bold shadow-resting hover:bg-[#D48F47] hover:-translate-y-0.5 hover:shadow-elevated active:translate-y-0",
    secondary:
      "bg-transparent text-[#0E4D4C] border border-[#0E4D4C] hover:bg-[#0E4D4C] hover:text-[#FBF7F0] active:translate-y-0",
    ghost:
      "bg-transparent text-[#FBF7F0] border border-[#FBF7F0]/40 hover:border-[#FBF7F0] hover:bg-[#FBF7F0]/10 active:translate-y-0",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const handleClick = (e: React.MouseEvent) => {
    if (href?.startsWith("tel:")) {
      trackEvent("call_click", { href, ...eventProps });
    } else if (eventName) {
      trackEvent(eventName, { href, ...eventProps });
    }
    if (onClick) onClick(e);
  };

  if (href) {
    return (
      <a
        id={id}
        href={href}
        className={combinedClasses}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      id={id}
      type={type}
      className={combinedClasses}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
