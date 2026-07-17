/* B.O.B — MBS pilot pitch deck */
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const React = require("react");
const RDS = require("react-dom/server");
const fa = require("react-icons/fa");

const BLUE = "2563EB", PURPLE = "7C3AED", INK = "0B1220", SOFT = "4B5568",
      FAINT = "8A93A6", BGSOFT = "F6F8FC", LINE = "E7EAF0", BLUESOFT = "EFF4FF",
      ICE = "DBE6FF", WHITE = "FFFFFF";
const F = "Calibri";

async function iconData(Icon, color) {
  const svg = RDS.renderToStaticMarkup(React.createElement(Icon, { size: 256 }))
    .replace(/currentColor/g, "#" + color);
  const buf = await sharp(Buffer.from(svg), { density: 300 })
    .resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
async function gradPng(w, h, rx, c1, c2) {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#${c1}"/><stop offset="1" stop-color="#${c2}"/>
    </linearGradient></defs>
    <rect width="${w}" height="${h}" rx="${rx}" fill="url(#g)"/></svg>`;
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
async function circleGrad(c1, c2) {
  const svg = `<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#${c1}"/><stop offset="1" stop-color="#${c2}"/>
    </linearGradient></defs>
    <circle cx="128" cy="128" r="128" fill="url(#g)"/></svg>`;
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
  pres.author = "Baljit Bhatti";
  pres.title = "B.O.B — Pilot Proposal for Munich Business School";

  // assets
  const bgGrad   = await gradPng(1920, 1080, 0, BLUE, PURPLE);
  const chipGrad = await circleGrad(BLUE, PURPLE);
  const panelGrad = await gradPng(940, 900, 56, BLUE, PURPLE);
  const founderGrad = await gradPng(700, 880, 56, BLUE, PURPLE);
  const dayChip = await gradPng(300, 120, 30, BLUE, PURPLE);

  const IC = {};
  const iconList = {
    suitcase: fa.FaSuitcase, train: fa.FaTrain, sim: fa.FaSimCard,
    comments: fa.FaComments, plane: fa.FaPlaneArrival, pin: fa.FaMapMarkerAlt,
    grad: fa.FaGraduationCap, chart: fa.FaChartLine, hand: fa.FaHandshake,
    check: fa.FaCheck, lock: fa.FaLock, user: fa.FaUserCheck,
    shield: fa.FaShieldAlt, uni: fa.FaUniversity, envelope: fa.FaEnvelope,
    whatsapp: fa.FaWhatsapp, heart: fa.FaHeartbeat, bank: fa.FaPiggyBank,
    calendar: fa.FaCalendarAlt,
  };
  for (const [k, v] of Object.entries(iconList)) IC[k] = await iconData(v, WHITE);

  const eyebrow = (s, txt) => s.addText(txt, {
    x: 0.65, y: 0.5, w: 8, h: 0.35, fontFace: F, fontSize: 12, bold: true,
    color: BLUE, charSpacing: 3, margin: 0,
  });
  const title = (s, txt, opts = {}) => s.addText(txt, {
    x: 0.65, y: 0.86, w: 12, h: 0.75, fontFace: F, fontSize: 31, bold: true,
    color: INK, margin: 0, ...opts,
  });
  const chip = (s, key, x, y, d = 0.5) => {
    s.addImage({ data: chipGrad, x, y, w: d, h: d });
    s.addImage({ data: IC[key], x: x + d * 0.26, y: y + d * 0.26, w: d * 0.48, h: d * 0.48 });
  };
  const card = (s, x, y, w, h) => s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.12, fill: { color: BGSOFT }, line: { color: LINE, width: 1 },
  });

  /* ---------------- Slide 1 — Title ---------------- */
  let s = pres.addSlide();
  s.addImage({ data: bgGrad, x: 0, y: 0, w: 13.33, h: 7.5 });
  s.addShape(pres.ShapeType.roundRect, { x: 0.7, y: 0.65, w: 0.62, h: 0.62, rectRadius: 0.14, fill: { color: WHITE } });
  s.addText("B", { x: 0.7, y: 0.65, w: 0.62, h: 0.62, align: "center", valign: "middle", fontFace: F, fontSize: 26, bold: true, color: BLUE, margin: 0 });
  s.addText("B.O.B", { x: 1.48, y: 0.65, w: 3, h: 0.4, fontFace: F, fontSize: 22, bold: true, color: WHITE, margin: 0 });
  s.addText("Better Overseas Bound", { x: 1.48, y: 1.03, w: 4, h: 0.28, fontFace: F, fontSize: 11.5, color: ICE, margin: 0 });

  s.addText("PERSONAL ARRIVAL SUPPORT · MUNICH", { x: 0.7, y: 2.35, w: 9, h: 0.35, fontFace: F, fontSize: 13, bold: true, color: ICE, charSpacing: 3, margin: 0 });
  s.addText("Your first three days in Munich, made easier", { x: 0.7, y: 2.75, w: 11.3, h: 1.85, fontFace: F, fontSize: 44, bold: true, color: WHITE, margin: 0 });
  s.addText("A real person from Munich Airport to the student's door — and through SIM, bank and health-insurance setup.", { x: 0.7, y: 4.7, w: 9.4, h: 0.85, fontFace: F, fontSize: 16, color: BLUESOFT, margin: 0 });

  s.addText("A pilot proposal for Munich Business School — September 2026 intake", { x: 0.7, y: 6.15, w: 11.5, h: 0.4, fontFace: F, fontSize: 15, bold: true, color: WHITE, margin: 0 });
  s.addText("Prepared for Sevara Khaitmetova, Team Lead International Recruitment  ·  Presented by Baljit Bhatti, Founder (MBA, Munich Business School)  ·  July 2026", { x: 0.7, y: 6.58, w: 12, h: 0.4, fontFace: F, fontSize: 11.5, color: ICE, margin: 0 });
  s.addNotes("Thank Sevara for the time. One sentence: B.O.B gives incoming international students a real person for their first three days in Munich — airport, transport, SIM, bank, health insurance. Why I'm here: I'd like MBS to try it with the September 2026 intake as a small, no-cost pilot. I'll show the problem, the service, and exactly what the pilot asks of MBS — which is very little.");

  /* ---------------- Slide 2 — Problem ---------------- */
  s = pres.addSlide();
  eyebrow(s, "THE PROBLEM");
  title(s, "The first 72 hours are the hardest");
  s.addText("A student lands after a long flight with a year's worth of luggage, an unfamiliar transport system, and a to-do list in a language they don't speak yet. The essentials — SIM card, bank account, health insurance — all compete for their very first days.", { x: 0.65, y: 2.0, w: 5.2, h: 2.2, fontFace: F, fontSize: 14.5, color: SOFT, margin: 0 });
  s.addText("Those first days shape how students feel about Munich — and how they talk about the school that brought them here.", { x: 0.65, y: 4.5, w: 5.2, h: 1.4, fontFace: F, fontSize: 15.5, bold: true, color: INK, italic: true, margin: 0 });

  const painCards = [
    ["suitcase", "Luggage & ticket machines", "Heavy bags, unfamiliar machines, and no help at hand."],
    ["train", "Unfamiliar transport", "Which ticket, which train, which stop — alone, on day one."],
    ["sim", "Essential setup", "SIM, bank account and health insurance, all at once."],
    ["comments", "No one to ask", "Small questions with no obvious person to answer them."],
  ];
  painCards.forEach(([key, head, body], i) => {
    const cx = 6.35 + (i % 2) * 3.3, cy = 2.0 + Math.floor(i / 2) * 2.5;
    card(s, cx, cy, 3.1, 2.3);
    chip(s, key, cx + 0.3, cy + 0.3, 0.55);
    s.addText(head, { x: cx + 0.3, y: cy + 1.0, w: 2.6, h: 0.55, fontFace: F, fontSize: 14, bold: true, color: INK, margin: 0 });
    s.addText(body, { x: cx + 0.3, y: cy + 1.5, w: 2.6, h: 0.72, fontFace: F, fontSize: 11.5, color: SOFT, margin: 0 });
  });
  s.addNotes("Ground it in the student's reality — Sevara sees this every intake. Emphasise the last line: arrival experience feeds directly into satisfaction and word-of-mouth, which is recruitment currency. Optional personal line: I lived exactly this when I arrived.");

  /* ---------------- Slide 3 — Solution ---------------- */
  s = pres.addSlide();
  eyebrow(s, "THE SOLUTION");
  title(s, "A real person, from the airport onwards");
  const solRows = [
    ["plane", "Personal welcome at Munich Airport", "Met at arrivals, helped with luggage, accompanied by public transport to their accommodation."],
    ["pin", "In person, in Munich", "Not a hotline, not an app — someone standing beside the student for the first essential steps."],
    ["grad", "Built from firsthand experience", "Designed by an MBS MBA graduate who arrived in Germany as an international student himself."],
  ];
  solRows.forEach(([key, head, body], i) => {
    const ry = 2.15 + i * 1.55;
    chip(s, key, 0.65, ry, 0.55);
    s.addText(head, { x: 1.45, y: ry - 0.02, w: 6.0, h: 0.38, fontFace: F, fontSize: 16, bold: true, color: INK, margin: 0 });
    s.addText(body, { x: 1.45, y: ry + 0.36, w: 6.0, h: 0.8, fontFace: F, fontSize: 12.5, color: SOFT, margin: 0 });
  });
  s.addImage({ data: panelGrad, x: 8.15, y: 2.05, w: 4.5, h: 4.6 });
  const stats = [["3 days", "of personal, by-your-side support"], ["€30", "one-time introductory pilot price"], ["1:1", "delivered personally, in English"]];
  stats.forEach(([big, small], i) => {
    const sy = 2.4 + i * 1.45;
    s.addText(big, { x: 8.55, y: sy, w: 3.7, h: 0.62, fontFace: F, fontSize: 34, bold: true, color: WHITE, margin: 0 });
    s.addText(small, { x: 8.55, y: sy + 0.62, w: 3.7, h: 0.35, fontFace: F, fontSize: 12, color: ICE, margin: 0 });
  });
  s.addNotes("Keep it human: the product IS the person at arrivals. €30 is a deliberate launch-stage pilot price — accessibility and validation, not the long-term business model. Third-party costs (tickets, SIM, insurance) stay with the student; B.O.B is the guidance layer.");

  /* ---------------- Slide 4 — Three days ---------------- */
  s = pres.addSlide();
  eyebrow(s, "HOW IT WORKS");
  title(s, "Three days, by the student's side");
  const days = [
    ["Day 1", "Airport to accommodation", "Personal welcome at Munich Airport, help with luggage, the public-transport system explained, and an accompanied journey to the student's accommodation."],
    ["Day 2", "Getting connected", "Personal assistance with SIM-card setup and the immediate practical steps needed to begin settling in."],
    ["Day 3", "Banking & health insurance", "Guidance on bank-account and health-insurance options, the documents required, and what to do next."],
    ["After", "Standing on their own", "The student leaves with a clear understanding of Munich, their essential services, and what to complete next."],
  ];
  days.forEach(([tag, head, body], i) => {
    const cx = 0.65 + i * 3.11;
    card(s, cx, 2.05, 2.92, 4.35);
    s.addImage({ data: dayChip, x: cx + 0.28, y: 2.35, w: 1.0, h: 0.42 });
    s.addText(tag, { x: cx + 0.28, y: 2.35, w: 1.0, h: 0.42, align: "center", valign: "middle", fontFace: F, fontSize: 12.5, bold: true, color: WHITE, margin: 0 });
    s.addText(head, { x: cx + 0.28, y: 3.0, w: 2.4, h: 0.85, fontFace: F, fontSize: 15, bold: true, color: INK, margin: 0 });
    s.addText(body, { x: cx + 0.28, y: 3.9, w: 2.4, h: 2.3, fontFace: F, fontSize: 11.5, color: SOFT, margin: 0 });
  });
  s.addNotes("Walk the timeline briefly — the structure sells itself. Note the boundaries proactively if asked: guidance and practical help only; no legal, financial, immigration or insurance decisions; travel by public transport. That clarity protects the student, B.O.B, and MBS.");

  /* ---------------- Slide 5 — Why MBS ---------------- */
  s = pres.addSlide();
  eyebrow(s, "WHY THIS MATTERS FOR MBS");
  title(s, "A better arrival reflects on MBS");
  const whyCards = [
    ["chart", "Stronger student experience", "First impressions drive satisfaction, reviews and word-of-mouth — the currency of international recruitment."],
    ["hand", "Support beyond admission", "Extends the care MBS shows applicants to the exact moment they land in Germany."],
    ["check", "Zero cost, zero workload", "MBS shares a link. Nothing to organise, nothing to staff, nothing to pay for."],
    ["lock", "Students opt in themselves", "MBS never shares student data. Every conversation starts because the student reached out."],
  ];
  whyCards.forEach(([key, head, body], i) => {
    const cx = 0.65 + (i % 2) * 6.15, cy = 2.1 + Math.floor(i / 2) * 2.35;
    card(s, cx, cy, 5.9, 2.1);
    chip(s, key, cx + 0.32, cy + 0.32, 0.55);
    s.addText(head, { x: cx + 1.1, y: cy + 0.3, w: 4.55, h: 0.4, fontFace: F, fontSize: 15.5, bold: true, color: INK, margin: 0 });
    s.addText(body, { x: cx + 1.1, y: cy + 0.72, w: 4.55, h: 1.2, fontFace: F, fontSize: 12.5, color: SOFT, margin: 0 });
  });
  s.addNotes("This is the slide for Sevara's role specifically: recruitment doesn't end at the offer letter — the settled, happy student is the one who recommends MBS back home. Stress the bottom-right card hard: no data ever flows from MBS to B.O.B, so there is no GDPR exposure for the school.");

  /* ---------------- Slide 6 — Founder ---------------- */
  s = pres.addSlide();
  eyebrow(s, "ABOUT THE FOUNDER");
  title(s, "Built by someone who's been in that seat");
  s.addImage({ data: founderGrad, x: 0.65, y: 2.05, w: 3.5, h: 4.4 });
  s.addText("BB", { x: 0.65, y: 3.1, w: 3.5, h: 1.2, align: "center", fontFace: F, fontSize: 58, bold: true, color: WHITE, margin: 0 });
  s.addText("“I want your arrival to be easier than mine was.”", { x: 0.95, y: 5.35, w: 2.9, h: 0.85, align: "center", fontFace: F, fontSize: 11.5, italic: true, color: ICE, margin: 0 });
  const bio = [
    "I came to Germany as an international student and lived the arrival challenges personally: the luggage, the ticket machines, the paperwork — and no one beside me who knew the way.",
    "I completed my MBA at Munich Business School, I live in the Munich area, and I created B.O.B to give incoming students the support I wish I had.",
    "B.O.B is a new, personal service — and the website says so openly. Helping students arrive well today also shapes a longer-term idea: making relocation to Germany easier for students everywhere.",
  ];
  bio.forEach((p, i) => {
    s.addText(p, { x: 4.6, y: 2.15 + i * 1.15, w: 8.0, h: 1.1, fontFace: F, fontSize: 13.5, color: SOFT, margin: 0 });
  });
  s.addText("Baljit Bhatti", { x: 4.6, y: 5.7, w: 8, h: 0.4, fontFace: F, fontSize: 17, bold: true, color: INK, margin: 0 });
  s.addText("Founder, B.O.B  ·  MBA, Munich Business School", { x: 4.6, y: 6.1, w: 8, h: 0.35, fontFace: F, fontSize: 12, color: FAINT, margin: 0 });
  s.addNotes("This is the trust slide — speak personally. The MBS MBA matters twice: I know the school, and I know exactly what its incoming students face. Honesty as a feature: the site openly says this is a new service at a pilot price.");

  /* ---------------- Slide 7 — The pilot ---------------- */
  s = pres.addSlide();
  eyebrow(s, "THE PILOT");
  title(s, "A simple pilot with the September 2026 intake");
  const steps = [
    ["1", "MBS shares one link", "A B.O.B campaign link in one pre-arrival email. It pre-fills MBS, Munich and the intake automatically, so uptake from MBS students is trackable."],
    ["2", "Students reach out directly", "A two-minute inquiry form — no payment, no obligation. Availability is confirmed personally within 24 hours."],
    ["3", "Baljit delivers the three days", "Founder-delivered support at the €30 pilot price. Third-party costs (tickets, SIM, insurance) remain with the student."],
    ["4", "Results reported back to MBS", "Uptake, student feedback and lessons learned — shared with your team by the end of October 2026."],
  ];
  steps.forEach(([n, head, body], i) => {
    const ry = 2.05 + i * 1.18;
    s.addImage({ data: chipGrad, x: 0.65, y: ry, w: 0.5, h: 0.5 });
    s.addText(n, { x: 0.65, y: ry, w: 0.5, h: 0.5, align: "center", valign: "middle", fontFace: F, fontSize: 16, bold: true, color: WHITE, margin: 0 });
    s.addText(head, { x: 1.45, y: ry - 0.03, w: 11.2, h: 0.36, fontFace: F, fontSize: 15.5, bold: true, color: INK, margin: 0 });
    s.addText(body, { x: 1.45, y: ry + 0.33, w: 11.2, h: 0.62, fontFace: F, fontSize: 12.5, color: SOFT, margin: 0 });
  });
  s.addNotes("The mechanics slide — make the smallness of the ask obvious. The campaign link (?source=MBS&campaign=September-2026) means MBS-referred inquiries are measurable, so the October report is real data, not anecdotes. Everything — website, inquiry form, confirmation templates — is already built and live.");

  /* ---------------- Slide 8 — Safeguards ---------------- */
  s = pres.addSlide();
  eyebrow(s, "SAFEGUARDS");
  title(s, "Designed to be easy to recommend");
  const safe = [
    ["user", "A recommendation, nothing more", "MBS only shares a link. Every conversation starts because the student chose to reach out."],
    ["lock", "No data flows from MBS", "B.O.B never receives student data from the university — the website states this explicitly."],
    ["shield", "Privacy-first by design", "GDPR-conscious privacy policy, minimal data collection, and deletion on request at any time."],
    ["check", "Clear, honest scope", "Practical guidance only — no legal, financial, immigration or insurance decisions on the student's behalf."],
    ["uni", "Independent of MBS", "Clearly labelled on the site as an independent service, not operated by or affiliated with the school."],
    ["calendar", "No-obligation inquiries", "Submitting the form creates no payment obligation; price and plan are confirmed in writing before any payment."],
  ];
  safe.forEach(([key, head, body], i) => {
    const cx = 0.65 + (i % 2) * 6.35, cy = 2.1 + Math.floor(i / 2) * 1.55;
    chip(s, key, cx, cy, 0.5);
    s.addText(head, { x: cx + 0.72, y: cy - 0.03, w: 5.3, h: 0.34, fontFace: F, fontSize: 14.5, bold: true, color: INK, margin: 0 });
    s.addText(body, { x: cx + 0.72, y: cy + 0.31, w: 5.3, h: 0.85, fontFace: F, fontSize: 11.5, color: SOFT, margin: 0 });
  });
  s.addNotes("Pre-empt every institutional objection before it's raised: data protection, liability, affiliation, obligation. The site already carries the Impressum, privacy policy and scope statements — offer to send the links so her team can review them.");

  /* ---------------- Slide 9 — The ask ---------------- */
  s = pres.addSlide();
  s.addImage({ data: bgGrad, x: 0, y: 0, w: 13.33, h: 7.5 });
  s.addText("THE ASK", { x: 0.7, y: 0.75, w: 8, h: 0.35, fontFace: F, fontSize: 12, bold: true, color: ICE, charSpacing: 3, margin: 0 });
  s.addText("One email. That's the whole ask.", { x: 0.7, y: 1.15, w: 12, h: 0.95, fontFace: F, fontSize: 40, bold: true, color: WHITE, margin: 0 });
  s.addText("Include a B.O.B campaign link in one pre-arrival email to the September 2026 intake. B.O.B handles everything else — and reports the results back to your team in October.", { x: 0.7, y: 2.2, w: 10.6, h: 0.95, fontFace: F, fontSize: 15.5, color: BLUESOFT, margin: 0 });

  const timeline = [["July", "Agree the pilot"], ["August", "Pre-arrival email goes out"], ["September", "Arrivals supported, 3 days each"], ["October", "Results report to MBS"]];
  timeline.forEach(([mo, txt], i) => {
    const tx = 0.7 + i * 3.12;
    s.addShape(pres.ShapeType.roundRect, { x: tx, y: 3.5, w: 2.92, h: 1.35, rectRadius: 0.12, fill: { color: WHITE, transparency: 86 }, line: { color: ICE, width: 0.75 } });
    s.addText(mo, { x: tx + 0.25, y: 3.68, w: 2.45, h: 0.35, fontFace: F, fontSize: 14, bold: true, color: WHITE, margin: 0 });
    s.addText(txt, { x: tx + 0.25, y: 4.05, w: 2.45, h: 0.6, fontFace: F, fontSize: 11.5, color: ICE, margin: 0 });
  });

  s.addText("Baljit Bhatti  ·  Founder, B.O.B", { x: 0.7, y: 5.55, w: 8, h: 0.4, fontFace: F, fontSize: 16, bold: true, color: WHITE, margin: 0 });
  chip(s, "envelope", 0.7, 6.15, 0.42);
  s.addText("Baljit.Bhatti@munich-business-school.de", { x: 1.25, y: 6.17, w: 5.4, h: 0.38, valign: "middle", fontFace: F, fontSize: 13, color: WHITE, margin: 0 });
  chip(s, "whatsapp", 6.9, 6.15, 0.42);
  s.addText("+49 176 8754 2242", { x: 7.45, y: 6.17, w: 3.4, h: 0.38, valign: "middle", fontFace: F, fontSize: 13, color: WHITE, margin: 0 });
  s.addText("Website, inquiry form and confirmation workflow are built and ready to go live.", { x: 0.7, y: 6.85, w: 11, h: 0.35, fontFace: F, fontSize: 11.5, italic: true, color: ICE, margin: 0 });
  s.addNotes("Close with the timeline: agree now, link goes into August pre-arrival comms, students supported in September, data on her desk in October. If yes today: I'll send the campaign link and a short blurb her team can paste into the email. Then stop talking and let her respond.");

  await pres.writeFile({ fileName: "bob-mbs-pilot-deck.pptx" });
  console.log("done");
})().catch(e => { console.error(e); process.exit(1); });
