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
      <HeroSection></HeroSection> //d 
      <Section3></Section3> //d 
      <Section2></Section2> //d 
      <WhoWeAre></WhoWeAre>
      <Section4></Section4> //d 
      <ContactSection></ContactSection>
      <Faqs /> //5
    </>
  );
}

export default ServicePage;
