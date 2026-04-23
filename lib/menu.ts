export type ItemVariant = { label: string; price: number };

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  variants?: ItemVariant[];
  customizable?: boolean;
  image?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  subtitle?: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "coffee",
    name: "Coffee",
    subtitle: "Specialty roast",
    items: [
      { id: "espresso", name: "Espresso", description: "Short, dense, pure", price: 2.9, customizable: true, image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80" },
      { id: "double-espresso", name: "Double Espresso", description: "Twice the intensity", price: 3.6, customizable: true, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80" },
      { id: "americano", name: "Americano", description: "Long, clean, balanced", price: 3.6, customizable: true, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80" },
      { id: "iced-americano", name: "Iced Americano", description: "Over ice, refreshing", price: 4.0, customizable: true, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80" },
      { id: "cappuccino", name: "Cappuccino", description: "Silky microfoam, espresso", price: 4.5, customizable: true, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80" },
      { id: "flat-white", name: "Flat White", description: "Velvet milk, double shot", price: 4.9, customizable: true, image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&q=80" },
      { id: "latte", name: "Latte", description: "Creamy, smooth, generous", price: 4.9, customizable: true, image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80" },
      { id: "iced-latte", name: "Iced Latte", description: "Cold, clean, addictive", price: 5.0, customizable: true, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80" },
      { id: "batch-brew", name: "Batch Brew", description: "Filter of the day", price: 3.1, image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&q=80" },
    ],
  },
  {
    id: "tea",
    name: "Tea",
    subtitle: "Loose leaf selection",
    items: [
      { id: "red-hibiscus", name: "Red Hibiscus", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80", variants: [{ label: "Small", price: 3.9 }, { label: "Large", price: 5.0 }] },
      { id: "earl-grey-green", name: "Earl Grey Green", image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&q=80", variants: [{ label: "Small", price: 3.9 }, { label: "Large", price: 5.0 }] },
      { id: "black-orange", name: "Black Tea & Orange", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80", variants: [{ label: "Small", price: 3.9 }, { label: "Large", price: 5.0 }] },
      { id: "rooibos", name: "Rooibos", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80", variants: [{ label: "Small", price: 3.9 }, { label: "Large", price: 5.0 }] },
      { id: "iced-tea", name: "Homemade Iced Tea", description: "Brewed in-house", price: 4.5, image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=400&q=80" },
      { id: "chai-latte", name: "Chai Latté", description: "Warm spices, steamed milk", price: 5.5, customizable: true, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80" },
      { id: "iced-chai", name: "Iced Chai Latté", description: "Cold, spiced, modern", price: 6.0, customizable: true, image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&q=80" },
    ],
  },
  {
    id: "juices",
    name: "Juices",
    subtitle: "Cold pressed, fresh daily",
    items: [
      { id: "red-miracle", name: "Red Miracle", description: "Beetroot, apple, pineapple, ginger", price: 6.8, image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80" },
      { id: "citrus-splash", name: "Citrus Splash", description: "Lime, orange, passionfruit, apple", price: 6.8, image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80" },
      { id: "apple-juice", name: "Fresh Apple Juice", price: 6.8, image: "https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=400&q=80" },
      { id: "orange-juice", name: "Fresh Orange Juice", price: 6.8, image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&q=80" },
    ],
  },
  {
    id: "soft",
    name: "Soft",
    subtitle: "Natural sodas & shots",
    items: [
      { id: "organic-shot", name: "Organic Shot", description: "Ginger, turmeric, lemon", price: 3.5, image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80" },
      { id: "lemonade", name: "Homemade Lemonade", price: 5.0, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80" },
      { id: "water-kefir", name: "Water Kefir", description: "Fermented, light, probiotic", price: 5.0, image: "https://images.unsplash.com/photo-1560508180-03f285f67ded?w=400&q=80" },
      { id: "kombucha", name: "Kombucha", price: 4.0, image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=400&q=80" },
    ],
  },
  {
    id: "sweet",
    name: "Sweet",
    subtitle: "Pastries & bowls",
    items: [
      { id: "french-toast", name: "Banana French Toast", description: "Brioche, banana, maple", price: 11, image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80" },
      { id: "oats", name: "Overnight Oats", description: "Almond milk, seasonal fruit", price: 12, image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&q=80" },
      { id: "blue-matcha", name: "Blue Matcha Bowl", description: "Butterfly pea, coconut, fruit", price: 14, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80" },
      { id: "acai", name: "Açaí Bowl", description: "Açaí, granola, banana", price: 14, image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80" },
      { id: "cookie", name: "Cookie", description: "House baked, warm", price: 4.5, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80" },
      { id: "cheesecake", name: "Basque Cheesecake", description: "Burnt top, silky inside", price: 4.5, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80" },
      { id: "cake", name: "Cake of the day", price: 3.8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80" },
    ],
  },
  {
    id: "savoury",
    name: "Savoury",
    subtitle: "Served 11am – 2:30pm",
    items: [
      { id: "avocado-toast", name: "Avocado Sourdough Toast", description: "Sourdough, smashed avocado, chili", price: 10, image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&q=80" },
      { id: "salmon-bagel", name: "Salmon Bagel with Beetroot", description: "Cream cheese, capers, dill", price: 10, image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=80" },
      { id: "salad-goat", name: "Salad with Goat Cheese", description: "Greens, walnut, honey", price: 11, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
      { id: "turkish-egg", name: "Turkish Eggs", description: "Poached, yogurt, chili butter", price: 11, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80" },
      { id: "chicken-burger", name: "Pulled Chicken Burger", description: "Brioche bun, pickles, slaw", price: 13, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
    ],
  },
];

export const sizeOptions = [
  { id: "S", label: "Small", delta: 0 },
  { id: "M", label: "Medium", delta: 0.5 },
  { id: "L", label: "Large", delta: 1.0 },
];

export const milkOptions = [
  { id: "whole", label: "Whole milk", delta: 0 },
  { id: "oat", label: "Oat", delta: 0.6 },
  { id: "almond", label: "Almond", delta: 0.6 },
  { id: "soy", label: "Soy", delta: 0.6 },
];

export const extraOptions = [
  { id: "shot", label: "Extra shot", delta: 0.9 },
  { id: "syrup-vanilla", label: "Vanilla syrup", delta: 0.6 },
  { id: "syrup-caramel", label: "Caramel syrup", delta: 0.6 },
  { id: "syrup-hazelnut", label: "Hazelnut syrup", delta: 0.6 },
];
