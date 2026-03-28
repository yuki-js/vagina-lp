import { Header } from "../../components/Header/Header";
import { Hero } from "../../components/Hero/Hero";
import { HomeExperienceSection } from "../../components/HomeExperienceSection/HomeExperienceSection";
import { CallExperienceSection } from "../../components/CallExperienceSection/CallExperienceSection";
import { AgentCapabilitiesSection } from "../../components/AgentCapabilitiesSection/AgentCapabilitiesSection";
import { AprilSlopSection } from "../../components/AprilSlopSection/AprilSlopSection";
import { PricingSection } from "../../components/PricingSection/PricingSection";
import { Footer } from "../../components/Footer/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <HomeExperienceSection />
      <CallExperienceSection />
      <AgentCapabilitiesSection />
      <AprilSlopSection />
      <PricingSection />
      <Footer />
    </>
  );
}
