# B.O.B — Launch Checklist

Files to upload to the SAME folder (root of the GitHub repo):
`index.html`, `privacy.html`, `impressum.html`, `founder-photo.jpg` (when ready).
The two .txt files are your own templates, not for the website.

## Before launch

1. **Upload all files** to GitHub (Add file → Upload files → Commit). Vercel redeploys automatically.
2. **Add founder-photo.jpg** beside index.html (the BB fallback shows until then).
3. **Replace the business-email placeholder** (`hello` / `YOUR-DOMAIN.de`) in FOUR places: the JavaScript constants near the bottom of `index.html`, the `<noscript>` block in `index.html`, and the constants at the bottom of `privacy.html` and `impressum.html`. Until you do, email links on the site point to a non-existent address.
4. **Confirm the postal address** shown in privacy.html and impressum.html is correct (currently Krenmoosstraße 55, 85757 Karlsfeld).
5. **Professional review** of the Privacy Policy and Impressum (lawyer or founder-support office). Neither file is legal advice.
6. **Verify your permission to carry out self-employed work in Germany** (relevant to your residence status).
7. **Complete any required business registration** (Gewerbeanmeldung / Kleinunternehmer decision) and then add verified details to the commented slot in impressum.html.
8. **Confirm how invoices will be issued** (format, numbering, whether VAT applies).
9. **Confirm the payment method** you'll accept (bank transfer, PayPal, etc.) and put it in the service-confirmation template.
10. **Confirm cancellation and withdrawal procedures** with the professional reviewer, then fill the marked section of service-confirmation-template.txt.

## Testing (no fake data)

11. Send ONE real test submission from a separate email address, write "TEST" in the comments, verify it arrives in your inbox and the Formspree dashboard, then delete it there. Free plan is limited (~50 submissions/month).
12. Test on iPhone Safari, Android Chrome, and desktop Chrome/Safari: both form steps, back button, refresh mid-form (draft should survive), the mobile menu (open, Escape, tap outside), and 200% zoom.
13. Open the site with `?source=TEST&campaign=TEST-1&university=Munich%20Business%20School&city=Munich&intake=2026-09` — the fields should pre-fill, the "pre-filled" notice should appear, and your test submission should include Referral Source and Referral Campaign.
14. View the deployed pages once more and confirm no visible internal notes or placeholders remain (especially the email placeholder).

## University / campaign links

```
https://YOUR-SITE.vercel.app/?source=MBS&campaign=September-2026&university=Munich%20Business%20School&city=Munich&intake=2026-09
```

Supported: `university`, `city`, `intake` (YYYY-MM), `country`, `source`, `campaign`. Use `%20` for spaces.

## Templates

- `service-confirmation-template.txt` — send before payment; fill placeholders; the cancellation section requires professional review first.
- `inquiry-confirmation-email.txt` — send after each inquiry arrives.
