/**
 * Kurkuma reservation webhook
 *
 * SETUP (required — fixes 403 Access denied):
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste this entire file
 * 3. Replace SHEET_ID below with your spreadsheet ID (from the sheet URL)
 * 4. Select doGet in the toolbar → click Run → authorize when prompted
 * 5. Deploy → New deployment → type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the /exec URL into .env.local as NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL
 * 7. Test in an incognito window: open the /exec URL
 *    ✅ Expected: {"status":"ok","service":"kurkuma-reservations"}
 *    ❌ If you see "Access denied" or a login page, redeploy step 5
 */

/** Replace with your Google Sheet ID from the URL: docs.google.com/spreadsheets/d/THIS_PART/edit */
var SHEET_ID = "YOUR_SHEET_ID_HERE";

function getSheet_() {
  if (SHEET_ID && SHEET_ID !== "YOUR_SHEET_ID_HERE") {
    return SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  }
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
}

function doPost(e) {
  try {
    var sheet = getSheet_();
    var data = JSON.parse(e.postData.contents);
    var now = new Date().toISOString();

    sheet.appendRow([
      data.createdAt || now,
      data.restaurant || "Kurkuma",
      data.bookingDate || "",
      data.bookingTime || "",
      data.guests || "",
      data.seating || "",
      data.name || "",
      data.phone || "",
      data.email || "",
      data.notes || "",
      data.sourceUrl || "",
      data.submittedAt || now,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: String(error) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", service: "kurkuma-reservations" })
  ).setMimeType(ContentService.MimeType.JSON);
}

/** Run once from the editor to authorize the script before deploying. */
function authorizeScript() {
  doGet();
}
