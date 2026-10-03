import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex min-h-[48px] w-full rounded-xl border border-[#7A8B7A]/40 bg-[#FBF7F0] px-4 py-2.5 text-base text-[#201D18] placeholder:text-[#201D18]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17F3A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
