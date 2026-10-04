"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { requestCallback, ActionResult } from "@/lib/actions";
import { trackEvent } from "@/lib/analytics";
import { Phone, CheckCircle2, AlertCircle, CalendarCheck, MapPin, ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BookAppointmentPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackEvent("form_submit", { target: "book_appointment_page" });
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await requestCallback(null, formData);
      setResult(res);
    });
  };

  const handleInputFocus = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("form_start", { formId: "book-appointment-page" });
    }
  };

  return (
    <main id="main-content">
      {/* Breadcrumb */}
      <div className="bg-[#E8D9C5]/50 border-b border-[#7A8B7A]/20 py-3">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#201D18]/70">
            <Link href="/" className="hover:text-[#0E4D4C] hover:underline">Home</Link>
            <span>/</span>
            <span className="text-[#0E4D4C] font-medium">Book Appointment</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0E4D4C] text-[#FBF7F0] py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <span className="type-kicker text-[#C17F3A] block mb-2">Direct Appointment</span>
          <h1 className="type-h1 font-serif font-semibold text-[#FBF7F0] mb-4">
            Book a{" "}
            <span className="italic text-[#C17F3A] font-normal">consultation</span>
          </h1>
          <p className="type-body text-[#FBF7F0]/85 max-w-2xl mx-auto">
            Fill the form below and Raunak Eye Care Hospital will call you back to confirm your appointment with Dr Sachin Malviya.
          </p>
        </div>
      </section>

      {/* Main Form + Info */}
      <section className="bg-[#FBF7F0] py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Appointment Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#FBF7F0] border border-[#7A8B7A]/30 rounded-2xl p-6 md:p-10 shadow-resting">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-[#0E4D4C] flex items-center justify-center shrink-0">
                    <CalendarCheck className="w-5 h-5 text-[#C17F3A]" strokeWidth={1.75} />
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-[#0E4D4C]">
                    Request a Call Back
                  </h2>
                </div>
                <p className="text-xs md:text-sm text-[#201D18]/70 mb-7 pl-[52px]">
                  Enter your mobile number. The hospital reception will call you to confirm your appointment slot with Dr Malviya.
                </p>

                {result?.success ? (
                  <div
                    role="status"
                    className="p-8 rounded-xl bg-[#0E4D4C] text-[#FBF7F0] flex flex-col items-center gap-3 text-center"
                  >
                    <div className="h-14 w-14 rounded-full bg-[#C17F3A] flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-[#201D18]" strokeWidth={2} />
                    </div>
                    <h3 className="font-serif text-xl font-semibold">Appointment Request Confirmed</h3>
                    <p className="text-sm text-[#FBF7F0]/90">{result.message}</p>
                    <button
                      type="button"
                      onClick={() => setResult(null)}
                      className="mt-2 text-xs text-[#C17F3A] underline underline-offset-4 hover:text-[#FBF7F0]"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {result?.message && !result.success && (
                      <div
                        role="alert"
                        className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-800 text-xs flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{result.message}</span>
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <Label htmlFor="book-name">Patient Name *</Label>
                      <Input
                        id="book-name"
                        name="fullName"
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar Sharma"
                        onFocus={handleInputFocus}
                        aria-invalid={!!result?.errors?.fullName}
                        aria-describedby={result?.errors?.fullName ? "book-name-error" : undefined}
                      />
                      {result?.errors?.fullName && (
                        <p id="book-name-error" className="text-xs text-red-600 mt-1 font-medium">
                          {result.errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="book-phone">Mobile Number (10 digits) *</Label>
                      <Input
                        id="book-phone"
                        name="phone"
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="e.g. 9826012345"
                        onFocus={handleInputFocus}
                        aria-invalid={!!result?.errors?.phone}
                        aria-describedby={result?.errors?.phone ? "book-phone-error" : undefined}
                      />
                      {result?.errors?.phone && (
                        <p id="book-phone-error" className="text-xs text-red-600 mt-1 font-medium">
                          {result.errors.phone}
                        </p>
                      )}
                      <p className="text-xs text-[#201D18]/60 mt-1">
                        Your number is used only to return your call.
                      </p>
                    </div>

                    {/* Service */}
                    <div>
                      <Label htmlFor="book-service">Speciality / Reason for Visit *</Label>
                      <select
                        id="book-service"
                        name="service"
                        required
                        defaultValue="complete-checkup"
                        onFocus={handleInputFocus}
                        className="flex min-h-[48px] w-full rounded-xl border border-[#7A8B7A]/40 bg-[#FBF7F0] px-4 py-2.5 text-base text-[#201D18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17F3A] focus-visible:ring-offset-2"
                      >
                        <option value="retina-care">Retina Care — Diabetic Retinopathy, Detachment</option>
                        <option value="squint-correction">Squint Correction — Children or Adults</option>
                        <option value="cataract-surgery">Cataract & Lens Surgery</option>
                        <option value="complete-checkup">Complete Eye Check-up & Prescription</option>
                        <option value="paediatric-care">Paediatric Eye Care & Lazy Eye</option>
                        <option value="emergency-care">Emergency Eye Care — Sudden Change or Injury</option>
                      </select>
                    </div>

                    {/* Age (optional) */}
                    <div>
                      <Label htmlFor="book-age">Patient Age (optional)</Label>
                      <Input
                        id="book-age"
                        name="message"
                        type="text"
                        placeholder="e.g. 45 years — or describe symptoms briefly"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full min-h-[52px] inline-flex items-center justify-center gap-2 rounded-full bg-[#0E4D4C] text-[#FBF7F0] font-semibold text-base shadow-resting hover:bg-[#146362] hover:shadow-elevated transition-all disabled:opacity-60 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17F3A] focus-visible:ring-offset-2"
                    >
                      <Phone className="w-5 h-5 text-[#C17F3A]" strokeWidth={2} />
                      <span>{isPending ? "Sending request…" : "Request a Call Back"}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5 space-y-5">
              {/* Direct Phone Card */}
              <div className="p-6 rounded-2xl bg-[#0E4D4C] text-[#FBF7F0] shadow-resting">
                <div className="h-11 w-11 rounded-xl bg-[#C17F3A] flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-[#201D18]" strokeWidth={2} />
                </div>
                <h2 className="font-serif text-lg font-semibold mb-1">Prefer to call directly?</h2>
                <p className="text-xs text-[#FBF7F0]/80 mb-4">
                  Our reception is available during clinic hours to schedule your appointment immediately.
                </p>
                <a
                  href="tel:+917987676544"
                  className="block font-serif text-2xl font-bold text-[#FBF7F0] hover:text-[#C17F3A] transition-colors tracking-tight"
                >
                  079876 76544
                </a>
              </div>

              {/* Address Card */}
              <div className="p-6 rounded-2xl bg-[#E8D9C5] border border-[#7A8B7A]/30 shadow-resting">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-[#0E4D4C] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#C17F3A]" strokeWidth={1.75} />
                  </div>
                  <h2 className="font-serif text-base font-semibold text-[#0E4D4C]">Hospital Address</h2>
                </div>
                <address className="not-italic text-sm text-[#201D18]/85 leading-relaxed">
                  121, Moti Bunglow Main Rd<br />
                  near LIC, opposite SBI<br />
                  Moti Bangla, Shivaji Nagar<br />
                  Moti Bunglow, Dewas<br />
                  Madhya Pradesh 455001
                </address>
                <p className="text-xs font-semibold text-[#0E4D4C] mt-3">
                  Opposite SBI Bank, near LIC office
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=121+Moti+Bunglow+Main+Rd+near+LIC+opposite+SBI+Dewas+Madhya+Pradesh+455001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#0E4D4C] hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>

              {/* What to Bring */}
              <div className="p-6 rounded-2xl bg-[#FBF7F0] border border-[#7A8B7A]/30 shadow-resting">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-[#0E4D4C] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#C17F3A]" strokeWidth={1.75} />
                  </div>
                  <h2 className="font-serif text-base font-semibold text-[#0E4D4C]">What to bring</h2>
                </div>
                <ul className="space-y-2 text-xs text-[#201D18]/80">
                  {[
                    "Previous spectacles or contact lenses",
                    "Old eye prescriptions or reports",
                    "Medical test results (blood sugar, BP if known)",
                    "List of medicines you currently take",
                    "For children: school report card or teacher's concern note",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C17F3A] shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Services Quick Links */}
      <section className="bg-[#E8D9C5]/30 py-14 border-t border-[#7A8B7A]/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="type-h3 font-serif font-semibold text-[#201D18] mb-6">
            Browse our specialities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { href: "/services/retina-care", label: "Retina Care" },
              { href: "/services/squint-correction", label: "Squint Correction" },
              { href: "/services/cataract-surgery", label: "Cataract Surgery" },
              { href: "/services/complete-checkup", label: "Eye Check-up" },
              { href: "/services/paediatric-care", label: "Paediatric Care" },
              { href: "/services/emergency-care", label: "Emergency Care" },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center justify-center text-center min-h-[52px] px-4 rounded-xl border border-[#7A8B7A]/30 bg-[#FBF7F0] text-xs font-semibold text-[#0E4D4C] hover:bg-[#0E4D4C] hover:text-[#FBF7F0] transition-all shadow-resting"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
