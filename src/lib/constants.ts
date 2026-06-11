export const SITE = {
  name: "Kurkuma",
  tagline: "cuisine indienne contemporaine",
  description:
    "Cuisine indienne contemporaine à Ettelbruck. Déjeuners frais, tables à partager et soirées chaleureuses.",
  heroHeadline: "Cuisine indienne contemporaine à Ettelbruck.",
  heroDescription:
    "Nichée rue Tschiderer à Ettelbruck, Kurkuma est un lieu chaleureux où traditions indiennes et esprit contemporain se rencontrent — des déjeuners frais, des tables à partager et des soirées pleines de saveurs.",
  address: "5, rue Tschiderer, L 9049 Ettelbruck",
  phone: "+352 621 960 076",
  email: "muktacollective@outlook.com",
  instagram: "https://www.instagram.com/Kurkuma.Luxembourg",
  instagramHandle: "@Kurkuma.Luxembourg",
  parking:
    "Parking communal gratuit pendant les heures de déjeuner et en soirée.",
} as const;

export const HOURS = [
  { days: "Mardi – Dimanche", time: "11:30 – 14:30" },
  { days: "Mardi – Samedi", time: "18:00 – 21:30" },
  { days: "Dimanche soir", time: "Fermé" },
] as const;

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Esprit", href: "/#esprit" },
  { label: "Cuisine", href: "/#cuisine" },
  { label: "Soirées", href: "/#soirees" },
  { label: "Galerie", href: "/#galerie" },
  { label: "Contact", href: "/#contact" },
] as const;

export const LOGOS = {
  horizontal: "/images/logo-horizontal.png",
  vertical: "/images/logo-vertical.png",
  icon: "/images/logo-icon.png",
  instagram: "/images/icon-instagram.png",
} as const;

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1920&q=85",
  esprit: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85",
  lunch: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=85",
  evening: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85",
  cuisine: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=85",
  spices: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200&q=85",
  sharing: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=85",
  cocktails: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=85",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=85",
    "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=85",
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=85",
    "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=85",
  ],
} as const;
