import React from "react";
import Work from "../../../features/work/Work";
import WhoWeAre from "../../../features/services/components/WhoWeAre";
import ContactSection from "../../../components/Form/ContactSection";
import Navigation from "@/features/work/Navigation";
function page() {
  return (
    <>
      <Work />
      <Navigation />
      <WhoWeAre />
      <ContactSection />
    </>
  );
}

export default page;
