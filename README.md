# Kurkuma — Cuisine Indienne Contemporaine

Site web professionnel pour le restaurant **Kurkuma**, situé à Ettelbruck, Luxembourg.

## Stack Technique

- **Next.js 16** (App Router)
- **React 19** avec TypeScript
- **Tailwind CSS 4** pour le styling utilitaire
- **SCSS** pour les styles personnalisés (mixins, variables, animations)
- **Framer Motion** pour les animations fluides
- **Lucide React** pour les icônes

## Démarrage

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du Projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx            # Page d'accueil
│   ├── menu/page.tsx       # Page menu
│   ├── layout.tsx          # Layout global
│   └── globals.css         # Styles globaux + Tailwind
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Sections de page (Hero, Cuisine, etc.)
│   └── ui/                 # Composants réutilisables (Button, etc.)
├── lib/
│   ├── constants.ts        # Données du restaurant
│   ├── menu.ts             # Contenu du menu
│   └── animations.ts       # Variants Framer Motion
└── styles/
    ├── _variables.scss     # Design tokens
    ├── _mixins.scss        # Mixins SCSS
    └── components.scss     # Styles personnalisés
```

## Personnalisation

### Informations du restaurant

Modifiez `src/lib/constants.ts` pour mettre à jour :
- Adresse, téléphone, email
- Liens Instagram, réservation, commande en ligne
- Horaires d'ouverture

### Menu

Modifiez `src/lib/menu.ts` pour ajouter ou modifier les plats et catégories.

### Images

Les images proviennent d'Unsplash. Remplacez les URLs dans `src/lib/constants.ts` par vos propres photos haute qualité pour un rendu final professionnel.

## Build Production

```bash
npm run build
npm start
```

## Déploiement

Compatible avec Vercel, Netlify, ou tout hébergeur supportant Next.js.
