import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Outfit } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ReservationProvider } from "@/contexts/ReservationContext";
import { SITE, LOGOS } from "@/lib/constants";
import "./globals.css";
import "@/styles/components.scss";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#353a1c",
};

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "restaurant indien",
    "Ettelbruck",
    "Luxembourg",
    "cuisine indienne",
    "curry",
    "tandoori",
    "Kurkuma",
  ],
  icons: {
    icon: LOGOS.icon,
    apple: LOGOS.icon,
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    locale: "fr_LU",
    type: "website",
    images: [LOGOS.vertical],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${outfit.variable} ${dmSans.variable}`}
    >
      <body className="antialiased overflow-x-hidden">
        <ReservationProvider>
          <Header />
          <main className="w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer />
        </ReservationProvider>
      </body>
    </html>
  );
}
