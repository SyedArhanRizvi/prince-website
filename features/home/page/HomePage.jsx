import React from "react";
import HeroSection from "../components/HeroSection";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import ContactSection from "@/components/Form/ContactSection";
import Section5 from "../components/Section5";
import Faqs from "../components/Faqs";

function HomePage() {
  return (
    <>
      <HeroSection />
      <Section3 />
      <Section2 />
      <Section4 />
      <ContactSection></ContactSection>
      <Section5></Section5>
      <Faqs></Faqs>
    </>
  );
}

export default HomePage;
