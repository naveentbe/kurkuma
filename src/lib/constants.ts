export const SITE = {
  name: "Kurkuma",
  tagline: "cuisine indienne contemporaine",
  description:
    "Cuisine indienne contemporaine à Ettelbruck. Déjeuners frais, tables à partager et soirées chaleureuses.",
  heroHeadline: "Cuisine indienne contemporaine à Ettelbruck.",
  heroDescription:
    "Nichée rue Tschiderer à Ettelbruck, Kurkuma est un lieu chaleureux où traditions indiennes et esprit contemporain se rencontrent — des déjeuners frais, des tables à partager et soirées pleines de saveurs.",
  address: "5, rue Tschiderer, L 9049 Ettelbruck",
  phone: "+352 621 960 076",
  email: "muktacollective@outlook.com",
  instagram: "https://www.instagram.com/Kurkuma.Luxembourg",
  instagramHandle: "kurkuma.luxembourg",
  menuOrderUrl: "https://www.myfoods.lu/",
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

const RESTAURANT_IMAGE_PATH = "/images/restaurant-image";

/** Local restaurant ambience photography */
export const RESTAURANT_IMAGES = [
  `${RESTAURANT_IMAGE_PATH}/processed-C420316C-358E-47CE-A7E8-8520AE0C39FA.jpeg`,
  `${RESTAURANT_IMAGE_PATH}/processed-64C6ECCA-BBC6-442B-B919-BB8E7E424851.jpeg`,
  `${RESTAURANT_IMAGE_PATH}/processed-D2A7A8B3-0237-4C54-AB46-B02DAB97CC07.jpeg`,
  `${RESTAURANT_IMAGE_PATH}/processed-4BBE20D8-39DC-4BBB-A4A5-4B5163643900.jpeg`,
  `${RESTAURANT_IMAGE_PATH}/processed-3E38C50B-9D58-43ED-B946-DD32825A5967.jpeg`,
  `${RESTAURANT_IMAGE_PATH}/processed-28D152DB-5A74-48A7-8C38-8071519F4D1C.jpeg`,
  `${RESTAURANT_IMAGE_PATH}/processed-B1E13F0A-94C2-47D5-B9C0-5E5A26D05F75.jpeg`,
  `${RESTAURANT_IMAGE_PATH}/processed-6BD8A957-6EBD-4B9C-A861-496BFBBC56D6.jpeg`,
  `${RESTAURANT_IMAGE_PATH}/processed-51387540-3361-4BEC-B168-55E9079507A5.jpeg`,
  `${RESTAURANT_IMAGE_PATH}/processed-86F78470-2CF9-43F0-AB5F-AC344E2DB6D7.jpeg`,
] as const;

/** Food and drink photography (external) */
const FOOD_IMAGES = {
  cuisine:
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=85",
  spices:
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200&q=85",
  cocktails:
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=85",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=85",
    "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=85",
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=85",
    "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=85",
  ],
} as const;

export const IMAGES = {
  hero: RESTAURANT_IMAGES[3],
  esprit: RESTAURANT_IMAGES[1],
  lunch: RESTAURANT_IMAGES[2],
  evening: RESTAURANT_IMAGES[0],
  soirees: RESTAURANT_IMAGES[4],
  partage: RESTAURANT_IMAGES[9],
  cuisine: FOOD_IMAGES.cuisine,
  spices: FOOD_IMAGES.spices,
  cocktails: FOOD_IMAGES.cocktails,
  gallery: [
    ...RESTAURANT_IMAGES.slice(5, 9),
    ...FOOD_IMAGES.gallery,
  ],
  restaurant: RESTAURANT_IMAGES,
} as const;
