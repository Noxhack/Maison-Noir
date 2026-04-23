# Maison Café — Démo premium

Démo e-commerce / branding pour coffee shops modernes (adaptable bubble tea, bakery, snack).
Next.js 14 · App Router · Tailwind · Framer Motion.

## 🚀 Installation

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

## 🧱 Structure

```
app/
  layout.tsx         # fonts Inter + Playfair, metadata
  page.tsx           # assemblage des sections
  globals.css        # base tailwind + overlay grain
components/
  Navbar.tsx
  AnimatedHero.tsx
  ExperienceSection.tsx   # wrapper section "Commander"
  DrinkCustomizer.tsx     # module interactif central
  ProductSelector.tsx     # pills latte/cappu/espresso/iced
  CartSummary.tsx         # récapitulatif animé
  Products.tsx + ProductCard.tsx
  Universe.tsx            # storytelling + parallax
  Reviews.tsx
  FinalCTA.tsx
  Footer.tsx
  SectionWrapper.tsx      # layout section standard
lib/
  brand.ts           # ⭐ toutes les variables de branding
  data.ts            # boissons / extras / snacks / avis
```

## 🎨 Rebranding en 60 secondes

1. **Texte & marque** → `lib/brand.ts` (nom, tagline, adresse, CTA).
2. **Produits** → `lib/data.ts` (boissons, prix, images, extras, snacks).
3. **Couleurs** → `tailwind.config.ts` (tokens `cream`, `mocha`, `caramel`, …).
4. **Images** → remplacer les URLs Unsplash par vos propres assets (`/public`).

Le même squelette fonctionne pour :
- ☕ Café de spécialité (défaut)
- 🧋 Bubble tea — changer `drinks` + palette vers teintes pastel/matcha
- 🥐 Bakery — remplacer `drinks` par pâtisseries, garder customizer pour tailles/garnitures
- 🍪 Snack bar — adapter `snacks` en produits principaux

## ✨ Fonctionnalités clés

- **Hero animé** : typographie masquée + badges flottants + parallax scroll.
- **DrinkCustomizer** : switch de boisson fluide (layoutId pills), taille / sucre / sirop / lait / topping / snacks, total live animé.
- **Parallax** sur la section Univers (`useScroll` + `useTransform`).
- **Scroll reveal** sur toutes les cartes (Framer Motion `whileInView`).
- **Micro-interactions** (hover zoom, layout animations, AnimatePresence).
- **Mobile-first** : chips horizontal scroll, typographie fluide, touch-friendly.
- **Accessibilité** : `prefers-reduced-motion` respecté sur le header.

## 📦 Stack

- Next.js 14 (App Router, RSC + client components)
- Tailwind CSS 3.4
- Framer Motion 11
- Lucide React (icônes — optionnel)
- TypeScript 5

## 🧪 Commandes

```bash
npm run dev     # dev server
npm run build   # build prod
npm run start   # serveur prod
npm run lint    # lint Next.js
```

## 📝 Notes d'architecture

- **`SectionWrapper`** standardise l'intro de chaque section (eyebrow / titre / intro + reveal).
- **State local** dans `DrinkCustomizer` — aucune dépendance store (Zustand/Redux) pour garder la démo légère. Ajouter un provider si besoin de panier persistant.
- **Images** : Unsplash en `<img>` natif pour rester simple (pas d'optimisation `next/image` → évite la config domain pour prototypage). Migrer vers `next/image` en prod.
- **Fonts** : `next/font/google` (Inter + Playfair Display) → chargement optimisé sans layout shift.
