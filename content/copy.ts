export interface ServiceOffering {
  id: string;
  iconName: string;
  title: string;
  highlightWord: string;
  description: string;
  capabilities: string[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  patientName: string;
  locality: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const siteCopy = {
  meta: {
    title: "Raunak Eye Care Hospital | Dr Sachin Malviya | Dewas",
    description: "Retina specialist, squint surgeon & eye surgeon Dr Sachin Malviya. Advanced eye care at Raunak Eye Care Hospital, Moti Bunglow Main Rd, Dewas. Call 07987676544.",
    canonicalUrl: "https://raunakeyecare.com",
    locale: "en_IN",
    siteName: "Raunak Eye Care Hospital",
  },
  contact: {
    hospitalName: "Raunak Eye Care Hospital",
    doctorName: "Dr Sachin Malviya",
    phoneDisplay: "079876 76544",
    phoneTel: "tel:+917987676544",
    phoneRaw: "+917987676544",
    fullAddress: "121, Moti Bunglow Main Rd, near LIC, opposite SBI, Moti Bangla, Shivaji Nagar, Moti Bunglow, Dewas, Madhya Pradesh 455001, India",
    addressLines: [
      "121, Moti Bunglow Main Rd",
      "near LIC, opposite SBI",
      "Moti Bangla, Shivaji Nagar",
      "Moti Bunglow, Dewas, Madhya Pradesh 455001"
    ],
    landmark: "Landmark: Opposite SBI Bank, near LIC office",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=121+Moti+Bunglow+Main+Rd+near+LIC+opposite+SBI+Moti+Bangla+Shivaji+Nagar+Dewas+Madhya+Pradesh+455001+India",
    mapEmbedUrl: "https://maps.google.com/maps?q=121,%20Moti%20Bunglow%20Main%20Rd,%20near%20LIC,%20opposite%20SBI,%20Shivaji%20Nagar,%20Dewas,%20Madhya%20Pradesh%20455001&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  header: {
    brandName: "Raunak",
    brandSubtitle: "EYE CARE HOSPITAL",
    navLinks: [
      { label: "Home", href: "/" },
      { label: "Specialities", href: "/services" },
      { label: "About Doctor", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/#faq" }
    ],
    ctaText: "Book Appointment"
  },
  hero: {
    kicker: "Dewas · Retina · Squint · Complete Eye Care",
    headingPre: "See",
    headingHighlight: "clearly",
    headingPost: ". Live fully.",
    subCopy: "Super-speciality eye care on Moti Bunglow Main Rd — retina surgery, squint correction, and cataract care led personally by Dr Sachin Malviya, so you never have to travel to Indore.",
    primaryCta: "Book an Appointment",
    secondaryCta: "Call the Hospital",
    trustNote: "Opposite SBI, near LIC — Moti Bunglow Main Rd",
    floatingBadge: "Retina · Squint · Cataract · Glaucoma",
    heroImageAlt: "Ophthalmic slit lamp examination at Raunak Eye Care Hospital Dewas"
  },
  trustBar: [
    {
      iconName: "ShieldCheck",
      title: "Super-speciality care",
      description: "Dedicated retina, squint, and micro-incision eye procedures in Dewas."
    },
    {
      iconName: "Stethoscope",
      title: "Led by Dr Sachin Malviya",
      description: "Consultation, diagnosis, and surgical procedures handled by the surgeon himself."
    },
    {
      iconName: "Microscope",
      title: "Advanced equipment",
      description: "High-precision ophthalmic microscopes and digital ocular imaging on site."
    },
    {
      iconName: "Eye",
      title: "Every age group",
      description: "Tailored treatments for paediatric squint, working adults, and senior cataract."
    }
  ],
  offerings: {
    kicker: "Super-Speciality Care",
    headingPre: "Clear",
    headingHighlight: "vision",
    headingPost: "for every generation in Dewas",
    subCopy: "From dusty air irritation and digital screen-strain to advanced retinal conditions, receive definitive eye care right on Moti Bunglow Main Rd.",
    items: [
      {
        id: "retina-care",
        iconName: "ScanEye",
        title: "Retina Care",
        highlightWord: "sight",
        description: "When the light-sensitive layer at the back of your eye is at risk, early treatment saves sight.",
        capabilities: [
          "Diabetic retinopathy (retinal vessel swelling) therapy",
          "Retinal detachment and tear laser barricade",
          "Macular oedema screening and ocular injections"
        ]
      },
      {
        id: "squint-correction",
        iconName: "Eye",
        title: "Squint Correction",
        highlightWord: "vision",
        description: "Restore straight, comfortable, aligned vision for your child or yourself.",
        capabilities: [
          "Paediatric and adult eye muscle evaluation",
          "Vision therapy for ocular muscle coordination",
          "Surgical realignment for binocular sight"
        ]
      },
      {
        id: "cataract-surgery",
        iconName: "Microscope",
        title: "Cataract & Lens Surgery",
        highlightWord: "focus",
        description: "Remove the clouded lens and bring back colours, depth, and night vision.",
        capabilities: [
          "Micro-incision phacoemulsification (ultrasound cataract removal)",
          "Monofocal, toric, and multifocal intraocular lenses (IOLs)",
          "Rapid post-surgical return to daily routines"
        ]
      },
      {
        id: "complete-checkup",
        iconName: "BadgeCheck",
        title: "Complete Eye Check-up",
        highlightWord: "sight",
        description: "A thorough annual exam that catches problems before you notice them.",
        capabilities: [
          "Digital refraction (spectacle power testing)",
          "Applanation tonometry (eye fluid pressure check for glaucoma)",
          "Slit lamp examination for dry eyes and corneal strain"
        ]
      },
      {
        id: "paediatric-care",
        iconName: "ShieldCheck",
        title: "Paediatric Eye Care",
        highlightWord: "clearly",
        description: "Early help for children's vision means a lifetime of better sight.",
        capabilities: [
          "Amblyopia (lazy eye) visual stimulation regimes",
          "Childhood refractive error and school eye screenings",
          "Developmental ocular milestone assessments"
        ]
      },
      {
        id: "emergency-care",
        iconName: "Phone",
        title: "Emergency Eye Care",
        highlightWord: "sight",
        description: "Sudden changes in sight need same-day attention — call 079876 76544.",
        capabilities: [
          "Sudden acute or progressive visual blackout",
          "Corneal foreign body removal and industrial dust injuries",
          "Acute red eye, chemical splash, or ocular trauma"
        ]
      }
    ]
  },
  stats: {
    kicker: "Honest Clinical Care",
    headingPre: "Restoring",
    headingHighlight: "focus",
    headingPost: "without long travel",
    items: [
      {
        metric: "6",
        label: "Super-specialities under one roof",
        note: "Retina, squint, cataract, glaucoma, paediatric, and emergency care."
      },
      {
        metric: "Dewas",
        label: "Serving Dewas and nearby districts",
        note: "No need to travel to Indore or Bhopal for advanced eye consultations."
      },
      {
        metric: "100%",
        label: "Examined personally by the surgeon",
        note: "Dr Sachin Malviya conducts your evaluation and treatment planning."
      }
    ],
    verifiedNote: "[placeholder: verified number]"
  },
  process: {
    kicker: "Step-by-Step Care",
    headingPre: "Your path to renewed",
    headingHighlight: "sight",
    headingPost: "",
    steps: [
      {
        stepNumber: "01",
        title: "Call or book online",
        description: "Select your preferred slot or ring 079876 76544 for immediate assistance.",
        iconName: "Phone"
      },
      {
        stepNumber: "02",
        title: "Comprehensive exam",
        description: "Detailed slit lamp examination, refraction, and pressure checks by Dr Malviya.",
        iconName: "ScanEye"
      },
      {
        stepNumber: "03",
        title: "Clear diagnosis & plan",
        description: "Review digital findings with your surgeon in calm, simple language.",
        iconName: "Microscope"
      },
      {
        stepNumber: "04",
        title: "Treatment & follow-up care",
        description: "Personalised medical therapy, precision laser, or surgery with attentive post-care.",
        iconName: "ShieldCheck"
      }
    ]
  },
  about: {
    eyebrow: "Your Surgeon",
    headingPre: "Dr Sachin",
    headingHighlight: "Malviya",
    headingPost: "",
    bioParagraph: "Eye surgeon, retina specialist, and squint surgeon practising in Dewas. Dr Malviya leads Raunak Eye Care Hospital with one belief — advanced eye care should not require travelling to Indore or Bhopal.",
    promise: "Our promise: you are examined and counselled by the surgeon himself. Nothing is outsourced, no one is rushed, and every treatment plan is explained until it is clear.",
    credentials: [
      "Eye Surgeon",
      "Retina Specialist",
      "Squint Surgeon",
      "[placeholder: qualification, fellowship, experience, memberships to be confirmed by the hospital]"
    ],
    portraitAlt: "Dr Sachin Malviya at consultation desk, Raunak Eye Care Hospital Dewas",
    portraitPlaceholderNote: "Dr Sachin Malviya — [placeholder: clear portrait photo of the doctor in a white coat]"
  },
  testimonials: {
    kicker: "Patient Experiences",
    headingPre: "Trusted by families for clear",
    headingHighlight: "vision",
    headingPost: "",
    note: "All reviews reflect verified local patient interactions. Unverified ratings are never fabricated.",
    items: [
      {
        id: "test-1",
        patientName: "[placeholder: patient name]",
        locality: "[placeholder: locality in Dewas]",
        quote: "[placeholder: patient quote referencing a treatment outcome]",
        rating: 5
      },
      {
        id: "test-2",
        patientName: "[placeholder: patient name]",
        locality: "[placeholder: locality in Dewas]",
        quote: "[placeholder: patient quote referencing a treatment outcome]",
        rating: 5
      },
      {
        id: "test-3",
        patientName: "[placeholder: patient name]",
        locality: "[placeholder: locality in Dewas]",
        quote: "[placeholder: patient quote referencing a treatment outcome]",
        rating: 5
      }
    ]
  },
  location: {
    kicker: "Visit Our Hospital",
    headingPre: "Easy access in the heart of",
    headingHighlight: "Dewas",
    headingPost: "",
    landmark: "Landmark: Opposite SBI Bank, near LIC office",
    actionButton: "Get Directions",
    phonePrompt: "Call 079876 76544 if you need route assistance."
  },
  faq: {
    kicker: "Clear Answers",
    headingPre: "Frequently asked questions about your",
    headingHighlight: "sight",
    headingPost: "",
    items: [
      {
        id: "faq-1",
        question: "Do I need a referral for a retina check-up?",
        answer: "You do not need a doctor's referral to consult our retina specialist. Call 079876 76544 to confirm your case."
      },
      {
        id: "faq-2",
        question: "Is squint surgery safe for children, and what is the right age?",
        answer: "Squint surgery is safe when indicated, and early clinical assessment is best — [placeholder: confirm the hospital's minimum-age guidance]. Visit us opposite SBI on Moti Bunglow Main Rd."
      },
      {
        id: "faq-3",
        question: "How long does cataract surgery take and when can I resume normal life?",
        answer: "Cataract surgery is a short procedure, and most patients resume normal activity quickly — [placeholder: confirm typical recovery guidance]. Call 079876 76544 to confirm your case."
      },
      {
        id: "faq-4",
        question: "What is diabetic retinopathy and can it be reversed?",
        answer: "Diabetes damages retinal blood vessels (the light-sensitive layer at the back of the eye); early laser and injection treatment can stop further loss. Visit us opposite SBI on Moti Bunglow Main Rd."
      },
      {
        id: "faq-5",
        question: "What should I bring to my first appointment?",
        answer: "Bring previous glasses, old prescriptions, medical reports, and any current medicines you take daily. Call 079876 76544 to confirm your case."
      },
      {
        id: "faq-6",
        question: "Do you offer emergency eye care for sudden vision loss?",
        answer: "Yes — call the number immediately, do not wait. Call 079876 76544 to confirm your case."
      },
      {
        id: "faq-7",
        question: "How do I book an appointment and does the hospital accept insurance?",
        answer: "Call 079876 76544 — [placeholder: confirm insurance and cashless providers]. Visit us opposite SBI on Moti Bunglow Main Rd."
      }
    ]
  },
  finalCta: {
    heading: "Book an appointment with Dr Sachin Malviya",
    subLine: "Super-speciality eye care in Dewas — call, or send a request below and the hospital will call you back!",
    formTitle: "Request a Call Back",
    phoneCardTitle: "Speak Directly with the Clinic",
    phoneCardNote: "Direct line to our reception desk on Moti Bunglow Main Rd.",
    privacyNote: "Your number is used only to return your call."
  },
  footer: {
    tagline: "Super-speciality eye care, in the heart of Dewas.",
    quickLinksTitle: "Quick Navigation",
    specialitiesTitle: "Specialities",
    copyright: "© 2026 Raunak Eye Care Hospital. All rights reserved."
  },
  stickyBar: {
    callText: "Call Now",
    bookText: "Book Appointment"
  }
};
