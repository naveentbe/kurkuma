/**
 * Server-side Google Sheets webhook URL.
 * Supports both private (GOOGLE_SHEETS_WEB_APP_URL) and
 * NEXT_PUBLIC_ prefix for environments that only expose public vars.
 */
export function getGoogleSheetsWebAppUrl(): string {
  const url =
    process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL?.trim();

  if (!url) {
    throw new Error(
      "GOOGLE_SHEETS_WEB_APP_URL is not configured. Add your deployed Apps Script /exec URL to .env.local and restart the dev server."
    );
  }

  return url;
}
