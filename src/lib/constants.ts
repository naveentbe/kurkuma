export const SITE = {
  name: "Kurkuma",
  tagline: "cuisine indienne contemporaine",
  description:
    "Cuisine indienne contemporaine à Ettelbruck. Déjeuners frais, tables à partager et soirées chaleureuses.",
  heroHeadline: "Cuisine indienne contemporaine à Ettelbruck.",
  heroDescription:
    "Nichée rue Tschiderer à Ettelbruck, Kurkuma est un lieu chaleureux où traditions indiennes et esprit contemporain se rencontrent — des déjeuners frais, des tables à partager et soirées pleines de saveurs.",
  address: "5, rue Tschiderer, L 9049 Ettelbruck",
  phone: "+352 26 30 06 05",
  phoneSecondary: "+352 621 960 076",
  email: "Kurkuma.lu@gmail.com",
  instagram: "https://www.instagram.com/Kurkuma.Luxembourg",
  instagramHandle: "kurkuma.luxembourg",
  facebook:
    "https://www.facebook.com/GairolaZ?mibextid=wwXIfr&rdid=nKb0zbuKrsHwqBtD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1JpUAuvpsw%2F%3Fmibextid%3DwwXIfr%26ref%3D1#",
  menuOrderUrl: "/Menu_Kurkuma_Final.pdf",
  parking:
    "Parking communal gratuit pendant les heures de déjeuner et en soirée.",
} as const;

export const HOURS = [
  { days: "Mardi – Dimanche", time: "11:30 – 14:00" },
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

const RESTAURANT_IMAGES_PATH = "/images/restaurant-images-new";
const FOOD_IMAGES_PATH = "/images/food-images";

/** Local restaurant ambience photography */
export const RESTAURANT_IMAGES = [
  `${RESTAURANT_IMAGES_PATH}/image16.png`,
  `${RESTAURANT_IMAGES_PATH}/image7.png`,
  `${RESTAURANT_IMAGES_PATH}/image9.png`,
  `${RESTAURANT_IMAGES_PATH}/image10.png`,
  `${RESTAURANT_IMAGES_PATH}/image11.png`,
  `${RESTAURANT_IMAGES_PATH}/image12.png`,
  `${RESTAURANT_IMAGES_PATH}/image13.png`,
  `${RESTAURANT_IMAGES_PATH}/image14.png`,
] as const;

/** Local food and drink photography */
export const FOOD_IMAGES = [
  `${FOOD_IMAGES_PATH}/image2.png`,
  `${FOOD_IMAGES_PATH}/image4.png`,
  `${FOOD_IMAGES_PATH}/image5.png`,
  `${FOOD_IMAGES_PATH}/image6.png`,
  `${FOOD_IMAGES_PATH}/image8.png`,
] as const;

export const IMAGES = {
  hero: `${RESTAURANT_IMAGES_PATH}/image13.png`,
  esprit: RESTAURANT_IMAGES[0],
  lunch: RESTAURANT_IMAGES[1],
  evening: RESTAURANT_IMAGES[2],
  soirees: RESTAURANT_IMAGES[3],
  partage: RESTAURANT_IMAGES[7],
  cuisine: FOOD_IMAGES[0],
  spices: FOOD_IMAGES[1],
  cocktails: FOOD_IMAGES[2],
  gallery: [
    RESTAURANT_IMAGES[4],
    RESTAURANT_IMAGES[5],
    FOOD_IMAGES[2],
    FOOD_IMAGES[3],
    FOOD_IMAGES[4],
  ],
  restaurant: RESTAURANT_IMAGES,
  food: FOOD_IMAGES,
} as const;
