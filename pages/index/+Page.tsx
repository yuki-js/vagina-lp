import { Header } from "../../components/Header/Header";
import { Hero } from "../../components/Hero/Hero";
import { HomeExperienceSection } from "../../components/HomeExperienceSection/HomeExperienceSection";
import { CallExperienceSection } from "../../components/CallExperienceSection/CallExperienceSection";
import { AprilSlopSection } from "../../components/AprilSlopSection/AprilSlopSection";
import { Footer } from "../../components/Footer/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <HomeExperienceSection />
      <CallExperienceSection />
      <AprilSlopSection />
      <Footer />
    </>
  );
}
