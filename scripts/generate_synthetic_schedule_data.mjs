import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "outputs";
const outputPath = `${outputDir}/synthetic_residency_schedule_test_data.xlsx`;

const blocks = [
  ["Block 1", "2025-07-01", "2025-07-27"],
  ["Block 2", "2025-07-28", "2025-08-24"],
  ["Block 3", "2025-08-25", "2025-09-21"],
  ["Block 4", "2025-09-22", "2025-10-19"],
  ["Block 5", "2025-10-20", "2025-11-16"],
  ["Block 6", "2025-11-17", "2025-12-14"],
  ["Block 7", "2025-12-15", "2026-01-11"],
  ["Block 8", "2026-01-12", "2026-02-08"],
  ["Block 9", "2026-02-09", "2026-03-08"],
  ["Block 10", "2026-03-09", "2026-04-05"],
  ["Block 11", "2026-04-06", "2026-05-03"],
  ["Block 12", "2026-05-04", "2026-05-31"],
  ["Block 13", "2026-06-01", "2026-06-30"]
];

const institutions = [
  ["Corewell Health", "Main", "Friday 12:30-17:00", "Resident-specific weekly half day"],
  ["Wayne State / DMC", "Outside", "Thursday 13:00-17:00", "Wednesday AM or PM"],
  ["Western Michigan", "Outside", "Friday full day on uploaded dates", "Individual assignment"],
  ["Henry Ford", "Outside", "Institution upload", "No continuity clinic on some blocks"]
];

const services = [
  ["Purple", "Floor", "4 interns + 1 senior", "PGY-1 interns; PGY-2/3 senior", "Up to 5 consecutive nights", "Needs day, long, short, and night weekend coverage", "Floor"],
  ["Orange", "Floor", "4 interns + 1 senior", "PGY-1 interns; PGY-2/3 senior", "Up to 5 consecutive nights", "Needs day, long, short, and night weekend coverage", "Floor"],
  ["Gold", "Inpatient", "2 interns + 1 senior support", "PGY-1 interns; PGY-2/3 support", "Day service; night senior linked", "One intern plus senior support", "Gold"],
  ["Newborn", "Inpatient", "2-3 interns + long senior", "PGY-1 and approved outside interns", "No newborn night shifts", "Resident may enter call pool", "Newborn"],
  ["NICU", "Critical care", "3 seniors + 2 interns", "PGY-1/2/3 by role", "Night stretch allowed; avoid unsafe block transition", "Long call, procedure, and night roles", "NICU"],
  ["PICU", "Critical care", "Two-unit coverage by census", "PGY-2/3 and approved outside rotators", "Day and night coverage", "Unit 1, Unit 2, and PCICU coverage", "PICU"],
  ["Heme/Onc", "Inpatient", "2 interns + optional advanced resident", "PGY-1 plus advanced resident", "Covered by linked night senior", "One resident covers full week", "Heme/Onc"],
  ["Jeopardy", "Call pool", "Clinic Call + J1 + J2 + J3 daily", "Elective or call-eligible blocks", "Call hours vary", "J3 optional when pool is limited", "Elective"],
  ["Night Senior", "Senior coverage", "Hospitalist + Gold/PHO/BMT/NB nightly", "Approved PGY-2/3 senior pool", "3-5 consecutive nights then recovery", "Coordinates weekend senior coverage", "Night Senior"]
];

const shifts = [
  ["DAY", "Standard day", "06:30", "17:00", 10.5, "Day", "Inpatient day shift"],
  ["LONG", "Long call", "06:30", "19:00", 12.5, "Call", "Late resident coverage"],
  ["SHORT", "Short weekend", "06:30", "16:00", 9.5, "Day", "Weekend short day"],
  ["NIGHT", "Floor night", "17:00", "07:00", 14, "Night", "May repeat up to 5 nights"],
  ["WKND-N", "Weekend night", "18:15", "07:00", 12.75, "Night", "Weekend night coverage"],
  ["CL-AM", "Clinic AM", "08:00", "12:00", 4, "Protected", "Protected clinic time"],
  ["CL-PM", "Clinic PM", "13:00", "17:00", 4, "Protected", "Protected clinic time"],
  ["DID", "Didactics", "12:30", "17:00", 4.5, "Protected", "No overlapping shift unless overridden"],
  ["OFF", "Off", "", "", 0, "Off", "Day off or vacation"]
];

const firstNames = ["Avery", "Blake", "Casey", "Devon", "Emery", "Finley", "Gray", "Harper", "Indigo", "Jordan", "Kai", "Logan", "Milan", "Noor", "Owen", "Parker", "Quinn", "Riley", "Sage", "Taylor", "Uma", "Vale", "Winter", "Yara"];
const lastNames = ["Adams", "Baker", "Chen", "Davis", "Evans", "Farah", "Garcia", "Haddad", "Ibrahim", "Jones", "Khan", "Lewis", "Mansour", "Nguyen", "Ortiz", "Patel", "Quintero", "Reed", "Singh", "Thomas", "Usman", "Vega", "Wilson", "Young"];
const clinicPatterns = ["Mon AM", "Mon PM", "Tue AM", "Tue PM", "Wed AM", "Wed PM", "Thu AM", "Thu PM", "Fri AM", "Fri PM", "None"];
const rotations = ["Floor", "PICU", "NICU", "ED", "Gold", "Newborn", "Heme/Onc", "Elective", "Vacation", "Research", "Clinic"];
const requiredCycle = ["Floor", "PICU", "NICU", "ED"];

function pick(list, index) {
  return list[index % list.length];
}

function initials(first, last) {
  return `${first[0]}${last[0]}`.toUpperCase();
}

const residents = Array.from({ length: 72 }, (_, index) => {
  const first = pick(firstNames, index);
  const last = pick(lastNames, index * 5 + 3);
  const pgy = `PGY-${(index % 3) + 1}`;
  const institution = institutions[index % 9 === 0 ? 1 : index % 13 === 0 ? 2 : index % 17 === 0 ? 3 : 0][0];
  const callEligible = index % 7 !== 0;
  return [
    `R${String(index + 1).padStart(3, "0")}`,
    initials(first, last),
    `${first} ${last}`,
    pgy,
    institution,
    callEligible ? "Yes" : "No",
    index % 5 === 0 ? "Fellowship applicant" : "",
    index % 11 === 0 ? "Outside rotator style constraints" : ""
  ];
});

const masterRows = residents.map((resident, residentIndex) => {
  const row = resident.slice(0, 5);
  blocks.forEach((_, blockIndex) => {
    let rotation = pick(rotations, residentIndex + blockIndex * 2);
    if (blockIndex < 4) rotation = requiredCycle[(residentIndex + blockIndex) % requiredCycle.length];
    if ((residentIndex + blockIndex) % 10 === 0) rotation = "Vacation";
    if ((residentIndex + blockIndex) % 12 === 0) rotation = "Elective";
    row.push(rotation);
  });
  row.push(`Preference rank ${1 + (residentIndex % 20)}`);
  return row;
});

const protectedRows = [];
residents.forEach((resident, residentIndex) => {
  blocks.forEach((block, blockIndex) => {
    const clinic = resident[4] === "Corewell Health"
      ? clinicPatterns[(residentIndex + Math.floor(blockIndex / 3)) % clinicPatterns.length]
      : clinicPatterns[(residentIndex + blockIndex + 2) % clinicPatterns.length];
    protectedRows.push([
      resident[0],
      resident[2],
      resident[3],
      resident[4],
      block[0],
      clinic,
      resident[4] === "Corewell Health" ? "Friday 12:30-17:00" : pick(institutions, residentIndex)[2],
      (residentIndex + blockIndex) % 19 === 0 ? "Conference half day" : "",
      clinic === "None" ? "No clinic protection" : "Protect clinic from overlapping shifts"
    ]);
  });
});

const requestRows = [];
residents.slice(0, 48).forEach((resident, index) => {
  const weekend = ["Jun 6-7", "Jun 13-14", "Jun 20-21", "Jun 27-28"][index % 4];
  requestRows.push([
    "Block 13",
    resident[0],
    resident[2],
    resident[3],
    resident[4],
    weekend,
    `2026-06-${String(3 + (index % 25)).padStart(2, "0")}`,
    index % 6 === 0 ? "Vacation day" : index % 5 === 0 ? "Exam" : "Personal day",
    index % 8 === 0 ? "Avoid night before clinic" : "",
    index % 9 === 0 ? "High priority" : "Standard"
  ]);
});

const monthlyRows = [
  ["Service", "Resident ID", "Resident Name", "Role", "Date", "Day", "Shift Code", "Start", "End", "Protected conflict?", "Notes"]
];
const juneDays = Array.from({ length: 30 }, (_, i) => i + 1);
services.slice(0, 7).forEach((service, serviceIndex) => {
  const assigned = residents.slice(serviceIndex * 5, serviceIndex * 5 + 6);
  juneDays.forEach((day, dayIndex) => {
    assigned.slice(0, dayIndex % 6 < 5 ? 5 : 4).forEach((resident, residentOffset) => {
      const shift = day % 7 === 0 ? "SHORT" : residentOffset === 0 && day % 6 === 0 ? "NIGHT" : "DAY";
      const template = shifts.find((item) => item[0] === shift);
      monthlyRows.push([
        service[0],
        resident[0],
        resident[2],
        resident[3] === "PGY-1" ? "Intern" : "Senior",
        `2026-06-${String(day).padStart(2, "0")}`,
        ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][dayIndex % 7],
        shift,
        template[2],
        template[3],
        day === 12 && residentOffset === 2 ? "Yes" : "No",
        day === 18 && service[0] === "NICU" ? "Intentional coverage gap test" : ""
      ]);
    });
  });
});

const validationRows = [
  ["Scenario", "Resident ID", "Block/Date", "Expected app behavior"],
  ["Protected-time overlap", "R003", "2026-06-12", "Flag if assigned during ITE or clinic"],
  ["Coverage gap", "NICU", "2026-06-18", "Flag service under required staffing"],
  ["Golden weekend imbalance", "R008", "Block 13", "Show fairness note"],
  ["Night-to-inpatient transition", "R015", "Block 13 to Block 1", "Flag if final night creates unsafe next block"],
  ["Ineligible call pool", "R001", "Block 13", "Do not assign Jeopardy unless override is enabled"]
];

function writeSheet(workbook, name, headers, rows) {
  const sheet = workbook.worksheets.add(name);
  const data = [headers, ...rows];
  const range = sheet.getRangeByIndexes(0, 0, data.length, headers.length);
  range.values = data;
  sheet.freezePanes.freezeRows(1);
  const header = sheet.getRangeByIndexes(0, 0, 1, headers.length);
  header.format = { fill: "#4B4196", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
  range.format = { wrapText: true };
  sheet.getUsedRange().format.autofitColumns();
  return sheet;
}

await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const readme = workbook.worksheets.add("README");
readme.getRange("A1:D14").values = [
  ["Synthetic Residency Scheduling Test Data", "", "", ""],
  ["Purpose", "Use this fake dataset to test import, master scheduling, protected time, service rules, and monthly schedule validation.", "", ""],
  ["Important", "All resident names and data are fictional. Do not treat this as a real schedule.", "", ""],
  ["Recommended test flow", "1. Import Residents, Master Schedule, Clinic Didactics, Requests, Services Rules, and Shift Templates.", "", ""],
  ["", "2. Generate Block 13 schedules.", "", ""],
  ["", "3. Confirm the app flags the scenarios listed in Validation Scenarios.", "", ""],
  ["", "4. Edit rules and assignments, then re-check statistics and coverage.", "", ""],
  ["Sheets", "Residents", "72 fake residents across PGY-1 to PGY-3", ""],
  ["", "Master Schedule", "13-block annual assignments", ""],
  ["", "Clinic Didactics", "Recurring protected time by resident and block", ""],
  ["", "Requests", "Block 13 resident day-off and weekend requests", ""],
  ["", "Services Rules", "Editable service requirements", ""],
  ["", "Shift Templates", "Times and work-hour assumptions", ""],
  ["", "Sample Monthly Draft", "A fake Block 13 schedule with intentional issues", ""]
];
readme.getRange("A1:D1").merge();
readme.getRange("A1").format = { fill: "#4B4196", font: { bold: true, color: "#FFFFFF", size: 16 } };
readme.getRange("A2:D14").format = { wrapText: true };
readme.getUsedRange().format.autofitColumns();

writeSheet(workbook, "Residents", ["Resident ID", "Initials", "Resident Name", "PGY", "Institution", "Call Pool Eligible", "Annual Note", "Constraint Note"], residents);
writeSheet(workbook, "Master Schedule", ["Resident ID", "Initials", "Resident Name", "PGY", "Institution", ...blocks.map((block) => `${block[0]} ${block[1]} to ${block[2]}`), "Matched Preference"], masterRows);
writeSheet(workbook, "Clinic Didactics", ["Resident ID", "Resident Name", "PGY", "Institution", "Block", "Clinic Pattern", "Didactic Pattern", "One-Time Event", "Scheduling Effect"], protectedRows);
writeSheet(workbook, "Requests", ["Block", "Resident ID", "Resident Name", "PGY", "Institution", "Golden Weekend Request", "Requested Day Off", "Request Type", "Call Restriction", "Priority"], requestRows);
writeSheet(workbook, "Services Rules", ["Service", "Service Type", "Minimum Staffing", "Eligible Residents", "Night Rule", "Weekend Rule", "Master Rotation Link"], services);
writeSheet(workbook, "Shift Templates", ["Shift Code", "Shift Name", "Start", "End", "Hours", "Type", "Notes"], shifts);

const draft = workbook.worksheets.add("Sample Monthly Draft");
draft.getRangeByIndexes(0, 0, monthlyRows.length, monthlyRows[0].length).values = monthlyRows;
draft.freezePanes.freezeRows(1);
draft.getRangeByIndexes(0, 0, 1, monthlyRows[0].length).format = { fill: "#4B4196", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
draft.getUsedRange().format.autofitColumns();

writeSheet(workbook, "Validation Scenarios", validationRows[0], validationRows.slice(1));

const summary = workbook.worksheets.add("Summary");
summary.getRange("A1:F12").values = [
  ["Synthetic Data Summary", "", "", "", "", ""],
  ["Residents", residents.length, "", "Services", services.length, ""],
  ["PGY-1 count", residents.filter((r) => r[3] === "PGY-1").length, "", "Shift templates", shifts.length, ""],
  ["PGY-2 count", residents.filter((r) => r[3] === "PGY-2").length, "", "Blocks", blocks.length, ""],
  ["PGY-3 count", residents.filter((r) => r[3] === "PGY-3").length, "", "Block 13 requests", requestRows.length, ""],
  ["Call-pool eligible", residents.filter((r) => r[5] === "Yes").length, "", "Protected-time rows", protectedRows.length, ""],
  ["", "", "", "", "", ""],
  ["What to test", "Import data", "Generate Block 13", "Edit service rules", "Edit assignments", "Review flags"],
  ["Expected flags", "Protected-time overlap", "NICU coverage gap", "Weekend imbalance", "Unsafe night transition", "Ineligible call pool"],
  ["", "", "", "", "", ""],
  ["Prompt use", "You can ask ChatGPT to create more rows using the same sheet names and columns.", "", "", "", ""],
  ["Privacy", "All data in this workbook is synthetic.", "", "", "", ""]
];
summary.getRange("A1:F1").merge();
summary.getRange("A1").format = { fill: "#4B4196", font: { bold: true, color: "#FFFFFF", size: 16 } };
summary.getRange("A2:F12").format = { wrapText: true };
summary.getUsedRange().format.autofitColumns();

const errorScan = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "formula error scan"
});
console.log(errorScan.ndjson);

const keyRanges = await workbook.inspect({
  kind: "table",
  range: "Summary!A1:F12",
  include: "values,formulas",
  tableMaxRows: 12,
  tableMaxCols: 6
});
console.log(keyRanges.ndjson);

for (const sheetName of ["README", "Residents", "Master Schedule", "Clinic Didactics", "Requests", "Services Rules", "Shift Templates", "Sample Monthly Draft", "Validation Scenarios", "Summary"]) {
  await workbook.render({ sheetName, autoCrop: "all", scale: 0.75, format: "png" });
}
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
console.log(outputPath);
