import React from "react";
import { siteCopy } from "@/content/copy";

export function JsonLdSchema() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Physician"],
    name: "Raunak Eye Care Hospital",
    medicalSpecialty: "Ophthalmologic",
    image: "https://raunakeyecare.com/images/dr-sachin-malviya.png",
    telephone: "+91 79876 76544",
    priceRange: "₹₹",
    url: siteCopy.meta.canonicalUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "121, Moti Bunglow Main Rd, near LIC, opposite SBI, Moti Bangla, Shivaji Nagar",
      addressLocality: "Dewas",
      addressRegion: "Madhya Pradesh",
      postalCode: "455001",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        description: "[placeholder: verified clinic hours]",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      description: "[placeholder: real latitude and longitude for the building]",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Raunak Eye Care Hospital",
    url: siteCopy.meta.canonicalUrl,
    logo: "[placeholder: real logo file path]",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 79876 76544",
      contactType: "customer service",
      availableLanguage: ["hi", "en"],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteCopy.meta.canonicalUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Eye Hospital in Dewas",
        item: `${siteCopy.meta.canonicalUrl}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Raunak Eye Care Hospital",
        item: siteCopy.meta.canonicalUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteCopy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessSchema,
      organizationSchema,
      breadcrumbSchema,
      faqSchema,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
    />
  );
}
