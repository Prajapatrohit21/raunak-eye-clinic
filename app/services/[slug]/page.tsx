import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteCopy } from "@/content/copy";
import { Phone, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, CalendarCheck } from "lucide-react";

const serviceDetails: Record<string, {
  heroImage: string;
  heroAlt: string;
  whatIs: string;
  whoNeeds: string[];
  procedure: string;
  recovery: string;
  metaTitle: string;
  metaDescription: string;
}> = {
  "retina-care": {
    heroImage: "/images/operating-microscope.png",
    heroAlt: "Ophthalmic laser microscope for retina treatment at Raunak Eye Care Hospital Dewas",
    metaTitle: "Retina Care in Dewas | Diabetic Retinopathy & Detachment | Raunak Eye Care Hospital",
    metaDescription: "Retina specialist Dr Sachin Malviya treats diabetic retinopathy, retinal detachment, and macular disease in Dewas. No need to travel to Indore.",
    whatIs: "The retina is the light-sensitive layer at the back of your eye. It converts what you see into signals your brain reads as images. When the retina is damaged — by diabetes, a tear, or swelling — vision blurs or disappears entirely. Early treatment can stop this process before permanent damage occurs.",
    whoNeeds: [
      "People with diabetes who have not had an eye check-up in over a year",
      "Anyone who notices sudden floaters, flashes, or a curtain across their vision",
      "Patients diagnosed with high blood pressure that affects the eyes",
      "Anyone with a family history of retinal detachment",
      "People with blurring that worsens over weeks despite updated glasses",
    ],
    procedure: "Dr Malviya examines the retina using a slit lamp and digital retinal imaging. Depending on findings, treatment may be laser barricade photocoagulation, anti-VEGF injections (medications to reduce macular swelling), or vitreoretinal surgery for detachments. Every option is explained clearly before any procedure.",
    recovery: "Laser and injection procedures are day-care — no overnight hospital stay. Surgical cases need 1–2 weeks of rest with positioning instructions. Dr Malviya explains the exact recovery plan for your specific case at consultation.",
  },
  "squint-correction": {
    heroImage: "/images/operation-theater.png",
    heroAlt: "Surgical team performing squint correction at Raunak Eye Care Hospital Dewas",
    metaTitle: "Squint Correction in Dewas | Children & Adults | Raunak Eye Care Hospital",
    metaDescription: "Squint surgeon Dr Sachin Malviya corrects eye misalignment in children and adults in Dewas. Glasses, vision therapy, and squint surgery available.",
    whatIs: "Squint — also called strabismus — means the two eyes do not point in the same direction. One eye may turn inward, outward, upward, or downward. This causes double vision, lazy eye (amblyopia), and reduced depth perception. It occurs in young children and adults alike and responds well to early treatment.",
    whoNeeds: [
      "Children whose eyes appear misaligned, crossed, or wandering",
      "Adults who notice eye turn after a stroke, injury, or nerve condition",
      "Anyone with diplopia (double vision) that appeared recently",
      "Children who frequently tilt or turn their head to see clearly",
      "Parents concerned about asymmetric eye contact in their infant",
    ],
    procedure: "Evaluation includes cover testing, cycloplegic refraction, and full ocular motility assessment. Treatment may be corrective glasses and eye patching, vision therapy exercises, or precise surgical adjustment of the eye muscles under general or local anaesthesia.",
    recovery: "Surgery is typically a day procedure. Mild redness and swelling settle within 1–2 weeks. Post-surgical glasses or continued therapy may be required. Dr Malviya schedules regular follow-ups to monitor alignment during the critical developmental period.",
  },
  "cataract-surgery": {
    heroImage: "/images/ultrasound-scanner.png",
    heroAlt: "A-scan biometry device for IOL power calculation at Raunak Eye Care Hospital Dewas",
    metaTitle: "Cataract Surgery in Dewas | Phacoemulsification & Premium IOLs | Raunak Eye Care Hospital",
    metaDescription: "Cataract surgeon Dr Sachin Malviya performs micro-incision phacoemulsification with premium IOLs in Dewas. Restore colour, depth, and clear night vision.",
    whatIs: "A cataract is a clouding of the natural lens inside your eye. It develops slowly and causes vision to become blurred, hazy, or washed out — especially at night. Left untreated, cataracts lead to complete vision loss. Surgery replaces the clouded lens with a clear intraocular lens (IOL) and typically restores functional sight the next day.",
    whoNeeds: [
      "Anyone whose vision blurs and affects reading, driving, or daily work",
      "People who see halos or glare around lights at night",
      "Diabetic patients whose cataract is progressing faster than usual",
      "Older adults whose glasses are no longer correcting vision adequately",
      "Anyone told by another doctor that cataract is the cause of their vision drop",
    ],
    procedure: "Micro-incision phacoemulsification (ultrasound fragmentation of the cataract) is performed through a self-sealing 2.2mm incision — no stitches needed in most cases. A premium IOL (monofocal, toric for astigmatism, or multifocal) is then inserted. The whole procedure takes approximately 15–20 minutes.",
    recovery: "Most patients notice improved vision the next morning. Normal indoor activities resume within 2–3 days. Driving is permitted after 1 week in most cases. Medicated eye drops are prescribed for 4–6 weeks. Dr Malviya personally reviews recovery at each post-operative visit.",
  },
  "complete-checkup": {
    heroImage: "/images/hospital-reception.png",
    heroAlt: "Patient registration desk for comprehensive eye examination at Raunak Eye Care Hospital Dewas",
    metaTitle: "Complete Eye Check-up in Dewas | Glaucoma Screening & Refraction | Raunak Eye Care Hospital",
    metaDescription: "Annual eye examination including refraction, glaucoma pressure test, and digital retinal imaging at Raunak Eye Care Hospital, Moti Bunglow Main Rd, Dewas.",
    whatIs: "A comprehensive eye check-up goes far beyond reading an eye chart. It examines every structure — cornea, lens, retina, and optic nerve — to detect conditions like glaucoma (raised eye pressure damaging the optic nerve), early cataract, diabetic retinal changes, and dry eye, all before they cause noticeable symptoms. In Dewas, prolonged screen use and dusty air make annual checks particularly important.",
    whoNeeds: [
      "Adults over 40 who have not had a detailed eye test in more than a year",
      "Diabetics — at minimum once a year regardless of whether vision is affected",
      "Anyone spending 6 or more hours daily on screens (screen-strain and dry eyes are common)",
      "Children starting school or struggling to see the classroom board",
      "Anyone with a family history of glaucoma, macular degeneration, or retinal disease",
    ],
    procedure: "The exam includes digital refraction (accurate spectacle power), slit lamp biomicroscopy, applanation tonometry (intraocular pressure measurement), and a dilated fundus examination with digital retinal imaging. Results are discussed in plain language by Dr Malviya on the same visit.",
    recovery: "No recovery needed for a routine check-up. The pupil-dilating drops used during retinal examination may blur near vision for 2–4 hours. Bring a pair of sunglasses for the journey home.",
  },
  "paediatric-care": {
    heroImage: "/images/operation-theater.png",
    heroAlt: "Paediatric ophthalmology team at Raunak Eye Care Hospital Dewas",
    metaTitle: "Paediatric Eye Care in Dewas | Lazy Eye & Squint | Raunak Eye Care Hospital",
    metaDescription: "Children's eye specialist Dr Sachin Malviya treats lazy eye (amblyopia), squint, and refractive errors in Dewas. Early care means a lifetime of better sight.",
    whatIs: "Children's eyes develop rapidly from birth through age 8. Uncorrected vision problems during this window can permanently limit sight — a condition called amblyopia (lazy eye). Raunak Eye Care Hospital detects and treats squint, refractive errors (short-sight, long-sight, astigmatism), amblyopia, and developmental eye disorders so that every child in Dewas has the best possible start.",
    whoNeeds: [
      "Children who sit too close to the TV or cannot read the school board clearly",
      "Kids who rub their eyes frequently or complain of headaches after reading",
      "Children with one eye that wanders, crosses, or is noticeably smaller",
      "School-age children whose teachers report difficulty reading or concentrating",
      "Newborns and infants with a family history of childhood eye problems",
    ],
    procedure: "Child-friendly examination using age-appropriate visual acuity charts, cycloplegic refraction (drops to measure accurate glasses power in children), and orthoptic assessment. Treatment is customised: glasses, occlusion therapy (eye patching for amblyopia), or surgical correction of squint as appropriate.",
    recovery: "Glasses and patching are non-invasive and started at home. Squint surgery (where indicated) is a short day procedure with a brief recovery period. Parents receive written post-operative instructions and follow-up appointments are scheduled through the developmental years.",
  },
  "emergency-care": {
    heroImage: "/images/operating-microscope.png",
    heroAlt: "Emergency surgical equipment at Raunak Eye Care Hospital Dewas",
    metaTitle: "Emergency Eye Care in Dewas | Same-Day Consultation | Raunak Eye Care Hospital",
    metaDescription: "Sudden vision loss, eye injuries, foreign body, chemical splash — call 079876 76544 immediately. Raunak Eye Care Hospital provides same-day emergency eye care in Dewas.",
    whatIs: "Sudden changes in vision, severe eye pain, chemical exposure, and ocular injuries are time-sensitive emergencies. Every hour of delay can increase the risk of permanent damage. Raunak Eye Care Hospital provides same-day priority assessment for all acute eye complaints — call 079876 76544 without waiting.",
    whoNeeds: [
      "Anyone who experiences sudden loss of vision in one or both eyes — do not wait overnight",
      "Industrial and construction workers with metallic or chemical foreign bodies (common in Dewas district)",
      "Chemical splash from cleaning agents, acids, pesticides, or lime",
      "Blunt trauma — a cricket ball, fall, or road accident involving the eye area",
      "Acute severe red eye with pain, photophobia (light sensitivity), or sudden discharge",
    ],
    procedure: "Immediate slit lamp examination, intraocular pressure measurement, and fluorescein staining to assess corneal damage. Foreign bodies are removed under local anaesthesia. Retinal, lens, and corneal involvement is assessed and treated or referred immediately as the situation requires.",
    recovery: "Minor foreign body removals and surface injuries are typically managed in a single visit. Severe trauma, perforating injuries, or retinal involvement may require urgent surgery. Dr Malviya guides every decision from the day of the injury.",
  },
};

export async function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const detail = serviceDetails[slug];
  if (!detail) return { title: "Service Not Found" };
  return {
    title: detail.metaTitle,
    description: detail.metaDescription,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = serviceDetails[slug];
  const offering = siteCopy.offerings.items.find((i) => i.id === slug);

  if (!detail || !offering) notFound();

  const allOtherServices = siteCopy.offerings.items.filter((i) => i.id !== slug);

  return (
    <main id="main-content">
      {/* Breadcrumb */}
      <div className="bg-[#E8D9C5]/50 border-b border-[#7A8B7A]/20 py-3">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#201D18]/70">
            <Link href="/" className="hover:text-[#0E4D4C] hover:underline">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#0E4D4C] hover:underline">Specialities</Link>
            <span>/</span>
            <span className="text-[#0E4D4C] font-medium">{offering.title}</span>
          </nav>
        </div>
      </div>

      {/* Service Hero */}
      <section className="bg-[#FBF7F0] py-12 md:py-20 border-b border-[#7A8B7A]/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <Link href="/services" className="inline-flex items-center gap-2 text-xs text-[#0E4D4C] font-semibold mb-4 hover:underline">
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
                All Specialities
              </Link>
              <span className="block type-kicker text-[#C17F3A] mb-2">Super-Speciality · Dewas</span>
              <h1 className="type-h1 font-serif font-semibold text-[#201D18] mb-5">
                {offering.title}
              </h1>
              <p className="type-body text-[#201D18]/85 mb-8 leading-relaxed">
                {offering.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/book-appointment"
                  className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-full bg-[#0E4D4C] text-[#FBF7F0] font-semibold text-sm shadow-resting hover:bg-[#146362] hover:-translate-y-0.5 hover:shadow-elevated transition-all"
                >
                  <CalendarCheck className="w-4 h-4 text-[#C17F3A]" strokeWidth={1.75} />
                  Book a Consultation
                </Link>
                <a
                  href="tel:+917987676544"
                  className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-full border border-[#0E4D4C] text-[#0E4D4C] font-semibold text-sm hover:bg-[#0E4D4C] hover:text-[#FBF7F0] transition-all"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.75} />
                  Call Hospital
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-resting border border-[#FBF7F0]">
                <Image
                  src={detail.heroImage}
                  alt={detail.heroAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-[#0E4D4C] opacity-75 mix-blend-multiply rounded-2xl" />
              </div>
              <div className="absolute bottom-4 left-4 bg-[#FBF7F0] rounded-xl px-4 py-3 shadow-elevated border border-[#7A8B7A]/20 max-w-[200px]">
                <span className="block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#C17F3A]">
                  Led personally by
                </span>
                <span className="font-serif text-sm font-semibold text-[#0E4D4C]">
                  Dr Sachin Malviya
                </span>
                <span className="block text-[10px] text-[#201D18]/70">Eye Surgeon · Dewas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid: What Is + Who Needs */}
      <section className="bg-[#FBF7F0] py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* What is this condition */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#E8D9C5]/40 border border-[#7A8B7A]/20">
              <h2 className="type-h3 font-serif font-semibold text-[#0E4D4C] mb-4">
                Understanding the condition
              </h2>
              <p className="text-sm md:text-base text-[#201D18]/90 leading-relaxed">
                {detail.whatIs}
              </p>
            </div>

            {/* Who needs it */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#FBF7F0] border border-[#7A8B7A]/30 shadow-resting">
              <h2 className="type-h3 font-serif font-semibold text-[#0E4D4C] mb-4">
                Who should consult for this
              </h2>
              <ul className="space-y-3">
                {detail.whoNeeds.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#201D18]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#C17F3A] shrink-0 mt-0.5" strokeWidth={1.75} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Procedure & Recovery */}
      <section className="bg-[#E8D9C5]/30 py-14 md:py-20 border-y border-[#7A8B7A]/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <span className="type-kicker text-[#C17F3A] block mb-2">The Procedure</span>
              <h2 className="type-h3 font-serif font-semibold text-[#201D18] mb-4">
                What to expect during treatment
              </h2>
              <p className="text-sm md:text-base text-[#201D18]/85 leading-relaxed">
                {detail.procedure}
              </p>
            </div>
            <div>
              <span className="type-kicker text-[#C17F3A] block mb-2">After Treatment</span>
              <h2 className="type-h3 font-serif font-semibold text-[#201D18] mb-4">
                Recovery and follow-up
              </h2>
              <p className="text-sm md:text-base text-[#201D18]/85 leading-relaxed">
                {detail.recovery}
              </p>
              <div className="mt-6 p-4 rounded-xl bg-[#0E4D4C]/10 border-l-4 border-[#0E4D4C]">
                <p className="text-sm font-semibold text-[#0E4D4C] font-serif italic">
                  "Our promise: every treatment plan is explained until it is clear."
                </p>
                <span className="text-xs text-[#201D18]/70 mt-1 block">— Dr Sachin Malviya</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-[#FBF7F0] py-14 md:py-20 border-b border-[#7A8B7A]/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="type-h3 font-serif font-semibold text-[#201D18] mb-8">
            Procedures within {offering.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {offering.capabilities.map((cap, i) => (
              <div key={i} className="flex items-start gap-3 p-5 rounded-xl bg-[#E8D9C5]/40 border border-[#7A8B7A]/20">
                <ShieldCheck className="w-5 h-5 text-[#0E4D4C] shrink-0 mt-0.5" strokeWidth={1.75} />
                <span className="text-sm text-[#201D18]/90 font-medium leading-snug">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="bg-[#0E4D4C] py-14">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="type-h2 font-serif font-semibold text-[#FBF7F0] mb-4">
            Book a consultation for {offering.title}
          </h2>
          <p className="text-sm text-[#FBF7F0]/85 mb-8 max-w-xl mx-auto">
            Dr Sachin Malviya evaluates and treats all cases personally at 121, Moti Bunglow Main Rd, opposite SBI, Dewas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 min-h-[48px] px-8 rounded-full bg-[#C17F3A] text-[#201D18] font-bold text-sm shadow-resting hover:bg-[#D48F47] transition-all"
            >
              <CalendarCheck className="w-4 h-4" strokeWidth={2} />
              Book an Appointment
            </Link>
            <a
              href="tel:+917987676544"
              className="inline-flex items-center gap-2 min-h-[48px] px-8 rounded-full border border-[#FBF7F0]/40 text-[#FBF7F0] font-semibold text-sm hover:border-[#FBF7F0] hover:bg-[#FBF7F0]/10 transition-all"
            >
              <Phone className="w-4 h-4 text-[#C17F3A]" strokeWidth={1.75} />
              Call 079876 76544
            </a>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-[#FBF7F0] py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="type-h3 font-serif font-semibold text-[#201D18] mb-8">
            Other specialities at Raunak Eye Care Hospital
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allOtherServices.slice(0, 3).map((svc) => (
              <Link
                key={svc.id}
                href={`/services/${svc.id}`}
                className="group flex flex-col p-5 rounded-xl border border-[#7A8B7A]/30 bg-[#FBF7F0] hover:border-[#0E4D4C] hover:shadow-resting transition-all"
              >
                <span className="font-serif text-base font-semibold text-[#201D18] group-hover:text-[#0E4D4C] mb-2">
                  {svc.title}
                </span>
                <span className="text-xs text-[#201D18]/70 leading-relaxed">{svc.description}</span>
                <span className="mt-3 text-xs font-semibold text-[#C17F3A] flex items-center gap-1">
                  Read more <ArrowRight className="w-3 h-3" strokeWidth={2} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
