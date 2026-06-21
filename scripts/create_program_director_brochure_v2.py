from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "outputs" / "brochure-v2-assets-anon"
PAGES_DIR = ROOT / "outputs" / "brochure-v2-pages"
PDF = ROOT / "outputs" / "Clarity_Schedule_Program_Director_Visual_Proposal.pdf"
PAGES_DIR.mkdir(parents=True, exist_ok=True)

W, H = 2550, 3300
M = 210
INNER = W - 2 * M

PURPLE = "#50459B"
DARK = "#26243A"
LIGHT_PURPLE = "#EFECFB"
TEAL = "#269889"
LIGHT_TEAL = "#E7F6F3"
AMBER = "#D79A32"
LIGHT_AMBER = "#FFF4DF"
RED = "#D75A64"
LIGHT_RED = "#FDECEF"
BLUE = "#4E7EBB"
LIGHT_BLUE = "#EAF2FC"
INK = "#222536"
MUTED = "#676D80"
LINE = "#E3E4EA"
BG = "#F5F6FA"
WHITE = "#FFFFFF"

REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
ITALIC = "/System/Library/Fonts/Supplemental/Arial Italic.ttf"


def f(size, bold=False, italic=False):
    return ImageFont.truetype(BOLD if bold else ITALIC if italic else REGULAR, size)


def wrap(draw, text, font, width):
    words, lines, current = text.split(), [], ""
    for word in words:
        test = f"{current} {word}".strip()
        if draw.textbbox((0, 0), test, font=font)[2] <= width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def text_block(draw, text, x, y, font, color, width, gap=10, anchor="la"):
    for line in wrap(draw, text, font, width):
        draw.text((x, y), line, font=font, fill=color, anchor=anchor)
        y += font.size + gap
    return y


def base(page, section="PROGRAM CONCEPT"):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((M, 85, W - M, H - 120), radius=34, fill=WHITE)
    d.text((M + 25, H - 78), f"CLARITY SCHEDULE  |  {section}", font=f(24, True), fill=MUTED)
    d.text((W - M - 25, H - 78), str(page), font=f(24, True), fill=MUTED, anchor="ra")
    return img, d


def header(d, kicker, title, subtitle=None, y=155):
    d.text((M + 50, y), kicker.upper(), font=f(28, True), fill=TEAL)
    y += 55
    y = text_block(d, title, M + 50, y, f(58, True), DARK, INNER - 100, 10)
    if subtitle:
        y += 10
        y = text_block(d, subtitle, M + 50, y, f(30), INK, INNER - 100, 12)
    return y


def rounded_card(d, box, fill, outline=LINE, radius=25):
    d.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=3)


def card(d, box, title, body, accent=PURPLE, fill=LIGHT_PURPLE, title_size=31, body_size=25):
    x1, y1, x2, y2 = box
    rounded_card(d, box, fill)
    d.text((x1 + 28, y1 + 25), title, font=f(title_size, True), fill=accent)
    text_block(d, body, x1 + 28, y1 + 78, f(body_size), INK, x2 - x1 - 56, 8)


def image_fit(canvas, filename, box, crop=None):
    x1, y1, x2, y2 = box
    image = Image.open(ASSETS / filename).convert("RGB")
    if crop:
        image = image.crop(crop)
    image.thumbnail((x2 - x1, y2 - y1), Image.Resampling.LANCZOS)
    x = x1 + (x2 - x1 - image.width) // 2
    y = y1 + (y2 - y1 - image.height) // 2
    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle((x - 12, y - 12, x + image.width + 12, y + image.height + 12), radius=20, fill=(30, 35, 60, 28))
    canvas.paste(shadow, (0, 0), shadow)
    canvas.paste(image, (x, y))
    return x, y, image.width, image.height


def screenshot_with_caption(canvas, filename, box, caption, crop=None):
    x, y, iw, ih = image_fit(canvas, filename, box, crop)
    d = ImageDraw.Draw(canvas)
    text_block(d, caption, W // 2, y + ih + 22, f(23, italic=True), MUTED, box[2] - box[0], 6, "ma")
    return y + ih + 55


def number_callout(d, number, xy, title, body, width):
    x, y = xy
    d.ellipse((x, y, x + 52, y + 52), fill=PURPLE)
    d.text((x + 26, y + 26), str(number), font=f(25, True), fill=WHITE, anchor="mm")
    d.text((x + 70, y), title, font=f(28, True), fill=DARK)
    return text_block(d, body, x + 70, y + 43, f(23), MUTED, width - 70, 7)


def arrow_flow(d, y, items):
    x = M + 55
    gap = 16
    cw = (INNER - 110 - gap * (len(items) - 1)) // len(items)
    for idx, (label, body, accent, light) in enumerate(items):
        rounded_card(d, (x, y, x + cw, y + 270), light)
        d.text((x + 24, y + 23), label, font=f(30, True), fill=accent)
        text_block(d, body, x + 24, y + 75, f(23), INK, cw - 48, 7)
        if idx < len(items) - 1:
            d.text((x + cw + gap // 2, y + 130), "→", font=f(34, True), fill="#B8B4D5", anchor="mm")
        x += cw + gap
    return y + 290


pages = []

# 1. Cover
img, d = base(1, "VISUAL PROPOSAL")
y = header(d, "Residency scheduling, redesigned", "Clarity Schedule",
           "A connected platform for resident requests, annual master schedules, monthly service schedules, approvals, fairness, and publication.")
y += 35
rounded_card(d, (M + 50, y, W - M - 50, y + 195), LIGHT_PURPLE, "#D9D3F5")
d.text((W // 2, y + 45), "The central idea", font=f(29, True), fill=PURPLE, anchor="ma")
text_block(d, "Enter program rules and resident data once. Reuse them to generate safe, editable templates for every block and every service.", W // 2, y + 95, f(31, True), DARK, INNER - 220, 10, "ma")
y += 235
image_fit(img, "chief-overview-main.png", (M + 65, y, W - M - 65, y + 900))
image_fit(img, "resident-schedule-main.png", (M + 270, y + 650, W - M - 270, y + 1340))
d.rounded_rectangle((M + 50, 2890, W - M - 50, 3075), radius=28, fill=DARK)
d.text((W // 2, 2945), "Less manual reconciliation. Clearer decisions. Safer coverage.", font=f(36, True), fill=WHITE, anchor="ma")
d.text((W // 2, 3012), "All names and examples in this proposal are fictional demonstration data.", font=f(23), fill="#DAD6F7", anchor="ma")
pages.append(img)

# 2. Problem
img, d = base(2)
y = header(d, "The problem we are solving", "Scheduling is a chain of manual investigations",
           "A single change can require three people to open several files, compare calendars, check rules, and communicate the same facts repeatedly.")
y += 30
problems = [
    ("Requests live elsewhere", "Vacation, weekends, PTO, conferences, exams, fellowship timing, and special circumstances arrive through different channels.", RED, LIGHT_RED),
    ("Rules are reconstructed", "Clinic and didactic patterns, outside-rotator rules, service minimums, and call restrictions are checked again every block.", AMBER, LIGHT_AMBER),
    ("Master and monthly schedules drift", "Annual rotation assignments do not automatically populate the residents who need each monthly service schedule.", RED, LIGHT_RED),
    ("Coverage is difficult to see", "It is easy to oversaturate one service while leaving another below its minimum intern or senior requirement.", AMBER, LIGHT_AMBER),
    ("Fairness is calculated late", "Weekends, golden weekends, calls, nights, clinic sessions, and hours often require separate manual counting.", RED, LIGHT_RED),
    ("Changes create new conflicts", "A call switch or master-schedule edit may produce clinic, post-call, adjacent-call, or next-block conflicts.", AMBER, LIGHT_AMBER),
]
x1, x2 = M + 50, W // 2 + 8
for i, item in enumerate(problems):
    row, col = divmod(i, 2)
    x = x1 if col == 0 else x2
    card(d, (x, y + row * 260, x + 1010, y + row * 260 + 235), *item)
y += 810
d.text((M + 50, y), "What the current process often requires", font=f(40, True), fill=PURPLE)
y += 70
y = arrow_flow(d, y, [
    ("1. Search", "Find the resident's master schedule, service PDF, clinic pattern, leave, and prior calls.", RED, LIGHT_RED),
    ("2. Compare", "Check the date against staffing minimums, call rules, post-call needs, and other requests.", AMBER, LIGHT_AMBER),
    ("3. Communicate", "The offering resident, receiving resident, and chief each repeat the same review.", PURPLE, LIGHT_PURPLE),
    ("4. Rebuild", "Update documents and recount coverage, nights, weekends, and hours after the change.", TEAL, LIGHT_TEAL),
])
y += 45
rounded_card(d, (M + 50, y, W - M - 50, y + 250), DARK)
d.text((W // 2, y + 58), "Clarity turns this investigation into a guided workflow.", font=f(39, True), fill=WHITE, anchor="ma")
text_block(d, "The platform pulls the relevant data automatically, displays why a request is eligible or conflicting, and gives chiefs the final decision.", W // 2, y + 125, f(28), "#E9E6FF", INNER - 200, 10, "ma")
pages.append(img)

# 3. Connected data
img, d = base(3)
y = header(d, "The solution", "One connected data model powers every schedule",
           "Resident facts, approved requests, institutional patterns, service rules, and the annual master schedule should not be separate islands.")
y += 30
inputs = [
    ("Resident profiles", "PGY level, institution, recurring clinic, didactics, eligibility, fellowship plans, and special circumstances.", BLUE, LIGHT_BLUE),
    ("Approved requests", "Vacation, PTO, sick leave, weekends, days off, conferences, exams, and call restrictions.", TEAL, LIGHT_TEAL),
    ("Institution rules", "Outside-rotator patterns, protected educational time, travel buffers, and eligible roles.", AMBER, LIGHT_AMBER),
    ("Program structure", "Blocks, services, units, staffing minimums, shift templates, work hours, and safety rules.", PURPLE, LIGHT_PURPLE),
]
for i, item in enumerate(inputs):
    col, row = i % 2, i // 2
    x = M + 50 + col * 1040
    card(d, (x, y + row * 260, x + 1010, y + row * 260 + 230), *item)
y += 535
rounded_card(d, (M + 340, y, W - M - 340, y + 250), DARK)
d.text((W // 2, y + 45), "CLARITY SCHEDULING ENGINE", font=f(35, True), fill=WHITE, anchor="ma")
text_block(d, "Pull eligible residents from the master schedule, protect fixed activities, propose balanced assignments, and flag conflicts before publication.", W // 2, y + 105, f(27), "#E9E6FF", INNER - 760, 9, "ma")
y += 290
outputs = [
    ("Editable master schedule", "Capacity-aware annual rotation planning"),
    ("Service templates", "One monthly schedule per service per block"),
    ("Resident portal", "Personal schedule, requests, PTO, and switches"),
    ("Chief dashboard", "Approvals, readiness, conflicts, and analytics"),
]
x = M + 50
cw = 500
for title, body in outputs:
    card(d, (x, y, x + cw, y + 235), title, body, TEAL, LIGHT_TEAL, 27, 23)
    x += cw + 22
y += 285
screenshot_with_caption(img, "chief-overview-main.png", (M + 110, y, W - M - 110, 3020),
                        "The result is a block-level view of which service schedules are ready, pending, or need attention.")
pages.append(img)

# 4. Resident navigation
img, d = base(4, "RESIDENT EXPERIENCE")
y = header(d, "Resident portal", "Everything a resident needs, without exposing private peer data",
           "Residents see their own annual plan and personal assignments, while published service schedules remain shared and read-only.")
y += 35
image_fit(img, "resident-nav.png", (M + 60, y, M + 700, y + 1540))
number_callout(d, 1, (M + 790, y + 20), "My overview", "A summary of current rotation, expected hours, calls, golden weekends, days off, clinic, didactics, and upcoming events.", 1320)
number_callout(d, 2, (M + 790, y + 260), "My schedule", "A monthly personal calendar showing exact work hours, call type, clinic, protected didactics, exams, post-call time, and rest days.", 1320)
number_callout(d, 3, (M + 790, y + 520), "My master schedule", "A private block-by-block annual rotation plan. Other residents cannot see it; authorized chiefs can edit the program-wide plan.", 1320)
number_callout(d, 4, (M + 790, y + 800), "Published schedules", "Read-only service rosters show who is covering each service, where they are assigned, and the hours they work.", 1320)
number_callout(d, 5, (M + 790, y + 1070), "Requests, call switches, and leave", "Structured requests replace emails and messages. Status and chief decisions remain visible to the resident.", 1320)
y += 1590
rounded_card(d, (M + 60, y, W - M - 60, y + 300), LIGHT_PURPLE, "#D9D3F5")
d.text((M + 95, y + 38), "Resident privacy by design", font=f(34, True), fill=PURPLE)
text_block(d, "A resident can view their own master schedule and personal assignments, but not another resident's private annual plan. Shared service schedules are visible only after chiefs publish them.", M + 95, y + 100, f(28), INK, INNER - 190, 10)
y += 340
rounded_card(d, (M + 60, y, W - M - 60, y + 260), LIGHT_TEAL)
d.text((M + 95, y + 35), "Why this matters", font=f(34, True), fill=TEAL)
text_block(d, "Residents spend less time asking where to find schedules or whether a request was received. Chiefs spend less time answering repetitive questions.", M + 95, y + 98, f(28), INK, INNER - 190, 10)
pages.append(img)

# 5. Resident schedule and master plan
img, d = base(5, "RESIDENT EXPERIENCE")
y = header(d, "Resident portal", "My schedule and my private master schedule",
           "Two different views answer two different questions: What am I working this month? Where am I rotating across the year?")
y += 25
end = screenshot_with_caption(img, "resident-schedule-main.png", (M + 55, y, W - M - 55, y + 930),
                              "My schedule: daily work hours, calls, clinic, didactics, post-call time, and rest days.")
y = end + 25
for i, (title, body, accent, light) in enumerate([
    ("Personal workload summary", "Expected hours, call count, weekend days off, golden weekends, and current service are calculated from the published assignments.", PURPLE, LIGHT_PURPLE),
    ("Protected activities are visible", "Clinic, didactics, ITE, conferences, and approved leave are clearly separated from regular service shifts.", AMBER, LIGHT_AMBER),
]):
    x = M + 55 + i * 1040
    card(d, (x, y, x + 1010, y + 235), title, body, accent, light)
y += 275
end = screenshot_with_caption(img, "resident-master-main.png", (M + 55, y, W - M - 55, y + 1110),
                              "My master schedule: the resident's private annual rotation plan and approved annual preferences.")
y = end + 20
rounded_card(d, (M + 55, y, W - M - 55, y + 255), LIGHT_TEAL)
d.text((M + 90, y + 35), "The link between annual and monthly scheduling", font=f(34, True), fill=TEAL)
text_block(d, "When the master schedule assigns a resident to NICU in Block 2, the Block 2 NICU schedule automatically begins with that resident in its eligible roster. Chiefs do not need to re-enter the resident manually.", M + 90, y + 98, f(27), INK, INNER - 180, 9)
pages.append(img)

# 6. Requests and call switching
img, d = base(6, "RESIDENT EXPERIENCE")
y = header(d, "Resident requests", "Replace manual eligibility searches with automatic checks",
           "The most time-consuming requests are often the ones that cross several schedules, such as a call switch.")
y += 30
card(d, (M + 50, y, W // 2 - 10, y + 300), "Before Clarity",
     "The offering resident, receiving resident, and chief each inspect call PDFs, clinic schedules, adjacent calls, and post-call implications. Messages move back and forth until everyone agrees.", RED, LIGHT_RED, 34, 27)
card(d, (W // 2 + 10, y, W - M - 50, y + 300), "With Clarity",
     "The resident offers a call, the receiving resident sees immediate eligibility results, and the chief receives one approval item with the evidence already attached.", TEAL, LIGHT_TEAL, 34, 27)
y += 345
image_fit(img, "call-switch-anon.png", (M + 80, y, M + 930, 3000))
callouts = [
    ("Offer an assigned call", "The system lists the resident's actual call assignments and keeps the original assignment active until approval."),
    ("State acceptable alternatives", "Residents can identify dates or call types they can exchange, reducing open-ended messaging."),
    ("Screen the receiving resident", "The app checks clinic on the call day, clinic the next day, an existing call on the same date, and calls on adjacent days."),
    ("Send one complete request", "The chief sees the offering resident, receiving resident, date, call type, eligibility results, and approval controls together."),
    ("Document the final decision", "Approval or decline is visible to both residents and can update the schedule without losing the review trail."),
]
yy = y + 25
for index, (title, body) in enumerate(callouts, 1):
    yy = number_callout(d, index, (M + 1030, yy), title, body, 1180) + 38
rounded_card(d, (M + 1030, yy + 10, W - M - 60, yy + 260), DARK)
d.text((M + 1070, yy + 48), "Safety rule example", font=f(31, True), fill=WHITE)
text_block(d, "A resident cannot accept a call on the same day as clinic, the day before clinic, or next to another call. The reason is shown immediately.", M + 1070, yy + 105, f(25), "#ECE9FF", 1080, 8)
pages.append(img)

# 7. Chief schedule templates
img, d = base(7, "CHIEF EXPERIENCE")
y = header(d, "Chief portal", "Build reusable templates for every service",
           "Each block may require many separate service schedules. Every service can have different staffing, hours, units, calls, nights, and fairness targets.")
y += 25
end = screenshot_with_caption(img, "service-builder-main.png", (M + 55, y, W - M - 55, y + 1050),
                              "Service builder: define the program structure and service-specific coverage and fairness rules.")
y = end + 15
cards = [
    ("Add any service", "NICU, PICU, Heme/Onc, cardiology, colored floor teams, night senior, jeopardy, or a custom service.", PURPLE, LIGHT_PURPLE),
    ("Define units and locations", "Divide one service into Unit 1, Unit 2, floor teams, consult roles, procedure coverage, or named responsibilities.", TEAL, LIGHT_TEAL),
    ("Set staffing minimums", "Specify required interns, seniors, PGY eligibility, outside rotators, and supplemental call-pool residents.", AMBER, LIGHT_AMBER),
    ("Create shift templates", "Standard day, night, short call, long call, procedure call, weekend, post-call, protected time, or custom tasks.", BLUE, LIGHT_BLUE),
]
for i, item in enumerate(cards):
    row, col = divmod(i, 2)
    x = M + 55 + col * 1040
    card(d, (x, y + row * 260, x + 1010, y + row * 260 + 230), *item)
y += 555
rounded_card(d, (M + 55, y, W - M - 55, y + 250), DARK)
d.text((W // 2, y + 52), "Configure once, reuse across every block", font=f(38, True), fill=WHITE, anchor="ma")
text_block(d, "The chief can still edit any generated assignment. Templates save setup time without replacing clinical judgment.", W // 2, y + 120, f(28), "#E9E6FF", INNER - 200, 9, "ma")
pages.append(img)

# 8. Chief monthly schedule editing
img, d = base(8, "CHIEF EXPERIENCE")
y = header(d, "Chief portal", "Start with a master-linked draft, then edit it like a spreadsheet",
           "The platform pulls residents assigned to the selected service and block, applies protected activities, proposes shifts, and continuously recalculates coverage and fairness.")
y += 25
end = screenshot_with_caption(img, "chief-schedule.png", (M + 45, y, W - M - 45, y + 1600),
                              "Schedule workspace: resident rows, daily assignments, coverage totals, live warnings, and fairness indicators.")
y = end + 15
features = [
    ("Master-linked roster", "The initial resident list comes from the annual rotation plan. Eligible call-pool residents can be added when needed.", PURPLE, LIGHT_PURPLE),
    ("Drag-and-edit flexibility", "Chiefs can move assignments, change residents, copy shifts, adjust times, reorder rows, and override the generated draft.", TEAL, LIGHT_TEAL),
    ("Coverage guardrails", "Daily totals reveal understaffed dates and whether required interns, seniors, units, and call roles are filled.", RED, LIGHT_RED),
    ("Fairness visibility", "Night stretches, weekend days, golden weekends, calls, and hours can be compared before publication.", AMBER, LIGHT_AMBER),
]
for i, item in enumerate(features):
    row, col = divmod(i, 2)
    x = M + 45 + col * 1045
    card(d, (x, y + row * 260, x + 1015, y + row * 260 + 230), *item)
y += 555
rounded_card(d, (M + 45, y, W - M - 45, y + 230), LIGHT_TEAL)
d.text((M + 80, y + 35), "Expected result", font=f(34, True), fill=TEAL)
text_block(d, "A publish-ready service schedule that lists resident names, exact work hours, coverage responsibility, calls, protected time, and rest days.", M + 80, y + 98, f(28), INK, INNER - 160, 9)
pages.append(img)

# 9. Master schedule
img, d = base(9, "CHIEF EXPERIENCE")
y = header(d, "Annual planning", "Edit the master schedule while protecting service capacity",
           "Resident preferences matter, but every block must still contain enough residents for required services and clearly identify where electives, vacation, and outside rotators are eligible.")
y += 25
end = screenshot_with_caption(img, "chief-master.png", (M + 45, y, W - M - 45, y + 1650),
                              "Editable annual master schedule: each resident by block, with capacity warnings and a live conflict inspector.")
y = end + 15
features = [
    ("Resident preference matching", "Use annual rankings, requested vacation blocks, fellowship timing, life events, and preferred sequence as decision support.", PURPLE, LIGHT_PURPLE),
    ("Block capacity checks", "See immediately when PICU, NICU, floor, ED, or another rotation is over capacity or below its minimum.", RED, LIGHT_RED),
    ("Eligible elective and vacation blocks", "Clearly distinguish flexible blocks from mandatory inpatient assignments and account for outside rotator eligibility.", TEAL, LIGHT_TEAL),
    ("Unsafe transition alerts", "Flag end-of-block night assignments followed by inpatient rotations or other transitions that prevent appropriate recovery.", AMBER, LIGHT_AMBER),
]
for i, item in enumerate(features):
    row, col = divmod(i, 2)
    x = M + 45 + col * 1045
    card(d, (x, y + row * 260, x + 1015, y + row * 260 + 230), *item)
y += 555
rounded_card(d, (M + 45, y, W - M - 45, y + 230), DARK)
d.text((W // 2, y + 52), "Goal: honor preferences without creating a short team", font=f(36, True), fill=WHITE, anchor="ma")
text_block(d, "Every edit is evaluated against rotation capacity and downstream monthly schedule requirements.", W // 2, y + 120, f(27), "#E9E6FF", INNER - 200, 9, "ma")
pages.append(img)

# 10. Approvals and rules
img, d = base(10, "CHIEF EXPERIENCE")
y = header(d, "Governance and automation", "Approve requests once; apply institution rules automatically",
           "Chief decisions should become scheduling data, and recurring institutional rules should not require resident-by-resident re-entry.")
y += 20
end = screenshot_with_caption(img, "chief-approvals.png", (M + 50, y, W - M - 50, y + 720),
                              "Chief approval queue: call switches and resident requests include conflicts, eligibility checks, and decision controls.")
y = end + 10
card(d, (M + 50, y, W // 2 - 10, y + 245), "Approve or decline requests",
     "Only approved requests influence generation. Declined requests remain documented but do not constrain the schedule.", PURPLE, LIGHT_PURPLE)
card(d, (W // 2 + 10, y, W - M - 50, y + 245), "Immediate downstream effect",
     "Approved leave, exams, weekends, and switches can update availability, protected time, and schedule validation automatically.", TEAL, LIGHT_TEAL)
y += 285
end = screenshot_with_caption(img, "institution-rules.png", (M + 50, y, W - M - 50, y + 1240),
                              "Institution profiles: recurring clinic, didactics, conferences, eligibility, and scheduling effects are reused automatically.")
y = end + 10
features = [
    ("Different institutions, different patterns", "Main-program residents and outside rotators can follow different clinic days, didactics, travel buffers, and eligible service roles.", AMBER, LIGHT_AMBER),
    ("Editable and overrideable", "Chiefs can edit a reusable institutional profile or add a block-specific exception for an individual resident.", PURPLE, LIGHT_PURPLE),
]
for i, item in enumerate(features):
    x = M + 50 + i * 1040
    card(d, (x, y, x + 1010, y + 235), *item)
pages.append(img)

# 11. Outcome
img, d = base(11, "PROGRAM VALUE")
y = header(d, "Department impact", "What changes when the schedules are connected",
           "The value is not only faster schedule creation. It is better visibility, safer changes, clearer accountability, and a reusable operational process.")
y += 25
stake = [
    ("Chiefs", "Fewer manual cross-checks and fewer repeated data-entry tasks.", "More time for education, resident support, and complex judgment.", PURPLE, LIGHT_PURPLE),
    ("Residents", "Clear personal schedules, private annual plans, structured requests, and safer call switches.", "More trust, predictability, and transparency about workload and decisions.", TEAL, LIGHT_TEAL),
    ("Department", "Consistent rules, documented approvals, live coverage readiness, and linked analytics.", "Better resilience, auditability, continuity, and awareness of staffing risk.", AMBER, LIGHT_AMBER),
]
for idx, (who, immediate, result, accent, light) in enumerate(stake):
    yy = y + idx * 285
    rounded_card(d, (M + 50, yy, W - M - 50, yy + 255), light)
    d.text((M + 85, yy + 35), who, font=f(38, True), fill=accent)
    d.text((M + 490, yy + 35), "TIME AND EFFORT SAVED", font=f(23, True), fill=MUTED)
    text_block(d, immediate, M + 490, yy + 80, f(27), INK, 690, 9)
    d.text((M + 1310, yy + 35), "RESULT", font=f(23, True), fill=MUTED)
    text_block(d, result, M + 1310, yy + 80, f(27), INK, 740, 9)
y += 890
d.text((M + 50, y), "A practical evaluation plan", font=f(43, True), fill=PURPLE)
y += 75
y = arrow_flow(d, y, [
    ("Phase 1", "Configure one academic year, sample resident profiles, institution rules, and two services.", PURPLE, LIGHT_PURPLE),
    ("Phase 2", "Generate one block in parallel with the current process and record editing time and conflicts.", TEAL, LIGHT_TEAL),
    ("Phase 3", "Compare coverage, fairness, usability, and chief/resident feedback before wider adoption.", AMBER, LIGHT_AMBER),
])
y += 35
rounded_card(d, (M + 50, y, W - M - 50, y + 300), DARK)
text_block(d, "The proposed outcome: a transparent, reusable, and safer scheduling workflow that reduces administrative effort without removing chief control.", W // 2, y + 58, f(39, True), WHITE, INNER - 200, 13, "ma")
d.text((W // 2, y + 235), "All resident names and scheduling records shown are fictional demonstration data.", font=f(24), fill="#DAD6F7", anchor="ma")
pages.append(img)

for index, page in enumerate(pages, 1):
    page.save(PAGES_DIR / f"page-{index}.png", quality=95)

pages[0].save(PDF, "PDF", resolution=300, save_all=True, append_images=pages[1:])
print(PDF)
