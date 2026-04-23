export type Extra = {
  id: string;
  name: string;
  price: number;
};

export type Size = {
  id: string;
  label: string;
  ml: string;
  multiplier: number;
};

export type Drink = {
  id: string;
  name: string;
  price: number;
  image: string;
  accent: string;
  tagline: string;
  description: string;
  origin: string;
  notes: string[];
  category: string;
};

export type Snack = {
  id: string;
  name: string;
  price: number;
  image: string;
  tagline: string;
  category: string;
};

export const sizes: Size[] = [
  { id: "S", label: "Small", ml: "25cl", multiplier: 1 },
  { id: "M", label: "Medium", ml: "35cl", multiplier: 1.15 },
  { id: "L", label: "Large", ml: "45cl", multiplier: 1.3 },
];

export const sugarLevels = [0, 1, 2, 3];

export const syrups: Extra[] = [
  { id: "vanilla", name: "Vanille", price: 0.6 },
  { id: "caramel", name: "Caramel", price: 0.6 },
  { id: "hazelnut", name: "Noisette", price: 0.6 },
];

export const milks: Extra[] = [
  { id: "oat", name: "Lait d’avoine", price: 0.7 },
  { id: "almond", name: "Lait d’amande", price: 0.7 },
  { id: "soy", name: "Lait de soja", price: 0.7 },
];

export const toppings: Extra[] = [
  { id: "cream", name: "Chantilly", price: 0.7 },
  { id: "extra-shot", name: "Extra shot", price: 0.9 },
  { id: "ice", name: "Extra glace", price: 0.3 },
];

export const drinks: Drink[] = [
  {
    id: "espresso",
    name: "Espresso",
    price: 2.7,
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80",
    accent: "#6B3E26",
    tagline: "Court. Dense. Pur.",
    description: "Le classique intense, précis et rapide.",
    origin: "Specialty Coffee",
    notes: ["Cacao", "Noisette"],
    category: "Coffee",
  },
  {
    id: "americano",
    name: "Americano",
    price: 3.3,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    accent: "#8B5E3C",
    tagline: "Long. Net. Équilibré.",
    description: "Un café allongé, clean et facile à boire.",
    origin: "Specialty Coffee",
    notes: ["Doux", "Toasté"],
    category: "Coffee",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    price: 4.3,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    accent: "#B97A56",
    tagline: "Soyeux. Lacté. Juste.",
    description: "Mousse fine, espresso équilibré, texture premium.",
    origin: "Specialty Coffee",
    notes: ["Lacté", "Velours"],
    category: "Coffee",
  },
  {
    id: "latte",
    name: "Latte",
    price: 4.7,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    accent: "#C68C53",
    tagline: "Doux. Crémeux. Réconfortant.",
    description: "Le grand classique du coffee shop moderne.",
    origin: "Specialty Coffee",
    notes: ["Crème", "Doux"],
    category: "Coffee",
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    price: 5.0,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    accent: "#D7A46D",
    tagline: "Glacé. Net. Addictif.",
    description: "Une version froide, clean et super visuelle.",
    origin: "Specialty Coffee",
    notes: ["Frais", "Lacté"],
    category: "Coffee",
  },
  {
    id: "chai-latte",
    name: "Chai Latte",
    price: 5.5,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
    accent: "#A5673F",
    tagline: "Épicé. Rond. Réconfort.",
    description: "Un chai latte moderne, chaud et généreux.",
    origin: "Tea Selection",
    notes: ["Épices", "Doux"],
    category: "Tea",
  },
  {
    id: "iced-chai",
    name: "Iced Chai Latte",
    price: 6.0,
    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=900&q=80",
    accent: "#B77A52",
    tagline: "Froid. Épicé. Moderne.",
    description: "Version glacée pour une carte ultra actuelle.",
    origin: "Tea Selection",
    notes: ["Épices", "Glacé"],
    category: "Tea",
  },
  {
    id: "matcha",
    name: "Matcha Latte",
    price: 5.8,
    image: "https://images.unsplash.com/photo-a fake", // change plus tard si besoin
    accent: "#7A9B5A",
    tagline: "Green. Clean. Signature.",
    description: "Matcha latte premium, visuel fort, très tendance.",
    origin: "Matcha",
    notes: ["Herbacé", "Crémeux"],
    category: "Matcha",
  },
  {
    id: "juice-red",
    name: "Red Miracle",
    price: 6.8,
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=80",
    accent: "#B73A4A",
    tagline: "Fresh. Bold. Vibrant.",
    description: "Jus frais au rendu ultra coloré et premium.",
    origin: "Fresh Juice",
    notes: ["Fruité", "Frais"],
    category: "Juices",
  },
];

export const snacks: Snack[] = [
  {
    id: "cookie",
    name: "Cookie",
    price: 4.5,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80",
    tagline: "Moelleux, maison",
    category: "Sweet",
  },
  {
    id: "cheesecake",
    name: "Cheesecake Basque",
    price: 4.5,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80",
    tagline: "Crémeux, signature",
    category: "Sweet",
  },
  {
    id: "cake",
    name: "Cake",
    price: 3.8,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
    tagline: "Simple, efficace",
    category: "Sweet",
  },
  {
    id: "banana-french-toast",
    name: "Banana French Toast",
    price: 9,
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80",
    tagline: "Brunch iconique",
    category: "Sweet",
  },
  {
    id: "acai",
    name: "Açaí Bowl",
    price: 10,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
    tagline: "Frais, healthy",
    category: "Sweet",
  },
  {
    id: "avocado-toast",
    name: "Avocado Sourdough Toast",
    price: 10,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=900&q=80",
    tagline: "Savoureux, moderne",
    category: "Savoury",
  },
  {
    id: "salmon-bagel",
    name: "Salmon Bagel",
    price: 11,
    image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80",
    tagline: "Premium, généreux",
    category: "Savoury",
  },
  {
    id: "salad",
    name: "Salad",
    price: 10,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    tagline: "Fresh, clean",
    category: "Savoury",
  },
  {
    id: "turkey-egg",
    name: "Turkey Egg",
    price: 11,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
    tagline: "All-day brunch",
    category: "Savoury",
  },
  {
    id: "pulled-chicken",
    name: "Pulled Chicken Burger",
    price: 13,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    tagline: "Comfort food",
    category: "Savoury",
  },
];

export const reviews = [
  {
    name: "Lina",
    role: "Cliente régulière",
    rating: 5,
    text: "Le café, le matcha et l’ambiance sont incroyables.",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Adam",
    role: "Brunch lover",
    rating: 5,
    text: "Très beau lieu, très bon café, service rapide.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Sarah",
    role: "Coffee addict",
    rating: 5,
    text: "Un endroit premium, moderne et super agréable.",
    avatar: "https://i.pravatar.cc/100?img=20",
  },
  {
    name: "Nora",
    role: "Foodie",
    rating: 5,
    text: "Le côté healthy + coffee shop est ultra réussi.",
    avatar: "https://i.pravatar.cc/100?img=44",
  },
];

export const ambience = [
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
];

export const fullMenu = [
  {
    name: "Coffee",
    items: [
      { name: "Espresso", price: 2.7 },
      { name: "Double Espresso", price: 3.3 },
      { name: "Americano", price: 3.3 },
      { name: "Iced Americano", price: 4.0 },
      { name: "Cappuccino", price: 4.3 },
      { name: "Flat White", price: 4.7 },
      { name: "Latte", price: 4.7 },
      { name: "Iced Latte", price: 5.0 },
      { name: "Batch Brew", price: 3.1 },
    ],
  },
  {
    name: "Tea",
    items: [
      { name: "Red Hibiscus", price: 3.9 },
      { name: "Earl Grey Green", price: 3.9 },
      { name: "Black Tea & Orange", price: 3.9 },
      { name: "Rooibos", price: 3.9 },
      { name: "Homemade Iced Tea", price: 4.5 },
      { name: "Chai Latte", price: 5.5 },
      { name: "Iced Chai Latte", price: 6.0 },
    ],
  },
  {
    name: "Juices",
    items: [
      { name: "Red Miracle", price: 6.8 },
      { name: "Citrus Splash", price: 6.8 },
      { name: "Fresh Apple Juice", price: 6.8 },
      { name: "Fresh Orange Juice", price: 6.8 },
    ],
  },
  {
    name: "Soft",
    items: [
      { name: "Organic Shot", price: 3.5 },
      { name: "Lemonade", price: 5.0 },
      { name: "Water Kefir", price: 5.0 },
      { name: "Kombucha", price: 4.0 },
    ],
  },
  {
    name: "Sweet",
    items: [
      { name: "Banana French Toast", price: 9 },
      { name: "Overnight Oats", price: 8 },
      { name: "Açaí Bowl", price: 10 },
      { name: "Cookie", price: 4.5 },
      { name: "Cheesecake Basque", price: 4.5 },
      { name: "Cake", price: 3.8 },
    ],
  },
  {
    name: "Savoury",
    items: [
      { name: "Avocado Sourdough Toast", price: 10 },
      { name: "Salmon Bagel", price: 11 },
      { name: "Salad", price: 10 },
      { name: "Turkey Egg", price: 11 },
      { name: "Pulled Chicken Burger", price: 13 },
    ],
  },
];