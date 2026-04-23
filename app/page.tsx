import Navbar from "@/components/Navbar";
import AnimatedHero from "@/components/AnimatedHero";
import DrinkCustomizer from "@/components/DrinkCustomizer";
import Products from "@/components/Products";
import Universe from "@/components/Universe";
import Reviews from "@/components/Reviews";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top" className="space-y-16 md:space-y-24">
        <AnimatedHero />
        <section id="experience" className="scroll-mt-24">
          <DrinkCustomizer />
        </section>
        <Products />
        <Universe />
        <Reviews />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}