import React from "react";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Offerings } from "@/components/sections/offerings";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Location } from "@/components/sections/location";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

const SHOW_TESTIMONIALS = false;

export default function HomePage() {
  return (
    <>
      {/* 2 Hero */}
      <Hero />

      {/* 3 Trust Bar */}
      <TrustBar />

      {/* 4 Signature Offerings */}
      <Offerings />

      {/* 5 Stats Band */}
      <Stats />

      {/* 6 Process */}
      <Process />

      {/* 7 About Dr Sachin Malviya */}
      <About />

      {/* 8 Testimonials */}
      {SHOW_TESTIMONIALS && <Testimonials />}

      {/* 9 Location & Map */}
      <Location />

      {/* 10 FAQ */}
      <Faq />

      {/* 11 Final CTA */}
      <FinalCta />
    </>
  );
}
