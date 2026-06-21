from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "outputs" / "brochure-v2-assets"
OUT = ROOT / "outputs" / "brochure-v2-assets-anon"
OUT.mkdir(parents=True, exist_ok=True)

FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"


def crop(name, box, output):
    image = Image.open(SRC / name).convert("RGB")
    image.crop(box).save(OUT / output, quality=95)


def copy(name):
    Image.open(SRC / name).convert("RGB").save(OUT / name, quality=95)


resident_schedule = Image.open(SRC / "resident-schedule.png")
crop("resident-schedule.png", (365, 0, resident_schedule.width, 1240), "resident-schedule-main.png")

resident_master = Image.open(SRC / "resident-master.png")
crop("resident-master.png", (365, 0, resident_master.width, resident_master.height), "resident-master-main.png")

chief_overview = Image.open(SRC / "chief-overview.png")
crop("chief-overview.png", (370, 0, chief_overview.width, chief_overview.height), "chief-overview-main.png")

service_builder = Image.open(SRC / "service-builder.png")
crop("service-builder.png", (410, 0, service_builder.width, service_builder.height), "service-builder-main.png")

call_switch = Image.open(SRC / "call-switch.png").convert("RGB")
# Keep one complete mobile workflow instance and replace the personalized line.
call_switch = call_switch.crop((0, 0, call_switch.width, min(1050, call_switch.height)))
draw = ImageDraw.Draw(call_switch)
draw.rectangle((8, 850, call_switch.width - 8, 900), fill="#F6F7FB")
draw.text((14, 858), "Eligibility is personalized to Resident A.", font=ImageFont.truetype(FONT, 12), fill="#676D80")
call_switch.save(OUT / "call-switch-anon.png", quality=95)

for filename in [
    "resident-nav.png",
    "chief-schedule.png",
    "chief-master.png",
    "chief-nav.png",
    "chief-approvals.png",
    "institution-rules.png",
]:
    copy(filename)

print(OUT)
