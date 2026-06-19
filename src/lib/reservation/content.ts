import { SITE } from "@/lib/constants";

export type ReservationLang = "fr" | "en";

export const LUNCH_SLOTS = ["11:30", "12:00", "12:30", "13:00", "13:30"] as const;
export const DINNER_SLOTS = [
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
] as const;

export const SEATING_OPTIONS = [
  { id: "none", fr: "Aucune préférence", en: "No seating preference" },
  { id: "main", fr: "Salle principale", en: "Main dining room" },
  { id: "terrace", fr: "Terrasse", en: "Terrace" },
] as const;

const DAY_LABELS = {
  fr: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
} as const;

export function getPolicyText(lang: ReservationLang) {
  if (lang === "en") {
    return `In case of delay, your table is guaranteed for 15 minutes. Your table is reserved for 2 hours and must be vacated for the next service. Maximum table capacity: 8 guests. For larger groups, please contact us at ${SITE.phone}.`;
  }

  return `En cas de retard, votre table vous est garantie 15 minutes. Votre table est réservée pour un délai de 2 heures. Capacité de tables max : 8 personnes. Au-delà, merci de nous contacter au ${SITE.phone}.`;
}

export function getLabels(lang: ReservationLang) {
  return {
    guests: (count: number) =>
      lang === "en"
        ? `${count}${count >= 9 ? "+" : ""} guest${count === 1 ? "" : "s"}`
        : `${count}${count >= 9 ? "+" : ""} convive${count === 1 ? "" : "s"}`,
    today: lang === "en" ? "Today" : "Aujourd'hui",
    tomorrow: lang === "en" ? "Tomorrow" : "Demain",
    other: lang === "en" ? "Other" : "Autre",
    nextAvailability: lang === "en" ? "Next availability" : "Prochaine disponibilité",
    time: lang === "en" ? "Time" : "Heure",
    lunch: lang === "en" ? "Lunch" : "Déjeuner",
    dinner: lang === "en" ? "Dinner" : "Dîner",
    reserve: lang === "en" ? "Reserve" : "Réserver",
    seating: SEATING_OPTIONS.find((o) => o.id === "none")?.[lang] ?? "",
    selectDate: lang === "en" ? "Select a date" : "Choisir une date",
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
    accessDenied:
      lang === "en"
        ? "Google Sheets is not publicly accessible yet. In Apps Script, redeploy as Web app with Execute as Me and Who has access: Anyone. Then test your /exec URL in an incognito window — it must show JSON, not a login page."
        : "Google Sheets n'est pas encore accessible publiquement. Dans Apps Script, redéployez en Web app avec Exécuter en tant que moi et Accès : Tout le monde. Testez l'URL /exec en navigation privée — elle doit afficher du JSON, pas une page de connexion.",
    testUrl: lang === "en" ? "Test deployment URL" : "Tester l'URL de déploiement",
    loading: lang === "en" ? "Sending…" : "Envoi…",
    largeGroup:
      lang === "en"
        ? `For groups of 9 or more, please call us at ${SITE.phone}.`
        : `Pour les groupes de 9 personnes ou plus, merci de nous appeler au ${SITE.phone}.`,
  };
}

export function formatDisplayDate(date: Date, lang: ReservationLang) {
  const day = DAY_LABELS[lang][date.getDay()];
  return `${day} ${date.getDate()}`;
}

export function formatTimeSlot(time: string, lang: ReservationLang) {
  const [hours, minutes] = time.split(":").map(Number);
  if (lang === "en") {
    const period = hours >= 12 ? "PM" : "AM";
    const h = hours % 12 || 12;
    return `${h}:${minutes.toString().padStart(2, "0")} ${period}`;
  }
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export function getSeatingLabel(id: string, lang: ReservationLang) {
  return SEATING_OPTIONS.find((o) => o.id === id)?.[lang] ?? "";
}

export function isLunchSlot(time: string) {
  return LUNCH_SLOTS.includes(time as (typeof LUNCH_SLOTS)[number]);
}
