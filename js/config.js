const SITE = {
  name: "Kurkuma",
  tagline: "cuisine indienne contemporaine",
  address: "5, rue Tschiderer, L 9049 Ettelbruck",
  phone: "+352 26 30 06 05",
  phoneSecondary: "+352 621 960 076",
  email: "Kurkuma.lu@gmail.com",
  instagram: "https://www.instagram.com/Kurkuma.Luxembourg",
  instagramHandle: "kurkuma.luxembourg",
  facebook:
    "https://www.facebook.com/GairolaZ?mibextid=wwXIfr&rdid=nKb0zbuKrsHwqBtD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1JpUAuvpsw%2F%3Fmibextid%3DwwXIfr%26ref%3D1#",
  menuOrderUrl: "Menu_Kurkuma_Final.pdf",
  parking: "Parking communal gratuit pendant les heures de déjeuner et en soirée.",
};

const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxih52d7BZC85VdtyYIXuGxHIdGDUFS3TxzDJyWSB8LZTlleyU56yIWAS5kaoMQbyFfdw/exec";

const HOURS = [
  { days: "Mardi – Dimanche", time: "11:30 – 14:00" },
  { days: "Mardi – Samedi", time: "18:00 – 21:30" },
  { days: "Lundi – Dimanche soir", time: "Fermé" },
];

const NAV_LINKS = [
  { label: "Accueil", href: "index.html" },
  { label: "Esprit", href: "index.html#esprit" },
  { label: "Cuisine", href: "index.html#cuisine" },
  { label: "Soirées", href: "index.html#soirees" },
  { label: "Galerie", href: "index.html#galerie" },
  { label: "Contact", href: "index.html#contact" },
];

const LUNCH_SLOTS = ["11:30", "12:00", "12:30", "13:00", "13:30"];
const DINNER_SLOTS = [
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];

const SEATING_OPTIONS = [
  { id: "none", fr: "Aucune préférence", en: "No seating preference" },
  { id: "main", fr: "Salle principale", en: "Main dining room" },
  { id: "terrace", fr: "Terrasse", en: "Terrace" },
];

const DAY_LABELS = {
  fr: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const MENU_CATEGORIES = [
  {
    id: "entrees",
    title: "Entrées",
    subtitle: "Pour commencer le voyage",
    items: [
      { name: "Samosas Maison", description: "Feuilletés croustillants garnis de légumes épicés", price: "8 €" },
      { name: "Pakoras du Chef", description: "Beignets de légumes enrobés de farine de pois chiche", price: "7 €" },
      { name: "Salade Kurkuma", description: "Mesclun, mangue, noix de cajou, vinaigrette au curcuma", price: "12 €" },
      { name: "Soupe Dal du Jour", description: "Lentilles corail, épices douces, coriandre fraîche", price: "6 €" },
    ],
  },
  {
    id: "currys",
    title: "Currys & Plats Principaux",
    subtitle: "Le cœur de notre cuisine",
    items: [
      { name: "Butter Chicken", description: "Poulet tendre, sauce tomate crémeuse aux épices douces", price: "18 €" },
      { name: "Lamb Rogan Josh", description: "Agneau mijoté, sauce riche aux épices du Cachemire", price: "22 €" },
      { name: "Palak Paneer", description: "Fromage frais maison, épinards, gingembre, cumin", price: "16 €" },
      { name: "Biryani du Jour", description: "Riz parfumé, légumes de saison, raita maison", price: "17 €" },
      { name: "Tikka Masala Végétarien", description: "Légumes grillés, sauce masala onctueuse", price: "16 €" },
    ],
  },
  {
    id: "tandoor",
    title: "Grill & Tandoor",
    subtitle: "Cuits au four traditionnel",
    items: [
      { name: "Poulet Tandoori", description: "Mariné au yaourt et aux épices, servi avec salade", price: "19 €" },
      { name: "Brochettes Mix Grill", description: "Poulet, agneau et gambas grillés", price: "24 €" },
      { name: "Naan au Fromage", description: "Pain indien au four, garni de fromage fondant", price: "5 €" },
      { name: "Assortiment Naan", description: "Classique, ail, beurre — à partager", price: "8 €" },
    ],
  },
  {
    id: "accompagnements",
    title: "Accompagnements",
    items: [
      { name: "Riz Basmati", price: "4 €" },
      { name: "Dal Lentilles", price: "5 €" },
      { name: "Raita Maison", price: "4 €" },
      { name: "Chutney Mangue", price: "3 €" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    subtitle: "Douceurs pour finir",
    items: [
      { name: "Gulab Jamun", description: "Boules de lait frites, sirop de rose et cardamome", price: "7 €" },
      { name: "Kulfi Pistache", description: "Glace indienne artisanale à la pistache", price: "6 €" },
      { name: "Mango Lassi", description: "Yaourt frais à la mangue", price: "5 €" },
    ],
  },
  {
    id: "boissons",
    title: "Cocktails & Boissons",
    subtitle: "Pour accompagner vos soirées",
    items: [
      { name: "Kurkuma Mule", description: "Vodka, gingembre, curcuma, citron vert", price: "12 €" },
      { name: "Mango Spice", description: "Rhum, mangue, cardamome, lime", price: "13 €" },
      { name: "Chai Latte Maison", description: "Thé épicé, lait chaud, miel", price: "5 €" },
      { name: "Lassi Salé ou Sucré", description: "Boisson traditionnelle au yaourt", price: "4 €" },
      { name: "Sélection de Vins", description: "Demandez notre carte des vins" },
    ],
  },
];

function getLabels(lang) {
  return {
    guests: (count) =>
      lang === "en"
        ? `${count}${count >= 9 ? "+" : ""} guest${count === 1 ? "" : "s"}`
        : `${count}${count >= 9 ? "+" : ""} convive${count === 1 ? "" : "s"}`,
    today: lang === "en" ? "Today" : "Aujourd'hui",
    tomorrow: lang === "en" ? "Tomorrow" : "Demain",
    other: lang === "en" ? "Other" : "Autre",
    time: lang === "en" ? "Time" : "Heure",
    lunch: lang === "en" ? "Lunch" : "Déjeuner",
    dinner: lang === "en" ? "Dinner" : "Dîner",
    reserve: lang === "en" ? "Reserve" : "Réserver",
    contactTitle: lang === "en" ? "Your details" : "Vos coordonnées",
    name: lang === "en" ? "Full name" : "Nom complet",
    email: lang === "en" ? "Email" : "E-mail",
    phone: lang === "en" ? "Phone" : "Téléphone",
    confirm: lang === "en" ? "Confirm reservation" : "Confirmer la réservation",
    back: lang === "en" ? "Back" : "Retour",
    success: lang === "en" ? "Reservation request sent!" : "Demande de réservation envoyée !",
    successDetail:
      lang === "en"
        ? "We will confirm your booking shortly."
        : "Nous confirmerons votre réservation sous peu.",
    error: lang === "en" ? "Something went wrong. Please call us." : "Une erreur est survenue. Merci de nous appeler.",
    loading: lang === "en" ? "Sending…" : "Envoi…",
    largeGroup:
      lang === "en"
        ? `For groups of 9 or more, please call us at ${SITE.phone}.`
        : `Pour les groupes de 9 personnes ou plus, merci de nous appeler au ${SITE.phone}.`,
    policy:
      lang === "en"
        ? `In case of delay, your table is guaranteed for 15 minutes. Your table is reserved for 2 hours and must be vacated for the next service. Maximum table capacity: 8 guests. For larger groups, please contact us at ${SITE.phone}.`
        : `En cas de retard, votre table vous est garantie 15 minutes. Votre table est réservée pour un délai de 2 heures. Capacité de tables max : 8 personnes. Au-delà, merci de nous contacter au ${SITE.phone}.`,
  };
}

function formatDisplayDate(date, lang) {
  return `${DAY_LABELS[lang][date.getDay()]} ${date.getDate()}`;
}

function formatTimeSlot(time, lang) {
  const [hours, minutes] = time.split(":").map(Number);
  if (lang === "en") {
    const period = hours >= 12 ? "PM" : "AM";
    const h = hours % 12 || 12;
    return `${h}:${minutes.toString().padStart(2, "0")} ${period}`;
  }
  return time;
}

function formatDateISO(date) {
  return date.toISOString().split("T")[0];
}

function getSeatingLabel(id, lang) {
  return SEATING_OPTIONS.find((o) => o.id === id)?.[lang] ?? "";
}
