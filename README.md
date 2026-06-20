# Kurkuma

Static website for **Kurkuma** — contemporary Indian cuisine in Ettelbruck, Luxembourg.

No build step. No npm. Plain HTML, CSS, and JavaScript.

## Project structure

```
index.html          Home page
menu.html           Menu page
404.html            Not found page
css/styles.css      All styles
js/                 JavaScript modules
images/             Photos & logos
Menu_Kurkuma_Final.pdf
```

## Local preview

**Double-click `index.html`** in Finder to open the site in your browser — no server or install needed.

Or use any static file server from the project root:

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080)

> Paths are relative so the site works when opened directly as a file (`file://`).

## Deployment

Upload the project root to any static host (Netlify, GitHub Pages, Cloudflare Pages, etc.).

- **Publish directory:** project root (`.`)
- **404 page:** `404.html`

### Netlify

A `netlify.toml` is included with basic settings.

## Reservations

Bookings POST directly to Google Apps Script (configured in `js/config.js`). No backend server required.

On each successful booking:

- **Restaurant notification** → `reservation.kurkuma@gmail.com`
- **Guest confirmation** → email address entered in the booking form

### Google Apps Script setup

1. Open your Google Sheet → **Extensions** → **Apps Script**
2. Paste the contents of `scripts/google-apps-script/reservations.gs`
3. Set `SHEET_ID` to your spreadsheet ID
4. Run **authorizeScript** once and approve Sheet + Gmail permissions
5. **Deploy** → **Manage deployments** → **Edit** → **New version** → **Deploy**
6. Submit a test booking from the website to verify both emails arrive

## Editing content

| What to change | Where |
|----------------|-------|
| Contact info, hours, links | `js/config.js` |
| Menu items | `js/config.js` → `MENU_CATEGORIES` |
| Page copy | `index.html`, `menu.html` |
| Styles | `css/styles.css` |
| Images | `images/` |
