# Maryam's Secret Birthday 🤫

An Office-themed e-invite. **Do not tell Maryam.**

- `index.html`: the sealed memo (party details, countdown, secrecy oath)
- `rsvp.html`: RSVP form 18-B

## Collecting RSVPs (only you can see them)

Replies go into a Google Sheet that only you can open.

1. Create a new Google Sheet (sheets.new).
2. Open **Extensions → Apps Script**, delete the sample code, and paste in `google-apps-script.gs`. Save.
3. Click **Deploy → New deployment**, pick type **Web app**, set *Execute as* **Me** and *Who has access* **Anyone**, then **Deploy** and allow access.
4. Copy the web app URL (ends in `/exec`) and set it as `ENDPOINT` in `rsvp.html`.
5. Commit and push. Each reply shows up as a row in the **RSVPs** tab.

