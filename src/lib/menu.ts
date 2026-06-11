export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "entrees",
    title: "Entrées",
    subtitle: "Pour commencer le voyage",
    items: [
      {
        name: "Samosas Maison",
        description: "Feuilletés croustillants garnis de légumes épicés",
        price: "8 €",
      },
      {
        name: "Pakoras du Chef",
        description: "Beignets de légumes enrobés de farine de pois chiche",
        price: "7 €",
      },
      {
        name: "Salade Kurkuma",
        description: "Mesclun, mangue, noix de cajou, vinaigrette au curcuma",
        price: "12 €",
      },
      {
        name: "Soupe Dal du Jour",
        description: "Lentilles corail, épices douces, coriandre fraîche",
        price: "6 €",
      },
    ],
  },
  {
    id: "currys",
    title: "Currys & Plats Principaux",
    subtitle: "Le cœur de notre cuisine",
    items: [
      {
        name: "Butter Chicken",
        description: "Poulet tendre, sauce tomate crémeuse aux épices douces",
        price: "18 €",
      },
      {
        name: "Lamb Rogan Josh",
        description: "Agneau mijoté, sauce riche aux épices du Cachemire",
        price: "22 €",
      },
      {
        name: "Palak Paneer",
        description: "Fromage frais maison, épinards, gingembre, cumin",
        price: "16 €",
      },
      {
        name: "Biryani du Jour",
        description: "Riz parfumé, légumes de saison, raita maison",
        price: "17 €",
      },
      {
        name: "Tikka Masala Végétarien",
        description: "Légumes grillés, sauce masala onctueuse",
        price: "16 €",
      },
    ],
  },
  {
    id: "tandoor",
    title: "Grill & Tandoor",
    subtitle: "Cuits au four traditionnel",
    items: [
      {
        name: "Poulet Tandoori",
        description: "Mariné au yaourt et aux épices, servi avec salade",
        price: "19 €",
      },
      {
        name: "Brochettes Mix Grill",
        description: "Poulet, agneau et gambas grillés",
        price: "24 €",
      },
      {
        name: "Naan au Fromage",
        description: "Pain indien au four, garni de fromage fondant",
        price: "5 €",
      },
      {
        name: "Assortiment Naan",
        description: "Classique, ail, beurre — à partager",
        price: "8 €",
      },
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
      {
        name: "Gulab Jamun",
        description: "Boules de lait frites, sirop de rose et cardamome",
        price: "7 €",
      },
      {
        name: "Kulfi Pistache",
        description: "Glace indienne artisanale à la pistache",
        price: "6 €",
      },
      {
        name: "Mango Lassi",
        description: "Yaourt frais à la mangue",
        price: "5 €",
      },
    ],
  },
  {
    id: "boissons",
    title: "Cocktails & Boissons",
    subtitle: "Pour accompagner vos soirées",
    items: [
      {
        name: "Kurkuma Mule",
        description: "Vodka, gingembre, curcuma, citron vert",
        price: "12 €",
      },
      {
        name: "Mango Spice",
        description: "Rhum, mangue, cardamome, lime",
        price: "13 €",
      },
      {
        name: "Chai Latte Maison",
        description: "Thé épicé, lait chaud, miel",
        price: "5 €",
      },
      {
        name: "Lassi Salé ou Sucré",
        description: "Boisson traditionnelle au yaourt",
        price: "4 €",
      },
      {
        name: "Sélection de Vins",
        description: "Demandez notre carte des vins",
      },
    ],
  },
];
