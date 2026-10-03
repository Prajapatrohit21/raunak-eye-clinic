import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteCopy } from "@/content/copy";
import {
  ScanEye, Eye, Microscope, BadgeCheck, ShieldCheck, Phone, ArrowRight, CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Eye Care Specialities in Dewas | Raunak Eye Care Hospital",
  description: "Retina care, squint correction, cataract surgery, paediatric eye care and emergency eye treatment in Dewas, Madhya Pradesh. Led by Dr Sachin Malviya.",
};

const offeringIcons: Record<string, React.ElementType> = {
  ScanEye, Eye, Microscope, BadgeCheck, ShieldCheck, Phone,
};

const serviceDetails: Record<string, { 
  heroImage: string;
  heroAlt: string;
  whatIs: string;
  whoNeeds: string[];
  procedure: string;
  recovery: string;
}> = {
  "retina-care": {
    heroImage: "/images/operating-microscope.png",
    heroAlt: "Ophthalmic laser equipment for retina treatment at Raunak Eye Care Hospital Dewas",
    whatIs: "The retina is the light-sensitive layer at the back of your eye. It converts what you see into signals that your brain reads as images. When the retina is damaged — by diabetes, a tear, or swelling — vision blurs or disappears entirely. Early treatment can stop this.",
    whoNeeds: ["People with diabetes who have not had an eye check-up in over a year", "Anyone who notices sudden floaters, flashes, or a curtain across their vision", "Patients diagnosed with high blood pressure that affects the eyes", "Anyone with a family history of retinal detachment"],
    procedure: "Dr Malviya examines the retina using a slit lamp and digital imaging. Depending on findings, treatment may be laser barricade, anti-VEGF injections (medications to reduce swelling), or surgery for detachments.",
    recovery: "Laser and injection procedures are day-care — no hospital stay. Surgical cases need short-term rest. Dr Malviya explains the exact recovery for your case at consultation.",
  },
  "squint-correction": {
    heroImage: "/images/operation-theater.png",
    heroAlt: "Squint correction surgical team at Raunak Eye Care Hospital Dewas",
    whatIs: "Squint (strabismus) means the two eyes do not point in the same direction. One eye may turn inward, outward, upward, or downward. This can cause double vision, lazy eye (amblyopia), and reduced depth perception. It occurs in children and adults.",
    whoNeeds: ["Children whose eyes appear misaligned or crossed", "Adults who notice eye turn after a stroke, injury, or nerve problem", "Anyone with diplopia (double vision)", "Children who frequently tilt or turn their head to see clearly"],
    procedure: "Evaluation includes cover testing, refraction, and ocular motility assessment. Treatment may be glasses and patching, vision therapy, or precise surgical tightening and loosening of the eye muscles under general or local anaesthesia.",
    recovery: "Surgery is typically a day procedure. Mild redness and swelling settle within 1–2 weeks. Post-surgical glasses or therapy may be needed — Dr Malviya monitors closely at each follow-up visit.",
  },
  "cataract-surgery": {
    heroImage: "/images/ultrasound-scanner.png",
    heroAlt: "Ophthalmic A-scan biometry at Raunak Eye Care Hospital Dewas for cataract IOL planning",
    whatIs: "A cataract is a clouding of the natural lens inside your eye. It develops slowly and causes vision to become blurred, hazy, or washed out — especially at night. Cataract surgery replaces the clouded lens with a clear intraocular lens (IOL).",
    whoNeeds: ["Anyone whose vision is blurring and affects reading, driving, or daily work", "People who see halos or glare around lights at night", "Diabetic patients whose cataract is progressing faster than usual", "Older adults whose glasses are no longer correcting vision adequately"],
    procedure: "Micro-incision phacoemulsification breaks the cataract using ultrasound through a small incision — no stitches needed in most cases. A premium IOL (monofocal, toric, or multifocal) is then inserted. The whole procedure takes 15–20 minutes.",
    recovery: "Most patients see improvement the next morning. Normal activities resume within a few days. Drops are prescribed for 4–6 weeks. Dr Malviya personally checks recovery at each post-operative visit.",
  },
  "complete-checkup": {
    heroImage: "/images/hospital-reception.png",
    heroAlt: "Patient at reception waiting for comprehensive eye examination at Raunak Eye Care Hospital Dewas",
    whatIs: "A comprehensive eye check-up goes beyond reading an eye chart. It examines every structure of the eye — cornea, lens, retina, and optic nerve — to catch conditions like glaucoma, diabetic changes, and dry eye before they cause permanent damage.",
    whoNeeds: ["Adults over 40 who have not had an eye test in more than a year", "Diabetics — at least once a year regardless of symptoms", "Anyone spending 6+ hours daily on screens (screen-strain and dry eyes are common in Dewas)", "Children starting school or struggling to read the board", "Anyone with a family history of glaucoma"],
    procedure: "Refraction (spectacle power test), slit lamp examination, intraocular pressure measurement (tonometry for glaucoma), and digital retinal imaging. Results explained same day by Dr Malviya.",
    recovery: "No recovery needed. Drops used during the dilated fundus exam may blur your near vision for 2–4 hours. Bring sunglasses for afterwards.",
  },
  "paediatric-care": {
    heroImage: "/images/operation-theater.png",
    heroAlt: "Paediatric eye examination team at Raunak Eye Care Hospital Dewas",
    whatIs: "Children's eyes develop rapidly from birth to age 8. Uncorrected vision problems during this window can permanently reduce sight. Paediatric eye care at Raunak Eye Care Hospital detects and treats squint, lazy eye, refractive errors, and developmental disorders early.",
    whoNeeds: ["Children who sit too close to the TV or board at school", "Kids who rub their eyes frequently or complain of headaches after reading", "Children with one eye that wanders or turns", "School-age children whose teachers report difficulty reading or concentrating", "Newborns with a family history of childhood eye problems"],
    procedure: "Child-friendly examination using age-appropriate charts, cycloplegic refraction (drops to relax the eye's focusing), and orthoptic assessment. Glasses, eye patches (for amblyopia), or surgery are planned based on findings.",
    recovery: "Glasses and patching are non-invasive. Surgical cases (such as squint) are short procedures explained fully to parents before consent. Follow-up is scheduled regularly through the critical developmental years.",
  },
  "emergency-care": {
    heroImage: "/images/operating-microscope.png",
    heroAlt: "Emergency ophthalmic care at Raunak Eye Care Hospital Dewas",
    whatIs: "Sudden vision changes, eye injuries, and acute infections are emergencies. Delay worsens the outcome. Raunak Eye Care Hospital provides same-day evaluation for any acute eye complaint — call 079876 76544 immediately.",
    whoNeeds: ["Anyone who experiences sudden loss of vision in one or both eyes", "Industrial or construction workers with foreign bodies in the eye (common in Dewas)", "Chemical splash from cleaning agents, acids, or pesticides", "Blunt trauma — a cricket ball, fist, or road accident involving the eye", "Severe red eye with pain, discharge, or sensitivity to light that started suddenly"],
    procedure: "Immediate slit lamp examination, intraocular pressure check, and foreign body removal under local anaesthesia if required. Trauma cases are assessed for retinal, lens, and corneal involvement.",
    recovery: "Depends on the injury. Minor foreign bodies are treated in a single visit. Severe trauma may require surgery. Dr Malviya guides every step from the same day of injury.",
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content">
      {/* Page Hero */}
      <section className="bg-[#0E4D4C] text-[#FBF7F0] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block type-kicker text-[#C17F3A] mb-3">
            Super-Speciality Eye Care · Dewas
          </span>
          <h1 className="type-h1 font-serif font-semibold text-[#FBF7F0] mb-5">
            Our{" "}
            <span className="italic text-[#C17F3A] font-normal">specialities</span>
          </h1>
          <p className="type-body text-[#FBF7F0]/85 max-w-2xl mx-auto mb-8">
            Retina surgery, squint correction, cataract removal, and complete eye care — all at Moti Bunglow Main Rd, Dewas. No need to travel to Indore or Bhopal.
          </p>
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2 min-h-[48px] px-8 py-3 rounded-full bg-[#C17F3A] text-[#201D18] font-bold text-sm shadow-resting hover:bg-[#D48F47] transition-all"
          >
            Book an Appointment
          </Link>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="bg-[#FBF7F0] py-16 md:py-24" aria-labelledby="all-services-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 id="all-services-heading" className="sr-only">All Specialities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteCopy.offerings.items.map((item) => {
              const Icon = offeringIcons[item.iconName] || Eye;
              const details = serviceDetails[item.id];
              return (
                <div
                  key={item.id}
                  className="flex flex-col justify-between bg-[#FBF7F0] border border-[#7A8B7A]/30 rounded-2xl p-6 md:p-8 shadow-resting hover:shadow-elevated hover:-translate-y-1 transition-all group"
                >
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8D9C5] mb-5 transition-colors group-hover:bg-[#0E4D4C]">
                      <Icon className="w-7 h-7 text-[#0E4D4C] group-hover:text-[#C17F3A] transition-colors" strokeWidth={1.75} />
                    </div>
                    <h2 className="font-serif text-xl font-semibold text-[#201D18] mb-3">
                      {item.title}
                    </h2>
                    <p className="text-sm text-[#201D18]/80 leading-relaxed mb-5">
                      {item.description}
                    </p>
                    <ul className="space-y-2 border-t border-[#7A8B7A]/20 pt-4 mb-6">
                      {item.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#201D18]/80">
                          <CheckCircle2 className="w-4 h-4 text-[#C17F3A] shrink-0 mt-0.5" strokeWidth={1.75} />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/services/${item.id}`}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-full border border-[#0E4D4C] text-[#0E4D4C] text-xs font-semibold px-5 hover:bg-[#0E4D4C] hover:text-[#FBF7F0] transition-all"
                  >
                    <span>Read about {item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#E8D9C5] py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="type-h3 font-serif font-semibold text-[#0E4D4C] mb-2">
              Not sure which speciality you need?
            </h2>
            <p className="text-sm text-[#201D18]/80">Call us — we will guide you to the right consultation.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:+917987676544"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 rounded-full bg-[#0E4D4C] text-[#FBF7F0] font-semibold text-sm shadow-resting hover:bg-[#146362] transition-all"
            >
              <Phone className="w-4 h-4 text-[#C17F3A]" strokeWidth={1.75} />
              <span>Call 079876 76544</span>
            </a>
            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-full border border-[#0E4D4C] text-[#0E4D4C] font-semibold text-sm hover:bg-[#0E4D4C] hover:text-[#FBF7F0] transition-all"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
