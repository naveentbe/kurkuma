/**
 * Kurkuma reservation webhook
 *
 * SETUP:
 * 1. Open Google Sheet → Extensions → Apps Script
 * 2. Paste this entire file
 * 3. Run testEmailNotification → authorize Gmail when prompted
 *    ✅ Check reservation.kurkuma@gmail.com inbox (and Spam)
 * 4. Deploy → Manage deployments → Edit → New version → Deploy
 *    (editing code alone does NOT update the live /exec URL — redeploy required)
 * 5. Test a booking from the website
 */

var SHEET_ID = "18xCKnZUM2bU7u54BMmbZHBG01eInNTg2TRQgyJ5OumY";
var NOTIFY_EMAIL = "reservation.kurkuma@gmail.com";

function getSheet_() {
  if (SHEET_ID) {
    return SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  }
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
}

function doPost(e) {
  var emailResult = { sent: false, errors: [] };

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

    emailResult = sendBookingNotification_(data);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        emailSent: emailResult.sent,
        emailErrors: emailResult.errors,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: String(error) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "ok",
      service: "kurkuma-reservations",
      notifyEmail: NOTIFY_EMAIL,
      sheetId: SHEET_ID,
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function sendBookingNotification_(data) {
  var result = { sent: false, errors: [] };

  if (!NOTIFY_EMAIL) {
    result.errors.push("NOTIFY_EMAIL is not set");
    return result;
  }

  var subject = "Nouvelle réservation — " + (data.name || "Kurkuma");
  var htmlBody =
    "<h2>Nouvelle réservation</h2>" +
    "<p><strong>Nom :</strong> " + escapeHtml_(data.name) + "</p>" +
    "<p><strong>E-mail :</strong> " + escapeHtml_(data.email) + "</p>" +
    "<p><strong>Téléphone :</strong> " + escapeHtml_(data.phone) + "</p>" +
    "<p><strong>Convives :</strong> " + escapeHtml_(data.guests) + "</p>" +
    "<p><strong>Date :</strong> " + escapeHtml_(data.bookingDate) + "</p>" +
    "<p><strong>Heure :</strong> " + escapeHtml_(data.bookingTime) + "</p>" +
    "<p><strong>Placement :</strong> " + escapeHtml_(data.seating) + "</p>" +
    "<p><strong>Message :</strong> " + escapeHtml_(data.notes) + "</p>";

  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      body: "Nouvelle réservation de " + (data.name || "—") + " pour " + (data.bookingDate || "—"),
      htmlBody: htmlBody,
      replyTo: data.email || undefined,
    });
    result.sent = true;
  } catch (err) {
    result.errors.push("Restaurant email: " + String(err));
  }

  if (data.email) {
    try {
      MailApp.sendEmail({
        to: data.email,
        subject: "Kurkuma — Confirmation de votre demande de réservation",
        body:
          "Bonjour " + (data.name || "") + ", nous avons bien reçu votre demande de réservation.",
        htmlBody:
          "<p>Bonjour " + escapeHtml_(data.name) + ",</p>" +
          "<p>Nous avons bien reçu votre demande de réservation :</p>" +
          "<ul>" +
          "<li><strong>Date :</strong> " + escapeHtml_(data.bookingDate) + "</li>" +
          "<li><strong>Heure :</strong> " + escapeHtml_(data.bookingTime) + "</li>" +
          "<li><strong>Convives :</strong> " + escapeHtml_(data.guests) + "</li>" +
          "<li><strong>Placement :</strong> " + escapeHtml_(data.seating) + "</li>" +
          "</ul>" +
          "<p>Nous confirmerons votre réservation sous peu.</p>" +
          "<p>À bientôt,<br>L'équipe Kurkuma</p>",
      });
    } catch (err) {
      result.errors.push("Guest email: " + String(err));
    }
  }

  return result;
}

function escapeHtml_(value) {
  if (value === null || value === undefined || value === "") return "—";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Run this from the Apps Script editor to authorize Gmail and verify delivery.
 * Check reservation.kurkuma@gmail.com inbox + Spam folder.
 */
function testEmailNotification() {
  var result = sendBookingNotification_({
    name: "Test Booking",
    email: NOTIFY_EMAIL,
    phone: "+352 26 30 06 05",
    guests: 2,
    bookingDate: "2026-06-21",
    bookingTime: "19:00",
    seating: "Salle principale",
    notes: "Test from Apps Script editor",
  });

  Logger.log(JSON.stringify(result, null, 2));

  if (!result.sent) {
    throw new Error("Email failed: " + result.errors.join("; "));
  }
}

/** Run once to authorize Sheet + Gmail before deploying. */
function authorizeScript() {
  doGet();
  testEmailNotification();
}
