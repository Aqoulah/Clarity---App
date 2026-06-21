from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "outputs" / "brochure-assets"
OUT_DIR = ROOT / "outputs" / "brochure-pages"
PDF = ROOT / "outputs" / "Clarity_Schedule_Program_Director_Brochure.pdf"
OUT_DIR.mkdir(parents=True, exist_ok=True)

W, H = 2550, 3300
M = 245
CONTENT_W = W - 2 * M

PURPLE = "#50459B"
PURPLE_DARK = "#26243A"
PURPLE_LIGHT = "#EFECFB"
TEAL = "#269889"
TEAL_LIGHT = "#E7F6F3"
AMBER = "#D79A32"
AMBER_LIGHT = "#FFF4DF"
RED = "#D75A64"
RED_LIGHT = "#FDECEF"
INK = "#222536"
MUTED = "#676D80"
LINE = "#E3E4EA"
BG = "#F6F7FB"
WHITE = "#FFFFFF"

FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_ITALIC = "/System/Library/Fonts/Supplemental/Arial Italic.ttf"


def font(size, bold=False, italic=False):
    path = FONT_BOLD if bold else FONT_ITALIC if italic else FONT_REG
    return ImageFont.truetype(path, size)


def wrap_text(draw, text, fnt, max_width):
    words = text.split()
    lines, current = [], ""
    for word in words:
        trial = f"{current} {word}".strip()
        if draw.textbbox((0, 0), trial, font=fnt)[2] <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(draw, text, xy, fnt, fill, max_width, line_gap=10, anchor="la"):
    x, y = xy
    lines = wrap_text(draw, text, fnt, max_width)
    line_h = fnt.size + line_gap
    for line in lines:
        draw.text((x, y), line, font=fnt, fill=fill, anchor=anchor)
        y += line_h
    return y


def page_base(page_no, label="PROGRAM CONCEPT"):
    image = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((M, 100, W - M, H - 125), radius=34, fill=WHITE)
    draw.text((M + 30, H - 88), f"CLARITY SCHEDULE  |  {label}", font=font(25, True), fill=MUTED)
    draw.text((W - M - 30, H - 88), str(page_no), font=font(25, True), fill=MUTED, anchor="ra")
    return image, draw


def kicker(draw, text, y):
    draw.text((M + 45, y), text.upper(), font=font(29, True), fill=TEAL)
    return y + 48


def heading(draw, text, y, size=61):
    return draw_wrapped(draw, text, (M + 45, y), font(size, True), PURPLE_DARK, CONTENT_W - 90, 12)


def paragraph(draw, text, y, size=34, color=INK, max_width=None, bold=False, italic=False, line_gap=14):
    return draw_wrapped(draw, text, (M + 45, y), font(size, bold, italic), color, max_width or CONTENT_W - 90, line_gap)


def add_screenshot(canvas, filename, box, caption=None):
    x1, y1, x2, y2 = box
    shot = Image.open(ASSETS / filename).convert("RGB")
    shot.thumbnail((x2 - x1, y2 - y1), Image.Resampling.LANCZOS)
    x = x1 + (x2 - x1 - shot.width) // 2
    y = y1 + (y2 - y1 - shot.height) // 2
    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.rounded_rectangle((x - 14, y - 14, x + shot.width + 14, y + shot.height + 14), radius=25, fill=(30, 35, 60, 28))
    canvas.paste(shadow, (0, 0), shadow)
    canvas.paste(shot, (x, y))
    if caption:
        draw = ImageDraw.Draw(canvas)
        draw_wrapped(draw, caption, (W // 2, y + shot.height + 24), font(24, italic=True), MUTED, x2 - x1, 6, "ma")
    return y + shot.height


def metric_strip(draw, y, items):
    gap = 18
    card_w = (CONTENT_W - 90 - gap * (len(items) - 1)) // len(items)
    x = M + 45
    for value, label in items:
        draw.rounded_rectangle((x, y, x + card_w, y + 185), radius=25, fill=PURPLE_LIGHT, outline="#DDD8F5", width=3)
        draw.text((x + card_w // 2, y + 44), value, font=font(52, True), fill=PURPLE, anchor="ma")
        draw.text((x + card_w // 2, y + 118), label, font=font(25, True), fill=MUTED, anchor="ma")
        x += card_w + gap
    return y + 205


def card_grid(draw, y, cards, columns=2, height=230):
    gap = 18
    total_w = CONTENT_W - 90
    card_w = (total_w - gap * (columns - 1)) // columns
    rows = (len(cards) + columns - 1) // columns
    for index, (title, body, accent, light) in enumerate(cards):
        row, col = divmod(index, columns)
        x = M + 45 + col * (card_w + gap)
        yy = y + row * (height + gap)
        draw.rounded_rectangle((x, yy, x + card_w, yy + height), radius=24, fill=light, outline=LINE, width=3)
        draw.text((x + 28, yy + 25), title, font=font(31, True), fill=accent)
        draw_wrapped(draw, body, (x + 28, yy + 78), font(25), INK, card_w - 56, 8)
    return y + rows * (height + gap)


def workflow(draw, y):
    items = [
        ("1", "Collect", "Preferences, leave, weekends, and master rankings."),
        ("2", "Configure", "Services, roles, hours, protected time, and rules."),
        ("3", "Generate", "Master-linked rosters and editable schedule drafts."),
        ("4", "Validate", "Coverage, clinic, calls, hours, and fairness checks."),
    ]
    gap = 15
    card_w = (CONTENT_W - 90 - gap * 3) // 4
    x = M + 45
    for n, title, body in items:
        light = TEAL_LIGHT if n in ("1", "4") else PURPLE_LIGHT
        accent = TEAL if n in ("1", "4") else PURPLE
        draw.rounded_rectangle((x, y, x + card_w, y + 300), radius=23, fill=light, outline=LINE, width=3)
        draw.text((x + 25, y + 25), n, font=font(47, True), fill=accent)
        draw.text((x + 25, y + 92), title, font=font(29, True), fill=PURPLE_DARK)
        draw_wrapped(draw, body, (x + 25, y + 145), font(23), MUTED, card_w - 50, 7)
        x += card_w + gap
    return y + 322


pages = []

# Page 1
img, d = page_base(1)
y = kicker(d, "A smarter operating system for residency scheduling", 185)
d.text((M + 45, y + 8), "Clarity Schedule", font=font(92, True), fill=PURPLE_DARK)
y += 125
y = paragraph(d, "From resident requests to a fair, editable, publish-ready schedule", y, 45, PURPLE, line_gap=12)
y += 30
y = paragraph(d, "A program-wide platform that replaces disconnected forms, spreadsheets, PDFs, and manual cross-checking with one coordinated workflow for residents, chiefs, and departments.", y, 34, INK, line_gap=16)
y += 35
y = metric_strip(d, y, [("2", "connected portals"), ("13 or 26", "configurable blocks"), ("1", "source of truth")])
y += 20
add_screenshot(img, "resident-overview.png", (M + 75, y, W - M - 75, 2750),
               "Personal assignments, calls, protected time, requests, and scheduling statistics in one place.")
d.text((W // 2, 2980), "Designed around real graduate medical education workflows.", font=font(32, True), fill=PURPLE_DARK, anchor="ma")
d.text((W // 2, 3040), "Flexible enough for Pediatrics, Internal Medicine, Emergency Medicine, and other training programs.", font=font(25, italic=True), fill=MUTED, anchor="ma")
pages.append(img)

# Page 2
img, d = page_base(2)
y = kicker(d, "The operational problem", 175)
y = heading(d, "Scheduling is not one spreadsheet", y)
y += 15
y = paragraph(d, "Each block combines annual rotations, monthly service schedules, protected educational time, resident preferences, leave, coverage requirements, work-hour limits, and last-minute changes. These inputs often live in separate places and must be reconciled manually.", y, 31, line_gap=13)
y += 35
y = card_grid(d, y, [
    ("Fragmented inputs", "Forms, emails, PDFs, clinic rules, and master schedules are reviewed separately.", RED, RED_LIGHT),
    ("Repeated manual work", "Chiefs rebuild the same logic and repeatedly check availability and eligibility.", AMBER, AMBER_LIGHT),
    ("Hidden conflicts", "Clinic, didactics, post-call needs, adjacent calls, and leave are easy to miss.", RED, RED_LIGHT),
    ("Limited visibility", "Residents lack clarity while leadership lacks a real-time readiness view.", AMBER, AMBER_LIGHT),
], 2, 205)
y += 15
d.text((M + 45, y), "One connected workflow", font=font(42, True), fill=PURPLE)
y += 65
y = workflow(d, y)
y += 25
add_screenshot(img, "chief-overview.png", (M + 85, y, W - M - 85, 3000),
               "Block-level readiness shows configured services, coverage status, and items requiring attention.")
pages.append(img)

# Page 3
img, d = page_base(3)
y = kicker(d, "Built for chiefs", 175)
y = heading(d, "Generate faster. Edit freely. Publish with confidence.", y)
y += 15
y = paragraph(d, "Clarity prepares a rules-aware draft, explains conflicts, and preserves chief judgment through an Excel-like editing experience.", y, 32, line_gap=13)
y += 20
end = add_screenshot(img, "service-builder.png", (M + 70, y, W - M - 70, 1920),
                     "Configure each service separately: teams or units, staffing roles, eligible PGY levels, and working-hour templates.")
y = end + 65
y = card_grid(d, y, [
    ("Program configuration", "Choose the academic year, block model, deadlines, holidays, and protected events.", PURPLE, PURPLE_LIGHT),
    ("Service-level rules", "Create any inpatient, consult, critical-care, jeopardy, night, or custom service.", TEAL, TEAL_LIGHT),
    ("Master-linked rosters", "Pull residents assigned to that service and add call-pool or manual supplements.", PURPLE, PURPLE_LIGHT),
    ("Editable workspace", "Drag, move, copy, and revise assignments while totals recalculate.", TEAL, TEAL_LIGHT),
    ("Conflict intelligence", "Flag clinic, didactics, leave, adjacent calls, staffing gaps, and night conflicts.", AMBER, AMBER_LIGHT),
    ("Readiness analytics", "Track pending, draft, ready, and published schedules with fairness summaries.", AMBER, AMBER_LIGHT),
], 2, 220)
pages.append(img)

# Page 4
img, d = page_base(4)
y = kicker(d, "Built for residents", 175)
y = heading(d, "A clear schedule and a simpler way to request changes", y)
y += 15
y = paragraph(d, "Residents see their private annual plan, personal monthly assignments, and program-wide published service rosters. Their requests become structured scheduling data instead of messages that must be interpreted later.", y, 31, line_gap=13)
y += 25
end = add_screenshot(img, "resident-overview.png", (M + 100, y, W - M - 100, 1860),
                     "The resident dashboard combines work hours, calls, golden weekends, clinics, didactics, leave, and requests.")
y = end + 60
y = card_grid(d, y, [
    ("Submit structured requests", "Vacation, PTO, sick leave, weekends, days off, special needs, and annual preferences.", PURPLE, PURPLE_LIGHT),
    ("Understand every assignment", "See work hours, coverage role, call type, post-call time, clinic, and didactics.", TEAL, TEAL_LIGHT),
    ("Call-switch marketplace", "Offer a call, list acceptable alternatives, and volunteer for calls offered by peers.", PURPLE, PURPLE_LIGHT),
    ("Instant eligibility checks", "Check same-day clinic, next-day clinic, duplicate assignments, and back-to-back calls.", TEAL, TEAL_LIGHT),
], 2, 225)
y += 5
d.rounded_rectangle((M + 45, y, W - M - 45, y + 245), radius=26, fill=PURPLE_DARK)
d.text((W // 2, y + 54), "Three people, one decision trail", font=font(37, True), fill=WHITE, anchor="ma")
d.text((W // 2, y + 118), "Offering resident  ->  receiving resident  ->  chief approval", font=font(31, True), fill="#DCD7FF", anchor="ma")
draw_wrapped(d, "The original assignment stays unchanged until final approval, protecting schedule integrity and documenting the decision.", (W // 2, y + 170), font(24), WHITE, CONTENT_W - 180, 6, "ma")
pages.append(img)

# Page 5
img, d = page_base(5)
y = kicker(d, "Why programs choose this approach", 175)
y = heading(d, "Benefits beyond making the calendar", y)
y += 20
stakeholders = [
    ("Chiefs", "Less reconciliation, faster drafting, clearer conflicts.", "More time for education, resident support, and leadership.", PURPLE_LIGHT, PURPLE),
    ("Residents", "Transparent assignments, easier requests, safer switches.", "Improved trust, predictability, communication, and fairness.", TEAL_LIGHT, TEAL),
    ("Department", "Consistent rules, approvals, readiness, and exports.", "Better resilience, auditability, coverage awareness, and continuity.", AMBER_LIGHT, AMBER),
]
for title, immediate, impact, light, accent in stakeholders:
    d.rounded_rectangle((M + 45, y, W - M - 45, y + 235), radius=25, fill=light, outline=LINE, width=3)
    d.text((M + 75, y + 35), title, font=font(38, True), fill=accent)
    d.text((M + 445, y + 38), "IMMEDIATE BENEFIT", font=font(23, True), fill=MUTED)
    draw_wrapped(d, immediate, (M + 445, y + 80), font(27), INK, 690, 9)
    d.text((M + 1260, y + 38), "PROGRAM IMPACT", font=font(23, True), fill=MUTED)
    draw_wrapped(d, impact, (M + 1260, y + 80), font(27), INK, 750, 9)
    y += 258
y += 20
d.text((M + 45, y), "What makes Clarity different", font=font(43, True), fill=PURPLE)
y += 70
for item in [
    "Flexible by institution, specialty, service, unit, PGY level, shift type, and block structure.",
    "Human-in-the-loop: the system recommends and validates; chiefs retain final control.",
    "Rules are entered once and reused while block-specific exceptions remain editable.",
    "Master schedules, service schedules, requests, analytics, and approvals stay linked.",
    "Designed around residency workflows rather than generic employee shift scheduling.",
]:
    d.ellipse((M + 52, y + 9, M + 70, y + 27), fill=TEAL)
    y = draw_wrapped(d, item, (M + 92, y), font(29), INK, CONTENT_W - 140, 11)
    y += 12
y += 12
d.text((M + 45, y), "A practical pilot", font=font(43, True), fill=PURPLE)
y += 70
y = card_grid(d, y, [
    ("Phase 1 | Configure", "Load one academic year, resident profiles, institution patterns, and two representative services.", PURPLE, PURPLE_LIGHT),
    ("Phase 2 | Parallel test", "Generate one block beside the current process and compare coverage, conflicts, fairness, and editing time.", TEAL, TEAL_LIGHT),
    ("Phase 3 | Evaluate", "Collect chief and resident feedback, refine rules, then decide whether to expand program-wide.", AMBER, AMBER_LIGHT),
], 3, 275)
y += 40
d.rounded_rectangle((M + 45, y, W - M - 45, y + 315), radius=30, fill=PURPLE_DARK)
draw_wrapped(d, "Transform residency scheduling from a recurring manual project into a transparent, reusable, and safer program workflow.", (W // 2, y + 65), font(40, True), WHITE, CONTENT_W - 200, 13, "ma")
d.text((W // 2, y + 245), "Concept developed by Abdullah Abu Aqoulah  |  Clarity Schedule", font=font(25), fill="#DCD7FF", anchor="ma")
pages.append(img)

for index, page in enumerate(pages, 1):
    page.save(OUT_DIR / f"page-{index}.png", quality=95)

pages[0].save(PDF, "PDF", resolution=300.0, save_all=True, append_images=pages[1:])
print(PDF)
