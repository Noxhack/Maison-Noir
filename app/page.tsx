import Navbar from "@/components/Navbar";
import AnimatedHero from "@/components/AnimatedHero";
import ExperienceSection from "@/components/ExperienceSection";
import Products from "@/components/Products";
import Universe from "@/components/Universe";
import Reviews from "@/components/Reviews";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <AnimatedHero />
      <ExperienceSection />
      <Products />
      <Universe />
      <Reviews />
      <FinalCTA />
      <Footer />
    </main>
  );
}
