import React from "react";
import HeroSection from "../components/HeroSection";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import ContactSection from "@/components/Form/ContactSection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <Section2 />
      <Section3 />
      <Section4 />
      <ContactSection></ContactSection>
    </>
  );
}

export default HomePage;
