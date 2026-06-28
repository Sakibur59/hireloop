import FeaturedCompanies from "@/Components/FeaturedCompanies";
import HowItWorks from "@/Components/HowItWorks";
import StatsSection from "@/Components/StatsSection";
import Image from "next/image";
import Testimonials from "../Components/Testimonials";
import JobCategories from "@/Components/JobCategories";
import CTASection from "@/Components/CTASection";

export default function Home() {
  return (
    <div >
      <StatsSection></StatsSection>
      <HowItWorks></HowItWorks>
      <FeaturedCompanies></FeaturedCompanies>
      <Testimonials></Testimonials>
      <JobCategories></JobCategories>
      <CTASection></CTASection>
    </div>
  );
}
