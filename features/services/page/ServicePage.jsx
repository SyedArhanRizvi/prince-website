import React from "react";
import HeroSection from "../components/HeroSection";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import WhoWeAre from "../components/WhoWeAre";
import Section4 from "../components/Section4";
import Faqs from "../components/Faqs";
import ContactSection from "@/components/Form/ContactSection";
function ServicePage() {
  return (
    <>
      <HeroSection></HeroSection>
      <WhoWeAre></WhoWeAre>
      <Section2></Section2>
      <Section3></Section3>
      <Section4></Section4>
      <ContactSection></ContactSection>
      <Faqs />
    </>
  );
}

export default ServicePage;
