"use client";
import SectionWrapper from "./SectionWrapper";
import DrinkCustomizer from "./DrinkCustomizer";

export default function ExperienceSection() {
  return (
    <SectionWrapper
      id="experience"
      eyebrow="Composez votre tasse"
      title="Votre café, à la virgule près."
      intro="Choisissez, ajustez, ajoutez un snack — tout se passe ici. Prêt en 3 minutes, en boutique."
      className="bg-sand/30"
    >
      <DrinkCustomizer />
    </SectionWrapper>
  );
}
