import FeaturedCompanies from "@/Components/FeaturedCompanies";
import HowItWorks from "@/Components/HowItWorks";
import StatsSection from "@/Components/StatsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <StatsSection></StatsSection>
      <HowItWorks></HowItWorks>
      <FeaturedCompanies></FeaturedCompanies>
    </div>
  );
}
