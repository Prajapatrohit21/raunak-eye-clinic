import * as React from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`block text-xs font-semibold uppercase tracking-wider text-[#201D18] mb-1.5 select-none ${className}`}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";
