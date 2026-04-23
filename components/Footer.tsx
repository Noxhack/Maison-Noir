import { brand } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="px-4 md:px-10 pb-10">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-mocha/10 bg-cream px-6 md:px-10 py-10 md:py-14">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-espresso text-cream text-[11px] font-serif">
                N
              </span>
              <p className="font-serif text-2xl text-espresso">{brand.name}</p>
            </div>
            <p className="mt-4 max-w-sm text-mocha/70 leading-relaxed">{brand.description}</p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-mocha/50">
              Torréfié à Bruxelles · avec amour
            </p>
          </div>
          <Col title="Boutique">
            <p>{brand.address}</p>
            <p>{brand.city}</p>
            <p className="text-espresso">{brand.hours}</p>
          </Col>
          <Col title="Contact">
            <a href={`mailto:${brand.email}`} className="block hover:text-espresso transition-colors">
              {brand.email}
            </a>
            <a href={`tel:${brand.phone}`} className="block hover:text-espresso transition-colors">
              {brand.phone}
            </a>
            <a href="#" className="block hover:text-espresso transition-colors">
              {brand.instagram}
            </a>
          </Col>
          <Col title="Maison">
            <a href="#menu" className="block hover:text-espresso transition-colors">Menu</a>
            <a href="#experience" className="block hover:text-espresso transition-colors">Commander</a>
            <a href="#univers" className="block hover:text-espresso transition-colors">Univers</a>
            <a href="#avis" className="block hover:text-espresso transition-colors">Avis</a>
          </Col>
        </div>
        <div className="mt-12 pt-6 border-t border-mocha/10 flex flex-wrap justify-between gap-3 text-xs text-mocha/50">
          <p>© {new Date().getFullYear()} {brand.name}. Tous droits réservés.</p>
          <p>Démo premium · design & code sur mesure</p>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="md:col-span-2 xl:col-span-2 text-sm text-mocha/70 space-y-1.5">
      <p className="text-[11px] uppercase tracking-[0.25em] text-espresso mb-3">{title}</p>
      {children}
    </div>
  );
}
