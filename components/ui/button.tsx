import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "amber";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17F3A] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variants = {
      default:
        "bg-[#0E4D4C] text-[#FBF7F0] shadow-resting hover:bg-[#146362] hover:-translate-y-0.5 hover:shadow-elevated active:translate-y-0",
      outline:
        "border border-[#0E4D4C] bg-transparent text-[#0E4D4C] hover:bg-[#0E4D4C] hover:text-[#FBF7F0]",
      ghost:
        "bg-transparent text-[#201D18] hover:bg-[#E8D9C5]/50",
      amber:
        "bg-[#C17F3A] text-[#201D18] font-bold shadow-resting hover:bg-[#D48F47] hover:-translate-y-0.5 hover:shadow-elevated",
    };

    const sizes = {
      default: "h-11 px-6 py-2.5",
      sm: "h-9 px-4 text-xs",
      lg: "h-12 px-8 text-base",
      icon: "h-11 w-11 p-2",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
