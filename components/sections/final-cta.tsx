"use client";

import React, { useState, useTransition } from "react";
import { siteCopy } from "@/content/copy";
import { requestCallback, ActionResult } from "@/lib/actions";
import { trackEvent } from "@/lib/analytics";
import { Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function FinalCta() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackEvent("form_submit", { target: "callback_form" });
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await requestCallback(null, formData);
      setResult(res);
    });
  };

  const handleInputFocus = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("form_start", { formId: "book-appointment" });
    }
  };

  return (
    <section
      id="book-appointment"
      aria-labelledby="cta-heading"
      className="bg-[#0E4D4C] text-[#FBF7F0] py-16 md:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="type-kicker text-[#C17F3A] mb-3 inline-block">
            Direct Hospital Appointment
          </span>
          <h2
            id="cta-heading"
            className="type-h2 font-serif font-semibold text-[#FBF7F0] mb-4"
          >
            {siteCopy.finalCta.heading}
          </h2>
          <p className="type-body text-[#FBF7F0]/85">
            {siteCopy.finalCta.subLine}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Appointment Callback Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FBF7F0] text-[#201D18] rounded-2xl p-6 md:p-8 shadow-elevated border border-[#7A8B7A]/30">
            <h3 className="font-serif text-xl font-semibold text-[#0E4D4C] mb-2">
              {siteCopy.finalCta.formTitle}
            </h3>
            <p className="text-xs md:text-sm text-[#201D18]/70 mb-6">
              Enter your contact number. Our hospital desk will call you to schedule a consultation time with Dr Malviya.
            </p>

            {result?.success ? (
              <div
                role="status"
                className="p-6 rounded-xl bg-[#0E4D4C] text-[#FBF7F0] text-center flex flex-col items-center gap-3 animate-in fade-in"
              >
                <div className="h-12 w-12 rounded-full bg-[#C17F3A] flex items-center justify-center text-[#201D18]">
                  <CheckCircle2 className="w-7 h-7" strokeWidth={2} />
                </div>
                <h4 className="font-serif text-lg font-semibold">
                  Request Confirmed
                </h4>
                <p className="text-sm text-[#FBF7F0]/90">
                  {result.message}
                </p>
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="mt-2 text-xs text-[#C17F3A] underline underline-offset-4 hover:text-[#FBF7F0]"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {result?.message && !result.success && (
                  <div
                    role="alert"
                    className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-800 text-xs flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{result.message}</span>
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <Label htmlFor="field-name">Patient Name *</Label>
                  <Input
                    id="field-name"
                    name="fullName"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sharma"
                    onFocus={handleInputFocus}
                    aria-invalid={!!result?.errors?.fullName}
                    aria-describedby={result?.errors?.fullName ? "name-error" : undefined}
                  />
                  {result?.errors?.fullName && (
                    <p id="name-error" className="text-xs text-red-600 mt-1 font-medium">
                      {result.errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <Label htmlFor="field-phone">Mobile Number (10 Digits) *</Label>
                  <Input
                    id="field-phone"
                    name="phone"
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="e.g. 9826012345"
                    onFocus={handleInputFocus}
                    aria-invalid={!!result?.errors?.phone}
                    aria-describedby={result?.errors?.phone ? "phone-error" : undefined}
                  />
                  {result?.errors?.phone && (
                    <p id="phone-error" className="text-xs text-red-600 mt-1 font-medium">
                      {result.errors.phone}
                    </p>
                  )}
                </div>

                {/* Service Selection */}
                <div>
                  <Label htmlFor="field-service">Speciality / Service Needed *</Label>
                  <select
                    id="field-service"
                    name="service"
                    required
                    defaultValue="retina-care"
                    onFocus={handleInputFocus}
                    className="flex min-h-[48px] w-full rounded-xl border border-[#7A8B7A]/40 bg-[#FBF7F0] px-4 py-2.5 text-base text-[#201D18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17F3A] focus-visible:ring-offset-2"
                  >
                    <option value="retina-care">Retina Care (Diabetic Retinopathy, Detachment)</option>
                    <option value="squint-correction">Squint Correction (Children & Adults)</option>
                    <option value="cataract-surgery">Cataract & Lens Surgery</option>
                    <option value="complete-checkup">Complete Eye Check-up & Pressure Test</option>
                    <option value="paediatric-care">Paediatric Eye Care & Lazy Eye</option>
                    <option value="emergency-care">Emergency Eye Care (Sudden Loss / Trauma)</option>
                  </select>
                </div>

                {/* Optional Message */}
                <div>
                  <Label htmlFor="field-message">Note / Symptoms (Optional)</Label>
                  <Textarea
                    id="field-message"
                    name="message"
                    placeholder="Briefly describe what you are experiencing..."
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-full bg-[#0E4D4C] text-[#FBF7F0] font-semibold text-base shadow-resting hover:bg-[#146362] hover:shadow-elevated transition-all disabled:opacity-60 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17F3A] focus-visible:ring-offset-2"
                >
                  <Phone className="w-4 h-4 text-[#C17F3A]" strokeWidth={2} />
                  <span>{isPending ? "Sending…" : "Request a Call Back"}</span>
                </button>

                {/* Thin Privacy Note */}
                <p className="text-center text-xs text-[#201D18]/70 pt-2">
                  {siteCopy.finalCta.privacyNote}
                </p>
              </form>
            )}
          </div>

          {/* Direct Phone Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-[#FBF7F0]/10 border border-[#FBF7F0]/20 backdrop-blur-md">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C17F3A] text-[#201D18] mb-6 shadow-resting">
                <Phone className="w-6 h-6" strokeWidth={2} />
              </div>

              <h3 className="font-serif text-xl font-semibold text-[#FBF7F0] mb-2">
                {siteCopy.finalCta.phoneCardTitle}
              </h3>
              <p className="text-xs md:text-sm text-[#FBF7F0]/80 mb-6 leading-relaxed">
                {siteCopy.finalCta.phoneCardNote}
              </p>

              <div className="p-4 rounded-xl bg-[#201D18]/40 border border-[#FBF7F0]/10 mb-6">
                <span className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#C17F3A] mb-1">
                  Direct Line
                </span>
                <a
                  href={siteCopy.contact.phoneTel}
                  className="font-serif text-2xl md:text-3xl font-bold text-[#FBF7F0] tracking-tight hover:text-[#C17F3A] transition-colors"
                >
                  {siteCopy.contact.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#FBF7F0]/70 pt-4 border-t border-[#FBF7F0]/15">
              <p>📍 121, Moti Bunglow Main Rd, Dewas</p>
              <p>⚡ Emergency consultations prioritized</p>
              <p>👨‍⚕️ All evaluations by Dr Sachin Malviya personally</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
