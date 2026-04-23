"use client";
import SectionWrapper from "./SectionWrapper";

export default function FinalCTA() {
  return (
    <SectionWrapper
      id="commande"
      eyebrow="Commander"
      title="Scan. Choose. Order."
      intro="Un parcours simple, rapide et moderne : le client scanne, choisit sa commande, entre son nom et récupère sur place."
    >
      <div className="rounded-3xl bg-black text-white p-6 md:p-10 text-center">
        <h3 className="font-serif text-3xl md:text-5xl">Ready to order?</h3>
        <p className="mt-3 text-white/70 max-w-xl mx-auto">
          Idéal pour un QR code en table, un parcours de commande plus fluide et une expérience client plus premium.
        </p>

        <div className="mt-6 flex justify-center">
          <a
            href="#experience"
            className="rounded-full bg-white text-black px-6 py-3 text-sm md:text-base"
          >
            Commencer la commande
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}