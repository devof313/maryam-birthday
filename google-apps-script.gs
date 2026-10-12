/**
 * RSVP receiver for Maryam's birthday invite.
 * Paste this into Extensions → Apps Script of a Google Sheet that only you can open.
 * Each guest gets one row; if they answer again from the same phone, their row is updated.
 */
const SHEET_NAME = 'RSVPs';
const HEADERS = ['Updated', 'Name', 'Answer', 'Message for Maryam', 'Device'];
const LABELS = { yes: 'Coming', maybe: 'Maybe', no: "Can't make it" };

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const name = String(data.name || '').slice(0, 60);
    const answer = LABELS[data.status];
    if (!name || !answer) return ContentService.createTextOutput('invalid');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    // Leading quote stops a guest's text being treated as a formula
    const safe = s => (/^[=+\-@]/.test(s) ? "'" + s : s);
    const row = [new Date(), safe(name), answer, safe(String(data.note || '').slice(0, 300)), String(data.device || '')];

    const device = row[4];
    let target = 0;
    if (device && sheet.getLastRow() > 1) {
      const devices = sheet.getRange(2, 5, sheet.getLastRow() - 1, 1).getValues();
      const i = devices.findIndex(r => r[0] === device);
      if (i >= 0) target = i + 2;
    }
    if (target) sheet.getRange(target, 1, 1, row.length).setValues([row]);
    else sheet.appendRow(row);

    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}
