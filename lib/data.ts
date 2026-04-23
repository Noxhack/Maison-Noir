export type Drink = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  origin: string;
  notes: string[];
};

export type Extra = { id: string; name: string; price: number; category: "syrup" | "topping" | "milk" };
export type Snack = { id: string; name: string; price: number; image: string; tagline: string };
export type Size = { id: "S" | "M" | "L"; label: string; ml: string; multiplier: number };

export const drinks: Drink[] = [
  {
    id: "latte",
    name: "Latte",
    price: 4.5,
    tagline: "Soyeux. Lacté. Juste.",
    description: "Double ristretto, lait entier micro-texturé à 62°C, rosetta signée barista.",
    image:
      "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&w=1400&q=90",
    accent: "#C89B6A",
    origin: "Colombie · Huila",
    notes: ["Noisette", "Chocolat au lait", "Miel"],
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    price: 4.0,
    tagline: "Mousse nuage, arôme plein.",
    description: "La règle des trois tiers. Aéré, franc, rond — à l'italienne.",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1400&q=90",
    accent: "#A97A4C",
    origin: "Éthiopie · Yirgacheffe",
    notes: ["Fleur blanche", "Agrume", "Cacao"],
  },
  {
    id: "espresso",
    name: "Espresso",
    price: 3.0,
    tagline: "Court. Dense. Pur.",
    description: "Extraction 25s, pression 9 bars, crème tigrée — l'épure.",
    image:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=1400&q=90",
    accent: "#3B2A1E",
    origin: "Brésil · Minas",
    notes: ["Cacao noir", "Fruits rouges", "Sucre brun"],
  },
  {
    id: "iced",
    name: "Iced Coffee",
    price: 5.0,
    tagline: "Glacé. Net. Addictif.",
    description: "Cold brew infusé 18h, glace claire, lait d'avoine barista.",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1400&q=90",
    accent: "#8C6A48",
    origin: "Kenya · Nyeri",
    notes: ["Cassis", "Pamplemousse", "Vanille"],
  },
];

export const sizes: Size[] = [
  { id: "S", label: "Small", ml: "180 ml", multiplier: 0.9 },
  { id: "M", label: "Medium", ml: "240 ml", multiplier: 1 },
  { id: "L", label: "Large", ml: "350 ml", multiplier: 1.2 },
];

export const sugarLevels = [0, 1, 2, 3] as const;

export const syrups: Extra[] = [
  { id: "vanilla", name: "Vanille", price: 0.5, category: "syrup" },
  { id: "caramel", name: "Caramel", price: 0.5, category: "syrup" },
  { id: "hazelnut", name: "Noisette", price: 0.5, category: "syrup" },
];

export const toppings: Extra[] = [
  { id: "cream", name: "Chantilly", price: 0.7, category: "topping" },
  { id: "cocoa", name: "Cacao", price: 0.3, category: "topping" },
  { id: "cinnamon", name: "Cannelle", price: 0.3, category: "topping" },
];

export const milks: Extra[] = [
  { id: "oat", name: "Avoine", price: 0.6, category: "milk" },
  { id: "almond", name: "Amande", price: 0.6, category: "milk" },
  { id: "soy", name: "Soja", price: 0.6, category: "milk" },
];

export const snacks: Snack[] = [
  {
    id: "cookie",
    name: "Cookie",
    price: 2.5,
    tagline: "Tout chocolat · tiède",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "croissant",
    name: "Croissant",
    price: 2.0,
    tagline: "Beurre AOP · feuilleté 72h",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "brownie",
    name: "Brownie",
    price: 3.0,
    tagline: "Fondant · 70% cacao",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85",
  },
];

export const reviews = [
  {
    name: "Camille L.",
    role: "Architecte · Bruxelles",
    text: "Le latte est incomparable. L'endroit est devenu mon bureau secondaire.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Jonas R.",
    role: "Photographe",
    text: "Chaque tasse ressemble à une œuvre. Et l'app de commande est addictive.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Inès M.",
    role: "Product designer",
    text: "Un vrai savoir-faire. Les snacks maison valent le détour à eux seuls.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Thomas D.",
    role: "Entrepreneur",
    text: "Ambiance, service, café — la trilogie parfaite pour mes rendez-vous.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  },
];

export const ambience = [
  "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1525480122447-64809d765a5b?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1559496417-e7f25cb247cd?auto=format&fit=crop&w=1600&q=90",
];
