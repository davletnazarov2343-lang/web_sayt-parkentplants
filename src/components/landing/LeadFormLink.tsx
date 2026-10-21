"use client";

import type { ComponentPropsWithoutRef } from "react";
import { LinkButton } from "@/components/ui/Button";
import {
  LEAD_FORM_ID,
  scrollToLeadForm,
  selectLeadOption,
} from "@/lib/landing-form";

/**
 * Lid formasiga olib boruvchi tugma. Bosilganda (ixtiyoriy) forma variantini
 * tanlatadi va formaga silliq siljiydi. JS ishlamasa ham `#request` havolasi
 * formaga olib boradi.
 */
export function LeadFormLink({
  option,
  onClick,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof LinkButton>, "href"> & {
  /** LeadForm `sourceOptions` dagi variant (masalan "now" yoki "preorder") */
  option?: string;
}) {
  return (
    <LinkButton
      {...props}
      href={`#${LEAD_FORM_ID}`}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        e.preventDefault();
        if (option) selectLeadOption(option);
        scrollToLeadForm();
      }}
    />
  );
}
