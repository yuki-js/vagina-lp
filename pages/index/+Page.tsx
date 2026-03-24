import { Header } from "../../components/Header/Header";
import { Hero } from "../../components/Hero/Hero";
import { HomeExperienceSection } from "../../components/HomeExperienceSection/HomeExperienceSection";
import { FeaturesSection } from "../../components/FeaturesSection/FeaturesSection";
import { HowItWorksSection } from "../../components/HowItWorksSection/HowItWorksSection";
import { PricingSection } from "../../components/PricingSection/PricingSection";
import { WaitlistSection } from "../../components/WaitlistSection/WaitlistSection";
import { Footer } from "../../components/Footer/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <HomeExperienceSection />
      <PricingSection />
      <WaitlistSection />
      <Footer />
    </>
  );
}
