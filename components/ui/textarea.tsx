import * as React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[96px] w-full rounded-xl border border-[#7A8B7A]/40 bg-[#FBF7F0] px-4 py-3 text-base text-[#201D18] placeholder:text-[#201D18]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17F3A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
