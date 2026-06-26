const iconPaths = {
  home: '<path d="M3 10.8 12 3l9 7.8v8.7a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5Z"/><path d="M9 21v-7h6v7"/>',
  wand: '<path d="m15 4 5 5L8 21H3v-5Z"/><path d="m13 6 5 5M6 3v3M4.5 4.5h3M19 15v4M17 17h4"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-2.83 2.83-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21h-4v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06-2.83-2.83.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3v-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06 2.83-2.83.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3h4v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06 2.83 2.83-.06.06A1.65 1.65 0 0 0 19.4 9c.12.61.66 1.04 1.28 1.04H21v4h-.32c-.62 0-1.16.43-1.28 1Z"/>',
  spark: '<path d="m12 3 1.3 4.2a5 5 0 0 0 3.3 3.3L21 12l-4.4 1.5a5 5 0 0 0-3.3 3.3L12 21l-1.3-4.2a5 5 0 0 0-3.3-3.3L3 12l4.4-1.5a5 5 0 0 0 3.3-3.3Z"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5V3h6v1.5M9 9h6M9 13h6M9 17h4"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  alert: '<path d="M10.3 4.3 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  filter: '<path d="M4 5h16M7 12h10M10 19h4"/>'
};

function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((node) => {
    const name = node.dataset.icon;
    node.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || ""}</svg>`;
  });
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

const app = document.querySelector("#app");
const urlSearchParams = new URLSearchParams(window.location.search);
const isMvpTestMode = urlSearchParams.has("mvp") || urlSearchParams.has("reset");
if (isMvpTestMode) {
  localStorage.removeItem("clarity-schedule-prototype-v1");
  localStorage.removeItem("clarity-schedule-mvp-v2");
  localStorage.removeItem("clarity-workbook-demo-version");
}
let currentPortal = "chief";
let currentView = "dashboard";
let currentBlock = 13;
let activeRuleTab = "institutions";
let activeInstitution = "Corewell Health";
let activeServiceRule = "Purple";
let activeScheduleService = "Purple";
let activeScheduleLayout = "builder";
let activeBuilderService = "Purple";
let activeBuilderStep = "setup";
let activeMasterPgy = "PGY-1";
let activeMasterStep = "pgy";
let activeAnnualWorkbook = "masters";
let annualWorkbookDisplayMode = "digital";
let activeCoverageService = "Floor Senior";
let activeMasterBlockService = "Purple";
let masterRankingSort = "submitted";
let activeCallPool = "Clinic Call / Jeopardy";
let activeHoliday = "4th of July";
let activeHolidayService = "PICU";
let activeBreak = "Break 1";
let activeBreakService = "PICU";
let activeResident = "Resident A";
let activeResidentSection = "overview";
let activeResidentSelfSection = "overview";
let activeAnnualPreferenceSection = "overview";
let profileReturnContext = null;
let activePublishedService = null;
let activeAttendanceSessionId = 301;
let editingRequirement = null;
let selectedScheduleCell = null;
let selectedScheduleWeek = 0;
let addResidentPanelOpen = false;
let draggedScheduleCell = null;
let draggedMasterCell = null;
let scheduleUndoStack = [];
let scheduleRedoStack = [];

app.addEventListener("click", (event) => {
  const ruleTab = event.target.closest("[data-rule-tab]");
  if (ruleTab) {
    activeRuleTab = ruleTab.dataset.ruleTab;
    render();
    return;
  }

  const institution = event.target.closest("[data-institution]");
  if (institution) {
    activeInstitution = institution.dataset.institution;
    render();
    return;
  }

  const serviceRule = event.target.closest("[data-service-rule]");
  if (serviceRule) {
    activeServiceRule = serviceRule.dataset.serviceRule;
    render();
    return;
  }

  const profileResident = event.target.closest("[data-profile-resident]");
  if (profileResident) {
    if (currentPortal === "chief" && currentView !== "residents") {
      profileReturnContext = {
        view: currentView,
        masterStep: activeMasterStep,
        annualWorkbook: activeAnnualWorkbook,
        block: currentBlock,
        label: currentView === "master" ? "Back to master builder" : currentView === "attendance" ? "Back to attendance" : "Back"
      };
    }
    activeResident = profileResident.dataset.profileResident;
    activeResidentSection = "overview";
    if (currentPortal === "chief") currentView = "residents";
    render();
  }
});

let academicBlocks = [
  ["1", "Jul 1–27"], ["2", "Jul 28–Aug 24"], ["3", "Aug 25–Sep 21"],
  ["4", "Sep 22–Oct 19"], ["5", "Oct 20–Nov 16"], ["6", "Nov 17–Dec 14"],
  ["7", "Dec 15–Jan 11"], ["8", "Jan 12–Feb 8"], ["9", "Feb 9–Mar 8"],
  ["10", "Mar 9–Apr 5"], ["11", "Apr 6–May 3"], ["12", "May 4–31"], ["13", "Jun 1–30"]
];

const programSettings = {
  academicYear: "2025-2026",
  blockCount: 13,
  requestLeadDays: 90,
  blockModel: "Four-week blocks",
  requestPriority: ["Chief review", "Major life event or protected leave", "Fellowship timeline", "Submission time", "Fair distribution"]
};

let masterPlanningOptions = {
  distributeElectivesEvenly: true,
  earlyElectiveWindow: true,
  lateElectiveWindow: true,
  avoidBackToBackInpatient: true
};

let masterImportState = {
  mode: "build",
  status: "empty",
  fileName: "",
  fileType: "",
  uploadedAt: "",
  mappedRows: 0,
  mappedBlocks: academicBlocks.length,
  detectedSheets: ["PGY1", "PGY2", "PGY3", "MedPeds"],
  notes: []
};

const residentRequests = [
  { id: 1, resident: "Resident A", block: 13, type: "Golden weekend", detail: "June 20-21", submitted: "Mar 1, 2026", priority: "Standard", status: "pending", conflict: "Three residents requested the same weekend" },
  { id: 2, resident: "Resident A", block: 13, type: "Day off", detail: "June 12 - ITE examination", submitted: "Feb 25, 2026", priority: "Protected exam", status: "approved", conflict: "" },
  { id: 3, resident: "Resident B", block: 13, type: "Vacation", detail: "June 6-7", submitted: "Feb 20, 2026", priority: "Fellowship applicant", status: "pending", conflict: "Overlaps another high-priority vacation request" },
  { id: 4, resident: "Resident C", block: 13, type: "PTO", detail: "June 15", submitted: "Mar 2, 2026", priority: "Major life event", status: "pending", conflict: "PICU minimum staffing may be affected" },
  { id: 5, resident: "Resident D", block: 13, type: "Shift switch", detail: "Exchange June 18 night with Resident E", submitted: "Mar 4, 2026", priority: "Standard", status: "pending", conflict: "Resident E has clinic the following morning" }
];

const residentCalls = [
  ["Jun 4", "Clinic Call", "17:00-22:00", "After clinic coverage"],
  ["Jun 9", "Jeopardy 1", "07:00-19:00", "Primary call pool"],
  ["Jun 17", "Jeopardy 2", "17:00-07:00", "Night backup"],
  ["Jun 25", "Crossover", "17:00-21:00", "Floor handoff coverage"]
];

const currentResidentName = "Jordan Lee";
const callSwitchProfiles = {
  "Jordan Lee": {
    calls: ["2026-06-04", "2026-06-09", "2026-06-17", "2026-06-25"],
    clinics: ["2026-06-02", "2026-06-16", "2026-06-23"]
  },
  "Maya Bennett": {
    calls: ["2026-06-13", "2026-06-22"],
    clinics: ["2026-06-05", "2026-06-19"]
  },
  "Omar Haddad": {
    calls: ["2026-06-20", "2026-06-28"],
    clinics: ["2026-06-11", "2026-06-26"]
  },
  "Lena Park": {
    calls: ["2026-06-15", "2026-06-27"],
    clinics: ["2026-06-08", "2026-06-21"]
  }
};

const templateLetters = "ABCDEFGHIJKLMNOPQRST".split("");
const pgyTemplateBases = {
  "PGY-1": [
    "Purple", "Clinic/Advo", "Cardiology", "Newborn", "Adolescent", "Gold/NICU", "PHO",
    "ED", "Orange", "Elective", "Newborn", "Purple", "Vacation eligible"
  ],
  "PGY-2": [
    "Night Float", "ED", "NICU", "Cardiology", "PICU", "Elective", "Gold/CCP",
    "Research", "Adolescent", "Night Float", "Pulm", "Elective", "NICU"
  ],
  "PGY-3": [
    "Tox/ENT", "NICU", "Elective", "Orange/AGP", "GI", "Elective", "Purple/Admit",
    "Adv Cards", "PICU", "ED", "Adv PICU", "Rads", "Board review"
  ],
  "MedPeds": [
    "NICU", "Purple", "Peds Elective", "Adult block", "Adult block", "Adult block",
    "Newborn", "Orange", "Peds Elective", "Adult block", "Peds Core", "Adult block", "Vacation eligible"
  ]
};
const pgyTemplateNotes = {
  "PGY-1": "Intern templates emphasize floor teams, nursery, subspecialty core, ED, and limited elective/vacation-eligible blocks.",
  "PGY-2": "PGY-2 templates introduce ICU, night float, call-heavy blocks, and senior call-eligible electives.",
  "PGY-3": "PGY-3 templates emphasize ICU, admit/purple senior work, advanced electives, board review, and fellowship timing.",
  "MedPeds": "Med-Peds templates keep pediatric requirements visible while adult medicine blocks are shown as adult/core context."
};
const vacationPriorityLevels = [
  { name: "High priority", examples: "International travel, wedding, maternity/parental leave, major family event" },
  { name: "Medium priority", examples: "Important vacation, flexible family or personal timing" },
  { name: "Low priority", examples: "Tentative, optional, or can move if coverage requires" }
];
function rotateTemplateBlocks(rotations, offset) {
  const protectedLast = rotations.slice(-1);
  const body = rotations.slice(0, -1);
  return body.map((_, index) => body[(index + offset) % body.length]).concat(protectedLast);
}
function isTemplateFlexibleBlock(rotation = "") {
  return /elective|vacation|research|board review/i.test(rotation);
}
function buildMasterTemplate(name, pgy, rotations) {
  const earlyElectives = rotations
    .map((rotation, index) => isTemplateFlexibleBlock(rotation) && index < 5 ? index + 1 : null)
    .filter(Boolean);
  const vacationEligible = rotations
    .map((rotation, index) => isTemplateFlexibleBlock(rotation) ? index + 1 : null)
    .filter(Boolean);
  return {
    name,
    pgy,
    rotations,
    first: rotations.find((rotation) => !isTemplateFlexibleBlock(rotation)) || rotations[0],
    earlyElectives,
    vacationEligible,
    coreBlocks: rotations.filter((rotation) => !isTemplateFlexibleBlock(rotation)).length,
    note: pgyTemplateNotes[pgy]
  };
}
const masterTemplateLibrary = Object.fromEntries(Object.entries(pgyTemplateBases).map(([pgy, base]) => [
  pgy,
  templateLetters.map((name, index) => buildMasterTemplate(name, pgy, rotateTemplateBlocks(base, index)))
]));
const masterScheduleTemplates = masterTemplateLibrary["PGY-3"];
function getMasterTemplatesForPgy(pgy = "PGY-3") {
  return masterTemplateLibrary[pgy] || masterTemplateLibrary["PGY-3"];
}
function normalizedTemplateRankingForPgy(pgy = "PGY-3") {
  const templates = getMasterTemplatesForPgy(pgy);
  const validNames = new Set(templates.map((template) => template.name));
  const current = (annualPreferenceSubmission.templateRanking || []).filter((name) => validNames.has(name));
  const missing = templates.map((template) => template.name).filter((name) => !current.includes(name));
  return [...current, ...missing];
}
function templateRotationClass(rotation = "") {
  const normalized = rotation.toLowerCase();
  if (isTemplateFlexibleBlock(rotation)) return "elective";
  if (normalized.includes("night")) return "night";
  if (normalized.includes("nicu") || normalized.includes("gold")) return "nicu";
  if (normalized.includes("picu") || /\bicu\b/.test(normalized)) return "picu";
  if (/\bed\b/.test(normalized)) return "ed";
  if (normalized.includes("purple") || normalized.includes("admit")) return "purple";
  if (normalized.includes("orange") || normalized.includes("agp")) return "orange";
  if (normalized.includes("card")) return "cardiology";
  if (normalized.includes("pho") || normalized.includes("heme")) return "pho";
  if (normalized.includes("newborn")) return "newborn";
  if (normalized.includes("clinic") || normalized.includes("advo")) return "clinic";
  if (normalized.includes("adult")) return "adult";
  return "core";
}
function templateDisplayLabel(rotation = "") {
  if (/vacation/i.test(rotation)) return "Vacation eligible";
  if (/elective|research|board review/i.test(rotation)) return "Elective";
  return rotation;
}
function templateSummary(template) {
  return `Starts with ${template.first} · ${template.coreBlocks} core blocks · flexible blocks ${template.vacationEligible.length ? template.vacationEligible.map((block) => `B${block}`).join(", ") : "none"}`;
}
function renderTemplateMiniGrid(template) {
  return `<div class="template-preview-wrap"><div class="template-mini-grid">${academicBlocks.map(([number], index) => {
    const rotation = template.rotations[index] || "Elective";
    const label = templateDisplayLabel(rotation);
    return `<span class="template-mini-cell ${templateRotationClass(rotation)}"><small>B${number}</small><strong>${escapeHtml(label)}</strong></span>`;
  }).join("")}</div><small>${escapeHtml(template.note)}</small></div>`;
}

const electiveCatalog = [
  { name: "Cardiology", tier: "Tier 1" },
  { name: "Allergy / Immunology", tier: "Tier 1" },
  { name: "Gastroenterology", tier: "Tier 1" },
  { name: "Hematology / Oncology", tier: "Tier 1" },
  { name: "Infectious Disease", tier: "Tier 1" },
  { name: "Nephrology", tier: "Tier 1" },
  { name: "Neurology", tier: "Tier 1" },
  { name: "Pulmonary", tier: "Tier 1" },
  { name: "Rheumatology", tier: "Tier 1" },
  { name: "Radiology", tier: "Tier 2" },
  { name: "Anesthesiology", tier: "Tier 2" },
  { name: "Palliative Care", tier: "Tier 2" },
  { name: "Sleep Medicine", tier: "Tier 2" },
  { name: "Sports Medicine", tier: "Tier 2" },
  { name: "Otolaryngology", tier: "Tier 2" },
  { name: "Business of Medicine", tier: "General" }
];

const advancedElectiveCatalog = [
  "Advanced PICU",
  "Advanced Hospitalist",
  "Resident as Teacher",
  "Newborn Senior",
  "Advanced Pediatric Emergency Medicine",
  "Advanced NICU",
  "Leadership and Quality"
];

let annualPreferenceSubmission = {
  resident: "Resident A",
  displayName: currentResidentName,
  pgy: "PGY-3",
  track: "Pediatric Subspecialty",
  fellowshipApplying: true,
  fellowshipSpecialty: "Critical Care",
  status: "chief-review",
  dueDate: "March 16, 2026",
  submittedAt: "March 8, 2026 · 9:14 AM",
  submissionOrder: 4,
  cohortSize: 22,
  templateRanking: ["A", "F", "J", "H", "E", "C", "B", "D", "G", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
  electiveRanking: ["Cardiology", "Radiology", "Palliative Care", "Anesthesiology", "Pulmonary", "Gastroenterology", "Infectious Disease", "Neurology", "Nephrology", "Sleep Medicine", "Sports Medicine", "Business of Medicine"],
  advancedRanking: ["Advanced PICU", "Advanced Hospitalist", "Newborn Senior", "Resident as Teacher", "Leadership and Quality", "Advanced Pediatric Emergency Medicine", "Advanced NICU"],
  vacationRequests: [
    { block: 6, timing: "Last 2 weeks", priority: 1, priorityLevel: "High priority", reason: "International travel" },
    { block: 11, timing: "Any 2 weeks", priority: 2, priorityLevel: "Medium priority", reason: "Family / personal" }
  ],
  lifeEvent: {
    category: "Major personal event",
    timing: "Blocks 11–12",
    confidentialNote: "Sensitive details shared with authorized chiefs only."
  },
  splitBlock: true,
  splitBlockRequest: "Block 6: Toxicology for 2 weeks, followed by 2 weeks of vacation.",
  comments: "Prefer elective-heavy Blocks 3–5 for fellowship interviews. Avoid advanced cardiology during Blocks 11–12.",
  chiefDecision: "",
  chiefNote: ""
};
let callSwitchOffers = [
  {
    id: 101,
    offeredBy: "Maya Bennett",
    callDate: "2026-06-13",
    callLabel: "Jeopardy 2 weekend",
    shift: "18:15-07:00",
    preferredDates: ["2026-06-20", "2026-06-27"],
    note: "Either remaining Saturday works.",
    status: "open",
    volunteers: []
  },
  {
    id: 102,
    offeredBy: "Lena Park",
    callDate: "2026-06-15",
    callLabel: "Clinic call",
    shift: "17:00-22:00",
    preferredDates: ["2026-06-04", "2026-06-25"],
    note: "Prefer another weekday call.",
    status: "open",
    volunteers: []
  },
  {
    id: 103,
    offeredBy: "Omar Haddad",
    callDate: "2026-06-28",
    callLabel: "Jeopardy 1",
    shift: "07:00-19:00",
    preferredDates: ["2026-06-09"],
    note: "Family event. Open to a direct exchange.",
    status: "chief-review",
    volunteers: [{
      resident: "Maya Bennett",
      requestedAt: "Jun 10, 2026",
      eligibility: { eligible: true, reasons: [] },
      status: "pending"
    }]
  }
];

function dateOffset(isoDate, days) {
  const date = new Date(`${isoDate}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatCallDate(isoDate) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

function callSwitchEligibility(residentName, callDate) {
  const profile = callSwitchProfiles[residentName] || { calls: [], clinics: [] };
  const checks = [
    {
      label: "No clinic on call day",
      detail: profile.clinics.includes(callDate) ? `Clinic is scheduled ${formatCallDate(callDate)}.` : "No clinic conflict on the call date.",
      pass: !profile.clinics.includes(callDate)
    },
    {
      label: "No clinic the next day",
      detail: profile.clinics.includes(dateOffset(callDate, 1)) ? `Clinic is scheduled ${formatCallDate(dateOffset(callDate, 1))}.` : "No next-day clinic or post-call conflict.",
      pass: !profile.clinics.includes(dateOffset(callDate, 1))
    },
    {
      label: "No back-to-back calls",
      detail: profile.calls.includes(dateOffset(callDate, -1)) || profile.calls.includes(dateOffset(callDate, 1)) ? "Another call is assigned on an adjacent day." : "No call is assigned the day before or after.",
      pass: !profile.calls.includes(dateOffset(callDate, -1)) && !profile.calls.includes(dateOffset(callDate, 1))
    },
    {
      label: "No duplicate assignment",
      detail: profile.calls.includes(callDate) ? "A call is already assigned on this date." : "No existing call on this date.",
      pass: !profile.calls.includes(callDate)
    }
  ];
  return {
    eligible: checks.every((check) => check.pass),
    checks,
    reasons: checks.filter((check) => !check.pass).map((check) => check.detail)
  };
}

function callSwitchStatus(status) {
  return status === "approved" ? ["ready", "Approved"] :
    status === "declined" ? ["missing", "Declined"] :
    status === "chief-review" ? ["review", "Chief review"] :
    ["ready", "Open"];
}

const publishedRosterNames = [
  ["Gilbert", "PGY-1", "Intern"],
  ["Patel, Kr", "PGY-1", "Intern"],
  ["DuVall", "PGY-1", "Intern"],
  ["Lin", "PGY-1", "Intern"],
  ["Boateng", "PGY-2", "Senior"],
  ["McAlvey", "PGY-3", "Senior"]
];

function publishedServiceRoster(service) {
  const coverage = {
    Purple: ["Floor A patients", "Floor B patients", "Admissions", "Discharges", "Senior / rapid response", "Night crossover"],
    Orange: ["Floor C patients", "Floor D patients", "Admissions", "Discharges", "Senior / rapid response", "Night crossover"],
    Gold: ["Gold patients", "Admissions", "Senior support", "Consult coverage", "Weekend long call", "Night handoff"],
    Newborn: ["Newborn nursery A", "Newborn nursery B", "Deliveries", "Discharges", "Long senior", "Jeopardy backup"],
    NICU: ["NICU Unit 1", "NICU Unit 2", "Delivery team", "Procedures", "Senior / transport", "Night coverage"],
    PICU: ["PICU Unit 1", "PICU Unit 2", "PCICU", "Admissions", "Senior / rapid response", "Night coverage"],
    "Heme/Onc": ["Inpatient oncology", "Hematology", "Admissions", "Consults", "Advanced resident", "Night handoff"],
    Jeopardy: ["Clinic Call", "Jeopardy 1", "Jeopardy 2", "Jeopardy 3", "Crossover", "Backup"],
    "Night Senior": ["Hospitalist", "Gold / PHO", "BMT / Newborn", "Floor A", "Floor B", "Backup senior"]
  }[service] || ["Primary coverage", "Admissions", "Consults", "Procedures", "Senior coverage", "Backup"];
  const patterns = [
    ["DAY","DAY","DID","DAY","DAY","SHORT","OFF"],
    ["DAY","CLINIC","DAY","DAY","LONG","OFF","SHORT"],
    ["DAY","DAY","DAY","CLINIC","DAY","SHORT","LONG"],
    ["DAY","DID","DAY","DAY","DAY","OFF","DAY"],
    ["DAY","DAY","DAY","DAY","DAY","LONG","SHORT"],
    ["NIGHT","NIGHT","NIGHT","NIGHT","NIGHT","WKND-N","POST CALL"]
  ];
  const internCounts = { Purple: 4, Orange: 4, Gold: 2, Newborn: 3, NICU: 2, PICU: 0, "Heme/Onc": 2, Jeopardy: 0, "Night Senior": 0 };
  const internCount = internCounts[service] ?? 3;
  return publishedRosterNames.map(([name], index) => {
    const role = service === "Jeopardy" ? "Call pool" : index < internCount ? "Intern" : "Senior";
    const pgy = role === "Intern" ? "PGY-1" : index % 2 ? "PGY-2" : "PGY-3";
    return {
    name,
    pgy,
    role,
    coverage: coverage[index],
    assignments: patterns[index].map((code) => publishedAssignment(code))
    };
  });
}

function publishedAssignment(code) {
  if (code === "OFF") return { code, label: "OFF", hours: 0, type: "off" };
  if (code === "POST CALL") return { code, label: "POST CALL", hours: 0, type: "off" };
  if (code === "CLINIC") return { code, label: "CLINIC PM", hours: 4, type: "protected" };
  if (code === "DID") return { code, label: "DIDACTIC", hours: 4.5, type: "protected" };
  const template = shiftTemplates.find((shift) => shift.code === code) || shiftTemplates[0];
  return {
    code,
    label: template.start && template.end ? `${template.start}-${template.end}` : template.name,
    hours: Number(template.hours) || Number(calculateShiftHours(template.start, template.end)),
    type: template.type === "Night" ? "night" : template.type === "Protected" ? "protected" : "day"
  };
}

const institutionProfiles = {
  "Corewell Health": {
    short: "CH",
    color: "#4b4196",
    residents: 38,
    clinic: "Resident-specific weekly half day",
    didactic: "Friday · 12:30–17:00",
    notes: "Primary residency program. Standard inpatient and call eligibility rules apply."
  },
  "Wayne State / DMC": {
    short: "WS",
    color: "#159b8b",
    residents: 5,
    clinic: "Wednesday · AM or PM by resident",
    didactic: "Thursday · 13:00–17:00",
    notes: "Outside rotators require travel time before and after protected sessions."
  },
  "Western Michigan": {
    short: "WMU",
    color: "#477bc5",
    residents: 6,
    clinic: "Assigned individually",
    didactic: "Friday · full day on listed dates",
    notes: "PICU and NICU rotators. Didactic dates are uploaded each block."
  },
  "Henry Ford": {
    short: "HFM",
    color: "#e8a23a",
    residents: 5,
    clinic: "No continuity clinic during rotation",
    didactic: "Institution calendar upload",
    notes: "Emergency medicine rotators may have simulation or conference protection."
  }
};

const serviceRuleProfiles = {
  "Purple": { group: "Floor", staffing: "4 interns + 1 senior", eligible: "PGY-1 interns; PGY-2/3 senior", nights: "Up to 5 consecutive nights", weekend: "Day, long, short, and night coverage", link: "Newborn and eligible call-pool residents", color: "purple" },
  "Orange": { group: "Floor", staffing: "4 interns + 1 senior", eligible: "PGY-1 interns; PGY-2/3 senior", nights: "Up to 5 consecutive nights", weekend: "Day, long, short, and night coverage", link: "Newborn and eligible call-pool residents", color: "orange" },
  "Gold": { group: "Inpatient", staffing: "2 interns + 1 senior support", eligible: "PGY-1 interns; senior assigned weekly", nights: "Covered by Gold night senior", weekend: "One intern plus senior support", link: "Interns alternate with NICU", color: "gold" },
  "Newborn": { group: "Inpatient", staffing: "2–3 interns + long senior", eligible: "PGY-1 and approved outside interns", nights: "No Newborn night shifts", weekend: "Residents enter Floor weekend pool", link: "Purple, Orange, Jeopardy, and clinic call", color: "nicu" },
  "NICU": { group: "Critical care", staffing: "3 seniors + 2 interns", eligible: "PGY-1/2/3 by assigned role", nights: "Night stretch; no Thursday night start", weekend: "Long call, procedure, and night roles", link: "Gold interns alternate by week", color: "nicu" },
  "PICU": { group: "Critical care", staffing: "Minimum varies by two-unit census", eligible: "PGY-2/3 plus approved outside rotators", nights: "Day and night coverage for both units", weekend: "Unit 1, Unit 2, and PCICU coverage", link: "Institution rules determine clinic/didactics", color: "orange" },
  "Heme/Onc": { group: "Inpatient", staffing: "2 interns + optional advanced resident", eligible: "PGY-1 interns; advanced resident", nights: "Covered by Gold/PHO night senior", weekend: "Inpatient resident covers full week", link: "Interns alternate inpatient/outpatient weekly", color: "purple" },
  "Jeopardy": { group: "Call pool", staffing: "Clinic Call + J1 + J2 + J3 daily", eligible: "Elective or designated call-eligible blocks", nights: "Clinic call hours vary by weekday/weekend", weekend: "J3 optional when pool is limited", link: "Driven by master schedule call eligibility", color: "nicu" },
  "Night Senior": { group: "Senior coverage", staffing: "Hospitalist + Gold/PHO/BMT/NB nightly", eligible: "Approved PGY-2/3 senior pool", nights: "3–5 consecutive nights, then recovery", weekend: "Also coordinates Floor and Gold day seniors", link: "Next-block inpatient status restricts final night", color: "purple" },
  "Green Team": { group: "Inpatient", staffing: "2 interns + 1 senior", eligible: "PGY-1 interns; PGY-2/3 senior", nights: "Service-specific night coverage", weekend: "Balanced weekend and golden-weekend coverage", link: "Linked to Floor residents in the master schedule", color: "green" }
};

const serviceDetailedRules = {};
Object.keys(serviceRuleProfiles).forEach((service) => {
  const profile = serviceRuleProfiles[service];
  serviceDetailedRules[service] = [
    { title: "Daily minimum coverage", copy: profile.staffing, type: "Coverage", enabled: true, hard: true },
    { title: "PGY and role eligibility", copy: profile.eligible, type: "Eligibility", enabled: true, hard: true },
    { title: "Night and post-call sequence", copy: profile.nights, type: "Safety", enabled: true, hard: true },
    { title: "Cross-schedule relationship", copy: profile.link, type: "Linked schedule", enabled: true, hard: true },
    { title: "Balance comparable residents", copy: "Weekends, calls, nights, clinic, and total hours", type: "Optimization", enabled: true, hard: false }
  ];
});

const requirementMeta = {
  staffing: { title: "Minimum staffing", icon: "users", tag: "Hard constraint" },
  eligible: { title: "Eligible residents", icon: "check", tag: "Hard constraint" },
  nights: { title: "Night coverage", icon: "clock", tag: "Shift rule" },
  weekend: { title: "Weekend coverage", icon: "calendar", tag: "Fairness + coverage" }
};

function defaultServiceProfile(team = {}) {
  return {
    group: team.category || "Custom",
    staffing: "Configure minimum staffing",
    eligible: "Choose eligible training levels and roles",
    nights: "Choose permitted shift templates",
    weekend: "Configure weekend coverage",
    link: `Linked to ${team.rotation || "a master rotation"}`,
    color: team.color || "purple"
  };
}

function ensureServiceRules(service) {
  if (!service) return null;
  const team = programTeams.find((item) => item.name === service);
  if (!serviceRuleProfiles[service]) serviceRuleProfiles[service] = defaultServiceProfile(team);
  serviceRuleProfiles[service] = {
    ...defaultServiceProfile(team),
    ...serviceRuleProfiles[service],
    group: serviceRuleProfiles[service].group || team?.category || "Custom",
    color: serviceRuleProfiles[service].color || team?.color || "purple"
  };
  if (!serviceDetailedRules[service]) {
    const profile = serviceRuleProfiles[service];
    serviceDetailedRules[service] = [
      { title: "Daily minimum coverage", copy: profile.staffing, type: "Coverage", enabled: true, hard: true },
      { title: "PGY and role eligibility", copy: profile.eligible, type: "Eligibility", enabled: true, hard: true },
      { title: "Night and post-call sequence", copy: profile.nights, type: "Safety", enabled: true, hard: true },
      { title: "Cross-schedule relationship", copy: profile.link, type: "Linked schedule", enabled: true, hard: true },
      { title: "Balance comparable residents", copy: "Weekends, calls, nights, clinic, and total hours", type: "Optimization", enabled: true, hard: false }
    ];
  }
  return serviceRuleProfiles[service];
}

let programTeams = [
  { name: "Purple", rotation: "Floor", category: "Inpatient", color: "purple", active: true },
  { name: "Orange", rotation: "Floor", category: "Inpatient", color: "orange", active: true },
  { name: "Gold", rotation: "Gold / Hospitalist", category: "Inpatient", color: "gold", active: true },
  { name: "Newborn", rotation: "Newborn Nursery", category: "Inpatient", color: "nicu", active: true },
  { name: "NICU", rotation: "NICU", category: "Critical care", color: "nicu", active: true },
  { name: "PICU", rotation: "PICU", category: "Critical care", color: "orange", active: true },
  { name: "Heme/Onc", rotation: "Hematology / Oncology", category: "Inpatient", color: "purple", active: true },
  { name: "Jeopardy", rotation: "Call-eligible rotations", category: "Call pool", color: "nicu", active: true },
  { name: "Night Senior", rotation: "Senior night pool", category: "Night coverage", color: "purple", active: true },
  { name: "Green Team", rotation: "Floor", category: "Inpatient", color: "green", active: true, createdAtBlock: 13 }
];

let shiftTemplates = [
  { name: "Standard day", code: "DAY", start: "06:30", end: "17:00", hours: "10.5", type: "Day", color: "day" },
  { name: "Long call", code: "LONG", start: "06:30", end: "19:00", hours: "12.5", type: "Call", color: "protected" },
  { name: "Short weekend", code: "SHORT", start: "06:30", end: "16:00", hours: "9.5", type: "Day", color: "day" },
  { name: "Procedure call", code: "PROC", start: "07:00", end: "17:00", hours: "10", type: "Task", color: "task", colorHex: "#0f8f83", style: "solid", display: "label" },
  { name: "Floor night", code: "NIGHT", start: "17:00", end: "07:00", hours: "14.0", type: "Night", color: "night" },
  { name: "Weekend night", code: "WKND-N", start: "18:15", end: "07:00", hours: "12.75", type: "Night", color: "night" },
  { name: "Clinic AM", code: "CL-AM", start: "08:00", end: "12:00", hours: "4.0", type: "Protected", color: "protected" },
  { name: "Clinic PM", code: "CL-PM", start: "13:00", end: "17:00", hours: "4.0", type: "Protected", color: "protected" },
  { name: "Post-call", code: "PC", start: "", end: "", hours: "0", type: "Recovery", color: "off" }
];

const residentProfiles = {
  "Resident A": { pgy: "PGY-1", institution: "Corewell Health", clinic: ["Mon AM","Mon AM","Mon AM","Tue PM","Tue PM","Tue PM","None","Wed AM","Wed AM","Wed AM","Thu PM","Thu PM","None"], didactic: "Friday 12:30–17:00" },
  "Resident B": { pgy: "PGY-1", institution: "Corewell Health", clinic: ["Tue AM","Tue AM","Tue AM","Wed PM","Wed PM","Wed PM","None","Thu AM","Thu AM","Thu AM","Mon PM","Mon PM","None"], didactic: "Friday 12:30–17:00" },
  "Resident C": { pgy: "PGY-2", institution: "Western Michigan", clinic: ["Wed AM","Wed AM","None","Thu PM","Thu PM","None","None","Mon AM","Mon AM","Tue PM","Tue PM","None","None"], didactic: "Uploaded by institution" },
  "Resident D": { pgy: "PGY-3", institution: "Henry Ford", clinic: ["None","None","None","None","None","None","None","None","None","None","None","None","None"], didactic: "Institution calendar" },
  "Resident E": { pgy: "PGY-2", institution: "Wayne State / DMC", clinic: ["Mon PM","Mon PM","Tue AM","Tue AM","Wed PM","Wed PM","None","Thu AM","Thu AM","Fri AM","Fri AM","None","None"], didactic: "Thursday 13:00–17:00" }
};

let residentActivityRecords = {
  "Resident A": {
    didacticPolicies: [
      { day: "Friday 12:30–17:00", required: true, virtual: false, sessions: 4, attended: 4, missed: 0 },
      { day: "Friday 12:30–17:00", required: true, virtual: false, sessions: 4, attended: 3, missed: 1 },
      { day: "Friday 12:30–17:00", required: false, virtual: true, sessions: 3, attended: 3, missed: 0 },
      { day: "Friday 12:30–17:00", required: true, virtual: false, sessions: 4, attended: 4, missed: 0 },
      { day: "Friday 12:30–17:00", required: true, virtual: true, sessions: 4, attended: 3, missed: 1 },
      { day: "Friday 12:30–17:00", required: true, virtual: false, sessions: 4, attended: 4, missed: 0 },
      { day: "Friday 12:30–17:00", required: false, virtual: true, sessions: 3, attended: 3, missed: 0 },
      { day: "Friday 12:30–17:00", required: true, virtual: false, sessions: 4, attended: 4, missed: 0 },
      { day: "Friday 12:30–17:00", required: true, virtual: true, sessions: 4, attended: 4, missed: 0 },
      { day: "Friday 12:30–17:00", required: false, virtual: true, sessions: 3, attended: 3, missed: 0 },
      { day: "Friday 12:30–17:00", required: true, virtual: false, sessions: 4, attended: 3, missed: 1 },
      { day: "Friday 12:30–17:00", required: true, virtual: false, sessions: 4, attended: 4, missed: 0 },
      { day: "Wednesday 12:30–17:00", required: true, virtual: true, sessions: 4, attended: 3, missed: 1 }
    ],
    attendance: [
      { date: "Jun 3, 2026", topic: "Morbidity and Mortality", mode: "In person", status: "Attended", note: "" },
      { date: "Jun 10, 2026", topic: "Board Review", mode: "Virtual", status: "Attended", note: "" },
      { date: "Jun 17, 2026", topic: "Quality Improvement", mode: "In person", status: "Missed", note: "Assigned overnight call; chief review needed." },
      { date: "Jun 24, 2026", topic: "Grand Rounds", mode: "In person", status: "Scheduled", note: "" }
    ],
    leave: [
      { id: 201, type: "Sick day", start: "Jan 14, 2026", end: "Jan 14, 2026", days: 1, block: 8, rotation: "Floor", coverage: "Floor day service", status: "approved", note: "Same-day illness" },
      { id: 202, type: "PTO", start: "Mar 23, 2026", end: "Mar 24, 2026", days: 2, block: 10, rotation: "Elective", coverage: "No inpatient coverage", status: "approved", note: "Planned personal leave" },
      { id: 203, type: "Conference", start: "Apr 20, 2026", end: "Apr 21, 2026", days: 2, block: 11, rotation: "ED", coverage: "ED shifts reassigned", status: "approved", note: "National meeting" },
      { id: 204, type: "PTO", start: "Jun 29, 2026", end: "Jun 30, 2026", days: 2, block: 13, rotation: "Elective", coverage: "Clinic cancellation required", status: "pending", note: "Resident request" }
    ],
    eligibility: {
      callPool: true,
      nightCoverage: true,
      jeopardy: true,
      advancedElectives: true,
      outsideRotator: false,
      note: "Eligible for PGY-3 advanced electives and senior call roles."
    }
  }
};

let didacticAttendanceSessions = [
  {
    id: 301,
    block: 13,
    date: "2026-06-24",
    time: "12:30–13:30",
    type: "Grand Rounds",
    topic: "Patient Safety and Systems Improvement",
    mode: "In person",
    status: "Open",
    attendance: {
      "Resident A": "Attended",
      "Resident B": "Attended",
      "Resident C": "Attended",
      "Resident D": "Not checked in",
      "Resident E": "Not checked in"
    }
  },
  {
    id: 300,
    block: 13,
    date: "2026-06-17",
    time: "12:30–13:30",
    type: "Quality Improvement",
    topic: "Improving Discharge Communication",
    mode: "Hybrid",
    status: "Closed",
    attendance: {
      "Resident A": "Missed",
      "Resident B": "Attended",
      "Resident C": "Excused",
      "Resident D": "Attended",
      "Resident E": "Attended"
    }
  }
];

const masterResidentIds = Array.from({ length: 54 }, (_, index) => index < 26 ? String.fromCharCode(65 + index) : `A${index - 25}`);
const masterResidents = masterResidentIds.map((letter, index) => {
  const pgy = index < 18 ? "PGY-1" : index < 36 ? "PGY-2" : "PGY-3";
  return {
  id: letter,
  name: `Resident ${letter}`,
  pgy,
  requirements: pgy === "PGY-1"
    ? { Purple: 1, Orange: 1, "Gold/NICU": 1, PHO: 1, Newborn: 1, ED: 1, Cardiology: 1, Adolescent: 1 }
    : { Floor: 3, PICU: 2, NICU: 2, ED: 2 }
  };
});

let masterRotationOptions = [
  { name: "Purple", color: "purple", capacity: 4, inpatient: true, pgy: ["PGY-1"], core: true },
  { name: "Orange", color: "orange", capacity: 4, inpatient: true, pgy: ["PGY-1"], core: true },
  { name: "Cardiology", color: "cards", capacity: 3, inpatient: false, pgy: ["PGY-1"], core: true },
  { name: "Gold/NICU", color: "gold", capacity: 5, inpatient: true, pgy: ["PGY-1"], core: true },
  { name: "PHO", color: "pho", capacity: 3, inpatient: true, pgy: ["PGY-1"], core: true },
  { name: "Newborn", color: "newborn", capacity: 4, inpatient: true, pgy: ["PGY-1"], core: true },
  { name: "Adolescent", color: "adolescent", capacity: 3, inpatient: false, pgy: ["PGY-1"], core: true },
  { name: "Clinic/Advo", color: "clinic", capacity: 10, inpatient: false, pgy: ["PGY-1"], core: false },
  { name: "Floor", color: "floor", capacity: 4, inpatient: true },
  { name: "PICU", color: "picu", capacity: 3, inpatient: true },
  { name: "NICU", color: "nicu", capacity: 3, inpatient: true },
  { name: "ED", color: "ed", capacity: 4, inpatient: false },
  { name: "Elective", color: "easy", capacity: 20, inpatient: false },
  { name: "Vacation", color: "vacation", capacity: 5, inpatient: false },
  { name: "Night Float", color: "night", capacity: 3, inpatient: true }
];

let pgyMasterRules = {
  "PGY-1": {
    title: "PGY-1 master schedule",
    copy: "Intern rotations use exact service names when the master itself assigns Purple, Orange, Cardiology, PHO, Newborn, and Gold/NICU. White/easy blocks remain elective or vacation eligible.",
    classSize: 18,
    electiveEligible: [2, 7, 10, 12, 13],
    vacationEligible: [2, 7, 10, 12],
    rotations: [
      { name: "Purple", min: 2, max: 4, mandatory: true, feedsService: "Purple" },
      { name: "Orange", min: 2, max: 4, mandatory: true, feedsService: "Orange" },
      { name: "Cardiology", min: 2, max: 3, mandatory: true, feedsService: "Cardiology" },
      { name: "Gold/NICU", min: 2, max: 5, mandatory: true, feedsService: "Gold" },
      { name: "PHO", min: 2, max: 3, mandatory: true, feedsService: "Heme/Onc" },
      { name: "Newborn", min: 2, max: 4, mandatory: true, feedsService: "Newborn" },
      { name: "ED", min: 1, max: 4, mandatory: true, feedsService: "ED" },
      { name: "Adolescent", min: 1, max: 3, mandatory: true, feedsService: "Adolescent" },
      { name: "Clinic/Advo", min: 0, max: 10, mandatory: false, feedsService: "" }
    ]
  }
};

function pgy1RotationFor(row, column) {
  const core = ["Purple", "Orange", "Cardiology", "Gold/NICU", "PHO", "Newborn", "ED", "Adolescent", "Clinic/Advo"];
  const pgyIndex = row;
  const vacationBlocks = new Set([1, 6, 9, 11]);
  if (vacationBlocks.has(column) && pgyIndex % 3 === column % 3) return "Vacation";
  if ((pgyIndex + column) % 7 === 0) return "Elective";
  return core[(pgyIndex * 2 + column * 3) % core.length];
}

let masterAssignments = masterResidents.map((resident, row) =>
  academicBlocks.map((_, column) => {
    const base = resident.pgy === "PGY-1" ? pgy1RotationFor(row, column) : ["Floor", "NICU", "Elective", "PICU", "ED"][(row * 2 + column) % 5];
    return { rotation: base, locked: column < 2 };
  })
);
if (masterAssignments[36]) {
  masterAssignments[36][2].rotation = "Night Float";
  masterAssignments[36][3].rotation = "PICU";
}
if (masterAssignments[18]) masterAssignments[18][3].rotation = "Floor";
if (masterAssignments[19]) masterAssignments[19][3].rotation = "Floor";
if (masterAssignments[20]) masterAssignments[20][3].rotation = "Floor";

function residentMasterIndex(name) {
  return Math.max(0, masterResidents.findIndex((resident) => resident.name === name));
}

function residentRotation(name, blockIndex = currentBlock - 1) {
  return masterAssignments[residentMasterIndex(name)]?.[blockIndex]?.rotation || "Elective";
}

function defaultDidacticPolicy(name, blockIndex) {
  const rotation = residentRotation(name, blockIndex);
  const profile = residentProfiles[name];
  const optional = ["Elective", "ED", "Vacation"].includes(rotation);
  return {
    day: profile?.didactic || "Institution calendar",
    required: !optional,
    virtual: optional || rotation === "ED",
    sessions: optional ? 3 : 4,
    attended: optional ? 3 : 4,
    missed: 0
  };
}

function ensureResidentActivityRecord(name) {
  if (!residentActivityRecords[name]) {
    residentActivityRecords[name] = {
      didacticPolicies: academicBlocks.map((_, index) => defaultDidacticPolicy(name, index)),
      attendance: [],
      leave: [],
      eligibility: {
        callPool: residentProfiles[name]?.pgy !== "PGY-1",
        nightCoverage: true,
        jeopardy: true,
        advancedElectives: residentProfiles[name]?.pgy === "PGY-3",
        outsideRotator: residentProfiles[name]?.institution !== "Corewell Health",
        note: "Eligibility follows PGY level, institution profile, and master-schedule rotation."
      }
    };
  }
  while (residentActivityRecords[name].didacticPolicies.length < academicBlocks.length) {
    residentActivityRecords[name].didacticPolicies.push(defaultDidacticPolicy(name, residentActivityRecords[name].didacticPolicies.length));
  }
  return residentActivityRecords[name];
}

function attendanceSessionById(id = activeAttendanceSessionId) {
  return didacticAttendanceSessions.find((session) => session.id === Number(id)) || didacticAttendanceSessions[0];
}

function attendanceDateLabel(value) {
  if (!value) return "Date not set";
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function syncAttendanceToResident(session, residentName, status) {
  const record = ensureResidentActivityRecord(residentName);
  const existing = record.attendance.find((item) => item.sessionId === session.id);
  const entry = {
    sessionId: session.id,
    block: session.block,
    date: attendanceDateLabel(session.date),
    topic: session.type + (session.topic ? ` · ${session.topic}` : ""),
    mode: session.mode,
    status,
    note: status === "Missed" ? "Did not check in; chief review may be required." : status === "Excused" ? "Excused absence." : ""
  };
  if (existing) Object.assign(existing, entry);
  else record.attendance.push(entry);

  const policy = record.didacticPolicies[session.block - 1];
  const blockEntries = record.attendance.filter((item) => (item.block || currentBlock) === session.block);
  policy.sessions = blockEntries.length;
  policy.attended = blockEntries.filter((item) => item.status === "Attended").length;
  policy.missed = blockEntries.filter((item) => item.status === "Missed").length;
}

function attendanceStatusClass(status) {
  if (status === "Attended") return "attended";
  if (status === "Excused") return "excused";
  if (status === "Missed") return "missed";
  return "pending";
}

const metric = (icon, tone, label, value, note, trend, trendClass = "good") => `
  <article class="metric-card">
    <div class="metric-top">
      <span class="metric-icon ${tone}"><span class="icon" data-icon="${icon}"></span></span>
      <span class="trend ${trendClass}">${trend}</span>
    </div>
    <span class="metric-label">${label}</span>
    <span class="metric-value">${value}</span><span class="metric-note">${note}</span>
  </article>`;

function chiefDashboard() {
  const block = academicBlocks[currentBlock - 1];
  const services = programTeams.filter((team) => team.active);
  const readiness = services.map((team) => ({ team, ...serviceReadiness(team.name) }));
  const pendingCount = readiness.filter((item) => ["Pending setup", "Draft", "Needs review"].includes(item.label)).length;
  const readyCount = readiness.filter((item) => ["Ready", "Published"].includes(item.label)).length;
  const attentionItems = readiness.filter((item) => ["Pending setup", "Draft", "Needs review"].includes(item.label));
  return `
    <section class="page dashboard-page">
      <div class="page-head">
        <div>
          <p class="eyebrow">Saturday, June 6</p>
          <h1>Good morning, Dr. Morgan</h1>
          <p>Block ${block[0]} has ${readyCount} of ${readiness.length} service schedules ready. ${pendingCount} still need attention before publishing.</p>
        </div>
        <div class="page-head-actions">
          <button class="secondary-button compact"><span class="icon" data-icon="download"></span> Export</button>
          <div class="select-wrap"><select class="date-select block-select" aria-label="Current block">${academicBlocks.map(([number, dates]) => `<option value="${number}" ${Number(number) === currentBlock ? "selected" : ""}>Block ${number} · ${dates}</option>`).join("")}</select></div>
        </div>
      </div>
      ${blockNavigator("dashboard")}
      ${isMvpTestMode ? `
      <section class="mvp-test-banner">
        <div>
          <p class="eyebrow">Fresh MVP test mode</p>
          <h2>This version is loaded from the anonymized workbook data</h2>
          <p>Use this clean test copy to try the real workflows: master import, service coverage, call pools, holidays, attendance, resident profiles, and the resident portal.</p>
        </div>
        <div class="mvp-test-actions">
          <button data-view-target="master">Test master schedule</button>
          <button data-view-target="schedule">Test service schedules</button>
          <button data-view-target="attendance">Test attendance</button>
          <button data-view-target="residents">Test resident profiles</button>
        </div>
      </section>` : ""}

      <div class="metric-grid">
        ${metric("users", "purple", "Residents scheduled", "54", `across ${configuredServices().length} teams`, "+2 this block")}
        ${metric("check", "teal", "Coverage score", "97%", "minimums covered", "+4%", "good")}
        ${metric("clock", "amber", "Average hours", "63.4", "hrs / resident / week", "Balanced", "warn")}
        ${metric("alert", "red", "Needs attention", String(pendingCount), "service schedules pending", pendingCount ? "Review" : "Clear", pendingCount ? "warn" : "good")}
      </div>
      <section class="panel block-summary-strip">
        <div><small>Approved requests</small><strong>${residentRequests.filter(request=>request.block===currentBlock && request.status==="approved").length}</strong><span>used in generation</span></div>
        <div><small>Pending decisions</small><strong>${residentRequests.filter(request=>request.block===currentBlock && request.status==="pending").length}</strong><span>chief review required</span></div>
        <div><small>Weekend days off</small><strong>108</strong><span>2.0 average / resident</span></div>
        <div><small>Golden weekends</small><strong>49 / 54</strong><span>5 need review</span></div>
        <div><small>Clinic sessions</small><strong>86</strong><span>all protected</span></div>
        <div><small>Call assignments</small><strong>132</strong><span>J1-J3, clinic, crossover</span></div>
      </section>

      <div class="dashboard-grid">
        <div>
          <section class="panel">
            <div class="panel-header">
              <div><h2>Schedule readiness</h2><p>Coverage and validation across all configured schedules</p></div>
              <button class="link-button" data-view-target="schedule">Open schedules →</button>
            </div>
            <div class="schedule-progress">
              ${readiness.map((item)=>serviceRow(item.team.name.slice(0,2).toUpperCase(), item.team.color, item.team.name, serviceRuleProfiles[item.team.name]?.staffing || item.team.rotation, item.progress, item.label, item.className)).join("")}
            </div>
          </section>
          <section class="generation-card">
            <h2>${pendingCount ? `Build the remaining ${pendingCount} schedules` : `Block ${currentBlock} schedules are ready`}</h2>
            <p>${readyCount} of ${readiness.length} service schedules are ready or published. Generate drafts for pending services, then review and publish them.</p>
            <button class="open-generate"><span class="icon" data-icon="wand"></span> Generate all schedules</button>
          </section>
        </div>

        <section class="panel">
          <div class="panel-header">
            <div><h2>Attention center</h2><p>Items that may affect coverage or fairness</p></div>
            <button class="icon-button"><span class="icon" data-icon="filter"></span></button>
          </div>
          <div class="alert-list">
            ${attentionItems.length ? attentionItems.map((item)=>alertItem(item.label==="Needs review"?"red":"amber", `${item.team.name}: ${item.label}`, item.label==="Pending setup" ? `No Block ${currentBlock} draft has been generated for this service.` : item.label==="Draft" ? "A draft exists but has not been marked ready." : "Coverage or fairness needs chief review.", "Now")).join("") : alertItem("blue", "All service schedules ready", `Block ${currentBlock} has no pending service schedules.`, "Now")}
            ${alertItem("blue", "Requests imported", "47 resident submissions synced successfully.", "1h")}
          </div>
        </section>
      </div>
    </section>`;
}

function serviceRow(initials, tone, name, detail, progress, status, statusClass) {
  return `<div class="service-row">
    <span class="service-icon ${tone}">${initials}</span>
    <span class="service-name"><strong>${name}</strong><span>${detail}</span></span>
    <span class="progress-track"><i class="progress-fill" style="width:${progress}%"></i></span>
    <span class="status-pill ${statusClass}">${status}</span>
    <button class="icon-button row-action dashboard-service-open" data-service="${escapeHtml(name)}" aria-label="Open ${name}"><span class="icon" data-icon="chevron"></span></button>
  </div>`;
}

function alertItem(tone, title, copy, time) {
  return `<div class="alert-item"><span class="alert-dot ${tone}"></span><span class="alert-copy"><strong>${title}</strong><span>${copy}</span></span><span class="alert-time">${time}</span></div>`;
}

function placeholderView(title, description) {
  return `<section class="page"><div class="page-head"><div><p class="eyebrow">Clarity workspace</p><h1>${title}</h1><p>${description}</p></div></div><section class="panel" style="padding:30px"><h2>This view is being prepared</h2><p style="color:var(--muted);font-size:12px;line-height:1.7">The interactive prototype includes the core dashboard today. The schedule editor, analytics, resident requests, and master schedule views are being connected next.</p></section></section>`;
}

const configuredServices = () => programTeams.filter((team) => team.active).map((team) => team.name);
const serviceMasterLinks = {
  Purple: ["Purple", "Floor"],
  Orange: ["Orange", "Floor"],
  Gold: ["Gold/NICU", "Elective", "NICU"],
  Newborn: ["Newborn", "Elective"],
  NICU: ["NICU"],
  PICU: ["PICU"],
  "Heme/Onc": ["PHO", "Elective", "ED"],
  Jeopardy: ["Elective", "Vacation", "ED"],
  "Night Senior": ["Floor", "PICU", "NICU", "Night Float"],
  "Green Team": ["Floor"]
};
const serviceScheduleSettings = {
  Purple: { nights: true, longCall: true, shortWeekend: true, label: "Floor day, long call, short weekend, and night coverage" },
  Orange: { nights: true, longCall: true, shortWeekend: true, label: "Floor day, long call, short weekend, and night coverage" },
  Gold: { nights: false, longCall: true, shortWeekend: true, label: "Day service with long-call and weekend support" },
  Newborn: { nights: false, longCall: true, shortWeekend: true, label: "Day and long senior coverage; no Newborn nights" },
  NICU: { nights: true, longCall: true, shortWeekend: true, label: "NICU day, long call, procedure, and night coverage" },
  PICU: { nights: true, longCall: true, shortWeekend: false, label: "Two-unit day and night critical-care coverage" },
  "Heme/Onc": { nights: false, longCall: false, shortWeekend: true, label: "Inpatient day coverage with linked night senior" },
  Jeopardy: { nights: true, longCall: false, shortWeekend: false, label: "Clinic Call, J1, J2, J3, and crossover assignments" },
  "Night Senior": { nights: true, longCall: false, shortWeekend: false, label: "Senior night coverage only" },
  "Green Team": { nights: true, longCall: true, shortWeekend: true, label: "Green Team day, call, weekend, and night coverage" }
};
const serviceBuilderConfigs = {
  Purple: { roles: [{ name: "Intern", count: 4, pgy: "PGY-1" }, { name: "Senior", count: 1, pgy: "PGY-2/3" }], shifts: ["DAY","LONG","SHORT","NIGHT","WKND-N"] },
  Orange: { roles: [{ name: "Intern", count: 4, pgy: "PGY-1" }, { name: "Senior", count: 1, pgy: "PGY-2/3" }], shifts: ["DAY","LONG","SHORT","NIGHT","WKND-N"] },
  Gold: { roles: [{ name: "Intern", count: 2, pgy: "PGY-1" }, { name: "Senior support", count: 1, pgy: "PGY-2/3" }], shifts: ["DAY","LONG","SHORT"] },
  Newborn: { roles: [{ name: "Intern", count: 2, pgy: "PGY-1" }, { name: "Long senior", count: 1, pgy: "PGY-2/3" }], shifts: ["DAY","LONG","SHORT"] },
  NICU: { roles: [{ name: "Intern", count: 2, pgy: "PGY-1" }, { name: "Senior", count: 3, pgy: "PGY-2/3" }], shifts: ["DAY","LONG","SHORT","PROC","NIGHT","WKND-N"] },
  PICU: { roles: [{ name: "Unit 1 senior", count: 1, pgy: "PGY-2/3" }, { name: "Unit 2 senior", count: 1, pgy: "PGY-2/3" }, { name: "Support resident", count: 1, pgy: "PGY-2/3" }], shifts: ["DAY","LONG","NIGHT","WKND-N"] },
  "Heme/Onc": { roles: [{ name: "Intern", count: 2, pgy: "PGY-1" }, { name: "Advanced resident", count: 1, pgy: "PGY-2/3" }], shifts: ["DAY","SHORT"] },
  Jeopardy: { roles: [{ name: "Clinic Call", count: 1, pgy: "Any eligible" }, { name: "J1", count: 1, pgy: "Any eligible" }, { name: "J2", count: 1, pgy: "Any eligible" }, { name: "J3", count: 1, pgy: "Any eligible" }], shifts: ["DAY","LONG","NIGHT","WKND-N"] },
  "Night Senior": { roles: [{ name: "Night senior", count: 3, pgy: "PGY-2/3" }], shifts: ["NIGHT","WKND-N"] },
  "Green Team": { roles: [{ name: "Intern", count: 2, pgy: "PGY-1" }, { name: "Senior", count: 1, pgy: "PGY-2/3" }], shifts: ["DAY","LONG","SHORT","NIGHT","WKND-N"] }
};
const serviceCoverageLanes = {
  Purple: [{ name: "Purple team", color: "#7765c7", minimum: 5 }],
  Orange: [{ name: "Orange team", color: "#e8904f", minimum: 5 }],
  Gold: [{ name: "Gold service", color: "#c99a24", minimum: 3 }],
  Newborn: [{ name: "Newborn nursery", color: "#4f83c4", minimum: 3 }],
  NICU: [{ name: "NICU day", color: "#65a68f", minimum: 4 }, { name: "Procedure call", color: "#0f8f83", minimum: 1 }, { name: "NICU night", color: "#6957b8", minimum: 1 }],
  PICU: [{ name: "Unit 1", color: "#ffffff", minimum: 1 }, { name: "Unit 2", color: "#a9c879", minimum: 1 }, { name: "Cards ICU", color: "#df8d86", minimum: 1 }, { name: "PICU night", color: "#6f9ed0", minimum: 1 }],
  "Heme/Onc": [{ name: "Heme/Onc service", color: "#9d75bd", minimum: 3 }],
  Jeopardy: [{ name: "Clinic call", color: "#db9c48", minimum: 1 }, { name: "J1/J2/J3", color: "#6e9fd0", minimum: 3 }],
  "Night Senior": [{ name: "Night coverage", color: "#6957b8", minimum: 3 }],
  "Green Team": [{ name: "Green Team", color: "#6fbf4b", minimum: 3 }]
};
const serviceDistributionSettings = {
  PICU: { cadence: "Weekly", nightHandoff: "Staggered stretches", balance: "Equal weekends and weekdays" }
};
const serviceShiftOverrides = {};

function getServiceShiftTemplate(service, code) {
  const base = shiftTemplates.find((shift) => shift.code === code);
  if (!base) return null;
  return { ...base, ...(serviceShiftOverrides[service]?.[code] || {}) };
}

function defaultShiftHex(shift) {
  return shift.colorHex || ({ night: "#6957b8", protected: "#d99024", off: "#737987", task: "#0f8f83", day: "#4f83c4" }[shift.color] || "#4f83c4");
}

function shiftCardStyle(shift) {
  if (!shift?.colorHex) return "";
  const hex = shift.colorHex;
  const text = shift.style === "solid" ? "#ffffff" : hex;
  const background = shift.style === "outline" ? "#ffffff" : shift.style === "solid" ? hex : `${hex}20`;
  return `style="--assignment-bg:${background};--assignment-border:${hex};--assignment-text:${text}"`;
}

function ensureServiceBuilderConfig(service) {
  if (!serviceBuilderConfigs[service]) {
    serviceBuilderConfigs[service] = {
      roles: [{ name: "Resident", count: 1, pgy: "Any eligible" }],
      shifts: ["DAY"]
    };
  }
  return serviceBuilderConfigs[service];
}

function ensureServiceCoverageLanes(service) {
  if (!serviceCoverageLanes[service]) {
    serviceCoverageLanes[service] = [{ name: `${service} coverage`, color: "#4f83c4", minimum: 1 }];
  }
  if (!serviceDistributionSettings[service]) {
    serviceDistributionSettings[service] = { cadence: "Weekly", nightHandoff: "Staggered stretches", balance: "Equal weekends and weekdays" };
  }
  return serviceCoverageLanes[service];
}
const callPoolCandidates = [
  { name: "Ahmed", role: "P1 · Call pool", institution: "Corewell", eligible: "Day, night, weekend" },
  { name: "Bennett", role: "P2 · Elective", institution: "Corewell", eligible: "Senior, night, weekend" },
  { name: "Cho", role: "P1 · Research", institution: "Corewell", eligible: "Day and weekend" },
  { name: "Diaz", role: "P3 · Call pool", institution: "DMC", eligible: "Senior and crossover" }
];

const scheduleResidents = [
  { name: "Gilbert", role: "P1 · Main", nightRange: [0, 4], goldenWeekend: 2 },
  { name: "Patel, Kr", role: "P1 · Main", nightRange: [18, 22], goldenWeekend: 0 },
  { name: "DuVall", role: "FM1 · UMHW", nightRange: [5, 8], goldenWeekend: 1 },
  { name: "Lin", role: "FM1 · THGR", nightRange: [14, 17], goldenWeekend: 3 },
  { name: "Boateng", role: "P2 · Call pool", nightRange: [9, 13], goldenWeekend: 3 },
  { name: "McAlvey", role: "P3 · Call pool", nightRange: [23, 27], goldenWeekend: 1 }
];

function makeScheduleEntry(value, dayIndex) {
  return {
    value,
    lane: "",
    source: value === "CLINIC" ? "Resident clinic profile" : value === "DIDACTIC" ? "Institution didactics" : value ? "Generated four-week draft" : "Unassigned",
    protected: value === "CLINIC" || value === "DIDACTIC",
    overridden: false,
    note: dayIndex % 7 > 4 ? "Weekend coverage" : ""
  };
}

function buildResidentBlockShifts(resident, row) {
  return Array.from({ length: 28 }, (_, dayIndex) => {
    const week = Math.floor(dayIndex / 7);
    const day = dayIndex % 7;
    if (dayIndex >= resident.nightRange[0] && dayIndex <= resident.nightRange[1]) return makeScheduleEntry(day > 4 ? "1815–0700" : "1700–0700", dayIndex);
    if (dayIndex === resident.nightRange[1] + 1) return makeScheduleEntry("POST CALL", dayIndex);
    if (week === resident.goldenWeekend && day > 4) return makeScheduleEntry("OFF", dayIndex);
    if (day === 2 && row % 2 === 0) return makeScheduleEntry("DIDACTIC", dayIndex);
    if (day === (row % 2 ? 3 : 4)) return makeScheduleEntry("CLINIC", dayIndex);
    if (day === 5) return makeScheduleEntry(row % 2 ? "0630–1900" : "OFF", dayIndex);
    if (day === 6) return makeScheduleEntry(row % 2 ? "OFF" : "0630–1600", dayIndex);
    return makeScheduleEntry("0630–1700", dayIndex);
  });
}

const initialDemoDraft = scheduleResidents.map((resident, row) => ({
  id: `resident-${row}`,
  name: resident.name,
  role: resident.role,
  source: resident.role.includes("Call pool") ? "Call-pool profile" : "Master schedule",
  shifts: buildResidentBlockShifts(resident, row)
}));
const scheduleDraftStore = {};
const scheduleLifecycleStore = {};
const persistenceKey = "clarity-schedule-mvp-v2";

function replaceObject(target, source = {}) {
  if (!source || typeof source !== "object") return;
  Object.keys(target).forEach((key) => delete target[key]);
  Object.assign(target, source);
}

function loadPersistedAppState() {
  try {
    const saved = JSON.parse(localStorage.getItem(persistenceKey) || "null");
    if (!saved) return;
    if (Array.isArray(saved.masterResidents)) {
      masterResidents.splice(0, masterResidents.length, ...saved.masterResidents);
    }
    if (saved.residentProfiles) replaceObject(residentProfiles, saved.residentProfiles);
    if (Array.isArray(saved.programTeams)) programTeams = saved.programTeams;
    if (Array.isArray(saved.shiftTemplates)) shiftTemplates = saved.shiftTemplates;
    replaceObject(serviceRuleProfiles, saved.serviceRuleProfiles);
    replaceObject(serviceDetailedRules, saved.serviceDetailedRules);
    replaceObject(serviceBuilderConfigs, saved.serviceBuilderConfigs);
    replaceObject(serviceShiftOverrides, saved.serviceShiftOverrides);
    replaceObject(serviceScheduleSettings, saved.serviceScheduleSettings);
    replaceObject(serviceCoverageLanes, saved.serviceCoverageLanes);
    replaceObject(serviceDistributionSettings, saved.serviceDistributionSettings);
    replaceObject(serviceMasterLinks, saved.serviceMasterLinks);
    replaceObject(scheduleDraftStore, saved.scheduleDraftStore);
    replaceObject(scheduleLifecycleStore, saved.scheduleLifecycleStore);
    if (Array.isArray(saved.masterRotationOptions)) masterRotationOptions = saved.masterRotationOptions;
    if (saved.pgyMasterRules) pgyMasterRules = saved.pgyMasterRules;
    if (Array.isArray(saved.masterAssignments)) masterAssignments = saved.masterAssignments;
    if (Array.isArray(saved.callSwitchOffers)) callSwitchOffers = saved.callSwitchOffers;
    if (saved.residentActivityRecords) residentActivityRecords = { ...residentActivityRecords, ...saved.residentActivityRecords };
    if (Array.isArray(saved.didacticAttendanceSessions)) didacticAttendanceSessions = saved.didacticAttendanceSessions;
    if (saved.programSettings) Object.assign(programSettings, saved.programSettings);
    if (saved.masterPlanningOptions) masterPlanningOptions = { ...masterPlanningOptions, ...saved.masterPlanningOptions };
    if (saved.masterImportState) masterImportState = { ...masterImportState, ...saved.masterImportState };
    if (saved.annualPreferenceSubmission) {
      annualPreferenceSubmission = {
        ...annualPreferenceSubmission,
        ...saved.annualPreferenceSubmission,
        lifeEvent: { ...annualPreferenceSubmission.lifeEvent, ...(saved.annualPreferenceSubmission.lifeEvent || {}) }
      };
    }
    if (["digital", "excel"].includes(saved.annualWorkbookDisplayMode)) annualWorkbookDisplayMode = saved.annualWorkbookDisplayMode;
  } catch (error) {
    console.warn("Unable to restore saved scheduling data.", error);
  }
}

function persistAppState() {
  try {
    localStorage.setItem(persistenceKey, JSON.stringify({
      masterResidents,
      residentProfiles,
      programTeams,
      shiftTemplates,
      serviceRuleProfiles,
      serviceDetailedRules,
      serviceBuilderConfigs,
      serviceShiftOverrides,
      serviceScheduleSettings,
      serviceCoverageLanes,
      serviceDistributionSettings,
      serviceMasterLinks,
      scheduleDraftStore,
      scheduleLifecycleStore,
      masterRotationOptions,
      pgyMasterRules,
      masterAssignments,
      callSwitchOffers,
      residentActivityRecords,
      didacticAttendanceSessions,
      programSettings,
      masterPlanningOptions,
      masterImportState,
      annualPreferenceSubmission,
      annualWorkbookDisplayMode
    }));
  } catch (error) {
    console.warn("Unable to save scheduling data.", error);
  }
}

function normalizeImportedProfile(profile, resident, index) {
  const clinicPlan = Array.isArray(profile?.clinicPlan) ? profile.clinicPlan : [];
  const clinic = Array.from({ length: academicBlocks.length }, (_, blockIndex) => {
    const planned = clinicPlan.find((item) => Number(item.block) === blockIndex + 1);
    return planned?.pattern || profile?.clinic?.[blockIndex] || (blockIndex % 4 === index % 4 ? "None" : "Friday PM");
  });
  return {
    ...(profile || {}),
    pgy: profile?.pgy || resident.pgy,
    institution: profile?.institution || resident.institution || "Corewell Health",
    clinic,
    didactic: profile?.didactic || "Friday 12:30-17:00"
  };
}

function importedColorClass(name, fallback = "purple") {
  const key = String(name || "").toLowerCase();
  if (key.includes("orange")) return "orange";
  if (key.includes("gold")) return "gold";
  if (key.includes("nicu") || key.includes("newborn")) return "nicu";
  if (key.includes("picu")) return "orange";
  if (key.includes("pho") || key.includes("heme") || key.includes("purple")) return "purple";
  if (key.includes("card")) return "cards";
  if (key.includes("ed")) return "ed";
  if (key.includes("night")) return "night";
  if (key.includes("adolescent")) return "adolescent";
  if (key.includes("clinic")) return "clinic";
  if (key.includes("vacation")) return "vacation";
  if (key.includes("elective") || key.includes("research")) return "easy";
  return fallback;
}

function applyWorkbookDemoData() {
  const demo = window.CLARITY_WORKBOOK_DEMO;
  if (!demo) return;
  const appliedVersion = localStorage.getItem("clarity-workbook-demo-version");
  if (!isMvpTestMode && appliedVersion === demo.version && masterResidents.some((resident) => /^R\d+/.test(resident.id))) return;

  if (demo.academicYear) programSettings.academicYear = demo.academicYear;
  if (Array.isArray(demo.programTeams)) programTeams = demo.programTeams.map((team) => ({
    name: team.name,
    rotation: team.type || team.rotation || team.name,
    category: team.type || team.category || "Service",
    color: importedColorClass(team.name, team.color || "purple"),
    active: team.enabled !== false
  }));

  if (Array.isArray(demo.masterResidents)) {
    masterResidents.splice(0, masterResidents.length, ...demo.masterResidents.map((resident) => ({
      ...resident,
      requirements: resident.requirements || {}
    })));
  }

  if (demo.residentProfiles) {
    const normalizedProfiles = {};
    masterResidents.forEach((resident, index) => {
      normalizedProfiles[resident.name] = normalizeImportedProfile(demo.residentProfiles[resident.name], resident, index);
    });
    replaceObject(residentProfiles, normalizedProfiles);
  }

  if (demo.masterAssignments) {
    masterAssignments = masterResidents.map((resident) => {
      const cells = demo.masterAssignments[resident.id] || demo.masterAssignments[resident.name] || [];
      return academicBlocks.map((_, index) => {
        const imported = cells[index] || {};
        return {
          rotation: imported.rotation || "Elective",
          sourceLabel: imported.sourceLabel || imported.rotation || "Elective",
          imported: true,
          locked: Boolean(imported.locked)
        };
      });
    });
  }

  if (Array.isArray(demo.masterRotationOptions)) {
    masterRotationOptions = demo.masterRotationOptions.map((rotation) => ({
      name: rotation.name,
      color: importedColorClass(rotation.name, rotation.color || "easy"),
      capacity: rotation.maxPerBlock || rotation.capacity || 20,
      maxPerBlock: rotation.maxPerBlock || rotation.capacity || 20,
      inpatient: !["Elective", "Vacation", "Research", "Clinic/Advo"].includes(rotation.name),
      core: !["Elective", "Vacation"].includes(rotation.name)
    }));
  }
  if (demo.pgyMasterRules) pgyMasterRules = demo.pgyMasterRules;
  if (demo.serviceMasterLinks) replaceObject(serviceMasterLinks, demo.serviceMasterLinks);
  const activeServiceNames = programTeams.map((team) => team.name);
  if (!activeServiceNames.includes(activeBuilderService)) activeBuilderService = activeServiceNames[0] || activeBuilderService;
  if (!activeServiceNames.includes(activeScheduleService)) activeScheduleService = activeServiceNames[0] || activeScheduleService;

  residentActivityRecords = {};
  masterResidents.forEach((resident) => ensureResidentActivityRecord(resident.name));
  if (Array.isArray(demo.didacticAttendanceSessions)) {
    didacticAttendanceSessions = demo.didacticAttendanceSessions.map((session, index) => ({
      id: 1000 + index,
      block: session.block || 1,
      date: session.date,
      time: session.time || "12:30-17:00",
      type: session.type || "Core didactics",
      topic: session.topic || "Imported attendance demo",
      mode: session.mode || "In person",
      status: "Open",
      attendance: Object.fromEntries(Object.entries(session.attendance || {}).map(([name, value]) => [name, value === true ? "Attended" : "Not checked in"]))
    }));
    activeAttendanceSessionId = didacticAttendanceSessions[0]?.id || activeAttendanceSessionId;
  }

  masterImportState = {
    ...masterImportState,
    ...(demo.masterImportState || {}),
    status: "applied",
    mode: "import",
    uploadedAt: "Loaded from anonymized Excel workbook",
    notes: "Real workbook structure is active with fake resident names."
  };
  activeResident = masterResidents[0]?.name || activeResident;
  if (!residentProfiles[activeResident]) activeResident = Object.keys(residentProfiles)[0] || activeResident;
  localStorage.setItem("clarity-workbook-demo-version", demo.version);
  persistAppState();
}

loadPersistedAppState();
applyWorkbookDemoData();
["Purple", "Orange", "Gold/NICU", "PHO", "Newborn"].forEach((rotation) => {
  const service = rotation === "Gold/NICU" ? "Gold" : rotation === "PHO" ? "Heme/Onc" : rotation;
  serviceMasterLinks[service] = Array.from(new Set([rotation, ...(serviceMasterLinks[service] || [])]));
});
let scheduleDraft = initialDemoDraft;

function scheduleDraftKey(block = currentBlock, service = activeScheduleService) {
  return `${block}:${service}`;
}

function lifecycleKey(block, service) {
  return `${block}:${service}`;
}

function setScheduleLifecycle(block, service, status) {
  scheduleLifecycleStore[lifecycleKey(block, service)] = status;
  persistAppState();
}

function getScheduleLifecycle(block, service) {
  const stored = scheduleLifecycleStore[lifecycleKey(block, service)];
  if (stored) return stored;
  const team = programTeams.find((item) => item.name === service);
  if (team?.createdAtBlock && block < team.createdAtBlock) return "Not used";
  if (scheduleDraftStore[scheduleDraftKey(block, service)]) return "Draft";
  if (block <= 10) return "Published";
  if (block <= 12) return "Ready";
  return "Pending";
}

function blockLifecycleSummary(block) {
  const statuses = configuredServices().map((service) => getScheduleLifecycle(block, service)).filter((status) => status !== "Not used");
  if (!statuses.length) return "empty";
  if (statuses.every((status) => status === "Published")) return "published";
  if (statuses.some((status) => status === "Pending" || status === "Needs review")) return "draft";
  if (statuses.some((status) => status === "Draft")) return "complete";
  return "complete";
}

function serviceReadiness(service, block = currentBlock) {
  const status = getScheduleLifecycle(block, service);
  const map = {
    "Published": { label: "Published", className: "published", progress: 100 },
    "Ready": { label: "Ready", className: "ready", progress: 100 },
    "Draft": { label: "Draft", className: "review", progress: 72 },
    "Needs review": { label: "Needs review", className: "missing", progress: 88 },
    "Not used": { label: "Not used", className: "neutral", progress: 0 },
    "Pending": { label: "Pending setup", className: "pending", progress: 18 }
  };
  return map[status] || map.Pending;
}

function masterRowsForService(service, block) {
  const blockIndex = Math.max(0, block - 1);
  const links = serviceMasterLinks[service] || [programTeams.find((team) => team.name === service)?.rotation || service];
  let rows = masterResidents.map((resident, index) => ({
    resident,
    index,
    rotation: masterAssignments[index]?.[blockIndex]?.rotation
  })).filter((item) => links.includes(item.rotation));
  const sharedSingleRotation = links.length === 1 ? links[0] : "";
  if (sharedSingleRotation) {
    const siblingServices = configuredServices().filter((item) => {
      const itemLinks = serviceMasterLinks[item] || [programTeams.find((team) => team.name === item)?.rotation || item];
      return itemLinks.length === 1 && itemLinks[0] === sharedSingleRotation;
    });
    if (siblingServices.length > 1) {
      const serviceIndex = Math.max(0, siblingServices.indexOf(service));
      rows = rows.filter((_, index) => index % siblingServices.length === serviceIndex);
    }
  }
  if (service === "Night Senior") rows = rows.filter((item) => item.resident.pgy !== "PGY-1");
  return rows;
}

function serviceMasterSplitLabel(service) {
  const links = serviceMasterLinks[service] || [programTeams.find((team) => team.name === service)?.rotation || service];
  if (links.length !== 1) return "Direct master pull";
  const siblings = configuredServices().filter((item) => {
    const itemLinks = serviceMasterLinks[item] || [programTeams.find((team) => team.name === item)?.rotation || item];
    return itemLinks.length === 1 && itemLinks[0] === links[0];
  });
  return siblings.length > 1 ? `Split ${links[0]} across ${siblings.join(", ")}` : `Direct ${links[0]} pull`;
}

function serviceRosterTarget(service) {
  const roleTarget = ensureServiceBuilderConfig(service).roles.reduce((sum, role) => sum + Number(role.count || 0), 0);
  const laneTarget = ensureServiceCoverageLanes(service).reduce((sum, lane) => sum + Number(lane.minimum || 0), 0);
  return Math.max(1, roleTarget, laneTarget);
}


// ── Purple/Orange real scheduling engine (auto-inserted) ───────────────────
// ============================================================
// CLARITY SCHEDULE — Purple / Orange Real Generation Engine
// Replace the existing generateServiceDraft() and
// generateServiceBlockShifts() functions in app.js with
// this code. Insert it just ABOVE the existing
// generateServiceDraft function (around line 1433).
// Then rename the old generateServiceDraft to
// generateServiceDraftGeneric and call this one for
// Purple and Orange.
// ============================================================

// ── Constants ─────────────────────────────────────────────────────────────────

const FLOOR_SERVICES = ["Purple", "Orange"];

// Day-of-week indices (0 = Mon … 4 = Fri, 5 = Sat, 6 = Sun)
const MON = 0, TUE = 1, WED = 2, THU = 3, FRI = 4, SAT = 5, SUN = 6;

// Block is always 28 calendar days (4 weeks of 7 days each)
const BLOCK_DAYS = 28;

// ── Protected-time helpers ────────────────────────────────────────────────────

/**
 * Returns a Set of day-indices (0–27) that are hard-blocked for a resident.
 * Sources: approved requests, clinic pattern, didactics, ITE, post-call
 * carryover. Pending requests add a soft warning flag only (not a hard block).
 */
function buildProtectedSet(residentName, blockIndex) {
  const blocked = new Set();
  const softWarnings = new Set();
  const profile = residentProfiles[residentName] || {};
  const blockNumber = blockIndex + 1;

  // ── Approved requests ──────────────────────────────────────────────────────
  const approved = residentRequests.filter(
    (r) => r.resident === residentName &&
            r.block === blockNumber &&
            r.status === "approved"
  );
  approved.forEach((req) => {
    // Map request detail strings to day indices when possible
    // (In a real system these would be exact dates; here we use
    //  week-level approximations from the detail string.)
    if (/vacation|pto|day off/i.test(req.type)) {
      // Mark all days in the request window — simplified to full week
      for (let d = 0; d < BLOCK_DAYS; d++) blocked.add(d);
    }
  });

  // ── Pending requests — soft warning only ──────────────────────────────────
  const pending = residentRequests.filter(
    (r) => r.resident === residentName &&
            r.block === blockNumber &&
            r.status === "pending"
  );
  pending.forEach(() => {
    // We don't know exact days from sample data; mark week 2 as a soft warning
    // In production this would use exact requested dates
    for (let d = 7; d < 14; d++) softWarnings.add(d);
  });

  // ── Clinic days ───────────────────────────────────────────────────────────
  // clinic is stored as an array per block or a string like "Friday PM"
  const clinicEntry = Array.isArray(profile.clinic)
    ? profile.clinic[blockIndex]
    : profile.clinic;
  if (clinicEntry && clinicEntry !== "None") {
    const clinicDow = clinicDayOfWeek(clinicEntry); // 0-6
    if (clinicDow !== null) {
      for (let week = 0; week < 4; week++) {
        blocked.add(week * 7 + clinicDow);
      }
    }
  }

  // ── Didactics ─────────────────────────────────────────────────────────────
  // Most residents have Friday didactics; some have Wednesday
  const didacticEntry = profile.didactic || "Friday";
  const didacticDow = clinicDayOfWeek(didacticEntry);
  if (didacticDow !== null) {
    for (let week = 0; week < 4; week++) {
      blocked.add(week * 7 + didacticDow);
    }
  }

  return { blocked, softWarnings };
}

/**
 * Parse day-of-week from strings like "Friday PM", "Wednesday AM",
 * "Tues clinic", etc. Returns 0-6 (Mon-Sun) or null if not parseable.
 */
function clinicDayOfWeek(str = "") {
  const s = str.toLowerCase();
  if (s.includes("mon")) return MON;
  if (s.includes("tue")) return TUE;
  if (s.includes("wed")) return WED;
  if (s.includes("thu")) return THU;
  if (s.includes("fri")) return FRI;
  if (s.includes("sat")) return SAT;
  if (s.includes("sun")) return SUN;
  return null;
}

// ── Night stretch assignment ──────────────────────────────────────────────────

/**
 * Given a roster of residents (with their blocked day sets), assign night
 * stretches following the rules:
 *   - Target 6 consecutive nights; allow 5 if needed.
 *   - Never fewer than 3 consecutive nights.
 *   - Never isolated single nights.
 *   - Post-call day is added immediately after the final night.
 *   - Check prior/next block for transition safety.
 *
 * Returns an array of { residentName, startDay, length, postCallDay }
 * representing the night stretch for each intern, plus a postCallDays Set
 * covering all auto-generated post-call days across the roster.
 */
function assignNightStretches(roster, protectedMaps, block) {
  const assignments = [];
  const postCallDays = new Set();
  const TARGET_LENGTH = 6;
  const MIN_LENGTH = 5;

  // Sort roster so the resident with the safest transition goes first
  const sorted = [...roster].sort((a, b) => {
    const aSafe = transitionSafetyScore(a.name, block);
    const bSafe = transitionSafetyScore(b.name, block);
    return bSafe - aSafe; // higher score = safer = assign nights first
  });

  // Track which days are already claimed by a night stretch
  const claimedNightDays = new Set();

  sorted.forEach((intern, internIndex) => {
    const { blocked } = protectedMaps[intern.name] || { blocked: new Set() };

    // Find the best contiguous window of TARGET_LENGTH nights that doesn't
    // overlap protected time or already-claimed nights
    let bestStart = -1;

    // Prefer windows that start in week 1 for earlier interns, week 2-3 later
    // (stagger so all interns don't have nights at same time)
    const preferredStart = Math.floor((internIndex * BLOCK_DAYS) / Math.max(1, sorted.length));

    // Scan from preferred start, wrapping around
    for (let attempt = 0; attempt < BLOCK_DAYS; attempt++) {
      const start = (preferredStart + attempt) % (BLOCK_DAYS - TARGET_LENGTH + 1);
      if (isValidNightWindow(start, TARGET_LENGTH, blocked, claimedNightDays)) {
        bestStart = start;
        break;
      }
    }

    // If no 6-night window found, try 5-night
    if (bestStart === -1) {
      for (let attempt = 0; attempt < BLOCK_DAYS; attempt++) {
        const start = (preferredStart + attempt) % (BLOCK_DAYS - MIN_LENGTH + 1);
        if (isValidNightWindow(start, MIN_LENGTH, blocked, claimedNightDays)) {
          bestStart = start;
          break;
        }
      }
    }

    if (bestStart === -1) {
      // Could not find a valid night window — flag gap; skip this intern for nights
      assignments.push({ name: intern.name, startDay: -1, length: 0, postCallDay: -1, gap: true });
      return;
    }

    const length = isValidNightWindow(bestStart, TARGET_LENGTH, blocked, claimedNightDays)
      ? TARGET_LENGTH : MIN_LENGTH;
    const postCallDay = bestStart + length;

    // Mark claimed days
    for (let d = bestStart; d < bestStart + length; d++) claimedNightDays.add(d);
    if (postCallDay < BLOCK_DAYS) {
      claimedNightDays.add(postCallDay);
      postCallDays.add(`${intern.name}:${postCallDay}`);
    }

    assignments.push({ name: intern.name, startDay: bestStart, length, postCallDay });
  });

  return { nightAssignments: assignments, postCallDays };
}

function isValidNightWindow(start, length, blocked, claimed) {
  if (start + length > BLOCK_DAYS) return false;
  // Post-call day must also be available (or at end of block)
  const postCall = start + length;
  for (let d = start; d < start + length; d++) {
    if (blocked.has(d) || claimed.has(d)) return false;
  }
  if (postCall < BLOCK_DAYS && (blocked.has(postCall) || claimed.has(postCall))) return false;
  return true;
}

/**
 * Higher = safer transition.
 * Checks if the intern is coming from / going to an elective/non-inpatient block.
 */
function transitionSafetyScore(residentName, block) {
  const index = residentMasterIndex(residentName);
  const prev = masterAssignments[index]?.[block - 2]?.rotation || "";
  const next = masterAssignments[index]?.[block]?.rotation || "";
  const safe = /elective|vacation|research|clinic|advo|board/i;
  return (safe.test(prev) ? 1 : 0) + (safe.test(next) ? 1 : 0);
}

// ── Weekend fairness assignment ───────────────────────────────────────────────

/**
 * Assigns weekend roles (LONG, SHORT, NIGHT) for all 4 weekends.
 * Fairness targets per intern per block:
 *   1 golden weekend (both Sat + Sun off)
 *   1 Saturday only off
 *   1 Sunday only off
 *   1 full working weekend (both days worked)
 * Within a working weekend: alternate LONG and SHORT (never LONG+LONG).
 *
 * Returns weekendMap: Map<residentName, [{week, sat, sun}]>
 *   where sat/sun = "LONG" | "SHORT" | "OFF" | "NIGHT"
 */
function assignWeekendFairness(roster, nightAssignments, protectedMaps) {
  // Build a night-weekend map: which residents are on nights during each weekend
  const onNightsDuring = (residentName, week) => {
    const na = nightAssignments.find((a) => a.name === residentName);
    if (!na || na.startDay === -1) return false;
    const satDay = week * 7 + SAT;
    const sunDay = week * 7 + SUN;
    return (satDay >= na.startDay && satDay < na.startDay + na.length) ||
           (sunDay >= na.startDay && sunDay < na.startDay + na.length);
  };

  // Fairness counters per intern
  const counters = {};
  roster.forEach((intern) => {
    counters[intern.name] = {
      golden: 0, satOff: 0, sunOff: 0, fullWork: 0,
      satsWorked: 0, sunsWorked: 0,
      lastRole: null // track LONG/SHORT alternation
    };
  });

  const weekendMap = {};
  roster.forEach((intern) => { weekendMap[intern.name] = []; });

  // 4 weekends
  for (let week = 0; week < 4; week++) {
    const satDay = week * 7 + SAT;
    const sunDay = week * 7 + SUN;

    // Sort interns: those who most need a golden weekend first
    const sorted = [...roster].sort((a, b) => {
      const aC = counters[a.name];
      const bC = counters[b.name];
      // Prioritise residents without a golden weekend yet
      if (aC.golden !== bC.golden) return aC.golden - bC.golden;
      // Then least weekend burden
      return (aC.satsWorked + aC.sunsWorked) - (bC.satsWorked + bC.sunsWorked);
    });

    const satAssigned = new Map(); // residentName -> role
    const sunAssigned = new Map();

    // Decide who gets golden weekend (off both days) — one per weekend maximum
    const goldenCandidate = sorted.find((intern) => {
      const c = counters[intern.name];
      const { blocked } = protectedMaps[intern.name] || { blocked: new Set() };
      return c.golden === 0 &&
             !onNightsDuring(intern.name, week) &&
             !blocked.has(satDay) &&
             !blocked.has(sunDay);
    });

    if (goldenCandidate) {
      satAssigned.set(goldenCandidate.name, "OFF");
      sunAssigned.set(goldenCandidate.name, "OFF");
      counters[goldenCandidate.name].golden++;
    }

    // Assign SHORT and LONG to the remaining available interns for Saturday
    const satNeedsLong = !Array.from(satAssigned.values()).includes("LONG");
    const satNeedsShort = !Array.from(satAssigned.values()).includes("SHORT");

    sorted.forEach((intern) => {
      if (satAssigned.has(intern.name)) return;
      const { blocked } = protectedMaps[intern.name] || { blocked: new Set() };
      if (onNightsDuring(intern.name, week)) {
        satAssigned.set(intern.name, "NIGHT");
        return;
      }
      if (blocked.has(satDay)) {
        satAssigned.set(intern.name, "PROTECTED");
        return;
      }
      const c = counters[intern.name];
      if (satNeedsLong && c.lastRole !== "LONG") {
        satAssigned.set(intern.name, "LONG");
        counters[intern.name].lastRole = "LONG";
        counters[intern.name].satsWorked++;
      } else if (satNeedsShort) {
        satAssigned.set(intern.name, "SHORT");
        counters[intern.name].lastRole = "SHORT";
        counters[intern.name].satsWorked++;
      } else {
        satAssigned.set(intern.name, "OFF");
        counters[intern.name].satOff++;
      }
    });

    // Same for Sunday — alternate LONG/SHORT from Saturday
    const sunNeedsLong = !Array.from(sunAssigned.values()).includes("LONG");
    const sunNeedsShort = !Array.from(sunAssigned.values()).includes("SHORT");

    sorted.forEach((intern) => {
      if (sunAssigned.has(intern.name)) return;
      const { blocked } = protectedMaps[intern.name] || { blocked: new Set() };
      if (onNightsDuring(intern.name, week)) {
        sunAssigned.set(intern.name, "NIGHT");
        return;
      }
      if (blocked.has(sunDay)) {
        sunAssigned.set(intern.name, "PROTECTED");
        return;
      }
      const satRole = satAssigned.get(intern.name);
      const c = counters[intern.name];
      // Alternate from Saturday role to avoid LONG+LONG or SHORT+SHORT
      if (satRole === "LONG" && sunNeedsShort) {
        sunAssigned.set(intern.name, "SHORT");
        counters[intern.name].sunsWorked++;
        counters[intern.name].fullWork++;
      } else if (satRole === "SHORT" && sunNeedsLong) {
        sunAssigned.set(intern.name, "LONG");
        counters[intern.name].sunsWorked++;
        counters[intern.name].fullWork++;
      } else if (satRole === "OFF") {
        // Give them Sunday off too — or work if coverage needs it
        sunAssigned.set(intern.name, "OFF");
        counters[intern.name].sunOff++;
      } else {
        sunAssigned.set(intern.name, "OFF");
        counters[intern.name].sunOff++;
      }
    });

    // Record in weekendMap
    roster.forEach((intern) => {
      weekendMap[intern.name].push({
        week,
        sat: satAssigned.get(intern.name) || "OFF",
        sun: sunAssigned.get(intern.name) || "OFF"
      });
    });
  }

  return { weekendMap, counters };
}

// ── Shift value helpers ───────────────────────────────────────────────────────

function floorNightShiftValue(isWeekend) {
  return isWeekend ? "1815–0700" : "1700–0700";
}

function weekendRoleValue(role, service) {
  if (role === "LONG") return "0630–1900";
  if (role === "SHORT") return "0630–1600";
  if (role === "NIGHT") return "1815–0700";
  if (role === "PROTECTED") return "PROTECTED";
  return "OFF";
}

// ── Main entry point ──────────────────────────────────────────────────────────

/**
 * Generates a real Purple or Orange schedule draft following the rules in
 * the workflow and coding specification documents.
 *
 * Replaces generateServiceDraft() for Purple and Orange services.
 */
function generateFloorScheduleDraft(service, block) {
  if (!FLOOR_SERVICES.includes(service)) {
    // Fall through to the generic generator for other services
    return generateServiceDraftGeneric(service, block);
  }

  const blockIndex = block - 1;

  // ── Step 1: Pull core PGY-1 interns from master schedule ─────────────────
  const linked = masterRowsForService(service, block);
  const coreInterns = linked.filter(
    (item) => item.resident.pgy === "PGY-1" || item.resident.pgy === "PGY1"
  );

  // ── Step 2: Check team size ───────────────────────────────────────────────
  const MIN_TEAM = 4;
  const TARGET_TEAM = 5;
  const hasShortageAlert = coreInterns.length < MIN_TEAM;

  // If below minimum, supplement from eligible pool (outside rotators)
  const roster = [...coreInterns];
  if (roster.length < MIN_TEAM) {
    const used = new Set(roster.map((item) => item.index));
    for (let offset = 0; roster.length < MIN_TEAM && offset < masterResidents.length; offset++) {
      const index = (block * 7 + configuredServices().indexOf(service) * 11 + offset) % masterResidents.length;
      if (used.has(index)) continue;
      const rotation = masterAssignments[index]?.[blockIndex]?.rotation || "";
      if (/vacation/i.test(rotation)) continue;
      roster.push({
        resident: masterResidents[index],
        index,
        rotation,
        supplemental: true,
        source: "OUTSIDE_ROTATOR"
      });
      used.add(index);
    }
  }

  if (!roster.length) return generateServiceDraftGeneric(service, block);

  // ── Step 3: Build protected-time maps ─────────────────────────────────────
  const protectedMaps = {};
  roster.forEach((item) => {
    protectedMaps[item.resident.name] = buildProtectedSet(item.resident.name, blockIndex);
  });

  // ── Step 4: Assign night stretches FIRST ─────────────────────────────────
  const { nightAssignments, postCallDays } = assignNightStretches(
    roster.map((item) => item.resident),
    protectedMaps,
    block
  );

  // Merge post-call days into each resident's protected set
  postCallDays.forEach((key) => {
    const [name, dayStr] = key.split(":");
    protectedMaps[name]?.blocked.add(Number(dayStr));
  });

  // ── Step 5: Assign weekend fairness ──────────────────────────────────────
  const { weekendMap, counters } = assignWeekendFairness(
    roster.map((item) => item.resident),
    nightAssignments,
    protectedMaps
  );

  // ── Step 6: Build shift arrays for each intern ────────────────────────────
  const draft = roster.map((item, rowIndex) => {
    const intern = item.resident;
    const nightAssign = nightAssignments.find((a) => a.name === intern.name);
    const internWeekends = weekendMap[intern.name] || [];
    const { blocked, softWarnings } = protectedMaps[intern.name] || { blocked: new Set(), softWarnings: new Set() };
    const source = item.supplemental ? "OUTSIDE_ROTATOR" : "CORE";

    const shifts = Array.from({ length: BLOCK_DAYS }, (_, dayIndex) => {
      const week = Math.floor(dayIndex / 7);
      const dow = dayIndex % 7; // 0=Mon … 6=Sun
      const isWeekend = dow >= SAT;

      // Post-call day
      if (nightAssign && dayIndex === nightAssign.postCallDay) {
        return makeFloorEntry("POST CALL", dayIndex, source, true, false);
      }

      // Night stretch
      if (nightAssign && nightAssign.startDay >= 0 &&
          dayIndex >= nightAssign.startDay &&
          dayIndex < nightAssign.startDay + nightAssign.length) {
        return makeFloorEntry(floorNightShiftValue(isWeekend), dayIndex, source, false, false, "NIGHT");
      }

      // Weekend days
      if (isWeekend) {
        const wknd = internWeekends[week];
        if (!wknd) return makeFloorEntry("OFF", dayIndex, source, false, false);
        const role = dow === SAT ? wknd.sat : wknd.sun;
        const value = weekendRoleValue(role, service);
        const isProtected = role === "PROTECTED";
        return makeFloorEntry(value, dayIndex, source, isProtected, false, role);
      }

      // Weekday protected time
      if (blocked.has(dayIndex)) {
        // Determine what kind of protected event this is
        const profile = residentProfiles[intern.name] || {};
        const clinicEntry = Array.isArray(profile.clinic)
          ? profile.clinic[blockIndex]
          : (profile.clinic || "");
        const clinicDow = clinicDayOfWeek(clinicEntry);
        if (clinicDow !== null && dow === clinicDow) {
          return makeFloorEntry("CLINIC", dayIndex, source, true, false);
        }
        const didacticEntry = profile.didactic || "Friday";
        const didacticDow = clinicDayOfWeek(didacticEntry);
        if (didacticDow !== null && dow === didacticDow) {
          return makeFloorEntry("DIDACTIC", dayIndex, source, true, false);
        }
        return makeFloorEntry("PROTECTED", dayIndex, source, true, false);
      }

      // Soft warning — pending request
      if (softWarnings.has(dayIndex)) {
        return makeFloorEntry("0630–1700", dayIndex, source, false, false, "", true);
      }

      // Standard weekday day shift
      return makeFloorEntry("0630–1700", dayIndex, source, false, false);
    });

    // Build fairness summary for display
    const fc = counters[intern.name] || {};
    const nightCount = nightAssign?.length || 0;
    const fairnessSummary = [
      `${nightCount} night${nightCount !== 1 ? "s" : ""}`,
      `${fc.golden || 0} golden wknd`,
      `${fc.satsWorked || 0} Sat worked`,
      `${fc.sunsWorked || 0} Sun worked`
    ].join(" · ");

    return {
      id: `${block}-${service}-${intern.id}`,
      name: intern.name,
      role: `${intern.pgy.replace("PGY-", "P")} · ${item.supplemental ? "Outside rotator" : item.rotation || service}`,
      source,
      sourceLabel: source === "OUTSIDE_ROTATOR" ? "Outside rotator" : "Master schedule",
      masterLinked: !item.supplemental,
      pgy: intern.pgy,
      nightStretch: nightAssign && nightAssign.startDay >= 0
        ? { start: nightAssign.startDay, end: nightAssign.startDay + nightAssign.length - 1, postCall: nightAssign.postCallDay }
        : null,
      fairnessSummary,
      hasShortageAlert: hasShortageAlert && rowIndex === 0,
      nightGap: nightAssign?.gap || false,
      shifts
    };
  });

  return draft;
}

/**
 * Creates a shift entry with all required metadata fields.
 * pendingRequest = true adds a soft yellow warning badge.
 */
function makeFloorEntry(value, dayIndex, source = "CORE", isProtected = false, overridden = false, role = "", pendingRequest = false) {
  const isWeekend = dayIndex % 7 >= SAT;
  const isNight = /^\d{4}–07/.test(value) || value === "POST CALL";
  const isOff = value === "OFF" || value === "POST CALL";

  let sourceDisplay;
  if (isProtected) {
    sourceDisplay = value === "CLINIC" ? "Resident clinic profile"
      : value === "DIDACTIC" ? "Institution didactics"
      : value === "PROTECTED" ? "Approved request / protected event"
      : "Protected time";
  } else if (pendingRequest) {
    sourceDisplay = "⚠ Pending request — chief review needed";
  } else if (isNight) {
    sourceDisplay = "Night stretch — generated";
  } else if (isOff) {
    sourceDisplay = role === "OFF" && isWeekend ? "Golden or scheduled weekend off" : "Generated";
  } else {
    sourceDisplay = source === "OUTSIDE_ROTATOR"
      ? "Outside rotator — master schedule supplement"
      : "Master schedule · " + (isWeekend ? "weekend coverage" : "weekday coverage");
  }

  return {
    value,
    lane: isNight ? "Night" : isWeekend ? "Weekend" : "Day",
    source: sourceDisplay,
    sourceCode: source,
    protected: isProtected,
    overridden,
    role: role || (isNight ? "NIGHT" : isOff ? "OFF" : isWeekend ? "WEEKEND" : "DAY"),
    pendingWarning: pendingRequest,
    note: pendingRequest
      ? "Pending request on this date — approve or decline before publishing"
      : isWeekend && !isNight && !isOff
      ? `Weekend ${value === "0630–1900" ? "long call" : "short call"}`
      : isNight
      ? "Night stretch — post-call day follows"
      : ""
  };
}

// ── Validation engine for Purple / Orange ─────────────────────────────────────

/**
 * Runs all hard and soft validations on a Purple/Orange draft.
 * Returns { hardAlerts, softWarnings, coverageGaps, fairnessFlags, canPublish }
 */
function validateFloorDraft(draft, service, block) {
  const hardAlerts = [];
  const softWarnings = [];
  const coverageGaps = [];
  const fairnessFlags = [];

  // H1: Team size
  const coreCount = draft.filter((r) => r.sourceCode === "CORE").length;
  if (coreCount < 4) {
    hardAlerts.push({
      code: "TEAM_TOO_SMALL",
      message: `${service} has only ${coreCount} core interns. Minimum is 4. Add outside rotators before publishing.`,
      severity: "hard"
    });
  }

  draft.forEach((resident) => {
    // H2: Post-call violation
    resident.shifts.forEach((shift, dayIndex) => {
      if (shift.value === "POST CALL") {
        const nextDay = resident.shifts[dayIndex + 1];
        if (nextDay && nextDay.value !== "OFF" && nextDay.value !== "POST CALL" && !nextDay.protected) {
          hardAlerts.push({
            code: "POST_CALL_VIOLATION",
            message: `${resident.name}: assignment on day ${dayIndex + 2} immediately after post-call day.`,
            severity: "hard",
            residentName: resident.name,
            dayIndex: dayIndex + 1
          });
        }
      }
    });

    // H3: Night stretch not consecutive (gap detection)
    if (resident.nightGap) {
      hardAlerts.push({
        code: "NIGHT_GAP",
        message: `${resident.name}: no valid night stretch window found. Night coverage gap exists.`,
        severity: "hard",
        residentName: resident.name
      });
    }

    // H4: Protected time conflict
    resident.shifts.forEach((shift, dayIndex) => {
      if (shift.protected && shift.overridden) {
        hardAlerts.push({
          code: "PROTECTED_TIME_OVERRIDE",
          message: `${resident.name}: assignment on a protected date (day ${dayIndex + 1}).`,
          severity: "hard",
          residentName: resident.name,
          dayIndex
        });
      }
    });

    // S1: Night stretch length warnings
    if (resident.nightStretch) {
      const len = resident.nightStretch.end - resident.nightStretch.start + 1;
      if (len < 3) {
        softWarnings.push({
          code: "NIGHT_TOO_SHORT",
          message: `${resident.name}: only ${len} consecutive nights (minimum 3).`,
          residentName: resident.name
        });
      }
      if (len > 6) {
        softWarnings.push({
          code: "NIGHT_TOO_LONG",
          message: `${resident.name}: ${len} consecutive nights exceeds target of 6.`,
          residentName: resident.name
        });
      }
    }

    // S2: Pending request warning
    if (resident.shifts.some((s) => s.pendingWarning)) {
      softWarnings.push({
        code: "PENDING_REQUEST",
        message: `${resident.name}: has a pending request on a scheduled date. Approve or decline before publishing.`,
        residentName: resident.name
      });
    }
  });

  // H5: Coverage gaps — check each weekday has at least MIN_DAILY_COVERAGE interns
  const MIN_DAILY_COVERAGE = 2;
  for (let dayIndex = 0; dayIndex < BLOCK_DAYS; dayIndex++) {
    const dow = dayIndex % 7;
    if (dow >= SAT) continue; // weekends handled separately
    const working = draft.filter((r) => {
      const s = r.shifts[dayIndex];
      return s && !s.protected && s.value !== "OFF" && s.value !== "POST CALL" && !s.value.includes("NIGHT") && !/^\d{4}–07/.test(s.value);
    });
    if (working.length < MIN_DAILY_COVERAGE) {
      coverageGaps.push({
        code: "WEEKDAY_COVERAGE_GAP",
        message: `Day ${dayIndex + 1} (Week ${Math.floor(dayIndex / 7) + 1}, ${["Mon","Tue","Wed","Thu","Fri"][dow]}): only ${working.length} intern(s) available. Minimum is ${MIN_DAILY_COVERAGE}.`,
        dayIndex,
        severity: working.length === 0 ? "hard" : "soft"
      });
    }
  }

  // Weekend gaps — each weekend needs LONG + SHORT
  for (let week = 0; week < 4; week++) {
    [SAT, SUN].forEach((dow) => {
      const dayIndex = week * 7 + dow;
      const longs = draft.filter((r) => r.shifts[dayIndex]?.role === "LONG");
      const shorts = draft.filter((r) => r.shifts[dayIndex]?.role === "SHORT");
      if (longs.length === 0) {
        hardAlerts.push({
          code: "WEEKEND_LONG_MISSING",
          message: `Week ${week + 1} ${dow === SAT ? "Saturday" : "Sunday"}: no LONG intern assigned.`,
          severity: "hard",
          dayIndex
        });
      }
      if (shorts.length === 0) {
        hardAlerts.push({
          code: "WEEKEND_SHORT_MISSING",
          message: `Week ${week + 1} ${dow === SAT ? "Saturday" : "Sunday"}: no SHORT intern assigned.`,
          severity: "hard",
          dayIndex
        });
      }
    });
  }

  // S3: Fairness — golden weekend
  draft.forEach((r) => {
    const goldenWeekends = [];
    for (let week = 0; week < 4; week++) {
      const sat = r.shifts[week * 7 + SAT];
      const sun = r.shifts[week * 7 + SUN];
      if (sat?.value === "OFF" && sun?.value === "OFF") goldenWeekends.push(week + 1);
    }
    if (goldenWeekends.length === 0) {
      fairnessFlags.push({
        code: "NO_GOLDEN_WEEKEND",
        message: `${r.name}: no golden weekend in this block.`,
        residentName: r.name,
        severity: "soft"
      });
    }
  });

  const canPublish = hardAlerts.length === 0 &&
    coverageGaps.filter((g) => g.severity === "hard").length === 0;

  return { hardAlerts, softWarnings, coverageGaps, fairnessFlags, canPublish };
}

// ── Hook into the existing app ────────────────────────────────────────────────
// Rename the existing generateServiceDraft to generateServiceDraftGeneric,
// then replace calls to generateServiceDraft with generateServiceDraft (below).

// Store a reference to the old generic generator BEFORE overwriting
const generateServiceDraftGeneric = generateServiceDraft;

/**
 * New generateServiceDraft — routes Purple/Orange to the real engine,
 * all other services to the existing generic engine.
 */
function generateServiceDraft(service, block) {
  if (FLOOR_SERVICES.includes(service)) {
    return generateFloorScheduleDraft(service, block);
  }
  return generateServiceDraftGeneric(service, block);
}

// ── Generic fallback (original generateServiceDraft renamed below) ──────────
function loadActiveScheduleDraft() {
  const key = scheduleDraftKey();
  if (!scheduleDraftStore[key]) scheduleDraftStore[key] = generateServiceDraft(activeScheduleService, currentBlock);
  scheduleDraft = scheduleDraftStore[key];
  selectedScheduleCell = null;
  addResidentPanelOpen = false;
  scheduleUndoStack = [];
  scheduleRedoStack = [];
}

function syncActiveScheduleDraft() {
  scheduleDraftStore[scheduleDraftKey()] = scheduleDraft;
  persistAppState();
}

scheduleDraft = scheduleDraftStore[scheduleDraftKey()] || generateServiceDraft(activeScheduleService, currentBlock);
scheduleDraftStore[scheduleDraftKey()] = scheduleDraft;

function builderView() {
  const builderServices = configuredServices();
  if (!builderServices.includes(activeBuilderService)) activeBuilderService = builderServices[0] || "";
  const builderTeam = programTeams.find((team) => team.name === activeBuilderService);
  const builderConfig = ensureServiceBuilderConfig(activeBuilderService);
  const builderLanes = ensureServiceCoverageLanes(activeBuilderService);
  const distribution = serviceDistributionSettings[activeBuilderService];
  const steps = [
    ["setup", "1", "Block setup", "Dates, holidays, and services", true],
    ["people", "2", "People", "Residents and outside rotators", true],
    ["protected", "3", "Protected time", "Clinics, didactics, exams, leave", true],
    ["requests", "4", "Requests", "Days off and golden weekends", true],
    ["rules", "5", "Rules", "Coverage, rest, and fairness targets", serviceRosterTarget(activeBuilderService) > 0],
    ["review", "6", "Review & generate", "Validate inputs and create schedules", false]
  ];
  return `<section class="page builder-page">
      <div class="page-head">
      <div><p class="eyebrow">Block preparation</p><h1>Build Block ${currentBlock}</h1><p>Complete the inputs below. Clarity checks every rule before scheduling.</p></div>
      <div class="page-head-actions"><span class="save-state"><span class="icon" data-icon="check"></span> All changes saved</span></div>
      </div>
      ${blockNavigator("builder")}
      <section class="panel annual-structure-panel">
        <div class="panel-header"><div><h2>Annual scheduling structure</h2><p>Set this once for the program. Every master schedule, resident deadline, request form, and monthly schedule follows this structure.</p></div><span class="master-source"><span class="icon" data-icon="grid"></span> Program-wide</span></div>
        <div class="annual-structure-grid">
          <label>Academic year<input class="program-year-input" value="${programSettings.academicYear}"></label>
          <label>Number of blocks<select class="program-block-count"><option value="12" ${programSettings.blockCount===12?"selected":""}>12 blocks</option><option value="13" ${programSettings.blockCount===13?"selected":""}>13 blocks</option><option value="24" ${programSettings.blockCount===24?"selected":""}>24 half-month blocks</option><option value="26" ${programSettings.blockCount===26?"selected":""}>26 two-week blocks</option></select></label>
          <label>Block model<select class="program-block-model"><option ${programSettings.blockModel==="Four-week blocks"?"selected":""}>Four-week blocks</option><option ${programSettings.blockModel==="Two-week blocks"?"selected":""}>Two-week blocks</option><option>Custom dates</option></select></label>
          <label>Request deadline<input class="program-lead-days" type="number" min="1" value="${programSettings.requestLeadDays}"><small>days before block start</small></label>
          <button class="primary-button compact save-program-structure">Apply program structure</button>
        </div>
      </section>
      <div class="builder-layout">
      <section class="panel builder-steps">
        <div class="builder-progress"><span style="width:67%"></span></div>
        ${steps.map(([id, number, title, copy, complete]) => `
          <button class="builder-step ${id === activeBuilderStep ? "active" : ""} ${complete ? "complete" : ""}" data-builder-step="${id}">
            <span class="step-number">${complete ? '<span class="icon" data-icon="check"></span>' : number}</span>
            <span><strong>${title}</strong><small>${copy}</small></span>
            <span class="icon step-chevron" data-icon="chevron"></span>
          </button>`).join("")}
      </section>
      <div class="builder-main">
        ${builderGuidedStepPanel(activeBuilderStep, activeBuilderService)}
        ${activeBuilderStep === "rules" ? `
        <section class="panel form-panel service-builder-panel">
          <div class="form-panel-head"><div><span class="section-number">5</span><div><h2>Services, roles, and working hours</h2><p>Configure every schedule separately. These settings are reused for every block and can be edited later.</p></div></div><button class="primary-button compact add-builder-service"><span class="icon" data-icon="plus"></span> Add service</button></div>
          <div class="builder-service-tabs">${builderServices.map(service=>`<button class="builder-service-tab ${service===activeBuilderService?"active":""}" data-builder-service="${escapeHtml(service)}">${escapeHtml(service)}<small>${serviceRosterTarget(service)} required</small></button>`).join("")}</div>
          <div class="service-identity-grid">
            <label>Service name<input class="builder-service-name" value="${escapeHtml(activeBuilderService)}"></label>
            <label>Master-schedule rotation<select class="builder-master-link">${masterRotationOptions.map(option=>`<option ${serviceMasterLinks[activeBuilderService]?.includes(option.name)?"selected":""}>${option.name}</option>`).join("")}</select></label>
            <label>Service category<select class="builder-service-category">${["Inpatient","Critical care","Call pool","Night coverage","Consult","Custom"].map(category=>`<option ${builderTeam?.category===category?"selected":""}>${category}</option>`).join("")}</select></label>
            <div class="service-identity-actions"><button class="secondary-button compact save-service-identity">Save service details</button><button class="danger-link compact open-delete-service"><span class="icon" data-icon="close"></span> Delete service</button></div>
          </div>
          <div class="rule-section coverage-lane-section">
            <div class="rule-heading"><h3>Coverage locations and teams</h3><span>Divide residents by unit, floor, team, or responsibility</span></div>
            <div class="coverage-lane-list">${builderLanes.map((lane,index)=>`<div class="coverage-lane-row" data-lane-index="${index}">
              <input class="builder-lane-color" type="color" value="${lane.color}">
              <input class="builder-lane-name" value="${escapeHtml(lane.name)}" aria-label="Coverage lane name">
              <label>Minimum<input class="builder-lane-minimum" type="number" min="0" value="${lane.minimum}"></label>
              <button class="icon-button delete-builder-lane" aria-label="Delete ${escapeHtml(lane.name)}"><span class="icon" data-icon="close"></span></button>
            </div>`).join("")}</div>
            <button class="secondary-button compact add-builder-lane"><span class="icon" data-icon="plus"></span> Add unit or team</button>
            <div class="distribution-options">
              <label>Rotate assignments<select class="builder-lane-cadence">${["Daily","Weekly","Every 2 weeks","Keep fixed"].map(value=>`<option ${distribution.cadence===value?"selected":""}>${value}</option>`).join("")}</select></label>
              <label>Night handoff<select class="builder-night-handoff">${["Staggered stretches","Weekly switch","Fixed night resident","Chief assigns manually"].map(value=>`<option ${distribution.nightHandoff===value?"selected":""}>${value}</option>`).join("")}</select></label>
              <label>Fairness target<select class="builder-distribution-balance">${["Equal weekends and weekdays","Equal total hours","Equal calls and nights","Coverage first"].map(value=>`<option ${distribution.balance===value?"selected":""}>${value}</option>`).join("")}</select></label>
            </div>
          </div>
          <div class="rule-section">
            <div class="rule-heading"><h3>Required coverage roles</h3><span>${builderConfig.roles.reduce((sum,role)=>sum+Number(role.count),0)} residents required each day</span></div>
            <div class="builder-role-list">${builderConfig.roles.map((role,index)=>`<div class="builder-role-row" data-builder-role="${index}"><input class="builder-role-name" value="${escapeHtml(role.name)}"><select class="builder-role-pgy">${["PGY-1","PGY-2","PGY-3","PGY-2/3","Any eligible","Outside rotator"].map(pgy=>`<option ${role.pgy===pgy?"selected":""}>${pgy}</option>`).join("")}</select><label>Required<input class="builder-role-count" type="number" min="0" value="${role.count}"></label><button class="icon-button delete-builder-role"><span class="icon" data-icon="close"></span></button></div>`).join("")}</div>
            <button class="secondary-button compact add-builder-role"><span class="icon" data-icon="plus"></span> Add coverage role</button>
          </div>
          <div class="rule-section">
            <div class="rule-heading"><h3>Shift types and service hours</h3><span>Only enabled shifts appear when chiefs assign this service</span></div>
            <div class="service-shift-library">${shiftTemplates.filter(shift=>!["CL-AM","CL-PM","PC"].includes(shift.code)).map((shift)=>{const serviceShift=getServiceShiftTemplate(activeBuilderService,shift.code);return `<article class="service-shift-card ${builderConfig.shifts.includes(shift.code)?"enabled":""}" data-shift-code="${shift.code}">
              <input class="builder-shift-enabled" type="checkbox" aria-label="Enable ${escapeHtml(serviceShift.name)}" ${builderConfig.shifts.includes(shift.code)?"checked":""}>
              <input class="builder-shift-color" type="color" value="${serviceShift.colorHex || defaultShiftHex(serviceShift)}" aria-label="${escapeHtml(serviceShift.name)} color">
              <label>Name<input class="builder-shift-name" value="${escapeHtml(serviceShift.name)}"></label>
              <label>Counts as<select class="builder-shift-type">${["Day","Night","Call","Task","Protected","Recovery","Off"].map(type=>`<option ${serviceShift.type===type?"selected":""}>${type}</option>`).join("")}</select></label>
              <label>Start<input class="builder-shift-start" type="time" value="${serviceShift.start || ""}"></label>
              <label>End<input class="builder-shift-end" type="time" value="${serviceShift.end || ""}"></label>
              <label>Card style<select class="builder-shift-style">${["soft","solid","outline"].map(style=>`<option value="${style}" ${serviceShift.style===style?"selected":""}>${style[0].toUpperCase()+style.slice(1)}</option>`).join("")}</select></label>
              <label>Show<select class="builder-shift-display"><option value="time" ${serviceShift.display!=="label"?"selected":""}>Hours</option><option value="label" ${serviceShift.display==="label"?"selected":""}>Task name</option></select></label>
            </article>`}).join("")}</div>
            <button class="secondary-button compact add-service-shift"><span class="icon" data-icon="plus"></span> Add custom assignment type</button>
          </div>
          <div class="rule-section">
            <div class="rule-heading"><h3>Service-specific fairness and safety</h3><span>Applied only to ${escapeHtml(activeBuilderService)}</span></div>
            <div class="service-rule-options"><label><span>Require golden weekend</span><input type="checkbox" checked></label><label><span>Maximum consecutive nights</span><input class="builder-max-nights" type="number" min="0" value="${serviceScheduleSettings[activeBuilderService]?.nights ? 5 : 0}"></label><label><span>Post-call recovery</span><input type="checkbox" ${serviceScheduleSettings[activeBuilderService]?.nights?"checked":""}></label></div>
          </div>
          <div class="form-footer"><button class="secondary-button" data-view-target="rules">Open advanced institution rules</button><button class="primary-button save-service-builder">Save ${escapeHtml(activeBuilderService)} and rebuild draft <span class="icon" data-icon="chevron"></span></button></div>
        </section>
        ` : ""}
      </div>
      <aside class="builder-aside">
        <section class="panel readiness-panel">
          <div class="panel-header"><div><h2>Input readiness</h2><p>Block ${currentBlock} · ${academicBlocks[currentBlock - 1][1]}</p></div><span class="readiness-ring">92%</span></div>
          <div class="checklist">
            ${checklistItem("Master schedule linked", `${masterRowsForService(activeBuilderService,currentBlock).length} ${activeBuilderService} residents`, true)}
            ${checklistItem("Resident requests", "47 of 47 submitted", true)}
            ${checklistItem("Institutional patterns", "4 institutions", true)}
            ${checklistItem("Outside rotators", "6 profiles complete", true)}
            ${checklistItem("Service configuration", `${builderConfig.roles.length} roles · ${builderConfig.shifts.length} shift types`, true)}
          </div>
        </section>
        <section class="tip-card"><span class="icon" data-icon="spark"></span><div><strong>Clarity recommendation</strong><p>Keep strict coverage rules locked. Use fairness targets as optimization goals so a workable schedule can always be produced.</p></div></section>
      </aside>
    </div>
  </section>`;
}

function builderResidentsForService(service = activeBuilderService, block = currentBlock) {
  const linked = masterRowsForService(service, block).map((item) => ({
    name: item.resident.name,
    displayName: profileDisplayName(item.resident.name),
    pgy: item.resident.pgy,
    institution: residentProfiles[item.resident.name]?.institution || "Corewell Health",
    rotation: item.rotation,
    source: "Master schedule"
  }));
  const target = serviceRosterTarget(service);
  const supplementalNeeded = Math.max(0, target - linked.length);
  const supplements = callPoolCandidates.slice(0, supplementalNeeded).map((candidate) => ({
    name: candidate.name,
    displayName: candidate.name,
    pgy: candidate.role.split(" · ")[0].replace("P", "PGY-"),
    institution: candidate.institution === "Corewell" ? "Corewell Health" : candidate.institution,
    rotation: "Call pool / outside rotator",
    source: "Eligible supplement"
  }));
  return [...linked, ...supplements];
}

function builderProtectedItems(service = activeBuilderService, block = currentBlock) {
  return builderResidentsForService(service, block).flatMap((resident) => {
    const profile = residentProfiles[resident.name];
    const institution = institutionProfiles[resident.institution] || institutionProfiles["Corewell Health"];
    const record = ensureResidentActivityRecord(resident.name);
    const policy = record.didacticPolicies[block - 1] || defaultDidacticPolicy(resident.name, block - 1);
    const clinicPattern = profile?.clinic?.[block - 1] || institution.clinic;
    const items = [];
    if (clinicPattern && clinicPattern !== "None") items.push({ resident, type: "Clinic", time: clinicPattern, source: "Resident profile", action: "Protected" });
    items.push({ resident, type: "Didactics", time: policy.day || institution.didactic, source: resident.institution, action: policy.required ? "Required" : "Optional" });
    record.leave.filter((leave)=>leave.block===block).forEach((leave)=>items.push({ resident, type: leave.type, time: `${leave.start}${leave.end !== leave.start ? `–${leave.end}` : ""}`, source: "Resident request", action: leave.status }));
    return items;
  });
}

function builderRequestItems(service = activeBuilderService, block = currentBlock) {
  const serviceNames = new Set(builderResidentsForService(service, block).map((resident)=>resident.name));
  const requestRows = residentRequests
    .filter((request)=>request.block===block && serviceNames.has(request.resident))
    .map((request)=>({ resident: profileDisplayName(request.resident), type: request.type, detail: request.detail, status: request.status, note: request.conflict || request.priority }));
  const switchRows = callSwitchOffers
    .filter((offer)=>offer.status !== "declined")
    .map((offer)=>({ resident: offer.offeredBy, type: "Call switch", detail: `${offer.callLabel} · ${formatCallDate(offer.callDate)}`, status: offer.status, note: offer.volunteers[0]?.resident ? `Volunteer: ${offer.volunteers[0].resident}` : "No volunteer yet" }));
  return [...requestRows, ...switchRows];
}

function builderGuidedStepPanel(step, service) {
  const block = currentBlock;
  const blockLabel = academicBlocks[block - 1]?.[1] || "selected dates";
  const serviceTeam = programTeams.find((team)=>team.name===service);
  const residents = builderResidentsForService(service, block);
  const linkedCount = residents.filter((resident)=>resident.source==="Master schedule").length;
  const outsideCount = residents.filter((resident)=>resident.institution !== "Corewell Health").length;
  const protectedItems = builderProtectedItems(service, block);
  const requestItems = builderRequestItems(service, block);
  if (step === "rules") return "";
  if (step === "setup") {
    return `<section class="panel builder-guidance-panel">
      <div class="builder-step-head"><span class="section-number">1</span><div><h2>Block setup for ${escapeHtml(service)}</h2><p>Select the block and service first. The next steps will pull the correct residents, protected time, and requests for this exact monthly schedule.</p></div></div>
      <div class="builder-setup-grid">
        <label>Active block<select class="builder-block-select">${academicBlocks.map(([number,dates])=>`<option value="${number}" ${Number(number)===block?"selected":""}>Block ${number} · ${dates}</option>`).join("")}</select></label>
        <label>Service to build<select class="builder-service-select">${configuredServices().map((item)=>`<option ${item===service?"selected":""}>${escapeHtml(item)}</option>`).join("")}</select></label>
        <span><small>Master source</small><strong>${(serviceMasterLinks[service] || [serviceTeam?.rotation || service]).join(", ")}</strong><span>${escapeHtml(serviceMasterSplitLabel(service))}</span></span>
        <span><small>Minimum daily coverage</small><strong>${serviceRosterTarget(service)} residents</strong></span>
      </div>
      <div class="builder-flow-note"><span class="icon" data-icon="grid"></span><p>Changing the service changes every downstream panel. Example: choosing PICU pulls Block ${block} PICU residents, PICU units/roles, PICU protected time, and PICU-specific requests.</p></div>
      <div class="form-footer"><button class="secondary-button" data-builder-step-target="people">Review people</button><button class="primary-button" data-builder-step-target="rules">Edit ${escapeHtml(service)} rules <span class="icon" data-icon="chevron"></span></button></div>
    </section>`;
  }
  if (step === "people") {
    const byInstitution = Object.entries(residents.reduce((acc, resident)=>{ acc[resident.institution] = (acc[resident.institution] || 0) + 1; return acc; }, {}));
    return `<section class="panel builder-guidance-panel">
      <div class="builder-step-head"><span class="section-number">2</span><div><h2>People pulled from Block ${block} ${escapeHtml(service)}</h2><p>${linkedCount} residents came from the master schedule using: ${escapeHtml(serviceMasterSplitLabel(service))}. ${outsideCount} outside rotator${outsideCount===1?"":"s"} are flagged so chiefs can avoid overcalling one institution or one block.</p></div></div>
      <div class="builder-kpi-grid"><article><small>Master-linked</small><strong>${linkedCount}</strong><span>assigned to ${escapeHtml(service)}</span></article><article><small>Supplements needed</small><strong>${Math.max(0, serviceRosterTarget(service)-linkedCount)}</strong><span>call pool / outside rotators</span></article><article><small>Outside rotators</small><strong>${outsideCount}</strong><span>tracked by institution</span></article></div>
      <div class="builder-people-list">${residents.map((resident,index)=>`<article><span class="avatar" style="background:${avatarColor(index)}">${initials(resident.displayName)}</span><span><strong>${escapeHtml(resident.displayName)}</strong><small>${resident.pgy} · ${escapeHtml(resident.institution)}</small><em>${escapeHtml(resident.rotation)} · ${resident.source}</em></span><span class="status-pill ${resident.source==="Master schedule"?"ready":"review"}">${resident.source==="Master schedule"?"Linked":"Supplement"}</span></article>`).join("")}</div>
      <div class="builder-institution-load">${byInstitution.map(([institution,count])=>`<div><strong>${escapeHtml(institution)}</strong><span>${count} resident${count===1?"":"s"} in this block-service</span></div>`).join("")}</div>
      <div class="form-footer"><button class="secondary-button builder-add-outside-rotator"><span class="icon" data-icon="plus"></span> Add outside rotator</button><button class="primary-button" data-builder-step-target="protected">Review protected time <span class="icon" data-icon="chevron"></span></button></div>
    </section>`;
  }
  if (step === "protected") {
    return `<section class="panel builder-guidance-panel">
      <div class="builder-step-head"><span class="section-number">3</span><div><h2>Protected time pulled from profiles</h2><p>Clinics, didactics, exams, PTO, conference days, and institution rules are shown here before the generator creates assignments.</p></div></div>
      <div class="builder-protected-table">
        <div class="builder-table-head"><span>Resident</span><span>Type</span><span>Time / date</span><span>Source</span><span>Scheduling action</span></div>
        ${protectedItems.map((item)=>`<div><span><strong>${escapeHtml(item.resident.displayName)}</strong><small>${escapeHtml(item.resident.institution)}</small></span><span>${escapeHtml(item.type)}</span><span>${escapeHtml(item.time)}</span><span>${escapeHtml(item.source)}</span><span class="status-pill ${String(item.action).toLowerCase().includes("pending")?"review":"ready"}">${escapeHtml(item.action)}</span></div>`).join("") || '<div class="empty-review">No protected time found for this service.</div>'}
      </div>
      <div class="form-footer"><button class="secondary-button" data-view-target="rules">Open institution rules</button><button class="primary-button" data-builder-step-target="requests">Review resident requests <span class="icon" data-icon="chevron"></span></button></div>
    </section>`;
  }
  if (step === "requests") {
    return `<section class="panel builder-guidance-panel">
      <div class="builder-step-head"><span class="section-number">4</span><div><h2>Requests affecting ${escapeHtml(service)}</h2><p>This is a reminder panel. Chiefs still approve or decline requests in resident profiles, but the builder shows what could affect the draft before generation.</p></div></div>
      <div class="builder-request-list">${requestItems.map((item)=>`<article><span class="request-kind">${escapeHtml(item.type)}</span><span><strong>${escapeHtml(item.resident)}</strong><small>${escapeHtml(item.detail)}</small></span><span class="request-conflict ${item.status==="pending"||item.status==="chief-review"?"warn":""}">${escapeHtml(item.note || "No detected conflict")}</span><span class="status-pill ${item.status==="approved"?"ready":item.status==="declined"?"missing":"review"}">${escapeHtml(item.status)}</span></article>`).join("") || '<div class="empty-review">No resident requests are linked to this block-service.</div>'}</div>
      <div class="form-footer"><button class="secondary-button" data-view-target="residents">Open requests and profiles</button><button class="primary-button" data-builder-step-target="rules">Set service rules <span class="icon" data-icon="chevron"></span></button></div>
    </section>`;
  }
  return `<section class="panel builder-guidance-panel review-generate-panel">
    <div class="builder-step-head"><span class="section-number">6</span><div><h2>Review and generate ${escapeHtml(service)}</h2><p>Clarity will use the master-linked roster, protected time, approved requests, service rules, and fairness targets to create an editable draft.</p></div></div>
    <div class="builder-kpi-grid"><article><small>Residents</small><strong>${residents.length}</strong><span>${linkedCount} from master schedule</span></article><article><small>Protected entries</small><strong>${protectedItems.length}</strong><span>clinic, didactics, leave</span></article><article><small>Requests</small><strong>${requestItems.length}</strong><span>${requestItems.filter((item)=>item.status==="pending"||item.status==="chief-review").length} pending</span></article></div>
    <div class="builder-flow-note"><span class="icon" data-icon="spark"></span><p>After generation, Block ${block} ${escapeHtml(service)} will appear in the Schedules tab as a draft. Chiefs can drag, edit times, add residents, and save it as ready.</p></div>
    <div class="form-footer"><button class="secondary-button" data-builder-step-target="rules">Back to rules</button><button class="primary-button generate-service-draft"><span class="icon" data-icon="wand"></span> Generate ${escapeHtml(service)} draft</button></div>
  </section>`;
}

function numberField(label, value) {
  return `<label class="field"><span>${label}</span><div class="number-input"><button type="button">−</button><input type="number" value="${value}" aria-label="${label}"><button type="button">+</button></div></label>`;
}
function checklistItem(title, detail, complete) {
  return `<div class="checklist-item"><span class="check-circle ${complete ? "complete" : "pending"}"><span class="icon" data-icon="${complete ? "check" : "alert"}"></span></span><span><strong>${title}</strong><small>${detail}</small></span></div>`;
}

function scheduleView() {
  const services = configuredServices();
  if (!services.includes(activeScheduleService)) {
    activeScheduleService = services[0] || "";
    loadActiveScheduleDraft();
  }
  const weekStart = selectedScheduleWeek * 7;
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = weekStart + index + 1;
    return [["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][index], `Jun ${date}`, date];
  });
  const templateRange = (code, fallback) => {
    const template = getServiceShiftTemplate(activeScheduleService, code);
    return template?.start && template?.end ? `${template.start}–${template.end}` : fallback;
  };
  const scheduleRows = scheduleDraft.map((resident) => ({
    ...resident,
    shifts: resident.shifts.slice(weekStart, weekStart + 7).map((entry) => ({ ...entry, value: ({
      "1700–0700": templateRange("NIGHT", entry.value),
      "1815–0700": templateRange("WKND-N", entry.value),
      "0630–1700": templateRange("DAY", entry.value),
      "0630–1900": templateRange("LONG", entry.value),
      "0630–1600": templateRange("SHORT", entry.value)
    }[entry.value] || entry.value) }))
  }));
  const excelRows = scheduleDraft.map((resident) => ({
    ...resident,
    shifts: resident.shifts.map((entry) => ({ ...entry, value: ({
      "1700–0700": templateRange("NIGHT", entry.value),
      "1815–0700": templateRange("WKND-N", entry.value),
      "0630–1700": templateRange("DAY", entry.value),
      "0630–1900": templateRange("LONG", entry.value),
      "0630–1600": templateRange("SHORT", entry.value)
    }[entry.value] || entry.value) }))
  }));
  const selectedEntry = selectedScheduleCell ? scheduleDraft[selectedScheduleCell.row]?.shifts[selectedScheduleCell.column] : null;
  const selectedResident = selectedScheduleCell ? scheduleDraft[selectedScheduleCell.row] : null;
  const stats = scheduleDraft.map(scheduleResidentStats);
  const nightSpread = stats.map(item=>item.nights);
  const weekendSpread = stats.map(item=>item.weekendDaysWorked);
  const allGolden = stats.filter(item=>item.goldenWeekends > 0).length;
  const requiredCoverage = serviceRosterTarget(activeScheduleService);
  const activeLanes = ensureServiceCoverageLanes(activeScheduleService);
  const distribution = serviceDistributionSettings[activeScheduleService];
  return `<section class="schedule-page">
    <div class="schedule-toolbar">
      <div><p class="eyebrow">Block ${currentBlock} · ${academicBlocks[currentBlock - 1][1]}, 2026</p><h1>Schedule workspace</h1></div>
      <div class="toolbar-actions">
        <span class="save-state"><span class="icon" data-icon="check"></span> Draft autosaved</span>
        <button class="secondary-button compact save-draft"><span class="icon" data-icon="check"></span> Save draft</button>
        <button class="secondary-button compact"><span class="icon" data-icon="download"></span> Export</button>
        <button class="primary-button compact publish-button"><span class="icon" data-icon="check"></span> Publish block</button>
      </div>
    </div>
    ${blockNavigator("schedule", true)}
    <div class="service-tabs" role="tablist">
      ${services.map((service) => `<button class="service-tab ${service === activeScheduleService ? "active" : ""}" data-service="${service}">${service}${service === "NICU" ? '<i>1</i>' : ""}</button>`).join("")}
    </div>
    <div class="schedule-controls">
      <div class="control-group"><button class="secondary-button compact"><span class="icon" data-icon="filter"></span> Filter</button><div class="select-wrap"><select class="filter-select schedule-week-select">${[1,2,3,4].map(week=>`<option value="${week-1}" ${selectedScheduleWeek===week-1?"selected":""}>Week ${week} · Jun ${(week-1)*7+1}-${week*7}</option>`).join("")}</select></div><button class="secondary-button compact">Today</button><button class="primary-button compact open-add-resident"><span class="icon" data-icon="plus"></span> Add resident</button></div>
      <div class="legend"><span><i class="legend-dot day"></i>Day</span><span><i class="legend-dot night"></i>Night</span><span><i class="legend-dot protected"></i>Protected</span><span><i class="legend-dot off"></i>Off</span></div>
      <div class="control-group"><div class="schedule-layout-toggle" role="group" aria-label="Schedule view"><button class="${activeScheduleLayout==="builder"?"active":""}" data-schedule-layout="builder">Builder view</button><button class="${activeScheduleLayout==="excel"?"active":""}" data-schedule-layout="excel">Excel-style</button></div><button class="secondary-button compact undo-button" ${scheduleUndoStack.length ? "" : "disabled"}>Undo</button><button class="secondary-button compact redo-button" ${scheduleRedoStack.length ? "" : "disabled"}>Redo</button></div>
    </div>
    <div class="master-roster-banner">
      <span class="flow-icon success"><span class="icon" data-icon="grid"></span></span>
      <div><strong>${activeScheduleService} · Block ${currentBlock} master-linked roster</strong><p>${scheduleDraft.filter(resident=>resident.masterLinked).length} residents pulled directly from the annual master schedule · ${scheduleDraft.filter(resident=>!resident.masterLinked).length} eligible supplements · ${serviceScheduleSettings[activeScheduleService]?.label || "Institution rules applied"}</p></div>
      <button class="link-button" data-view-target="master">Review annual assignments →</button>
    </div>
    <div class="coverage-lane-summary">
      <div><strong>Coverage plan</strong><span>${distribution.cadence} rotation · ${distribution.nightHandoff} · ${distribution.balance}</span></div>
      ${activeLanes.map((lane)=>`<span class="coverage-lane-chip" style="--lane-color:${lane.color}"><i></i>${escapeHtml(lane.name)} <b>${lane.minimum}</b></span>`).join("")}
      <button class="link-button" data-view-target="builder">Edit template</button>
    </div>
    <div class="block-fairness-strip">
      <div><small>Night shifts</small><strong>${Math.min(...nightSpread)}-${Math.max(...nightSpread)}</strong><span>${Math.max(...nightSpread)-Math.min(...nightSpread) <= 1 ? "Evenly distributed" : "Review imbalance"}</span></div>
      <div><small>Weekend days worked</small><strong>${Math.min(...weekendSpread)}-${Math.max(...weekendSpread)}</strong><span>Compared across all residents</span></div>
      <div><small>Golden weekends</small><strong>${allGolden} / ${stats.length}</strong><span>${allGolden===stats.length ? "Everyone has at least one" : `${stats.length-allGolden} need review`}</span></div>
      <div><small>Night rotation</small><strong>6 stretches</strong><span>Handoffs across Weeks 1-4</span></div>
      <button class="view-block-fairness">View resident totals</button>
    </div>
    ${activeScheduleLayout === "excel" ? excelScheduleMirror(excelRows) : `<div class="schedule-workspace">
      <div class="schedule-sheet-wrap">
        <div class="schedule-sheet">
          <div class="sheet-row sheet-header">
            <div class="resident-cell header-resident"><span>Resident</span><small>${serviceRuleProfiles[activeScheduleService]?.staffing || "Configured service requirement"}</small></div>
            ${days.map(([day, date], index) => `<div class="date-cell ${index > 4 ? "weekend" : ""}"><strong>${day}</strong><span>${date}</span><small>${index > 4 ? "Weekend" : index === 2 ? "Didactics" : ""}</small></div>`).join("")}
          </div>
          ${scheduleRows.map((resident, rowIndex) => `
            <div class="sheet-row">
              <div class="resident-cell editable-resident-cell">
                <span class="row-reorder">
                  <button class="move-resident-up" data-row="${rowIndex}" aria-label="Move ${resident.name} up">↑</button>
                  <button class="move-resident-down" data-row="${rowIndex}" aria-label="Move ${resident.name} down">↓</button>
                </span>
                <span class="avatar" style="background:${avatarColor(rowIndex)}">${initials(resident.name)}</span>
                <span><strong>${resident.name}</strong><small>${resident.role}</small><em>${resident.source}</em></span>
              </div>
              ${resident.shifts.map((entry, colIndex) => shiftCell(entry, rowIndex, weekStart + colIndex)).join("")}
            </div>`).join("")}
          <div class="sheet-row coverage-row">
            <div class="resident-cell"><span class="coverage-icon"><span class="icon" data-icon="users"></span></span><span><strong>Daily coverage</strong><small>${serviceRuleProfiles[activeScheduleService]?.staffing || "Configured minimum staffing"}</small></span></div>
            ${days.map((_, index) => { const count = getDraftCoverage(weekStart + index); return `<div class="coverage-cell ${count < requiredCoverage ? "warning" : ""}"><strong>${count} / ${requiredCoverage}</strong><span>${count < requiredCoverage ? "Needs review" : "Covered"}</span></div>`; }).join("")}
          </div>
        </div>
      </div>
      <aside class="inspector">
        ${addResidentPanelOpen ? addResidentPanel() : selectedEntry ? scheduleCellEditor(selectedResident, selectedEntry, selectedScheduleCell.row, selectedScheduleCell.column, days[selectedScheduleCell.column - weekStart] || ["Day", `Jun ${selectedScheduleCell.column + 1}`]) : `
        <div class="inspector-head"><div><h2>Schedule insights</h2><p>Live checks for ${activeScheduleService || "current team"}</p></div><button class="icon-button inspector-close"><span class="icon" data-icon="close"></span></button></div>
        <div class="inspector-score"><div class="score-ring"><strong>94</strong><span>score</span></div><div><strong>Balanced four-week draft</strong><span>Night and weekend fairness tracked across the full block</span></div></div>
        <div class="insight-section"><h3>Coverage</h3>
          <button class="insight-item danger"><span class="icon" data-icon="alert"></span><span><strong>Week ${selectedScheduleWeek+1} coverage review</strong><small>Call-pool residents can be added to uncovered dates</small></span><span class="icon" data-icon="chevron"></span></button>
          <button class="insight-item success"><span class="icon" data-icon="check"></span><span><strong>Weekend coverage</strong><small>All day and night roles filled</small></span></button>
        </div>
        <div class="insight-section"><h3>Fairness</h3>
          <div class="fairness-bars">
            ${fairnessBar("Weekend days", Math.max(...weekendSpread)-Math.min(...weekendSpread)<=1?96:78)}
            ${fairnessBar("Night shifts", Math.max(...nightSpread)-Math.min(...nightSpread)<=1?98:82)}
            ${fairnessBar("Golden weekends", Math.round(allGolden/stats.length*100))}
          </div>
        </div>
        <div class="block-resident-totals">${stats.map((item,index)=>`<div><span class="avatar" style="background:${avatarColor(index)}">${initials(item.name)}</span><span><strong>${item.name}</strong><small>${item.hours} hrs · ${item.nights} nights · ${item.weekendDaysWorked} weekend days · ${item.goldenWeekends} golden</small></span></div>`).join("")}</div>`}
      </aside>
    </div>`}
  </section>`;
}

function excelScheduleMirror(rows) {
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const requiredCoverage = serviceRosterTarget(activeScheduleService);
  return `<div class="excel-schedule-mirror">
    <div class="excel-view-note">
      <div><strong>Excel-style published view</strong><p>This mirrors the same Block ${currentBlock} ${escapeHtml(activeScheduleService)} draft in a familiar final-schedule layout. Click any cell to open it in the editable builder.</p></div>
      <button class="secondary-button compact" data-schedule-layout="builder">Return to builder</button>
    </div>
    <div class="excel-key">
      <span><i class="day"></i>Day shift</span>
      <span><i class="night"></i>Night shift</span>
      <span><i class="protected"></i>Clinic / didactic</span>
      <span><i class="off"></i>Off / post-call</span>
    </div>
    ${Array.from({ length: 4 }, (_, weekIndex) => {
      const weekStart = weekIndex * 7;
      return `<section class="excel-week-panel">
        <div class="excel-week-title"><div><strong>Week ${weekIndex + 1}</strong><span>Block ${currentBlock} · ${escapeHtml(activeScheduleService)} · Jun ${weekStart + 1}-${weekStart + 7}</span></div><small>${serviceRuleProfiles[activeScheduleService]?.staffing || "Configured staffing"}</small></div>
        <div class="excel-table-wrap">
          <table class="excel-schedule-table">
            <thead><tr><th>Resident</th>${dayNames.map((day, dayIndex)=>`<th>${day}<span>Jun ${weekStart + dayIndex + 1}</span></th>`).join("")}</tr></thead>
            <tbody>
              ${rows.map((resident, rowIndex) => `<tr>
                <th><span class="excel-avatar" style="background:${avatarColor(rowIndex)}">${initials(resident.name)}</span><strong>${resident.name}</strong><small>${resident.role}</small></th>
                ${resident.shifts.slice(weekStart, weekStart + 7).map((entry, dayIndex) => {
                  const column = weekStart + dayIndex;
                  return `<td><button class="excel-shift-cell ${excelShiftType(entry)}" data-excel-cell data-row="${rowIndex}" data-col="${column}"><strong>${escapeHtml(entry.value || "")}</strong><small>${excelCellSubtext(entry)}</small></button></td>`;
                }).join("")}
              </tr>`).join("")}
              <tr class="excel-coverage-row"><th>Daily coverage</th>${dayNames.map((_, dayIndex)=>{ const count = getDraftCoverage(weekStart + dayIndex); return `<td class="${count < requiredCoverage ? "warning" : "covered"}"><strong>${count} / ${requiredCoverage}</strong><small>${count < requiredCoverage ? "Needs review" : "Covered"}</small></td>`; }).join("")}</tr>
            </tbody>
          </table>
        </div>
      </section>`;
    }).join("")}
  </div>`;
}

function excelShiftType(entry) {
  if (!entry?.value) return "empty";
  const template = entry.templateCode ? getServiceShiftTemplate(activeScheduleService, entry.templateCode) : shiftTemplateFromValue(entry.value);
  if (entry.value === "OFF" || entry.value === "POST CALL" || template?.type === "Recovery" || template?.type === "Off") return "off";
  if (entry.value === "CLINIC" || entry.value === "DIDACTIC" || template?.type === "Protected" || template?.type === "Call") return "protected";
  if (template?.type === "Night" || /^(17|18|19|20)/.test(entry.value)) return "night";
  return "day";
}

function excelCellSubtext(entry) {
  if (!entry?.value) return "Click to assign";
  const template = entry.templateCode ? getServiceShiftTemplate(activeScheduleService, entry.templateCode) : shiftTemplateFromValue(entry.value);
  if (entry.lane) return escapeHtml(entry.lane);
  if (entry.value === "CLINIC" || entry.value === "DIDACTIC") return "Protected";
  if (entry.value === "OFF" || entry.value === "POST CALL") return "Rest";
  return escapeHtml(template?.name || entry.source || "Assigned");
}

function scheduleResidentStats(resident) {
  let hours = 0;
  let nights = 0;
  let weekendDaysWorked = 0;
  let goldenWeekends = 0;
  resident.shifts.forEach((entry,index) => {
    const template = entry.templateCode ? getServiceShiftTemplate(activeScheduleService, entry.templateCode) : shiftTemplateFromValue(entry.value);
    hours += Number(template?.hours) || (entry.value === "CLINIC" ? 4 : entry.value === "DIDACTIC" ? 4.5 : 0);
    if (template?.type === "Night") nights += 1;
    if (index % 7 > 4 && !["","OFF","POST CALL"].includes(entry.value)) weekendDaysWorked += 1;
  });
  for (let week=0; week<4; week++) {
    if (resident.shifts[week*7+5]?.value === "OFF" && resident.shifts[week*7+6]?.value === "OFF") goldenWeekends += 1;
  }
  return { name: resident.name, hours: Math.round(hours * 10) / 10, nights, weekendDaysWorked, goldenWeekends };
}

function shiftTemplateFromValue(value) {
  const normalized = value?.replaceAll("–", "-");
  const aliases = { "1700-0700": "NIGHT", "1815-0700": "WKND-N", "0630-1700": "DAY", "0630-1900": "LONG", "0630-1600": "SHORT" };
  const code = aliases[normalized] || shiftTemplates.find((shift) => `${shift.start}-${shift.end}` === normalized || formatTemplateValue(shift).replaceAll("–","-") === normalized)?.code;
  return code ? getServiceShiftTemplate(activeScheduleService, code) : null;
}

function addResidentPanel() {
  return `<div class="add-resident-panel"><div class="inspector-head"><div><span class="editor-kicker">Staffing pool</span><h2>Add resident</h2><p>Add an eligible resident to this service, then drag shifts onto their row.</p></div><button class="icon-button close-add-resident"><span class="icon" data-icon="close"></span></button></div>
    <div class="pool-filter"><button class="active">Call pool</button><button>Elective</button><button>Manual</button></div>
    <div class="call-pool-list">${callPoolCandidates.map((candidate,index)=>`<article><span class="avatar" style="background:${avatarColor(index+2)}">${initials(candidate.name)}</span><span><strong>${candidate.name}</strong><small>${candidate.role} · ${candidate.institution}</small><em>${candidate.eligible}</em></span><button class="add-pool-resident" data-pool-index="${index}">Add</button></article>`).join("")}</div>
    <div class="manual-add"><h3>Or add manually</h3><input class="manual-resident-name" placeholder="Resident name"><select class="manual-resident-role"><option>P1 · Call pool</option><option>P2 · Senior pool</option><option>P3 · Senior pool</option><option>Outside rotator</option></select><button class="primary-button add-manual-resident">Add to schedule</button></div>
  </div>`;
}

function scheduleCellEditor(resident, entry, row, column, day) {
  const sourceTone = entry.protected && !entry.overridden ? "protected" : entry.overridden ? "override" : "generated";
  const availableCodes = ensureServiceBuilderConfig(activeScheduleService).shifts;
  const availableTemplates = shiftTemplates.filter((shift) => availableCodes.includes(shift.code) || ["PC","CL-AM","CL-PM"].includes(shift.code));
  const selectedTemplateCode = entry.templateCode || shiftTemplateFromValue(entry.value)?.code || "";
  return `<div class="cell-editor">
        <div class="inspector-head"><div><span class="editor-kicker">Draft assignment</span><h2>${resident.name}</h2><p>${day[0]}, ${day[1]} · ${resident.role}</p></div><button class="icon-button close-cell-editor" aria-label="Close assignment editor"><span class="icon" data-icon="close"></span></button></div>
    <div class="source-banner ${sourceTone}"><span class="icon" data-icon="${entry.protected ? "alert" : "spark"}"></span><div><strong>${entry.source}</strong><p>${entry.protected && !entry.overridden ? "Protected profile data. Editing requires an explicit override." : entry.overridden ? "Chief override applied to source data." : "Generated from staffing rules and availability."}</p></div></div>
    <div class="cell-editor-section">
      <label class="editor-field"><span>Resident</span><select class="editor-resident-select">${scheduleDraft.map((item,index)=>`<option value="${index}" ${index===row?"selected":""}>${item.name} · ${item.role}</option>`).join("")}</select></label>
      <label class="editor-field"><span>Date</span><select class="editor-date-select">${Array.from({length:28},(_,index)=>{ const item = [["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][index%7],`Jun ${index+1}`]; return `<option value="${index}" ${index===column?"selected":""}>Week ${Math.floor(index/7)+1} · ${item[0]}, ${item[1]}</option>`; }).join("")}</select></label>
    </div>
    <label class="editor-field"><span>Coverage location / team</span><select class="editor-lane-select"><option value="">No specific lane</option>${ensureServiceCoverageLanes(activeScheduleService).map((lane)=>`<option value="${escapeHtml(lane.name)}" ${entry.lane===lane.name?"selected":""}>${escapeHtml(lane.name)}</option>`).join("")}</select></label>
    <div class="cell-editor-section">
      <label class="editor-field"><span>Assignment template</span><select class="editor-shift-select">
        <option value="">Unassigned</option>
        ${availableTemplates.map((shift)=>{const serviceShift=getServiceShiftTemplate(activeScheduleService,shift.code);return `<option value="${shift.code}" ${selectedTemplateCode===shift.code?"selected":""}>${serviceShift.name} · ${serviceShift.start || "No time"}${serviceShift.end?`–${serviceShift.end}`:""} · ${serviceShift.type}</option>`}).join("")}
        <option value="CLINIC" ${entry.value==="CLINIC"?"selected":""}>Clinic · protected</option>
        <option value="DIDACTIC" ${entry.value==="DIDACTIC"?"selected":""}>Didactic · protected</option>
        <option value="CUSTOM">Custom time or label</option>
      </select></label>
      <label class="editor-field"><span>Custom value</span><input class="editor-custom-value" value="${entry.value}" placeholder="e.g. 07:00–15:00 or Conference"></label>
    </div>
    <label class="editor-field"><span>Chief note</span><textarea class="editor-cell-note" placeholder="Reason for change or handoff note">${entry.note || ""}</textarea></label>
    ${entry.protected && !entry.overridden ? `<label class="override-confirm"><input type="checkbox" class="confirm-protected-override"><span><strong>Override protected profile entry</strong><small>I understand this replaces clinic or didactic time in the draft.</small></span></label>` : ""}
    <div class="cell-editor-actions">
      <button class="secondary-button clear-schedule-cell" data-row="${row}" data-column="${column}">Clear</button>
      <button class="secondary-button copy-schedule-cell" data-row="${row}" data-column="${column}">Copy</button>
      <button class="primary-button apply-cell-edit" data-row="${row}" data-column="${column}">Apply change</button>
    </div>
    <div class="move-help"><span class="icon" data-icon="wand"></span><p>Change the resident or date above to move this assignment. Select Copy to keep the original and place a duplicate.</p></div>
  </div>`;
}

function formatTemplateValue(shift) {
  if (shift.display === "label") return shift.name.toUpperCase();
  if (!shift.start || !shift.end) return shift.name.toUpperCase();
  return `${shift.start}–${shift.end}`;
}

function getDraftCoverage(column) {
  const nonCoverage = new Set(["", "OFF", "POST CALL", "CLINIC", "DIDACTIC"]);
  return scheduleDraft.reduce((count, resident) => count + (nonCoverage.has(resident.shifts[column].value) ? 0 : 1), 0);
}

function shiftCell(entry, row, col) {
  const shift = entry.value;
  const dragAttrs = `draggable="true" data-row="${row}" data-col="${col}"`;
  if (!shift) return `<button class="shift-cell empty ${selectedScheduleCell?.row===row&&selectedScheduleCell?.column===col?"selected":""}" ${dragAttrs} aria-label="Add shift for ${scheduleDraft[row].name}">+</button>`;
  const template = entry.templateCode ? getServiceShiftTemplate(activeScheduleService, entry.templateCode) : shiftTemplateFromValue(shift);
  let type = template?.type === "Night" ? "night" : template?.type === "Protected" || template?.type === "Call" ? "protected" : template?.type === "Recovery" || template?.type === "Off" ? "off" : template?.type === "Task" ? "task" : "day";
  if (!template && /^(17|18|19|20)/.test(shift) && /(07|08):?00/.test(shift)) type = "night";
  if (shift === "CLINIC" || shift === "DIDACTIC") type = "protected";
  if (shift === "OFF" || shift === "POST CALL") type = "off";
  const label = template?.name || (type === "night" ? "Night" : type === "protected" ? "Protected" : type === "off" ? "Rest" : "Day");
  const lane = ensureServiceCoverageLanes(activeScheduleService).find((item)=>item.name===entry.lane);
  return `<button class="shift-cell ${type} ${template?.style || ""} ${entry.overridden?"overridden":""} ${selectedScheduleCell?.row===row&&selectedScheduleCell?.column===col?"selected":""}" ${shiftCardStyle(template)} ${dragAttrs}><strong>${shift}</strong><small>${entry.overridden ? `Chief override · ${label}` : label}</small>${entry.lane?`<em class="cell-lane" style="--lane-color:${lane?.color || "#4f83c4"}">${escapeHtml(entry.lane)}</em>`:""}<i class="cell-source-dot" title="${entry.source}"></i></button>`;
}
function initials(name) { return name.split(/[\s,]+/).filter(Boolean).slice(0,2).map((part) => part[0]).join("").toUpperCase(); }
function avatarColor(index) { return ["#dce8fa","#e7dff8","#d9f1ed","#fae8cf","#f4dadd","#e3e6ed"][index % 6]; }
function fairnessBar(label, value) { return `<div class="fairness-row"><span>${label}</span><div class="progress-track"><i class="progress-fill" style="width:${value}%"></i></div><strong>${value}%</strong></div>`; }

function analyticsView() {
  const residents = [
    ["Gilbert","Purple","68.4","6","2","1","1","3","Balanced"],
    ["Patel, Kr","Purple","64.8","0","4","1","2","2","Balanced"],
    ["DuVall","Purple","58.6","1","2","0","2","3","Light"],
    ["Lin","Purple","62.2","0","4","1","2","2","Balanced"],
    ["Boateng","Call pool","25.7","2","2","0","0","1","Light"],
    ["McAlvey","Call pool","23.4","0","2","0","0","1","Light"]
  ];
  return `<section class="page analytics-page">
    <div class="page-head"><div><p class="eyebrow">Block ${currentBlock} analytics</p><h1>Workload and fairness</h1><p>Compare residents in equivalent roles and catch imbalances before publishing.</p></div><div class="page-head-actions"><button class="secondary-button compact"><span class="icon" data-icon="download"></span> Export report</button><div class="select-wrap"><select class="date-select"><option>All services</option><option>Purple</option><option>Orange</option></select></div></div></div>
    ${blockNavigator("analytics")}
    <div class="analytics-summary">
      <section class="panel balance-card"><div><span class="metric-label">Overall fairness score</span><strong>94<span>%</span></strong><p>Workload is well balanced across equivalent roles.</p></div><div class="radial-chart"><span>94</span></div></section>
      <section class="panel mini-chart-card"><div class="panel-header"><div><h2>Hours by service</h2><p>Average per resident / week</p></div><span class="trend good">Within target</span></div><div class="bar-chart">${[["Purple",66],["Orange",63],["Gold",54],["NICU",71],["PICU",68],["Newborn",48]].map(([name,val]) => `<div><span>${name}</span><i><b style="width:${val}%"></b></i><strong>${val}h</strong></div>`).join("")}</div></section>
      <section class="panel equity-card"><div class="panel-header"><div><h2>Request fulfillment</h2><p>Resident preferences honored</p></div></div><div class="donut-wrap"><div class="donut"><span><strong>89%</strong><small>honored</small></span></div><div class="donut-legend"><span><i class="teal"></i>42 fully honored</span><span><i class="amber"></i>5 partially honored</span><span><i class="red"></i>0 denied</span></div></div></section>
    </div>
    <section class="panel data-panel">
      <div class="panel-header"><div><h2>Resident workload</h2><p>Click a resident to open their detailed monthly summary</p></div><div class="table-tools"><div class="table-search"><span class="icon" data-icon="search"></span><input placeholder="Find resident"></div><button class="secondary-button compact"><span class="icon" data-icon="filter"></span> Filter</button></div></div>
      <div class="analytics-table">
        <div class="analytics-row analytics-header"><span>Resident</span><span>Rotation</span><span>Hours / wk</span><span>Nights</span><span>Weekend days</span><span>Golden wknd</span><span>Clinic</span><span>Calls</span><span>Load</span></div>
        ${residents.map((r,index) => `<button class="analytics-row resident-stat" data-resident="${r[0]}"><span class="person-cell"><span class="avatar" style="background:${avatarColor(index)}">${initials(r[0])}</span><strong>${r[0]}</strong></span><span><i class="rotation-dot ${r[1].toLowerCase().replace(" ","-")}"></i>${r[1]}</span><span><strong>${r[2]}</strong></span><span>${r[3]}</span><span>${r[4]}</span><span>${r[5]}</span><span>${r[6]}</span><span>${r[7]}</span><span><i class="load-pill ${r[8].toLowerCase()}">${r[8]}</i></span></button>`).join("")}
      </div>
    </section>
  </section>`;
}

function masterView() {
  const conflicts = getMasterConflicts();
  const visibleRows = masterRowsForPgy(activeMasterPgy);
  const activeRule = pgyRule(activeMasterPgy);
  const coverageSummary = pgyCoverageSummary(activeMasterPgy);
  const requirementCompletion = Math.round(visibleRows.reduce((sum, { resident, row }) => {
    const completed = Object.entries(resident.requirements).filter(([rotation, required]) => masterAssignments[row].filter((item) => item.rotation === rotation).length >= required).length;
    return sum + completed / Object.keys(resident.requirements).length;
  }, 0) / Math.max(1, visibleRows.length) * 100);
  return `<section class="page master-page">
    <div class="page-head">
      <div><p class="eyebrow">Academic year 2025–26</p><h1>Annual scheduling workbook</h1><p>Translate the Excel tabs into linked, focused sections: masters, service coverage, call pools, holidays, and holiday breaks.</p></div>
      <div class="page-head-actions"><button class="secondary-button compact" data-master-import-mode="import"><span class="icon" data-icon="clipboard"></span> Import existing master</button><button class="secondary-button compact manage-rotations"><span class="icon" data-icon="settings"></span> Rotation options</button><button class="secondary-button compact validate-master"><span class="icon" data-icon="alert"></span> Validate</button><button class="primary-button compact save-master"><span class="icon" data-icon="check"></span> Save master schedule</button></div>
    </div>
    <div class="master-summary">
      ${metric("check","teal","Requirements complete",`${requirementCompletion}%`,"annual rotations assigned","Live")}
      ${metric("grid","purple","Coverage targets",`${pgyCoverageScore(activeMasterPgy)}%`,"block minimums met",`${coverageSummary.short} short`)}
      ${metric("calendar","amber","Vacation capacity",`${activeRule.vacationEligible.length} blocks`,"eligible for PGY year",`${activeRule.electiveEligible.length} elective`)}
      ${metric("alert","red","Conflicts",String(conflicts.length),"need attention",conflicts.length ? "Review" : "Clear","warn")}
    </div>
    ${annualWorkbookNav()}
    ${annualWorkbookContent()}
  </section>`;
}

function annualWorkbookTabs() {
  return [
    ["masters", "grid", "Master schedules", "PGY templates and final source data"],
    ["services", "users", "Service coverage", "Who covers each service by block"],
    ["call-pools", "clipboard", "Call pools", "Eligible call, jeopardy, no-call, and LOA pools"],
    ["holidays", "calendar", "Holidays", "Holiday requests and coverage"],
    ["breaks", "clock", "Holiday breaks", "Christmas and New Year break staffing"]
  ];
}

function annualWorkbookNav() {
  return `<nav class="annual-workbook-nav" aria-label="Annual scheduling workbook">
    ${annualWorkbookTabs().map(([id, icon, title, copy]) => `<button class="annual-workbook-tab ${activeAnnualWorkbook === id ? "active" : ""}" data-annual-workbook="${id}">
      <span class="icon" data-icon="${icon}"></span>
      <span><strong>${title}</strong><small>${copy}</small></span>
    </button>`).join("")}
  </nav>`;
}

function annualWorkbookContent() {
  if (activeAnnualWorkbook === "services") return serviceCoverageWorkbookView();
  if (activeAnnualWorkbook === "call-pools") return callPoolWorkbookView();
  if (activeAnnualWorkbook === "holidays") return holidayWorkbookView();
  if (activeAnnualWorkbook === "breaks") return holidayBreakWorkbookView();
  return annualMasterBuilderView();
}

function masterImportStatusCopy() {
  if (masterImportState.status === "applied") return ["Imported master active", "The uploaded master is treated as the source for profiles, coverage, call pools, and builders."];
  if (masterImportState.status === "staged") return ["File staged for review", "Preview the detected structure, then apply it when chiefs are ready."];
  return ["No file uploaded yet", "Upload Excel, CSV, or PDF when chiefs already have a finished master schedule."];
}

function masterImportGateway() {
  const [statusTitle, statusCopy] = masterImportStatusCopy();
  const importActive = masterImportState.mode === "import";
  const buildActive = masterImportState.mode !== "import";
  const fileLabel = masterImportState.fileName ? escapeHtml(masterImportState.fileName) : "No file selected";
  return `<section class="panel master-import-gateway">
    <div class="master-source-options">
      <button class="master-source-card ${buildActive ? "active" : ""}" data-master-import-mode="build">
        <span class="metric-icon teal"><span class="icon" data-icon="users"></span></span>
        <strong>Build from resident requests</strong>
        <small>Use annual rankings, PTO, fellowship timing, and chief review to build the master step by step.</small>
      </button>
      <button class="master-source-card ${importActive ? "active" : ""}" data-master-import-mode="import">
        <span class="metric-icon purple"><span class="icon" data-icon="clipboard"></span></span>
        <strong>Import completed master</strong>
        <small>Upload the Excel/PDF chiefs already built, then map residents, blocks, and rotations into Clarity.</small>
      </button>
      <article class="master-import-status ${masterImportState.status}">
        <small>Current source</small>
        <strong>${statusTitle}</strong>
        <span>${statusCopy}</span>
      </article>
    </div>
    ${importActive ? `<div class="master-import-panel">
      <input class="master-import-file" type="file" accept=".xlsx,.xls,.csv,.pdf" hidden>
      <div class="import-dropzone">
        <span class="metric-icon amber"><span class="icon" data-icon="grid"></span></span>
        <div><h3>Upload an existing annual master schedule</h3><p>Best format: Excel workbook with tabs like PGY1, PGY2, PGY3, MedPeds and block columns. PDF is accepted for review, but Excel gives the cleanest structured mapping.</p></div>
        <button class="primary-button trigger-master-import" type="button"><span class="icon" data-icon="plus"></span> Choose file</button>
      </div>
      <div class="import-file-row">
        <span><small>Selected file</small><strong>${fileLabel}</strong></span>
        <span><small>Type</small><strong>${escapeHtml(masterImportState.fileType || "Waiting")}</strong></span>
        <span><small>Last action</small><strong>${escapeHtml(masterImportState.uploadedAt || "Not uploaded")}</strong></span>
      </div>
      <div class="import-mapping-grid">
        ${[
          ["Tabs", masterImportState.detectedSheets.join(" · "), "Map worksheet names to PGY classes"],
          ["Resident rows", `${masterImportState.mappedRows || masterRowsForPgy(activeMasterPgy).length} mapped`, "Match names to resident profiles"],
          ["Block columns", `${masterImportState.mappedBlocks || academicBlocks.length} blocks`, "Attach rotations to the annual block calendar"],
          ["Downstream links", "Profiles · Services · Call pools", "Reflect instantly across resident and chief views"]
        ].map(([title,value,copy])=>`<article><small>${title}</small><strong>${value}</strong><span>${copy}</span></article>`).join("")}
      </div>
      <div class="import-link-flow">
        <span>Excel/PDF master</span><em>→</em><span>Resident profiles</span><em>→</em><span>Service coverage</span><em>→</em><span>Monthly builders</span>
      </div>
      <div class="import-actions">
        <button class="secondary-button clear-master-import" type="button">Clear import</button>
        <button class="primary-button apply-master-import" type="button"><span class="icon" data-icon="check"></span> Apply imported master</button>
      </div>
    </div>` : ""}
  </section>`;
}

function applyImportedMasterPrototype() {
  masterImportState.status = "applied";
  masterImportState.mode = "import";
  masterImportState.mappedRows = masterRowsForPgy(activeMasterPgy).length;
  masterImportState.mappedBlocks = academicBlocks.length;
  masterImportState.uploadedAt = new Date().toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  masterAssignments = masterAssignments.map((row) => row.map((assignment) => ({ ...assignment, imported: true })));
}

function annualMasterBuilderView() {
  if (activeMasterStep === "requests") activeMasterStep = "coverage";
  return `
    ${masterImportGateway()}
    <div class="master-builder-layout ${activeMasterStep === "finalize" ? "finalize-mode" : ""}">
      <section class="panel builder-steps master-build-steps">
        ${masterBuildSteps().map(([id, number, title, copy]) => `<button class="builder-step ${activeMasterStep===id?"active":""} ${masterStepComplete(id)?"complete":""}" data-master-step="${id}">
          <span class="step-number">${masterStepComplete(id) ? '<span class="icon" data-icon="check"></span>' : number}</span>
          <span><strong>${title}</strong><small>${copy}</small></span>
          <span class="icon step-chevron" data-icon="chevron"></span>
        </button>`).join("")}
      </section>
      <div class="master-builder-main">
        ${masterGuidedStepPanel(activeMasterStep)}
      </div>
    </div>`;
}

function annualServiceDefinitions() {
  return [
    { name: "Floor Senior", min: 4, max: 5, color: "floor", source: "PGY-2/3 floor blocks", category: "Senior" },
    { name: "Night Float/Swing", min: 3, max: 5, color: "night", source: "PGY-2 night blocks", category: "Night" },
    { name: "Gold Senior", min: 1, max: 2, color: "gold", source: "Gold senior pool", category: "Senior" },
    { name: "Floors: Purple", min: 5, max: 7, color: "purple", source: "Purple/Floor master", category: "Floor" },
    { name: "Floors: Orange", min: 5, max: 7, color: "orange", source: "Orange/Floor master", category: "Floor" },
    { name: "Floors: Gold", min: 3, max: 4, color: "gold", source: "Gold/NICU master", category: "Floor" },
    { name: "NICU", min: 5, max: 7, color: "nicu", source: "NICU master", category: "ICU" },
    { name: "PICU", min: 5, max: 8, color: "picu", source: "PICU master + outside rotators", category: "ICU" },
    { name: "Heme/Onc", min: 2, max: 3, color: "pho", source: "PHO master", category: "Inpatient" },
    { name: "ED", min: 3, max: 6, color: "ed", source: "ED master", category: "ED" },
    { name: "Newborn", min: 2, max: 4, color: "newborn", source: "Newborn master", category: "Nursery" },
    { name: "Cardiology", min: 1, max: 2, color: "cards", source: "Cardiology master", category: "Consult" },
    { name: "RAT", min: 1, max: 2, color: "adolescent", source: "Elective/call eligible", category: "Flexible" },
    { name: "Research", min: 0, max: 3, color: "clinic", source: "Elective/call eligible", category: "Flexible" }
  ];
}

function serviceRotationMap(serviceName) {
  const map = {
    "Floor Senior": ["Floor", "Purple", "Orange"],
    "Night Float/Swing": ["Night Float"],
    "Gold Senior": ["Gold/NICU"],
    "Floors: Purple": ["Purple"],
    "Floors: Orange": ["Orange"],
    "Floors: Gold": ["Gold/NICU"],
    "NICU": ["NICU", "Gold/NICU"],
    "PICU": ["PICU"],
    "Heme/Onc": ["PHO"],
    "ED": ["ED"],
    "Newborn": ["Newborn"],
    "Cardiology": ["Cardiology"],
    "RAT": ["Elective", "Clinic/Advo"],
    "Research": ["Elective"],
    "Clinic Call": ["Elective", "Clinic/Advo", "Vacation"],
    "Jeopardy": ["Elective", "Clinic/Advo", "Vacation"],
    "Floor Interns": ["Purple", "Orange", "Gold/NICU", "Floor"],
    "NFSS": ["Night Float"],
    "Clinic": ["Clinic/Advo", "Elective"]
  };
  return map[serviceName] || [serviceName];
}

function masterResidentsByRotations(blockIndex, rotations, options = {}) {
  const allowed = new Set(rotations);
  let rows = masterResidents.map((resident, row) => ({
    resident,
    row,
    assignment: masterAssignments[row]?.[blockIndex]
  })).filter(({ assignment }) => assignment && allowed.has(assignment.rotation));
  if (options.pgy && options.pgy !== "All PGYs") rows = rows.filter(({ resident }) => resident.pgy === options.pgy);
  if (options.excludePgy) rows = rows.filter(({ resident }) => resident.pgy !== options.excludePgy);
  if (options.offset && rows.length) {
    const offset = options.offset % rows.length;
    rows = rows.slice(offset).concat(rows.slice(0, offset));
  }
  if (options.limit) rows = rows.slice(0, options.limit);
  return rows.map(({ resident, assignment }) => ({
    ...resident,
    sourceRotation: assignment.rotation,
    source: `Master schedule · ${assignment.rotation}`
  }));
}

function syntheticResidentPool(seed = 0, count = 3, pgy = "All PGYs") {
  const rows = masterRowsForPgy(pgy).length ? masterRowsForPgy(pgy) : masterResidents.map((resident, row) => ({ resident, row }));
  return Array.from({ length: Math.min(count, rows.length) }, (_, index) => rows[(seed + index * 5) % rows.length].resident);
}

function serviceCoverageAssignments(service, blockIndex) {
  const options = {};
  if (service.category === "Floor") options.pgy = "PGY-1";
  if (["Floor Senior", "Gold Senior", "Night Float/Swing"].includes(service.name)) options.excludePgy = "PGY-1";
  if (service.name === "Cardiology") options.limit = service.max + 1;
  return masterResidentsByRotations(blockIndex, serviceRotationMap(service.name), options);
}

function coverageStatusFor(count, item) {
  if (count < item.min) return "short";
  if (count > item.max) return "over";
  return "met";
}

function workbookBlockStrip() {
  return `<div class="workbook-block-strip">
    ${academicBlocks.map(([number, dates]) => `<button class="${Number(number) === currentBlock ? "active" : ""}" data-master-block="${number}">
      <strong>Block ${number}</strong><small>${dates}</small>
    </button>`).join("")}
  </div>`;
}

function workbookViewToggle() {
  return `<div class="workbook-view-toggle" aria-label="Workbook view style">
    <button class="${annualWorkbookDisplayMode === "digital" ? "active" : ""}" data-workbook-display="digital">Digital view</button>
    <button class="${annualWorkbookDisplayMode === "excel" ? "active" : ""}" data-workbook-display="excel">Excel-like view</button>
  </div>`;
}

function rosterNameStack(residents, limit = 9) {
  if (!residents.length) return `<span class="empty">None</span>`;
  const visible = residents.slice(0, limit).map((resident) => `<span data-profile-resident="${escapeHtml(resident.name)}">${escapeHtml(resident.name)}</span>`).join("");
  const extra = residents.length > limit ? `<em>+${residents.length - limit} more</em>` : "";
  return `${visible}${extra}`;
}

function workbookExcelLegend(copy) {
  return `<div class="workbook-excel-note">
    <span class="icon" data-icon="grid"></span>
    <span>${copy}</span>
  </div>`;
}

function serviceCoverageExcelView(services, selectedRows, activeRow) {
  return `<section class="panel workbook-excel-panel">
    <div class="panel-header"><div><h2>Excel-like service coverage</h2><p>Rows are services, columns are blocks, and names are pulled from the finalized/imported master schedule.</p></div><span class="status-pill review">Names visible</span></div>
    ${workbookExcelLegend("Click a block header to change the active month. Click a service cell to open the detailed roster below.")}
    <div class="workbook-excel-table-wrap">
      <table class="workbook-excel-table service-excel-table">
        <thead><tr><th>Service</th>${academicBlocks.map(([number, dates]) => `<th><button data-master-block="${number}"><strong>B${number}</strong><small>${dates}</small></button></th>`).join("")}</tr></thead>
        <tbody>
          ${services.map((service) => `<tr>
            <th><span><i class="legend-dot ${service.color}"></i>${escapeHtml(service.name)}</span><small>Target ${service.min}-${service.max}</small></th>
            ${academicBlocks.map((_, blockIndex) => {
              const residents = serviceCoverageAssignments(service, blockIndex);
              const status = coverageStatusFor(residents.length, service);
              return `<td class="${status} ${service.color} ${blockIndex + 1 === currentBlock && service.name === activeRow.name ? "active" : ""}">
                <button class="workbook-excel-cell" data-coverage-service="${escapeHtml(service.name)}" aria-label="${escapeHtml(service.name)} block ${blockIndex + 1}">
                  <strong>${residents.length}</strong>
                  <div class="workbook-excel-names">${rosterNameStack(residents, 7)}</div>
                </button>
              </td>`;
            }).join("")}
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
  </section>
  ${serviceCoverageDetailPanel(activeRow)}`;
}

function serviceCoverageWorkbookView() {
  const services = annualServiceDefinitions();
  const selected = currentBlock - 1;
  const selectedRows = services.map((service) => {
    const residents = serviceCoverageAssignments(service, selected);
    return { ...service, residents, count: residents.length, status: coverageStatusFor(residents.length, service) };
  });
  const activeRow = selectedRows.find((row) => row.name === activeCoverageService) || selectedRows[0];
  activeCoverageService = activeRow.name;
  const gaps = selectedRows.filter((row) => row.status === "short").length;
  return `<div class="annual-workbook-shell">
    <section class="panel workbook-section-head">
      <div><span class="section-number">2</span></div>
      <div><h2>Service coverage workbook</h2><p>This replaces the giant Excel Services tab. Chiefs can see each block, each service, the target count, and the residents pulled from the finalized master schedule.</p></div>
      <div class="workbook-head-actions">${workbookViewToggle()}<button class="secondary-button compact" data-annual-workbook="masters">Open master source</button></div>
    </section>
    ${workbookBlockStrip()}
    ${annualWorkbookDisplayMode === "excel" ? serviceCoverageExcelView(services, selectedRows, activeRow) : `
    <div class="coverage-dashboard-grid">
      <section class="panel coverage-detail-panel">
        <div class="panel-header"><div><h2>Block ${currentBlock} service coverage</h2><p>${academicBlocks[selected][1]} · ${gaps ? `${gaps} services need attention` : "All tracked services are in range"}</p></div><span class="status-pill ${gaps ? "review" : "ready"}">${gaps ? `${gaps} gaps` : "Ready"}</span></div>
        <div class="annual-coverage-cards">${selectedRows.map((row) => `<button class="coverage-service-card ${row.status} ${row.name === activeRow.name ? "active" : ""}" data-coverage-service="${escapeHtml(row.name)}">
          <div><span><i class="legend-dot ${row.color}"></i>${escapeHtml(row.name)}</span><strong>${row.count}</strong></div>
          <small>Target ${row.min}-${row.max} · ${escapeHtml(row.source)}</small>
          <p>${row.residents.map((resident) => `<b>${escapeHtml(resident.id)}</b>`).join("") || "<em>None assigned</em>"}</p>
        </button>`).join("")}</div>
      </section>
      <section class="panel annual-matrix-panel">
        <div class="panel-header"><div><h2>Year at a glance</h2><p>Counts only. Open a block to see names and gaps.</p></div></div>
        ${serviceCoverageMatrix(services)}
      </section>
    </div>
    ${serviceCoverageDetailPanel(activeRow)}`}
  </div>`;
}

function serviceCoverageDetailPanel(row) {
  const needed = row.status === "short" ? row.min - row.count : 0;
  const over = row.status === "over" ? row.count - row.max : 0;
  const detailNote = row.status === "short"
    ? `Need ${needed} more resident${needed === 1 ? "" : "s"} from the master schedule, call pool, or outside rotator list.`
    : row.status === "over"
      ? `${over} resident${over === 1 ? "" : "s"} above target. Consider moving someone to an under-covered service.`
      : "Coverage is within the target range for this block.";
  return `<section class="panel service-roster-detail">
    <div class="panel-header">
      <div><h2>${escapeHtml(row.name)} details</h2><p>Block ${currentBlock} · ${academicBlocks[currentBlock - 1][1]} · pulled from ${escapeHtml(row.source)}</p></div>
      <span class="status-pill ${row.status === "met" ? "ready" : "review"}">${row.status === "met" ? "In range" : row.status}</span>
    </div>
    <div class="service-roster-summary">
      <article><small>Assigned</small><strong>${row.count}</strong><span>Target ${row.min}-${row.max}</span></article>
      <article><small>Category</small><strong>${escapeHtml(row.category)}</strong><span>${escapeHtml(row.source)}</span></article>
      <article class="${row.status !== "met" ? "warn" : ""}"><small>Chief action</small><strong>${row.status === "met" ? "None" : row.status === "short" ? `Add ${needed}` : `Review ${over}`}</strong><span>${escapeHtml(detailNote)}</span></article>
    </div>
    <div class="service-roster-list">
      ${row.residents.length ? row.residents.map((resident, index) => `<article>
        <span class="avatar" style="background:${avatarColor(index)}">${escapeHtml(resident.id)}</span>
        <div><strong>${escapeHtml(resident.name)}</strong><small>${escapeHtml(resident.pgy)} · ${escapeHtml(resident.source || `Master schedule · ${resident.sourceRotation || row.name}`)}</small></div>
        <span>${escapeHtml(row.name)}</span>
        <button class="secondary-button compact" data-profile-resident="${escapeHtml(resident.name)}">Open profile</button>
      </article>`).join("") : `<article class="empty-service-roster"><div><strong>No residents assigned yet</strong><small>Add from the call pool, outside rotators, or edit the master schedule.</small></div><button class="secondary-button compact" data-annual-workbook="call-pools">Open call pools</button></article>`}
    </div>
  </section>`;
}

function serviceCoverageMatrix(services) {
  return `<div class="coverage-matrix">
    <div class="coverage-matrix-row header"><div>Service</div>${academicBlocks.map(([number]) => `<div>B${number}</div>`).join("")}</div>
    ${services.map((service) => `<div class="coverage-matrix-row">
      <div><i class="legend-dot ${service.color}"></i><strong>${escapeHtml(service.name)}</strong><small>${service.min}-${service.max}</small></div>
      ${academicBlocks.map((_, index) => {
        const count = serviceCoverageAssignments(service, index).length;
        const status = coverageStatusFor(count, service);
        return `<button class="coverage-block-cell ${status} ${index + 1 === currentBlock ? "active" : ""}" data-master-block="${index + 1}"><strong>${count}</strong><span>${status === "met" ? "ok" : status}</span></button>`;
      }).join("")}
    </div>`).join("")}
  </div>`;
}

function callPoolDefinitions() {
  return [
    { name: "Clinic Call / Jeopardy", min: 18, max: 24, copy: "Residents in elective or call-eligible blocks", rotations: ["Elective", "Clinic/Advo", "Vacation"] },
    { name: "Floor Intern Cross Cover", min: 10, max: 13, copy: "Interns eligible for floor cross-cover", rotations: ["Elective", "Clinic/Advo", "Vacation"], pgy: "PGY-1" },
    { name: "No call: seniors", min: 8, max: 12, copy: "Seniors protected from call", rotations: ["PICU", "NICU", "Night Float", "ED"], excludePgy: "PGY-1" },
    { name: "No call: interns", min: 3, max: 6, copy: "Interns protected from call", rotations: ["Gold/NICU", "PHO", "Newborn", "ED"], pgy: "PGY-1" },
    { name: "LOA / unavailable", min: 0, max: 3, copy: "Leave, maternity, medical, or unavailable", rotations: ["Vacation"] }
  ];
}

function callPoolAssignments(pool, blockIndex) {
  return masterResidentsByRotations(blockIndex, pool.rotations, {
    pgy: pool.pgy,
    excludePgy: pool.excludePgy,
    limit: pool.max + 6
  });
}

function callPoolExcelView(pools, activePool) {
  return `<section class="panel workbook-excel-panel">
    <div class="panel-header"><div><h2>Excel-like call pool sheet</h2><p>Each pool is built from residents whose master block is elective, call-eligible, no-call, or leave eligible.</p></div><span class="status-pill review">Master-linked</span></div>
    ${workbookExcelLegend("Click a block header to change the block. Click a pool cell to open the names and profile links below.")}
    <div class="workbook-excel-table-wrap">
      <table class="workbook-excel-table">
        <thead><tr><th>Pool</th>${academicBlocks.map(([number, dates]) => `<th><button data-master-block="${number}"><strong>B${number}</strong><small>${dates}</small></button></th>`).join("")}</tr></thead>
        <tbody>
          ${pools.map((pool) => `<tr>
            <th><span>${escapeHtml(pool.name)}</span><small>Target ${pool.min}-${pool.max}</small></th>
            ${academicBlocks.map((_, blockIndex) => {
              const residents = callPoolAssignments(pool, blockIndex);
              const status = coverageStatusFor(residents.length, pool);
              return `<td class="${status} ${blockIndex + 1 === currentBlock && pool.name === activePool.name ? "active" : ""}">
                <button class="workbook-excel-cell" data-call-pool="${escapeHtml(pool.name)}">
                  <strong>${residents.length}</strong>
                  <div class="workbook-excel-names">${rosterNameStack(residents, 8)}</div>
                </button>
              </td>`;
            }).join("")}
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
  </section>
  ${callPoolDetailPanel(activePool)}`;
}

function callPoolWorkbookView() {
  const pools = callPoolDefinitions();
  const activePool = pools.find((pool) => pool.name === activeCallPool) || pools[0];
  activeCallPool = activePool.name;
  return `<div class="annual-workbook-shell">
    <section class="panel workbook-section-head"><div><span class="section-number">3</span></div><div><h2>Call pool workbook</h2><p>Residents with elective or call-eligible master blocks are pulled into call pools, with no-call and LOA lists kept visible before monthly calls are assigned.</p></div><div class="workbook-head-actions">${workbookViewToggle()}</div></section>
    ${workbookBlockStrip()}
    ${annualWorkbookDisplayMode === "excel" ? callPoolExcelView(pools, activePool) : `
    <div class="call-pool-grid">
      ${pools.map((pool) => {
        const names = callPoolAssignments(pool, currentBlock - 1);
        const count = names.length;
        const status = coverageStatusFor(count, pool);
        return `<button class="panel call-pool-card ${status} ${pool.name === activePool.name ? "active" : ""}" data-call-pool="${escapeHtml(pool.name)}">
          <div><h3>${escapeHtml(pool.name)}</h3><strong>${count}</strong></div>
          <p>${escapeHtml(pool.copy)}</p>
          <small>Target ${pool.min}-${pool.max} for Block ${currentBlock}</small>
          <div class="block-resident-chips">${names.map((resident) => `<span>${escapeHtml(resident.id)}</span>`).join("")}</div>
        </button>`;
      }).join("")}
    </div>
    ${callPoolDetailPanel(activePool)}
    <section class="panel annual-matrix-panel"><div class="panel-header"><div><h2>Call pool counts by block</h2><p>Use this to prevent one block from being overused while another is under-covered.</p></div></div>${callPoolMatrix(pools)}</section>`}
  </div>`;
}

function callPoolMatrix(pools) {
  return `<div class="coverage-matrix compact">
    <div class="coverage-matrix-row header"><div>Pool</div>${academicBlocks.map(([number]) => `<div>B${number}</div>`).join("")}</div>
    ${pools.map((pool) => `<div class="coverage-matrix-row">
      <div><strong>${escapeHtml(pool.name)}</strong><small>${pool.min}-${pool.max}</small></div>
      ${academicBlocks.map((_, blockIndex) => {
        const count = callPoolAssignments(pool, blockIndex).length;
        return `<button class="coverage-block-cell ${coverageStatusFor(count, pool)}" data-master-block="${blockIndex + 1}"><strong>${count}</strong></button>`;
      }).join("")}
    </div>`).join("")}
  </div>`;
}

function callPoolDetailPanel(pool) {
  const residents = callPoolAssignments(pool, currentBlock - 1);
  const status = coverageStatusFor(residents.length, pool);
  return `<section class="panel service-roster-detail">
    <div class="panel-header"><div><h2>${escapeHtml(pool.name)} details</h2><p>Block ${currentBlock} · derived from master rotations: ${pool.rotations.map(escapeHtml).join(", ")}</p></div><span class="status-pill ${status === "met" ? "ready" : "review"}">${status === "met" ? "In range" : status}</span></div>
    <div class="service-roster-summary">
      <article><small>Eligible</small><strong>${residents.length}</strong><span>Target ${pool.min}-${pool.max}</span></article>
      <article><small>Source</small><strong>Master schedule</strong><span>${pool.copy}</span></article>
      <article class="${status !== "met" ? "warn" : ""}"><small>Chief action</small><strong>${status === "met" ? "Ready" : status === "short" ? `Need ${pool.min - residents.length}` : "Review excess"}</strong><span>Use this list before assigning clinic call, jeopardy, cross-cover, or no-call protection.</span></article>
    </div>
    <div class="service-roster-list">
      ${residents.length ? residents.map((resident, index) => `<article>
        <span class="avatar" style="background:${avatarColor(index)}">${escapeHtml(resident.id)}</span>
        <div><strong>${escapeHtml(resident.name)}</strong><small>${escapeHtml(resident.pgy)} · ${escapeHtml(resident.source)}</small></div>
        <span>${escapeHtml(pool.name)}</span>
        <button class="secondary-button compact" data-profile-resident="${escapeHtml(resident.name)}">Open profile</button>
      </article>`).join("") : `<article class="empty-service-roster"><div><strong>No eligible residents found</strong><small>Review the master schedule, approved leave, or call-eligible rules for this block.</small></div></article>`}
    </div>
  </section>`;
}

function holidayDefinitions() {
  return [
    { name: "4th of July", block: 1 },
    { name: "Labor Day", block: 3 },
    { name: "Thanksgiving", block: 6 },
    { name: "Christmas Eve", block: 7 },
    { name: "Christmas Day", block: 7 },
    { name: "New Year's Eve", block: 7 },
    { name: "New Year's Day", block: 7 },
    { name: "MLK Day", block: 8 },
    { name: "Memorial Day", block: 12 }
  ];
}

function holidayServiceDefinitions() {
  return [
    { name: "PICU", min: 3, max: 5, color: "picu", copy: "PICU day/night coverage" },
    { name: "NICU", min: 2, max: 4, color: "nicu", copy: "NICU day/night coverage" },
    { name: "Floor Senior", min: 3, max: 5, color: "floor", copy: "Senior floor coverage" },
    { name: "Gold Senior", min: 1, max: 2, color: "gold", copy: "Gold senior coverage" },
    { name: "Floor Interns", min: 6, max: 10, color: "floor", copy: "Floor intern coverage" },
    { name: "Cardiology", min: 1, max: 2, color: "cards", copy: "Cardiology holiday coverage" },
    { name: "Heme/Onc", min: 1, max: 2, color: "pho", copy: "PHO holiday coverage" },
    { name: "Newborn", min: 2, max: 3, color: "newborn", copy: "Newborn nursery coverage" },
    { name: "Clinic Call", min: 1, max: 2, color: "night", copy: "Clinic call coverage" },
    { name: "Jeopardy", min: 2, max: 3, color: "night", copy: "Jeopardy backup coverage" },
    { name: "ED", min: 3, max: 6, color: "ed", copy: "ED holiday schedule awareness" }
  ];
}

function holidayServiceAssignments(service, holiday) {
  const blockIndex = holiday.block - 1;
  return masterResidentsByRotations(blockIndex, serviceRotationMap(service.name), {
    pgy: service.name === "Floor Interns" ? "PGY-1" : undefined,
    excludePgy: ["Floor Senior", "Gold Senior"].includes(service.name) ? "PGY-1" : undefined,
    limit: service.max + 3
  });
}

function holidayExcelView(holidays, services, selectedHoliday, selectedService) {
  return `<section class="panel workbook-excel-panel">
    <div class="panel-header"><div><h2>Excel-like holiday sheet</h2><p>Holiday columns show who is covering each required service, with the source coming from the matching master block.</p></div><span class="status-pill review">Requests linked</span></div>
    ${workbookExcelLegend("Click a holiday/service cell to open the roster, coverage status, and profile links below.")}
    <div class="workbook-excel-table-wrap">
      <table class="workbook-excel-table holiday-excel-table">
        <thead><tr><th>Working service</th>${holidays.map((holiday) => `<th><button data-holiday="${escapeHtml(holiday.name)}"><strong>${escapeHtml(holiday.name)}</strong><small>Block ${holiday.block}</small></button></th>`).join("")}</tr></thead>
        <tbody>
          ${services.map((service) => `<tr>
            <th><span><i class="legend-dot ${service.color}"></i>${escapeHtml(service.name)}</span><small>Target ${service.min}-${service.max}</small></th>
            ${holidays.map((holiday) => {
              const residents = holidayServiceAssignments(service, holiday);
              const status = coverageStatusFor(residents.length, service);
              return `<td class="${status} ${service.color} ${holiday.name === selectedHoliday.name && service.name === selectedService.name ? "active" : ""}">
                <button class="workbook-excel-cell" data-holiday="${escapeHtml(holiday.name)}" data-holiday-service="${escapeHtml(service.name)}">
                  <strong>${residents.length}</strong>
                  <div class="workbook-excel-names">${rosterNameStack(residents, 7)}</div>
                </button>
              </td>`;
            }).join("")}
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
  </section>
  ${holidayDetailPanel(selectedHoliday, selectedService)}`;
}

function holidayWorkbookView() {
  const holidays = holidayDefinitions();
  const services = holidayServiceDefinitions();
  const selectedHoliday = holidays.find((holiday) => holiday.name === activeHoliday) || holidays[0];
  const selectedService = services.find((service) => service.name === activeHolidayService) || services[0];
  activeHoliday = selectedHoliday.name;
  activeHolidayService = selectedService.name;
  return `<div class="annual-workbook-shell">
    <section class="panel workbook-section-head"><div><span class="section-number">4</span></div><div><h2>Holiday coverage workbook</h2><p>Holiday requests come from resident annual submissions. Chiefs can approve requests, then check service coverage for each holiday without searching multiple sheets.</p></div><div class="workbook-head-actions">${workbookViewToggle()}</div></section>
    ${annualWorkbookDisplayMode === "excel" ? holidayExcelView(holidays, services, selectedHoliday, selectedService) : `
    <div class="holiday-grid">
      ${holidays.map((holiday) => {
        const gaps = services.filter((service) => coverageStatusFor(holidayServiceAssignments(service, holiday).length, service) === "short").length;
        return `<button class="panel holiday-card ${holiday.name === selectedHoliday.name ? "active" : ""}" data-holiday="${escapeHtml(holiday.name)}">
          <div><h3>${escapeHtml(holiday.name)}</h3><span>Block ${holiday.block}</span></div>
          <strong>${gaps ? `${gaps} gaps` : "Covered"}</strong>
          <p>${gaps ? "Click to review resident names and missing service coverage." : "Minimum services are covered from master-linked rosters."}</p>
        </button>`;
      }).join("")}
    </div>
    <section class="panel holiday-service-panel">
      <div class="panel-header"><div><h2>Holiday service table</h2><p>Compact digital version of the Excel holiday sheet. Click any service cell to open the names.</p></div><span class="status-pill review">Requests linked</span></div>
      <div class="holiday-service-table">
        <div class="holiday-service-row header"><div>Service</div>${holidays.map((holiday) => `<div>${escapeHtml(holiday.name)}</div>`).join("")}</div>
        ${services.map((service) => `<div class="holiday-service-row">
          <div><strong>${escapeHtml(service.name)}</strong><small>Target ${service.min}-${service.max}</small></div>
          ${holidays.map((holiday) => {
            const residents = holidayServiceAssignments(service, holiday);
            const status = coverageStatusFor(residents.length, service);
            return `<button class="${status} ${holiday.name === selectedHoliday.name && service.name === selectedService.name ? "active" : ""}" data-holiday="${escapeHtml(holiday.name)}" data-holiday-service="${escapeHtml(service.name)}">${residents.slice(0, 4).map((resident) => `<span>${escapeHtml(resident.id)}</span>`).join("")}${residents.length > 4 ? `<em>+${residents.length - 4}</em>` : ""}</button>`;
          }).join("")}
        </div>`).join("")}
      </div>
    </section>
    ${holidayDetailPanel(selectedHoliday, selectedService)}`}
  </div>`;
}

function holidayDetailPanel(holiday, service) {
  const residents = holidayServiceAssignments(service, holiday);
  const status = coverageStatusFor(residents.length, service);
  return `<section class="panel service-roster-detail">
    <div class="panel-header"><div><h2>${escapeHtml(holiday.name)} · ${escapeHtml(service.name)}</h2><p>Block ${holiday.block} · ${service.copy} · residents pulled from matching master rotations</p></div><span class="status-pill ${status === "met" ? "ready" : "review"}">${status === "met" ? "Covered" : status}</span></div>
    <div class="service-roster-summary">
      <article><small>Assigned</small><strong>${residents.length}</strong><span>Target ${service.min}-${service.max}</span></article>
      <article><small>Master source</small><strong>${serviceRotationMap(service.name).join(", ")}</strong><span>Not random; derived from finalized rotations</span></article>
      <article class="${status !== "met" ? "warn" : ""}"><small>Chief action</small><strong>${status === "met" ? "No action" : status === "short" ? `Add ${service.min - residents.length}` : "Review"}</strong><span>${status === "short" ? "Add from call pool/outside rotators or edit the master." : "Check holiday request fairness and publish."}</span></article>
    </div>
    <div class="service-roster-list">
      ${residents.length ? residents.map((resident, index) => `<article>
        <span class="avatar" style="background:${avatarColor(index)}">${escapeHtml(resident.id)}</span>
        <div><strong>${escapeHtml(resident.name)}</strong><small>${escapeHtml(resident.pgy)} · ${escapeHtml(resident.source)}</small></div>
        <span>${escapeHtml(service.name)}</span>
        <button class="secondary-button compact" data-profile-resident="${escapeHtml(resident.name)}">Open profile</button>
      </article>`).join("") : `<article class="empty-service-roster"><div><strong>No residents found</strong><small>This holiday/service needs manual review or additional coverage.</small></div></article>`}
    </div>
  </section>`;
}

function holidayBreakDefinitions() {
  return [
    { name: "Break 1", dates: "Dec 24-Jan 1", block: 7 },
    { name: "Break 2", dates: "Dec 29-Jan 4", block: 7 }
  ];
}

function breakServiceDefinitions() {
  return [
    { name: "PICU", min: 5, max: 8, color: "picu" },
    { name: "NICU", min: 4, max: 7, color: "nicu" },
    { name: "Floor Senior", min: 3, max: 5, color: "floor" },
    { name: "Gold Senior", min: 1, max: 2, color: "gold" },
    { name: "NFSS", min: 4, max: 6, color: "night" },
    { name: "Floor Interns", min: 8, max: 12, color: "floor" },
    { name: "Cardiology", min: 1, max: 2, color: "cards" },
    { name: "Heme/Onc", min: 1, max: 2, color: "pho" },
    { name: "Newborn", min: 2, max: 4, color: "newborn" },
    { name: "Clinic", min: 4, max: 5, color: "clinic" },
    { name: "ED", min: 5, max: 8, color: "ed" }
  ];
}

function holidayBreakAssignments(service, breakRow) {
  return masterResidentsByRotations(breakRow.block - 1, serviceRotationMap(service.name), {
    pgy: service.name === "Floor Interns" ? "PGY-1" : undefined,
    excludePgy: ["Floor Senior", "Gold Senior", "NFSS"].includes(service.name) ? "PGY-1" : undefined,
    limit: service.max + 4
  });
}

function holidayBreakExcelView(breaks, services, selectedBreak, selectedService) {
  return `<section class="panel workbook-excel-panel">
    <div class="panel-header"><div><h2>Excel-like holiday break sheet</h2><p>Rows are required services, columns are break periods, and names are pulled from the Block 7 master schedule source.</p></div><span class="status-pill review">Break staffing</span></div>
    ${workbookExcelLegend("Click a break/service cell to review the resident list and coverage status below.")}
    <div class="workbook-excel-table-wrap">
      <table class="workbook-excel-table break-excel-table">
        <thead><tr><th>Break service</th>${breaks.map((breakRow) => `<th><button data-break="${escapeHtml(breakRow.name)}"><strong>${escapeHtml(breakRow.name)}</strong><small>${escapeHtml(breakRow.dates)}</small></button></th>`).join("")}</tr></thead>
        <tbody>
          ${services.map((service) => `<tr>
            <th><span><i class="legend-dot ${service.color}"></i>${escapeHtml(service.name)}</span><small>Target ${service.min}-${service.max}</small></th>
            ${breaks.map((breakRow) => {
              const residents = holidayBreakAssignments(service, breakRow);
              const status = coverageStatusFor(residents.length, service);
              return `<td class="${status} ${service.color} ${breakRow.name === selectedBreak.name && service.name === selectedService.name ? "active" : ""}">
                <button class="workbook-excel-cell" data-break="${escapeHtml(breakRow.name)}" data-break-service="${escapeHtml(service.name)}">
                  <strong>${residents.length}</strong>
                  <div class="workbook-excel-names">${rosterNameStack(residents, 8)}</div>
                </button>
              </td>`;
            }).join("")}
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
  </section>
  ${holidayBreakDetailPanel(selectedBreak, selectedService)}`;
}

function holidayBreakWorkbookView() {
  const breaks = holidayBreakDefinitions();
  const services = breakServiceDefinitions();
  const selectedBreak = breaks.find((item) => item.name === activeBreak) || breaks[0];
  const selectedService = services.find((service) => service.name === activeBreakService) || services[0];
  activeBreak = selectedBreak.name;
  activeBreakService = selectedService.name;
  return `<div class="annual-workbook-shell">
    <section class="panel workbook-section-head"><div><span class="section-number">5</span></div><div><h2>Holiday break workbook</h2><p>When the program uses winter breaks, chiefs can staff each required service while tracking who is away and who already worked a holiday.</p></div><div class="workbook-head-actions">${workbookViewToggle()}</div></section>
    ${annualWorkbookDisplayMode === "excel" ? holidayBreakExcelView(breaks, services, selectedBreak, selectedService) : `
    <div class="break-grid">
      ${breaks.map((breakRow) => {
        const gaps = services.filter((service) => coverageStatusFor(holidayBreakAssignments(service, breakRow).length, service) === "short").length;
        return `<section class="panel break-card ${breakRow.name === selectedBreak.name ? "active" : ""}">
        <div class="panel-header"><div><h2>${escapeHtml(breakRow.name)}</h2><p>${escapeHtml(breakRow.dates)} · Block ${breakRow.block}</p></div><button class="status-pill ${gaps ? "review" : "ready"}" data-break="${escapeHtml(breakRow.name)}">${gaps ? `${gaps} gaps` : "Ready"}</button></div>
        <div class="break-service-list">
          ${services.map((service) => {
            const residents = holidayBreakAssignments(service, breakRow);
            const status = coverageStatusFor(residents.length, service);
            return `<button class="${status} ${breakRow.name === selectedBreak.name && service.name === selectedService.name ? "active" : ""}" data-break="${escapeHtml(breakRow.name)}" data-break-service="${escapeHtml(service.name)}">
              <span>${escapeHtml(service.name)}</span><strong>${residents.length}/${service.min}</strong><div>${residents.slice(0, 6).map((resident) => `<b>${escapeHtml(resident.id)}</b>`).join("")}${residents.length > 6 ? `<b>+${residents.length - 6}</b>` : ""}</div>
            </button>`;
          }).join("")}
        </div>
      </section>`;
      }).join("")}
    </div>
    ${holidayBreakDetailPanel(selectedBreak, selectedService)}`}
  </div>`;
}

function holidayBreakDetailPanel(breakRow, service) {
  const residents = holidayBreakAssignments(service, breakRow);
  const status = coverageStatusFor(residents.length, service);
  return `<section class="panel service-roster-detail">
    <div class="panel-header"><div><h2>${escapeHtml(breakRow.name)} · ${escapeHtml(service.name)}</h2><p>${escapeHtml(breakRow.dates)} · pulled from Block ${breakRow.block} master schedule assignments</p></div><span class="status-pill ${status === "met" ? "ready" : "review"}">${status === "met" ? "Ready" : status}</span></div>
    <div class="service-roster-summary">
      <article><small>Assigned</small><strong>${residents.length}</strong><span>Target ${service.min}-${service.max}</span></article>
      <article><small>Master source</small><strong>${serviceRotationMap(service.name).join(", ")}</strong><span>Selected from block rotations</span></article>
      <article class="${status !== "met" ? "warn" : ""}"><small>Chief action</small><strong>${status === "met" ? "No action" : status === "short" ? `Add ${service.min - residents.length}` : "Review"}</strong><span>Use this to balance Christmas/New Year break staffing before monthly schedules are generated.</span></article>
    </div>
    <div class="service-roster-list">
      ${residents.length ? residents.map((resident, index) => `<article>
        <span class="avatar" style="background:${avatarColor(index)}">${escapeHtml(resident.id)}</span>
        <div><strong>${escapeHtml(resident.name)}</strong><small>${escapeHtml(resident.pgy)} · ${escapeHtml(resident.source)}</small></div>
        <span>${escapeHtml(service.name)}</span>
        <button class="secondary-button compact" data-profile-resident="${escapeHtml(resident.name)}">Open profile</button>
      </article>`).join("") : `<article class="empty-service-roster"><div><strong>No residents found</strong><small>Review master schedule, approved vacation, or add supplemental coverage.</small></div></article>`}
    </div>
  </section>`;
}

function masterBuildSteps() {
  return [
    ["pgy", "1", "Choose PGY", "Set curriculum and eligible blocks"],
    ["templates", "2", "Resident rankings", "Review submitted master preferences"],
    ["coverage", "3", "Block coverage", "Counts by block and service"],
    ["finalize", "4", "Finalize master", "Edit cells and save as source data"]
  ];
}

function masterStepComplete(step) {
  if (step === "pgy") return Boolean(activeMasterPgy);
  if (step === "templates") return annualPreferenceSubmission.status !== "draft";
  if (step === "coverage") return pgyCoverageSummary(activeMasterPgy).short < academicBlocks.length;
  return false;
}

function ensurePgyMasterRule(pgy = activeMasterPgy) {
  if (pgy === "All PGYs") return pgyRule(pgy);
  if (!pgyMasterRules[pgy]) {
    const rows = masterRowsForPgy(pgy);
    pgyMasterRules[pgy] = {
      title: `${pgy} master schedule`,
      copy: "Configure this class before assigning annual master templates.",
      classSize: rows.length || 1,
      electiveEligible: [],
      vacationEligible: [],
      rotations: masterRotationOptions
        .filter((option) => option.core || (option.pgy || []).includes(pgy))
        .map((option) => ({ name: option.name, min: 0, max: option.capacity || 4, mandatory: Boolean(option.core), feedsService: option.name }))
    };
  }
  if (!pgyMasterRules[pgy].classSize) pgyMasterRules[pgy].classSize = masterRowsForPgy(pgy).length || 1;
  if (!Array.isArray(pgyMasterRules[pgy].rotations)) pgyMasterRules[pgy].rotations = [];
  return pgyMasterRules[pgy];
}

function syncMasterRotationOption(rule, pgy = activeMasterPgy) {
  if (!rule?.name) return;
  let option = masterRotationOptions.find((item) => item.name === rule.name);
  if (!option) {
    option = { name: rule.name, color: "easy", capacity: Number(rule.max) || 4, inpatient: Boolean(rule.mandatory), pgy: [pgy], core: Boolean(rule.mandatory) };
    masterRotationOptions.push(option);
  } else {
    option.capacity = Number(rule.max) || option.capacity || 4;
    option.core = Boolean(rule.mandatory);
    option.pgy = Array.from(new Set([...(option.pgy || []), pgy].filter(Boolean)));
  }
}

function pgyClassTarget(pgy = activeMasterPgy) {
  return Number(ensurePgyMasterRule(pgy).classSize || masterRowsForPgy(pgy).length || 0);
}

function masterRankingRows(rows = masterRowsForPgy(activeMasterPgy)) {
  const enriched = rows.map((item, index) => ({
    ...item,
    submissionOrder: index + 3,
    topTemplates: ["A", "F", "J", "H", "E"].slice(index % 3, index % 3 + 3).join(" · ") || "A · F · J",
    flag: index % 4 === 0 ? "Fellowship timing" : index % 3 === 0 ? "Vacation priority" : "Standard",
    hasRequest: index % 3 === 0 || index % 4 === 0
  }));
  if (masterRankingSort === "alpha") return enriched.sort((a, b) => a.resident.name.localeCompare(b.resident.name));
  if (masterRankingSort === "template") return enriched.sort((a, b) => a.topTemplates.localeCompare(b.topTemplates));
  return enriched.sort((a, b) => a.submissionOrder - b.submissionOrder);
}

function masterGuidedStepPanel(step) {
  const visibleRows = masterRowsForPgy(activeMasterPgy);
  const activeRule = ensurePgyMasterRule(activeMasterPgy);
  if (step === "pgy") return `<section class="panel master-step-panel">
    <div class="master-step-head"><div><span class="section-number">1</span></div><div><h2>Choose the PGY year and build its curriculum</h2><p>Chiefs define how many master schedules are needed, which rotations are core, and the minimum/maximum residents needed per block. These targets drive coverage review later.</p></div></div>
    <div class="portal-switch pgy-switch large"><button class="portal-option ${activeMasterPgy==="PGY-1"?"active":""}" data-master-pgy="PGY-1">PGY-1</button><button class="portal-option ${activeMasterPgy==="PGY-2"?"active":""}" data-master-pgy="PGY-2">PGY-2</button><button class="portal-option ${activeMasterPgy==="PGY-3"?"active":""}" data-master-pgy="PGY-3">PGY-3</button><button class="portal-option ${activeMasterPgy==="All PGYs"?"active":""}" data-master-pgy="All PGYs">All</button></div>
    <div class="pgy-master-context master-context-cards">
      <div><strong>${visibleRows.length}/${pgyClassTarget(activeMasterPgy)}</strong><span>resident profiles matched to needed masters</span></div>
      <div><strong>${activeRule.rotations.filter((item)=>item.mandatory).length}</strong><span>mandatory/core rotations tracked</span></div>
      <div><strong>${activeRule.vacationEligible.map((block)=>`B${block}`).join(", ") || "None"}</strong><span>vacation eligible blocks</span></div>
      <div><strong>${pgyCoverageSummary(activeMasterPgy).short}</strong><span>block-service minimum gaps</span></div>
    </div>
    <div class="master-setup-controls master-setup-cards">
      <label><span>Number of blocks per year</span><input class="program-block-count-input" type="number" min="1" max="52" value="${Number(programSettings.blockCount) || academicBlocks.length}"></label>
      <label><span>Number of ${activeMasterPgy} master schedules needed</span><input class="master-class-size-input" type="number" min="1" value="${pgyClassTarget(activeMasterPgy)}"></label>
      <button class="primary-button compact" data-master-add-rotation><span class="icon" data-icon="plus"></span> Add rotation</button>
    </div>
    <div class="master-planning-goals">
      <label><input class="master-planning-option" data-planning-option="distributeElectivesEvenly" type="checkbox" ${masterPlanningOptions.distributeElectivesEvenly ? "checked" : ""}> Distribute elective blocks evenly</label>
      <label><input class="master-planning-option" data-planning-option="earlyElectiveWindow" type="checkbox" ${masterPlanningOptions.earlyElectiveWindow ? "checked" : ""}> Aim for one elective in the first 5 blocks</label>
      <label><input class="master-planning-option" data-planning-option="lateElectiveWindow" type="checkbox" ${masterPlanningOptions.lateElectiveWindow ? "checked" : ""}> Aim for one elective late in the year</label>
      <label><input class="master-planning-option" data-planning-option="avoidBackToBackInpatient" type="checkbox" ${masterPlanningOptions.avoidBackToBackInpatient ? "checked" : ""}> Avoid back-to-back heavy inpatient stretches when possible</label>
    </div>
    <div class="master-rule-card-grid">
      ${activeRule.rotations.map((rule, index)=>`<article class="master-rule-card editable">
        <div class="rule-card-top">
          <label><span>Rotation name</span><input class="master-rule-input master-rule-name" data-rule-index="${index}" data-field="name" value="${escapeHtml(rule.name)}"></label>
          <div class="rule-order-tools horizontal">
            <button class="icon-button" data-master-rule-move="${index}" data-direction="up" aria-label="Move ${escapeHtml(rule.name)} earlier">←</button>
            <button class="icon-button" data-master-rule-move="${index}" data-direction="down" aria-label="Move ${escapeHtml(rule.name)} later">→</button>
          </div>
        </div>
        <div class="rule-range-row">
          <label><span>Minimum / block</span><input class="master-rule-input" data-rule-index="${index}" data-field="min" type="number" min="0" value="${Number(rule.min)||0}"></label>
          <label><span>Maximum / block</span><input class="master-rule-input" data-rule-index="${index}" data-field="max" type="number" min="0" value="${Number(rule.max)||0}"></label>
        </div>
        <label><span>Feeds service tab</span><input class="master-rule-input" data-rule-index="${index}" data-field="feedsService" value="${escapeHtml(rule.feedsService || "")}" placeholder="Optional"></label>
        <div class="rule-card-footer">
          <label class="checkbox-line compact"><input class="master-rule-input" data-rule-index="${index}" data-field="mandatory" type="checkbox" ${rule.mandatory ? "checked" : ""}> Core rotation</label>
          <button class="danger-button compact" data-master-rule-delete="${index}">Delete</button>
        </div>
      </article>`).join("")}
    </div>
    <div class="form-footer"><button class="primary-button" data-master-step="templates">Next: review resident rankings <span class="icon" data-icon="chevron"></span></button></div>
  </section>`;

  if (step === "templates") return `<section class="panel master-step-panel">
    <div class="master-step-head"><div><span class="section-number">2</span></div><div><h2>Resident-submitted master rankings</h2><p>Residents rank master templates at the beginning of the year. Chiefs use this as decision support, then adjust for capacity and fairness.</p></div></div>
    <div class="ranking-toolbar">
      <article><strong>${visibleRows.length}/${pgyClassTarget(activeMasterPgy)}</strong><span>residents submitted vs needed master templates</span></article>
      <label><span>Sort residents by</span><select class="master-ranking-sort">
        <option value="submitted" ${masterRankingSort==="submitted"?"selected":""}>Submitted first</option>
        <option value="alpha" ${masterRankingSort==="alpha"?"selected":""}>Alphabetical name</option>
        <option value="template" ${masterRankingSort==="template"?"selected":""}>Top template order</option>
      </select></label>
    </div>
    <div class="master-template-review">
      ${masterRankingRows(visibleRows).slice(0, 12).map(({ resident, submissionOrder, topTemplates, flag, hasRequest }, index)=>`<button class="master-template-card ${hasRequest ? "has-note" : ""}" data-profile-resident="${escapeHtml(resident.name)}">
        <span class="avatar" style="background:${avatarColor(index)}">${resident.id}</span>
        <div><strong>${escapeHtml(resident.name)}</strong><small>${resident.pgy} · submitted ${submissionOrder} of ${visibleRows.length + 4}</small></div>
        <b>${escapeHtml(topTemplates)}</b>
        <em>${escapeHtml(flag)}</em>
      </button>`).join("")}
    </div>
    <div class="master-decision-note"><span class="icon" data-icon="spark"></span><p>Algorithm suggestion: sort by submission time, flag fellowship or major life events, then check whether the selected template causes a service shortage in any block.</p></div>
    <div class="form-footer"><button class="secondary-button" data-master-step="pgy">Back</button><button class="primary-button" data-master-step="coverage">Next: inspect block coverage <span class="icon" data-icon="chevron"></span></button></div>
  </section>`;

  if (step === "coverage") return `<section class="panel master-step-panel">
    <div class="master-step-head"><div><span class="section-number">3</span></div><div><h2>Coverage by block and service</h2><p>Click any block to see exactly how many residents are assigned to each service, who they are, and what is missing.</p></div></div>
    ${masterBlockStrip()}
    <div class="master-coverage-detail">
      <section>${masterBlockStaffingPanel(true)}</section>
      <section class="panel block-service-table"><div class="panel-header"><div><h2>All services in Block ${currentBlock}</h2><p>Minimum and maximum targets for ${activeMasterPgy}</p></div></div>${pgyBlockStats(activeMasterPgy, currentBlock - 1).map((row)=>`<button class="block-service-row ${row.status} ${activeMasterBlockService===row.name?"active":""}" data-master-block-service="${escapeHtml(row.name)}"><strong>${escapeHtml(row.name)}</strong><span>${row.count} assigned</span><span>Target ${row.min}-${row.max}</span><em>${row.status === "short" ? `Need ${Math.abs(row.gap)} more` : row.status === "over" ? `${row.count-row.max} over` : "OK"}</em></button>`).join("")}</section>
    </div>
    ${masterBlockServiceDetail()}
    <div class="form-footer"><button class="secondary-button" data-master-step="templates">Back</button><button class="primary-button" data-master-step="finalize">Next: finalize editable master <span class="icon" data-icon="chevron"></span></button></div>
  </section>`;

  const conflicts = getMasterConflicts();
  return `<section class="panel master-step-panel">
    <div class="master-step-head"><div><span class="section-number">4</span></div><div><h2>Finalize and edit the master schedule</h2><p>After chiefs approve annual inputs and resolve coverage gaps, this grid becomes the objective source used by monthly service builders.</p></div></div>
    <div class="final-master-actions">
      <article><small>Active PGY</small><strong>${activeMasterPgy}</strong><span>${masterRowsForPgy(activeMasterPgy).length} residents</span></article>
      <article><small>Coverage gaps</small><strong>${pgyCoverageSummary(activeMasterPgy).short}</strong><span>Review before publishing</span></article>
      <article><small>Alerts</small><strong>${conflicts.length}</strong><span>Capacity and transition checks</span></article>
      <button class="primary-button save-master"><span class="icon" data-icon="check"></span> Save final master</button>
    </div>
    <div class="master-toolbar final-toolbar">
      <div class="master-edit-tools"><span class="save-state"><span class="icon" data-icon="check"></span> Autosaved draft</span><button class="secondary-button compact lock-selected"><span class="icon" data-icon="check"></span> Lock selected</button><button class="secondary-button compact clear-master-selection">Clear selection</button></div>
    </div>
    ${editableMasterGridHtml()}
  </section>`;
}

function masterBlockStrip() {
  return `<div class="pgy-coverage-strip master-step-block-strip" aria-label="Click a block to inspect staffing counts">
    ${academicBlocks.map(([number, dates], index) => {
      const rows = pgyCoverageRows(activeMasterPgy, index);
      const short = rows.filter((row)=>row.status==="short").length;
      const over = rows.filter((row)=>row.status==="over").length;
      const total = pgyBlockStats(activeMasterPgy, index).reduce((sum, row) => sum + row.residents.length, 0);
      return `<button class="pgy-block-counter ${Number(number)===currentBlock?"active":""} ${short?"short":over?"over":"met"}" data-master-block="${number}"><strong>Block ${number}</strong><small>${dates}</small><em>${total} assigned</em><span>${short ? `${short} short` : over ? `${over} over` : "Targets met"}</span></button>`;
    }).join("")}
  </div>`;
}

function masterBlockStaffingPanel(innerOnly = false) {
  const visibleRows = masterRowsForPgy(activeMasterPgy);
  const selectedBlockStats = pgyBlockStats(activeMasterPgy, currentBlock - 1);
  const selectedBlockShort = selectedBlockStats.filter((row) => row.status === "short").length;
  const selectedBlockOver = selectedBlockStats.filter((row) => row.status === "over").length;
  const selectedBlockAssigned = selectedBlockStats.reduce((sum, row) => sum + row.residents.length, 0);
  const body = `
    <div class="panel-header"><div><h2>Block ${currentBlock} staffing</h2><p>${academicBlocks[currentBlock-1][1]} · ${activeMasterPgy}</p></div><span class="status-pill ${selectedBlockShort || selectedBlockOver ? "review" : "ready"}">${selectedBlockShort ? `${selectedBlockShort} gap${selectedBlockShort>1?"s":""}` : selectedBlockOver ? `${selectedBlockOver} over` : "Meets targets"}</span></div>
    <div class="block-stat-summary">
      <article><small>Tracked assignments</small><strong>${selectedBlockAssigned}</strong><span>${visibleRows.length} ${activeMasterPgy} profiles checked</span></article>
      <article><small>Coverage review</small><strong>${selectedBlockShort + selectedBlockOver}</strong><span>${selectedBlockShort} short · ${selectedBlockOver} over</span></article>
    </div>
    <div class="block-service-stats">
      ${selectedBlockStats.map((row) => {
        const option = masterRotationOptions.find((item)=>item.name===row.name)||masterRotationOptions[0];
        const residentChips = row.residents.length
          ? row.residents.slice(0, 6).map(({ resident })=>`<span>${escapeHtml(resident.name.replace("Resident ","R"))}</span>`).join("") + (row.residents.length > 6 ? `<span>+${row.residents.length - 6} more</span>` : "")
          : `<em>No residents assigned</em>`;
        const action = row.status === "short"
          ? `Need ${Math.abs(row.gap)} more. Add outside rotator or edit master.`
          : row.status === "over"
            ? `${row.count - row.max} above max. Consider moving resident.`
            : `${row.count} resident${row.count===1?"":"s"} in target range.`;
        return `<article class="block-service-stat ${row.status}">
          <div class="service-stat-head"><span><i class="legend-dot ${option.color}"></i>${escapeHtml(row.name)}</span><strong>${row.count}</strong></div>
          <div class="service-stat-target"><span>Target ${row.min}-${row.max}</span><span>${row.mandatory ? "Core" : "Flexible"}</span></div>
          <div class="block-resident-chips">${residentChips}</div>
          <p>${escapeHtml(action)}</p>
        </article>`;
      }).join("")}
    </div>`;
  return innerOnly ? `<section class="panel block-capacity-panel block-stat-panel">${body}</section>` : `<section class="panel block-capacity-panel block-stat-panel">${body}</section>`;
}

function masterBlockServiceDetail() {
  const stats = pgyBlockStats(activeMasterPgy, currentBlock - 1);
  const row = stats.find((item) => item.name === activeMasterBlockService) || stats[0];
  if (!row) return "";
  const option = masterRotationOptions.find((item) => item.name === row.name) || masterRotationOptions[0];
  const statusCopy = row.status === "short"
    ? `Need ${Math.abs(row.gap)} more resident${Math.abs(row.gap) === 1 ? "" : "s"} to meet the minimum.`
    : row.status === "over"
      ? `${row.count - row.max} resident${row.count - row.max === 1 ? "" : "s"} above the target maximum.`
      : "This service is within the target range.";
  return `<section class="panel master-service-detail-card">
    <div class="panel-header">
      <div><h2>${escapeHtml(row.name)} details · Block ${currentBlock}</h2><p>${escapeHtml(statusCopy)} Names are pulled from the current ${activeMasterPgy} master schedule.</p></div>
      <span class="status-pill ${row.status === "met" ? "ready" : "review"}">${row.count}/${row.min}-${row.max}</span>
    </div>
    <div class="service-roster-list compact-roster">
      ${row.residents.length ? row.residents.map(({ resident, row: masterRow }, index) => `<article>
        <span class="avatar" style="background:${avatarColor(masterRow)}">${escapeHtml(resident.id)}</span>
        <div><strong>${escapeHtml(resident.name)}</strong><small>${escapeHtml(resident.pgy)} · master source · ${escapeHtml(row.name)}</small></div>
        <span><i class="legend-dot ${option.color}"></i> Block ${currentBlock}</span>
        <button class="secondary-button compact" data-profile-resident="${escapeHtml(resident.name)}">Open profile</button>
      </article>`).join("") : `<article class="empty-service-roster"><div><strong>No residents assigned yet</strong><small>Add outside rotators or edit the master schedule before finalizing.</small></div></article>`}
    </div>
  </section>`;
}

function editableMasterGridHtml() {
  const visibleRows = masterRowsForPgy(activeMasterPgy);
  return `<div class="master-legend">${masterRotationOptions.map((option)=>`<span><i class="legend-dot ${option.color}"></i>${option.name}<small>max ${option.capacity}/block</small></span>`).join("")}</div>
  <div class="editable-master-grid">
    <div class="editable-master-row master-header"><div>Resident</div>${academicBlocks.map(([number,dates])=>`<button class="master-column-header ${Number(number)===currentBlock?"active":""}" data-master-block="${number}"><strong>Block ${number}</strong><small>${dates}</small><em>${getBlockConflictCount(Number(number)-1) ? `${getBlockConflictCount(Number(number)-1)} issue` : "Clear"}</em></button>`).join("")}<div>Progress</div></div>
    ${visibleRows.map(({ resident, row })=>`<div class="editable-master-row">
      <div class="master-person"><span class="avatar" style="background:${avatarColor(row)}">${resident.id}</span><span><strong>${resident.name}</strong><small>${resident.pgy}</small></span></div>
      ${masterAssignments[row].map((assignment,column)=>masterAssignmentCell(row,column,assignment)).join("")}
      <div class="resident-requirement-score">${getResidentRequirementScore(row)}%<span>${getResidentConflictCount(row) ? `${getResidentConflictCount(row)} issue` : "On track"}</span></div>
    </div>`).join("")}
  </div>`;
}

function masterAssignmentCell(row, column, assignment) {
  const option = masterRotationOptions.find((item) => item.name === assignment.rotation) || masterRotationOptions[0];
  const conflicts = getCellConflicts(row, column);
  return `<div class="master-assignment-cell ${option.color} ${assignment.locked ? "locked" : ""} ${conflicts.length ? "has-conflict" : ""}" data-master-row="${row}" data-master-column="${column}" draggable="${assignment.locked ? "false" : "true"}">
    <select class="master-rotation-select" aria-label="${masterResidents[row].name} Block ${column+1} rotation" ${assignment.locked ? "disabled" : ""}>
      ${masterRotationOptions.map((rotation)=>`<option value="${rotation.name}" ${rotation.name===assignment.rotation?"selected":""}>${rotation.name}</option>`).join("")}
    </select>
    <button class="cell-lock" aria-label="${assignment.locked?"Unlock":"Lock"} ${masterResidents[row].name} Block ${column+1}"><span class="icon" data-icon="${assignment.locked?"check":"more"}"></span></button>
    ${conflicts.length ? `<span class="cell-warning" title="${conflicts[0].title}"><span class="icon" data-icon="alert"></span></span>` : ""}
  </div>`;
}

function getRotationCount(column, rotation) {
  return masterAssignments.reduce((count,row)=>count+(row[column].rotation===rotation?1:0),0);
}
function masterRowsForPgy(pgy = activeMasterPgy) {
  return masterResidents.map((resident, row) => ({ resident, row })).filter((item) => pgy === "All PGYs" || item.resident.pgy === pgy);
}
function pgyRule(pgy = activeMasterPgy) {
  return pgyMasterRules[pgy] || {
    title: `${pgy} master schedule`,
    copy: "Use this view to track rotation assignments, service coverage, and resident requirements.",
    electiveEligible: [],
    vacationEligible: [],
    rotations: masterRotationOptions.filter((option) => option.core).map((option) => ({ name: option.name, min: 0, max: option.capacity, mandatory: true, feedsService: option.name }))
  };
}
function pgyRotationCount(pgy, column, rotation) {
  return masterRowsForPgy(pgy).reduce((count, item) => count + (masterAssignments[item.row]?.[column]?.rotation === rotation ? 1 : 0), 0);
}
function pgyResidentsForRotation(pgy, column, rotation) {
  return masterRowsForPgy(pgy).filter(({ row }) => masterAssignments[row]?.[column]?.rotation === rotation);
}
function pgyCoverageRows(pgy = activeMasterPgy, column = currentBlock - 1) {
  return pgyRule(pgy).rotations.map((rule) => {
    const count = pgyRotationCount(pgy, column, rule.name);
    const status = count < rule.min ? "short" : count > rule.max ? "over" : "met";
    return { ...rule, count, status, gap: rule.min - count };
  });
}
function pgyBlockStats(pgy = activeMasterPgy, column = currentBlock - 1) {
  return pgyCoverageRows(pgy, column).map((row) => ({
    ...row,
    residents: pgyResidentsForRotation(pgy, column, row.name)
  }));
}
function pgyCoverageConflicts(pgy = activeMasterPgy) {
  return academicBlocks.flatMap((_, column) => pgyCoverageRows(pgy, column)
    .filter((row) => row.status !== "met")
    .map((row) => ({
      row: masterRowsForPgy(pgy)[0]?.row || 0,
      column,
      severity: row.status === "short" ? "warning" : "danger",
      title: `${row.name} ${row.status === "short" ? "below minimum" : "over maximum"}`,
      copy: `Block ${column + 1} has ${row.count}; target is ${row.min}-${row.max} ${pgy} resident${row.max === 1 ? "" : "s"}.`
    })));
}
function pgyCoverageScore(pgy = activeMasterPgy) {
  const rows = academicBlocks.flatMap((_, column) => pgyCoverageRows(pgy, column));
  if (!rows.length) return 100;
  return Math.round(rows.filter((row) => row.status === "met").length / rows.length * 100);
}
function pgyCoverageSummary(pgy = activeMasterPgy) {
  const rows = academicBlocks.flatMap((_, column) => pgyCoverageRows(pgy, column));
  return {
    met: rows.filter((row) => row.status === "met").length,
    short: rows.filter((row) => row.status === "short").length,
    over: rows.filter((row) => row.status === "over").length
  };
}
function getCellConflicts(row, column) {
  return getMasterConflicts().filter((conflict)=>conflict.row===row&&conflict.column===column);
}
function getBlockConflictCount(column) {
  return getMasterConflicts().filter((conflict)=>conflict.column===column).length;
}
function getResidentConflictCount(row) {
  return getMasterConflicts().filter((conflict)=>conflict.row===row).length;
}
function getResidentRequirementScore(row) {
  const requirements = masterResidents[row].requirements;
  return Math.round(Object.entries(requirements).reduce((sum,[rotation,required])=>sum+Math.min(1,masterAssignments[row].filter(item=>item.rotation===rotation).length/required),0)/Object.keys(requirements).length*100);
}
function getMasterConflicts() {
  const conflicts = [...pgyCoverageConflicts(activeMasterPgy)];
  academicBlocks.forEach((_,column)=>{
    masterRotationOptions.forEach((option)=>{
      const assignedRows = masterAssignments.map((row,index)=>row[column].rotation===option.name?index:-1).filter(index=>index>=0);
      if (assignedRows.length>option.capacity) {
        assignedRows.slice(option.capacity).forEach((row)=>conflicts.push({row,column,severity:"danger",title:`${option.name} over capacity`,copy:`Block ${column+1} has ${assignedRows.length} residents; maximum is ${option.capacity}.`}));
      }
    });
  });
  masterAssignments.forEach((assignments,row)=>{
    assignments.forEach((assignment,column)=>{
      const currentOption=masterRotationOptions.find(option=>option.name===assignment.rotation);
      const next=assignments[column+1];
      const nextOption=next&&masterRotationOptions.find(option=>option.name===next.rotation);
      if (assignment.rotation==="Night Float"&&nextOption?.inpatient) conflicts.push({row,column:column+1,severity:"danger",title:"Unsafe block transition",copy:`${masterResidents[row].name} moves from Night Float to ${next.rotation} without a recovery block.`});
    });
    Object.entries(masterResidents[row].requirements).forEach(([rotation,required])=>{
      const actual=assignments.filter(item=>item.rotation===rotation).length;
      if(actual<required) conflicts.push({row,column:12,severity:"warning",title:`Missing ${rotation} requirement`,copy:`${masterResidents[row].name} needs ${required-actual} more ${rotation} block${required-actual>1?"s":""}.`});
    });
  });
  return conflicts;
}
function blockDates(index) { return ["7/1–7/27","7/28–8/24","8/25–9/21","9/22–10/19","10/20–11/16","11/17–12/14","12/15–1/11","1/12–2/8","2/9–3/8","3/9–4/5","4/6–5/3","5/4–5/31","6/1–6/30"][index]; }

function blockNavigator(context, compact = false) {
  return `<section class="block-navigator ${compact ? "compact-blocks" : ""}">
    <div class="block-nav-head">
      <div><span>Academic year</span><strong>2025–2026 · 13 scheduling blocks</strong></div>
      <div class="block-context"><span class="master-linked"><span class="icon" data-icon="grid"></span> Master schedule linked</span><button class="link-button" data-view-target="master">Open annual plan →</button></div>
    </div>
    <div class="block-track">
      ${academicBlocks.map(([number, dates]) => {
        const status = blockLifecycleSummary(Number(number));
        return `<button class="block-chip ${Number(number) === currentBlock ? "active" : ""} ${status}" data-block="${number}" data-context="${context}">
          <span>Block ${number}</span><small>${dates}</small><i></i>
        </button>`;
      }).join("")}
    </div>
  </section>`;
}

function rulesView() {
  return `<section class="page rules-page">
    <div class="page-head">
      <div><p class="eyebrow">Scheduling configuration</p><h1>Rules and institutions</h1><p>Build reusable institutional patterns and customize the requirements for every schedule tab.</p></div>
      <div class="page-head-actions"><button class="secondary-button compact"><span class="icon" data-icon="download"></span> Import rules</button><button class="primary-button compact save-rules"><span class="icon" data-icon="check"></span> Save changes</button></div>
    </div>
    ${blockNavigator("rules")}
    <div class="rules-tabs">
      <button class="${activeRuleTab === "program" ? "active" : ""}" data-rule-tab="program" onclick="switchRuleTab('program')"><span class="icon" data-icon="grid"></span> Teams & tabs</button>
      <button class="${activeRuleTab === "shifts" ? "active" : ""}" data-rule-tab="shifts" onclick="switchRuleTab('shifts')"><span class="icon" data-icon="clock"></span> Shift templates</button>
      <button class="${activeRuleTab === "institutions" ? "active" : ""}" data-rule-tab="institutions" onclick="switchRuleTab('institutions')"><span class="icon" data-icon="users"></span> Institution profiles</button>
      <button class="${activeRuleTab === "services" ? "active" : ""}" data-rule-tab="services" onclick="switchRuleTab('services')"><span class="icon" data-icon="calendar"></span> Service requirements</button>
      <button class="${activeRuleTab === "global" ? "active" : ""}" data-rule-tab="global" onclick="switchRuleTab('global')"><span class="icon" data-icon="settings"></span> Global safety rules</button>
    </div>
    <div id="rules-content">${activeRuleTab === "program" ? programSetupContent() : activeRuleTab === "shifts" ? shiftTemplatesContent() : activeRuleTab === "institutions" ? institutionRulesContent() : activeRuleTab === "services" ? serviceRulesContent() : globalRulesContent()}</div>
  </section>`;
}

function programSetupContent() {
  return `<div class="configuration-stack">
    <section class="panel setup-intro">
      <div><span class="metric-icon purple"><span class="icon" data-icon="spark"></span></span><div><h2>Build this program's scheduling structure</h2><p>Teams become schedule tabs. Rename, add, remove, or reorder them for Pediatrics, Internal Medicine, Emergency Medicine, or another training program.</p></div></div>
      <span class="status-pill ready">${configuredServices().length} active tabs</span>
    </section>
    <section class="panel configurable-table-panel">
      <div class="panel-header"><div><h2>Teams and schedule tabs</h2><p>Each team links to a master-schedule rotation and owns its staffing requirements.</p></div><button class="primary-button compact add-team"><span class="icon" data-icon="plus"></span> Add team</button></div>
      <div class="config-table">
        <div class="config-row config-header"><span>Tab name</span><span>Master rotation source</span><span>Service type</span><span>Color</span><span>Visible</span><span></span></div>
        ${programTeams.map((team,index) => `<div class="config-row" data-team-index="${index}">
          <label><span class="mobile-field-label">Tab name</span><input class="team-name-input" value="${team.name}" aria-label="Team ${index + 1} name"></label>
          <label><span class="mobile-field-label">Master rotation</span><input class="team-rotation-input" value="${team.rotation}" aria-label="${team.name} master rotation"></label>
          <label><span class="mobile-field-label">Service type</span><select class="team-category-input" aria-label="${team.name} service type">${["Inpatient","Critical care","Ambulatory","Emergency","Consult","Call pool","Night coverage","Custom"].map((category)=>`<option ${category===team.category?"selected":""}>${category}</option>`).join("")}</select></label>
          <label><span class="mobile-field-label">Color</span><select class="team-color-input" aria-label="${team.name} color">${["purple","orange","gold","nicu","green"].map((color)=>`<option ${color===team.color?"selected":""}>${color[0].toUpperCase()+color.slice(1)}</option>`).join("")}</select></label>
          <label class="switch"><input class="team-active-input" type="checkbox" ${team.active ? "checked" : ""}><span></span></label>
          <button class="icon-button delete-team" aria-label="Delete ${team.name}"><span class="icon" data-icon="close"></span></button>
        </div>`).join("")}
      </div>
      <div class="config-footer"><span><span class="icon" data-icon="grid"></span> Changes update the schedule tabs, service requirements, analytics, and master-schedule links.</span><button class="primary-button compact apply-team-changes">Apply team changes</button></div>
    </section>
    <section class="panel specialty-presets"><div class="panel-header"><div><h2>Start from a specialty preset</h2><p>Optional examples that chiefs can customize completely.</p></div></div><div class="preset-grid">
      ${[["Pediatrics","Floor teams, Nursery, NICU, PICU, Jeopardy"],["Internal Medicine","Ward teams, ICU, Night float, Consults"],["Emergency Medicine","ED zones, Trauma, Pediatric ED, Off-service"],["Blank program","Start with no predefined service names"]].map(([name,copy],index)=>`<button class="preset-card" data-preset="${index}"><span class="preset-symbol">${["P","IM","ED","+"][index]}</span><span><strong>${name}</strong><small>${copy}</small></span><span class="icon" data-icon="chevron"></span></button>`).join("")}
    </div></section>
  </div>`;
}

function shiftTemplatesContent() {
  return `<div class="configuration-stack">
    <section class="panel setup-intro">
      <div><span class="metric-icon teal"><span class="icon" data-icon="clock"></span></span><div><h2>Reusable shift and activity library</h2><p>Define times once, then assign these templates to any team. Hours and workload statistics recalculate from the selected template.</p></div></div>
      <span class="status-pill ready">${shiftTemplates.length} templates</span>
    </section>
    <section class="panel configurable-table-panel">
      <div class="panel-header"><div><h2>Shift templates</h2><p>Edit start/end times, display names, and how each entry counts.</p></div><button class="primary-button compact add-shift-template"><span class="icon" data-icon="plus"></span> Add template</button></div>
      <div class="shift-template-table">
        <div class="shift-template-row shift-template-header"><span>Display name</span><span>Code</span><span>Start</span><span>End</span><span>Hours</span><span>Counts as</span><span>Preview</span><span></span></div>
        ${shiftTemplates.map((shift,index)=>`<div class="shift-template-row" data-shift-index="${index}">
          <input class="shift-name-input" value="${shift.name}" aria-label="Shift name">
          <input class="shift-code-input" value="${shift.code}" aria-label="${shift.name} code">
          <input class="shift-start-input" type="time" value="${shift.start}" aria-label="${shift.name} start time">
          <input class="shift-end-input" type="time" value="${shift.end}" aria-label="${shift.name} end time">
          <strong>${shift.hours}h</strong>
          <select class="shift-type-input" aria-label="${shift.name} category">${["Day","Night","Call","Protected","Recovery","Off"].map((type)=>`<option ${type===shift.type?"selected":""}>${type}</option>`).join("")}</select>
          <span class="template-preview ${shift.color}"><strong>${shift.start && shift.end ? `${shift.start}–${shift.end}` : shift.name.toUpperCase()}</strong><small>${shift.type}</small></span>
          <button class="icon-button delete-shift-template" aria-label="Delete ${shift.name}"><span class="icon" data-icon="close"></span></button>
        </div>`).join("")}
      </div>
      <div class="config-footer"><span><span class="icon" data-icon="chart"></span> Overnight shifts are calculated across midnight automatically.</span><button class="primary-button compact apply-shift-changes">Save shift library</button></div>
    </section>
    <section class="panel shift-assignment-panel"><div class="panel-header"><div><h2>Team shift availability</h2><p>Choose which templates appear in each team's schedule editor.</p></div></div><div class="team-shift-matrix">
      ${programTeams.filter(team=>team.active).slice(0,6).map((team,index)=>`<div><span class="service-icon ${team.color}">${team.name.slice(0,2).toUpperCase()}</span><span><strong>${team.name}</strong><small>${index % 2 ? "Day · Long · Night · Off" : "Day · Short · Night · Post-call"}</small></span><button class="secondary-button compact">Manage</button></div>`).join("")}
    </div></section>
  </div>`;
}

function institutionRulesContent() {
  const profile = institutionProfiles[activeInstitution];
  return `<div class="rules-layout">
    <aside class="panel institution-list">
      <div class="rules-panel-title"><div><h2>Institutions</h2><p>Profiles used by residents and outside rotators</p></div><button class="icon-button add-institution" aria-label="Add institution"><span class="icon" data-icon="plus"></span></button></div>
      ${Object.entries(institutionProfiles).map(([name, item]) => `<button class="institution-item ${name === activeInstitution ? "active" : ""}" data-institution="${name}" onclick="switchInstitution('${name.replaceAll("'", "\\'")}')"><span class="institution-logo" style="--institution-color:${item.color}">${item.short}</span><span><strong>${name}</strong><small>${item.residents} linked residents</small></span><span class="icon" data-icon="chevron"></span></button>`).join("")}
    </aside>
    <section class="panel institution-editor">
      <div class="editor-title"><div class="institution-logo large" style="--institution-color:${profile.color}">${profile.short}</div><div><span>Institution profile</span><h2>${activeInstitution}</h2><p>${profile.notes}</p></div><button class="secondary-button compact">Edit profile</button></div>
      <div class="rule-callout"><span class="icon" data-icon="spark"></span><div><strong>Automatic application</strong><p>These recurring rules are applied whenever the master schedule assigns a resident from ${activeInstitution} to a monthly service.</p></div><label class="switch"><input type="checkbox" checked><span></span></label></div>
      <div class="editor-section">
        <div class="editor-section-head"><div><h3>Recurring protected time</h3><p>Clinic and didactic patterns repeat across all 13 blocks unless a block override is added.</p></div><button class="secondary-button compact add-pattern"><span class="icon" data-icon="plus"></span> Add pattern</button></div>
        <div class="patterns-table">
          <div class="pattern-row pattern-header"><span>Activity</span><span>Applies to</span><span>Recurrence</span><span>Time</span><span>Scheduling effect</span><span></span></div>
          ${patternRow("Continuity clinic", "Resident-specific", "Weekly assigned day", profile.clinic, "Protected · no call overlap", "clinic")}
          ${patternRow("Institution didactics", "All rotators", "Weekly", profile.didactic, "Protected · travel buffer", "didactic")}
          ${patternRow("Conference / simulation", "Selected residents", "Uploaded by block", "Varies", "Full or partial day off", "conference")}
        </div>
      </div>
      <div class="editor-section">
        <div class="editor-section-head"><div><h3>Institution eligibility</h3><p>Control which service roles this institution's residents may fill.</p></div></div>
        <div class="eligibility-grid">
          ${["Purple / Orange intern","Gold intern","Newborn intern","NICU day","NICU night","PICU day","PICU night","Jeopardy pool"].map((role, index) => `<label class="eligibility-card"><span><strong>${role}</strong><small>${index > 4 ? "Requires chief approval" : "Eligible when assigned"}</small></span><input type="checkbox" ${index !== 6 || activeInstitution === "Corewell Health" ? "checked" : ""}></label>`).join("")}
        </div>
      </div>
      <div class="editor-section block-overrides">
        <div class="editor-section-head"><div><h3>Block ${currentBlock} overrides</h3><p>Exceptions apply only to ${academicBlocks[currentBlock - 1][1]} and do not change the reusable institution profile.</p></div><button class="secondary-button compact"><span class="icon" data-icon="plus"></span> Add exception</button></div>
        <div class="override-card"><span class="override-date">Jun<br><strong>19</strong></span><div><strong>Juneteenth conference schedule</strong><p>Protect all ${profile.short} rotators from 12:00–17:00.</p></div><span class="status-pill review">Block only</span><button class="icon-button"><span class="icon" data-icon="more"></span></button></div>
      </div>
    </section>
  </div>`;
}

function patternRow(activity, applies, recurrence, time, effect, type) {
  return `<button class="pattern-row"><span><i class="pattern-icon ${type}"></i><strong>${activity}</strong></span><span>${applies}</span><span>${recurrence}</span><span>${time}</span><span>${effect}</span><span class="icon" data-icon="chevron"></span></button>`;
}

function serviceRulesContent() {
  const profile = ensureServiceRules(activeServiceRule) || defaultServiceProfile();
  const services = configuredServices();
  const details = serviceDetailedRules[activeServiceRule] || [];
  return `<div class="service-rules-layout">
    <aside class="panel service-rule-list">
      <div class="rules-panel-title"><div><h2>Schedule tabs</h2><p>Each output has its own requirements</p></div></div>
      ${services.map((service) => { const item = ensureServiceRules(service); return `<button class="service-rule-item ${service === activeServiceRule ? "active" : ""}" data-service-rule="${escapeHtml(service)}" onclick="switchServiceRule('${service.replaceAll("'", "\\'")}')"><span class="service-icon ${item.color}">${escapeHtml(service.slice(0,2).toUpperCase())}</span><span><strong>${escapeHtml(service)}</strong><small>${escapeHtml(item.group)}</small></span><span class="rule-health complete"><span class="icon" data-icon="check"></span></span></button>`; }).join("")}
    </aside>
    <section class="service-editor-column">
      <section class="panel service-rule-editor">
        <div class="service-rule-hero"><span class="service-icon ${profile.color} large">${escapeHtml(activeServiceRule.slice(0,2).toUpperCase())}</span><div><span>${escapeHtml(profile.group)} schedule</span><h2>${escapeHtml(activeServiceRule)} requirements</h2><p>Applied after residents are pulled from Block ${currentBlock} of the master schedule.</p></div><span class="master-source"><span class="icon" data-icon="grid"></span> Master-linked</span></div>
        <div class="master-flow">
          <div><span class="flow-icon"><span class="icon" data-icon="grid"></span></span><span><strong>Master schedule</strong><small>Rotation assignment</small></span></div><i>→</i>
          <div><span class="flow-icon"><span class="icon" data-icon="users"></span></span><span><strong>Eligible residents</strong><small>PGY + institution rules</small></span></div><i>→</i>
          <div><span class="flow-icon"><span class="icon" data-icon="settings"></span></span><span><strong>${escapeHtml(activeServiceRule)} rules</strong><small>Coverage + shifts</small></span></div><i>→</i>
          <div><span class="flow-icon success"><span class="icon" data-icon="calendar"></span></span><span><strong>Monthly tab</strong><small>Editable schedule</small></span></div>
        </div>
        ${requirementEditor()}
        <div class="requirement-grid">
          ${requirementCard("staffing", profile.staffing)}
          ${requirementCard("eligible", profile.eligible)}
          ${requirementCard("nights", profile.nights)}
          ${requirementCard("weekend", profile.weekend)}
        </div>
        <div class="editor-section">
          <div class="editor-section-head"><div><h3>Detailed requirements</h3><p>Edit the rules that the generator must satisfy for this tab.</p></div><button class="secondary-button compact add-requirement"><span class="icon" data-icon="plus"></span> Add requirement</button></div>
          <div class="detailed-rules">
            ${details.map((rule, index) => detailedRule(rule, index)).join("")}
          </div>
        </div>
      </section>
      <section class="panel linked-residents">
        <div class="panel-header"><div><h2>Block ${currentBlock} master schedule match</h2><p>Residents automatically available to the ${activeServiceRule} generator</p></div><button class="link-button" data-view-target="master">Review master schedule →</button></div>
        <div class="linked-resident-row"><span class="avatar" style="background:#dce8fa">GI</span><span><strong>Gilbert</strong><small>PGY-1 · Corewell Health</small></span><span class="source-tag">Assigned: ${escapeHtml(activeServiceRule)}</span><span class="status-pill ready">Eligible</span></div>
        <div class="linked-resident-row"><span class="avatar" style="background:#e7dff8">PK</span><span><strong>Patel, Kr</strong><small>PGY-1 · Corewell Health</small></span><span class="source-tag">Assigned: ${escapeHtml(activeServiceRule)}</span><span class="status-pill ready">Eligible</span></div>
        <div class="linked-resident-row"><span class="avatar" style="background:#d9f1ed">DU</span><span><strong>DuVall</strong><small>FM1 · Wayne State / DMC</small></span><span class="source-tag">Outside rotator</span><span class="status-pill review">Clinic applied</span></div>
      </section>
    </section>
  </div>`;
}

function requirementCard(key, copy) {
  const meta = requirementMeta[key];
  return `<article class="requirement-card"><span class="metric-icon purple"><span class="icon" data-icon="${meta.icon}"></span></span><span class="requirement-tag">${escapeHtml(meta.tag)}</span><h3>${escapeHtml(meta.title)}</h3><p>${escapeHtml(copy)}</p><button class="edit-requirement" data-requirement-key="${key}">Edit</button></article>`;
}

function requirementEditor() {
  if (!editingRequirement || editingRequirement.service !== activeServiceRule) return "";
  const detailRule = editingRequirement.kind === "detail" ? serviceDetailedRules[activeServiceRule]?.[editingRequirement.index] : null;
  const meta = editingRequirement.kind === "summary" ? requirementMeta[editingRequirement.key] : null;
  const title = detailRule?.title || meta?.title || "Requirement";
  const copy = detailRule?.copy || serviceRuleProfiles[activeServiceRule]?.[editingRequirement.key] || "";
  const type = detailRule?.type || meta?.tag || "Coverage";
  const isHard = detailRule?.hard ?? type.includes("Hard");
  return `<section class="requirement-editor-panel" data-edit-kind="${editingRequirement.kind}" ${editingRequirement.key ? `data-edit-key="${editingRequirement.key}"` : ""} ${Number.isInteger(editingRequirement.index) ? `data-edit-index="${editingRequirement.index}"` : ""}>
    <div>
      <span class="eyebrow">Editing ${escapeHtml(activeServiceRule)}</span>
      <h3>${editingRequirement.kind === "summary" ? escapeHtml(title) : "Detailed requirement"}</h3>
    </div>
    <label>Rule name<input class="requirement-title-input" value="${escapeHtml(title)}"></label>
    <label>Instruction<textarea class="requirement-copy-input" rows="3">${escapeHtml(copy)}</textarea></label>
    <div class="requirement-editor-row">
      <label>Type<select class="requirement-type-input">${["Coverage","Eligibility","Safety","Linked schedule","Optimization","Fairness","Shift rule","Hard constraint"].map((item) => `<option ${item === type ? "selected" : ""}>${item}</option>`).join("")}</select></label>
      <label class="eligibility-card hard-rule-toggle"><span><strong>Hard rule</strong><small>Generator must satisfy this before fairness goals</small></span><input class="requirement-hard-input" type="checkbox" ${isHard ? "checked" : ""}></label>
    </div>
    <div class="editor-actions">
      <button class="primary-button compact save-requirement">Save rule</button>
      <button class="secondary-button compact cancel-requirement">Cancel</button>
    </div>
  </section>`;
}

function detailedRule(rule, index) {
  return `<div class="detailed-rule ${rule.enabled ? "" : "disabled"}" data-detail-index="${index}"><span class="rule-drag">⋮⋮</span><span class="rule-state ${rule.hard ? "locked" : "goal"}"><span class="icon" data-icon="${rule.hard ? "check" : "spark"}"></span></span><span><strong>${escapeHtml(rule.title)}</strong><small>${escapeHtml(rule.copy)}</small></span><span class="rule-type">${escapeHtml(rule.type)}</span><label class="switch"><input class="detailed-rule-toggle" type="checkbox" ${rule.enabled ? "checked" : ""}><span></span></label><span class="detailed-rule-actions"><button class="icon-button edit-detailed-rule" title="Edit rule"><span class="icon" data-icon="settings"></span></button><button class="icon-button delete-detailed-rule" title="Delete rule"><span class="icon" data-icon="close"></span></button></span></div>`;
}

function globalRulesContent() {
  return `<div class="global-rules-grid">
    <section class="panel global-rule-panel"><div class="rules-panel-title"><div><h2>Coverage and safety</h2><p>Hard constraints checked across every configured schedule</p></div></div>
      ${globalRule("No overlapping assignments", "A resident cannot appear in two services or shifts at the same time.", true)}
      ${globalRule("Protect post-call recovery", "Night shifts generate the required recovery period, including across block boundaries.", true)}
      ${globalRule("Protect next inpatient block", "Residents starting inpatient service cannot receive an unsafe final night in the prior block.", true)}
      ${globalRule("Honor full and partial-day unavailability", "Exams, conferences, clinics, leave, and didactics block conflicting assignments.", true)}
    </section>
    <section class="panel global-rule-panel"><div class="rules-panel-title"><div><h2>Fairness priorities</h2><p>Optimization goals used after coverage is satisfied</p></div></div>
      ${globalRule("Golden weekend target", "Aim for one Saturday–Sunday pair off per inpatient resident.", true)}
      ${globalRule("Balance weekend days", "Compare Saturdays and Sundays worked among residents in equivalent roles.", true)}
      ${globalRule("Balance call categories", "Track clinic call, Jeopardy 1–3, long call, short call, and nights separately.", true)}
      ${globalRule("Honor resident preferences", "Maximize approved requests without violating coverage or safety.", true)}
    </section>
  </div>`;
}
function globalRule(title, copy, checked) {
  return `<div class="global-rule"><span class="rule-state locked"><span class="icon" data-icon="check"></span></span><span><strong>${title}</strong><small>${copy}</small></span><label class="switch"><input type="checkbox" ${checked ? "checked" : ""}><span></span></label></div>`;
}

window.switchRuleTab = (tabName) => {
  activeRuleTab = tabName;
  render();
};
window.switchInstitution = (institutionName) => {
  activeInstitution = institutionName;
  render();
};
window.switchServiceRule = (serviceName) => {
  activeServiceRule = serviceName;
  editingRequirement = null;
  render();
};

function annualPreferenceCompletion() {
  const templates = getMasterTemplatesForPgy(annualPreferenceSubmission.pgy);
  const validTemplateNames = new Set(templates.map((template) => template.name));
  const rankedTemplates = new Set((annualPreferenceSubmission.templateRanking || []).filter((name) => validTemplateNames.has(name)));
  const checks = [
    annualPreferenceSubmission.track,
    rankedTemplates.size === templates.length,
    annualPreferenceSubmission.vacationRequests.length,
    annualPreferenceSubmission.electiveRanking.length === 12,
    annualPreferenceSubmission.comments
  ];
  return Math.round(checks.filter(Boolean).length / checks.length * 100);
}

function annualPreferenceStatus() {
  return annualPreferenceSubmission.status === "approved"
    ? ["ready", "Approved for master scheduling"]
    : annualPreferenceSubmission.status === "changes-requested"
      ? ["missing", "Changes requested"]
      : annualPreferenceSubmission.status === "draft"
        ? ["review", "Draft"]
        : ["review", "Chief review"];
}

function annualPreferenceOverview() {
  const [statusClass, statusLabel] = annualPreferenceStatus();
  return `<div class="annual-overview-grid">
    <section class="panel annual-summary-card">
      <div class="panel-header"><div><h2>Submission summary</h2><p>One structured submission replaces the separate annual Google Forms.</p></div><span class="status-pill ${statusClass}">${statusLabel}</span></div>
      <div class="annual-summary-facts">
        <span><small>Resident level</small><strong>${annualPreferenceSubmission.pgy}</strong></span>
        <span><small>Track</small><strong>${escapeHtml(annualPreferenceSubmission.track)}</strong></span>
        <span><small>Fellowship planning</small><strong>${annualPreferenceSubmission.fellowshipApplying ? `Yes · ${escapeHtml(annualPreferenceSubmission.fellowshipSpecialty)}` : "No"}</strong></span>
        <span><small>Submission order</small><strong>#${annualPreferenceSubmission.submissionOrder} of ${annualPreferenceSubmission.cohortSize}</strong></span>
      </div>
      <div class="annual-priority-note"><span class="icon" data-icon="spark"></span><div><strong>How chiefs use this information</strong><p>Submission time is shown as one advisory factor. Chiefs also review availability, curriculum requirements, approved leave, fellowship timing, major life events, and fair distribution before deciding.</p></div></div>
    </section>
    <section class="panel annual-deadline-card">
      <span class="annual-score">${annualPreferenceCompletion()}<small>%</small></span>
      <div><small>Annual planning deadline</small><strong>${annualPreferenceSubmission.dueDate}</strong><p>${annualPreferenceSubmission.submittedAt ? `Submitted ${annualPreferenceSubmission.submittedAt}` : "Not submitted"}</p></div>
      <button class="secondary-button compact" data-annual-section="review">Review submission</button>
    </section>
    <section class="panel annual-flow-card">
      <div class="panel-header"><div><h2>Connected to the chief workflow</h2><p>Your preferences remain advisory until a chief makes a decision.</p></div></div>
      <div class="annual-data-flow">
        <span><i>1</i><strong>Resident submits</strong><small>Rankings, vacation, fellowship, and events</small></span><em>→</em>
        <span><i>2</i><strong>System validates</strong><small>Eligibility, duplicates, and required rankings</small></span><em>→</em>
        <span><i>3</i><strong>Chief reviews</strong><small>Conflicts, capacity, timing, and fairness</small></span><em>→</em>
        <span><i>4</i><strong>Master schedule</strong><small>Approved inputs appear beside annual assignments</small></span>
      </div>
    </section>
    <section class="panel annual-preview-card">
      <div class="panel-header"><div><h2>Highest priorities</h2><p>A quick preview of the data chiefs will see.</p></div></div>
      <div class="annual-priority-preview">
        <div><span class="submission-icon purple"><span class="icon" data-icon="grid"></span></span><span><small>Master templates</small><strong>${annualPreferenceSubmission.templateRanking.slice(0, 4).join(" · ")}</strong></span></div>
        <div><span class="submission-icon amber"><span class="icon" data-icon="calendar"></span></span><span><small>Vacation</small><strong>${annualPreferenceSubmission.vacationRequests.map((item) => `Block ${item.block}`).join(" · ")}</strong></span></div>
        <div><span class="submission-icon teal"><span class="icon" data-icon="clipboard"></span></span><span><small>Electives</small><strong>${annualPreferenceSubmission.electiveRanking.slice(0, 3).join(" · ")}</strong></span></div>
      </div>
    </section>
  </div>`;
}

function annualMasterRankingContent() {
  return `<section class="panel annual-section-panel">
    <div class="annual-section-heading"><div><span class="submission-icon purple"><span class="icon" data-icon="grid"></span></span><div><h2>Rank all master schedule templates</h2><p>Every template receives a unique rank. Chiefs see your order next to capacity, required rotations, and approved leave.</p></div></div><span class="validation-pill"><span class="icon" data-icon="check"></span> 20 of 20 ranked</span></div>
    <div class="annual-ranking-help"><strong>Better than the Google Form grid:</strong><span>Move choices up or down, see the meaningful differences between templates, and avoid duplicate rank numbers automatically.</span></div>
    <div class="master-template-ranking">
      ${annualPreferenceSubmission.templateRanking.map((templateName, index) => {
        const template = masterScheduleTemplates.find((item) => item.name === templateName);
        return `<article class="ranked-template-row" data-template-rank="${index}">
          <span class="rank-number">${index + 1}</span>
          <span class="template-letter">${template.name}</span>
          <span class="template-description"><strong>Template ${template.name}</strong><small>Starts with ${template.first} · early electives in ${template.earlyElectives.length ? template.earlyElectives.map((block) => `B${block}`).join(", ") : "later blocks"} · vacation eligible ${template.vacationEligible.map((block) => `B${block}`).join(", ")}</small></span>
          <span class="rank-actions"><button class="rank-up" data-rank-index="${index}" aria-label="Move Template ${template.name} up" ${index === 0 ? "disabled" : ""}>↑</button><button class="rank-down" data-rank-index="${index}" aria-label="Move Template ${template.name} down" ${index === annualPreferenceSubmission.templateRanking.length - 1 ? "disabled" : ""}>↓</button></span>
        </article>`;
      }).join("")}
    </div>
  </section>`;
}

function annualVacationContent() {
  return `<section class="panel annual-section-panel">
    <div class="annual-section-heading"><div><span class="submission-icon amber"><span class="icon" data-icon="calendar"></span></span><div><h2>Vacation, fellowship, and major life events</h2><p>Separate structured scheduling facts from confidential context. Only authorized chiefs can see protected notes.</p></div></div><span class="privacy-badge"><span class="icon" data-icon="check"></span> Private</span></div>
    <div class="annual-form-grid">
      <label><span>Training track</span><select class="annual-field" data-annual-field="track">${["Critical Care", "Primary Care", "Pediatric Subspecialty", "Hospitalist"].map((option) => `<option ${option === annualPreferenceSubmission.track ? "selected" : ""}>${option}</option>`).join("")}</select><small>Track controls curriculum requirements and available electives.</small></label>
      <label><span>Applying for fellowship?</span><select class="annual-field" data-annual-field="fellowshipApplying"><option value="true" ${annualPreferenceSubmission.fellowshipApplying ? "selected" : ""}>Yes</option><option value="false" ${!annualPreferenceSubmission.fellowshipApplying ? "selected" : ""}>No</option></select><small>Used to identify interview-season scheduling needs.</small></label>
      <label><span>Fellowship area</span><input class="annual-field" data-annual-field="fellowshipSpecialty" value="${escapeHtml(annualPreferenceSubmission.fellowshipSpecialty)}"><small>Optional and visible only to authorized scheduling leaders.</small></label>
      <label><span>Preferred interview-friendly blocks</span><div class="annual-block-chips">${[3,4,5].map((block) => `<button type="button" class="selected">Block ${block}</button>`).join("")}</div><small>The system treats this as a preference, not a guarantee.</small></label>
    </div>
    <div class="annual-subsection-title"><div><h3>Ranked vacation requests</h3><p>Requests are checked against vacation-eligible blocks and capacity.</p></div><button class="secondary-button compact add-vacation-preference"><span class="icon" data-icon="plus"></span> Add request</button></div>
    <div class="vacation-preference-list">
      ${annualPreferenceSubmission.vacationRequests.map((request, index) => `<article>
        <span class="rank-number">${request.priority}</span>
        <label><span>Block</span><select class="vacation-block" data-vacation-index="${index}">${academicBlocks.map(([number, dates]) => `<option value="${number}" ${Number(number) === request.block ? "selected" : ""}>Block ${number} · ${dates}</option>`).join("")}</select></label>
        <label><span>Timing</span><select class="vacation-timing" data-vacation-index="${index}">${["Full block", "First 2 weeks", "Last 2 weeks", "Any 2 weeks"].map((option) => `<option ${option === request.timing ? "selected" : ""}>${option}</option>`).join("")}</select></label>
        <label><span>Reason category</span><select class="vacation-reason" data-vacation-index="${index}">${["Vacation", "International travel", "Family / personal", "Conference", "Major life event"].map((option) => `<option ${option === request.reason ? "selected" : ""}>${option}</option>`).join("")}</select></label>
      </article>`).join("")}
    </div>
    <div class="confidential-event-box"><span class="icon" data-icon="alert"></span><div><strong>Major life event or protected leave</strong><p>Tell the chiefs the dates and scheduling effect. Detailed medical or personal information is not required in the general form.</p></div><label><span>Timing</span><input class="annual-life-event" value="${escapeHtml(annualPreferenceSubmission.lifeEvent.timing)}"></label><label><span>Private note</span><input class="annual-life-note" value="${escapeHtml(annualPreferenceSubmission.lifeEvent.confidentialNote)}"></label></div>
  </section>`;
}

function electiveSelectOptions(selected, rowIndex) {
  return electiveCatalog.map((elective) => {
    const usedElsewhere = annualPreferenceSubmission.electiveRanking.some((item, index) => item === elective.name && index !== rowIndex);
    return `<option value="${escapeHtml(elective.name)}" ${elective.name === selected ? "selected" : ""} ${usedElsewhere ? "disabled" : ""}>${escapeHtml(elective.name)} · ${elective.tier}</option>`;
  }).join("");
}

function annualElectiveContent() {
  const advancedEligible = annualPreferenceSubmission.pgy === "PGY-3";
  return `<section class="panel annual-section-panel">
    <div class="annual-section-heading"><div><span class="submission-icon teal"><span class="icon" data-icon="clipboard"></span></span><div><h2>Elective preferences</h2><p>Rank exactly 12 standard electives. Advanced elective choices appear only when the resident's PGY eligibility allows them.</p></div></div><span class="validation-pill"><span class="icon" data-icon="check"></span> 12 unique choices</span></div>
    <div class="eligibility-banner ${advancedEligible ? "eligible" : "ineligible"}"><span class="icon" data-icon="${advancedEligible ? "check" : "alert"}"></span><div><strong>${advancedEligible ? "PGY-3 advanced electives are available" : "Advanced electives are not available at this PGY level"}</strong><p>${advancedEligible ? "Leadership and advanced clinical choices can be ranked separately below." : "The section will unlock automatically when eligibility changes."}</p></div></div>
    <div class="elective-layout">
      <div>
        <div class="annual-subsection-title"><div><h3>Top 12 standard electives</h3><p>Duplicate choices are disabled automatically.</p></div><span>Tier 1 target: 4–7 · Tier 2 target: 0–3</span></div>
        <div class="elective-ranking-list">${annualPreferenceSubmission.electiveRanking.map((elective, index) => `<label><span class="rank-number">${index + 1}</span><select class="elective-rank-select" data-elective-index="${index}">${electiveSelectOptions(elective, index)}</select><small>${electiveCatalog.find((item) => item.name === elective)?.tier || "General"}</small></label>`).join("")}</div>
      </div>
      <aside>
        <div class="advanced-elective-card ${advancedEligible ? "" : "locked"}"><div class="panel-header"><div><h3>Advanced / leadership ranking</h3><p>PGY-3 only</p></div><span class="status-pill ${advancedEligible ? "ready" : "missing"}">${advancedEligible ? "Eligible" : "Locked"}</span></div>
          ${advancedEligible ? `<div class="advanced-rank-list">${annualPreferenceSubmission.advancedRanking.map((item, index) => `<div><span>${index + 1}</span><strong>${escapeHtml(item)}</strong></div>`).join("")}</div>` : ""}
        </div>
        <label class="split-block-card"><input class="annual-split-enabled" type="checkbox" ${annualPreferenceSubmission.splitBlock ? "checked" : ""}><span><strong>Request a split elective block</strong><small>Two 2-week electives use one block and may remove vacation eligibility.</small></span></label>
        <label class="annual-textarea-field"><span>Split-block request</span><textarea class="annual-split-request">${escapeHtml(annualPreferenceSubmission.splitBlockRequest)}</textarea></label>
      </aside>
    </div>
  </section>`;
}

function annualReviewContent() {
  const [statusClass, statusLabel] = annualPreferenceStatus();
  const conflicts = [
    "Block 6 vacation currently has 3 competing resident requests.",
    "Your first-choice template supports early electives but not a full Block 6 vacation.",
    "Advanced PICU has limited PGY-3 capacity."
  ];
  return `<section class="panel annual-section-panel">
    <div class="annual-section-heading"><div><span class="submission-icon purple"><span class="icon" data-icon="check"></span></span><div><h2>Review and submit</h2><p>Confirm the structured summary that chiefs will use while building your annual master schedule.</p></div></div><span class="status-pill ${statusClass}">${statusLabel}</span></div>
    <div class="annual-review-grid">
      <div class="annual-review-main">
        <section><h3>Master schedule</h3><p><strong>Top templates:</strong> ${annualPreferenceSubmission.templateRanking.slice(0, 6).join(", ")}</p><p><strong>Preferred start:</strong> ${masterScheduleTemplates.find((item) => item.name === annualPreferenceSubmission.templateRanking[0])?.first}</p></section>
        <section><h3>Vacation and timing</h3>${annualPreferenceSubmission.vacationRequests.map((item) => `<p><strong>Priority ${item.priority}:</strong> Block ${item.block}, ${item.timing} · ${item.reason}</p>`).join("")}<p><strong>Fellowship:</strong> ${annualPreferenceSubmission.fellowshipApplying ? `${annualPreferenceSubmission.fellowshipSpecialty}; favor elective-heavy Blocks 3–5` : "Not indicated"}</p></section>
        <section><h3>Electives</h3><p><strong>Top choices:</strong> ${annualPreferenceSubmission.electiveRanking.slice(0, 6).join(", ")}</p><p><strong>Advanced:</strong> ${annualPreferenceSubmission.advancedRanking.slice(0, 3).join(", ")}</p></section>
        <section><h3>Additional scheduling context</h3><p>${escapeHtml(annualPreferenceSubmission.comments)}</p></section>
      </div>
      <aside>
        <div class="annual-chief-preview"><span class="icon" data-icon="spark"></span><h3>Chief decision support</h3><p>The system will show these advisory alerts beside your annual assignment.</p>${conflicts.map((conflict) => `<span><span class="icon" data-icon="alert"></span>${conflict}</span>`).join("")}</div>
        <div class="annual-submit-box"><small>Submitted ${annualPreferenceSubmission.submittedAt || "Not yet submitted"}</small><strong>Submission order #${annualPreferenceSubmission.submissionOrder}</strong><p>Submitting sends this version to the chief review queue. It does not guarantee any assignment.</p><button class="primary-button submit-annual-preferences"><span class="icon" data-icon="check"></span> ${annualPreferenceSubmission.status === "draft" || annualPreferenceSubmission.status === "changes-requested" ? "Submit to chiefs" : "Resubmit updated preferences"}</button><button class="text-button save-annual-draft">Save draft only</button></div>
      </aside>
    </div>
  </section>`;
}

function residentAnnualPreferencesView() {
  const sections = [
    ["overview", "Overview", "check"],
    ["master", "Master templates", "grid"],
    ["vacation", "Vacation & events", "calendar"],
    ["electives", "Electives", "clipboard"],
    ["review", "Review & submit", "spark"]
  ];
  const content = activeAnnualPreferenceSection === "master" ? annualMasterRankingContent()
    : activeAnnualPreferenceSection === "vacation" ? annualVacationContent()
      : activeAnnualPreferenceSection === "electives" ? annualElectiveContent()
        : activeAnnualPreferenceSection === "review" ? annualReviewContent()
          : annualPreferenceOverview();
  return `<section class="page resident-detail-page annual-preference-page">
    <div class="page-head"><div><p class="eyebrow">Academic year 2026–2027</p><h1>Annual preferences</h1><p>Rank master schedule templates, vacation timing, electives, fellowship needs, and major life events in one guided submission.</p></div><div class="annual-head-actions"><span class="privacy-badge"><span class="icon" data-icon="check"></span> Private to you and chiefs</span><button class="secondary-button compact save-annual-draft">Save draft</button></div></div>
    <div class="annual-deadline-banner"><span><span class="icon" data-icon="clock"></span><strong>Due ${annualPreferenceSubmission.dueDate}</strong></span><p>Chiefs can configure a different form and deadline for each PGY level. Your ${annualPreferenceSubmission.pgy} form includes advanced elective choices.</p><span class="annual-progress-value">${annualPreferenceCompletion()}% complete</span></div>
    <div class="annual-workspace">
      <aside class="panel annual-step-nav">
        <div><small>Annual planning</small><strong>${annualPreferenceSubmission.pgy}</strong><span>${escapeHtml(annualPreferenceSubmission.track)}</span></div>
        ${sections.map(([id, label, icon], index) => `<button class="${activeAnnualPreferenceSection === id ? "active" : ""}" data-annual-section="${id}"><span class="annual-step-icon"><span class="icon" data-icon="${icon}"></span></span><span><strong>${label}</strong><small>${index === 0 ? "Status and workflow" : index === 1 ? "Rank all 20" : index === 2 ? "Private timing needs" : index === 3 ? "12 ranked choices" : "Validate and send"}</small></span>${index < 4 ? '<span class="icon step-complete" data-icon="check"></span>' : ""}</button>`).join("")}
        <div class="annual-help-card"><span class="icon" data-icon="spark"></span><strong>Why this is better</strong><p>No duplicate ranks, PGY-specific questions, automatic eligibility, and one synchronized chief review record.</p></div>
      </aside>
      <main>${content}</main>
    </div>
  </section>`;
}

function residentHome() {
  return `<section class="page resident-page">
    <div class="resident-hero compact-hero"><div><span class="resident-kicker">My schedule · Block 13</span><h1>Welcome back, Jordan.</h1><p>Your personal schedule combines your master rotation, published service assignments, calls, clinic, didactics, approved leave, and chief decisions.</p><div class="resident-hero-actions"><button class="resident-primary" data-resident-view="resident-schedule">Open my schedule <span class="icon" data-icon="chevron"></span></button><button class="resident-ghost" data-resident-view="resident-annual">Annual preferences</button></div></div><div class="hero-calendar"><div class="mini-cal-head"><span>June 2026</span><span>Newborn</span></div><div class="mini-cal-grid">${["M","T","W","T","F","S","S"].map(x=>`<b>${x}</b>`).join("")}${Array.from({length:30},(_,i)=>`<span class="${[5,6,19,20].includes(i)?"selected":""} ${[11,25].includes(i)?"clinic":""} ${[8,16,24].includes(i)?"call":""}">${i+1}</span>`).join("")}</div><div class="mini-cal-foot"><span><i></i>Golden weekend</span><span><i></i>Clinic / didactics</span></div></div></div>
    <div class="resident-kpis">
      ${metric("clock","purple","Expected hours","61.5","average per week","Within target")}
      ${metric("calendar","teal","Golden weekends","1","approved this block","Jun 20-21")}
      ${metric("bell","amber","Call assignments","4","clinic, J1, J2, crossover","Review")}
      ${metric("check","teal","Days off","4","2 weekend + 2 weekday","Balanced")}
    </div>
    <div class="resident-content">
      <div class="resident-main">
        <section class="panel personal-schedule"><div class="panel-header"><div><h2>This week</h2><p>Published personal assignments · Block 13 Newborn</p></div><button class="link-button" data-resident-view="resident-schedule">Full monthly schedule →</button></div><div class="personal-week">${["Mon 8|0630-1700|day","Tue 9|J1 CALL|call","Wed 10|DIDACTIC|protected","Thu 11|0630-1700|day","Fri 12|ITE / OFF|protected","Sat 13|0630-1600|day","Sun 14|OFF|off"].map(item=>{const [date,shift,type]=item.split("|");return `<div><span>${date}</span><strong class="${type}">${shift}</strong></div>`}).join("")}</div></section>
        <div class="resident-section-head spaced"><div><h2>My calls and protected activities</h2><p>These entries are automatically checked against service assignments.</p></div></div>
        <div class="resident-activity-grid">
          <section class="panel resident-list-card"><h3>Upcoming call</h3>${residentCalls.map(([date,type,time,note])=>`<div class="resident-list-row"><span class="date-tile">${date.replace(" ","<br>")}</span><span><strong>${type}</strong><small>${time} · ${note}</small></span><span class="status-pill review">Assigned</span></div>`).join("")}</section>
          <section class="panel resident-list-card"><h3>Clinic, didactics, and events <button class="link-button" data-resident-view="resident-profile">View records</button></h3>
            <div class="resident-list-row"><span class="pattern-icon clinic"></span><span><strong>Continuity clinic</strong><small>Tuesday PM · weekly</small></span><span class="status-pill ready">Protected</span></div>
            <div class="resident-list-row"><span class="pattern-icon didactic"></span><span><strong>Didactics</strong><small>Wednesday 12:30-17:00 · leave service</small></span><span class="status-pill ready">Protected</span></div>
            <div class="resident-list-row"><span class="pattern-icon conference"></span><span><strong>ITE examination</strong><small>June 12 · 08:00-13:00</small></span><span class="status-pill ready">Approved</span></div>
          </section>
        </div>
      </div>
      <aside class="resident-aside">
        <section class="panel profile-card"><div class="avatar profile-avatar">JL</div><h2>${currentResidentName}</h2><p>PGY-3 · Corewell Health</p><div class="profile-details"><span><small>Annual preferences</small><strong>Chief review</strong></span><span><small>Next</small><strong>Elective</strong></span></div><button class="secondary-button" data-resident-view="resident-profile">My profile & records</button><button class="text-button" data-resident-view="resident-annual">Annual preferences</button></section>
        <section class="panel deadline-card closed"><span class="icon" data-icon="alert"></span><div><strong>Block 13 deadline passed</strong><p>The standard deadline was March 3, 2026, 90 days before June 1. Late requests require chief review.</p><button class="link-button" data-resident-action="request">Submit late request</button></div></section>
      </aside>
    </div>
  </section>`;
}

function residentScheduleView() {
  const days = [
    ["Jun 1","0630-1700","Day"],["Jun 2","CLINIC PM","Protected"],["Jun 3","DIDACTIC","Protected"],["Jun 4","CLINIC CALL","Call"],
    ["Jun 5","0630-1700","Day"],["Jun 6","OFF","Off"],["Jun 7","OFF","Off"],["Jun 8","0630-1700","Day"],["Jun 9","J1 CALL","Call"],
    ["Jun 10","DIDACTIC","Protected"],["Jun 11","0630-1700","Day"],["Jun 12","ITE / OFF","Protected"],["Jun 13","0630-1600","Day"],
    ["Jun 14","OFF","Off"],["Jun 15","0630-1700","Day"],["Jun 16","CLINIC PM","Protected"],["Jun 17","J2 NIGHT","Night"],
    ["Jun 18","POST CALL","Off"],["Jun 19","0630-1700","Day"],["Jun 20","OFF","Off"],["Jun 21","OFF","Off"],["Jun 22","0630-1700","Day"],
    ["Jun 23","CLINIC PM","Protected"],["Jun 24","DIDACTIC","Protected"],["Jun 25","CROSSOVER","Call"],["Jun 26","0630-1700","Day"],
    ["Jun 27","0630-1600","Day"],["Jun 28","OFF","Off"],["Jun 29","0630-1700","Day"],["Jun 30","0630-1700","Day"]
  ];
  return `<section class="page resident-detail-page"><div class="page-head"><div><p class="eyebrow">My published assignments</p><h1>Block 13 personal schedule</h1><p>Only your own assignments are shown here. Open a published service schedule to view the shared team roster.</p></div><button class="secondary-button compact" data-resident-view="resident-public">View shared service schedules</button></div>
    <div class="resident-kpis">${metric("clock","purple","Expected hours","246","for this block","61.5/week")}${metric("bell","amber","Calls","4","Clinic, J1, J2, crossover","Balanced")}${metric("calendar","teal","Weekend days off","4","includes one golden weekend","Jun 20-21")}${metric("users","purple","Current service","Newborn","published roster","View team")}</div>
    <section class="panel resident-month-panel"><div class="panel-header"><div><h2>June 2026</h2><p>Shift, call, protected time, and rest days</p></div><div class="schedule-legend"><span>Day</span><span>Call</span><span>Protected</span><span>Off</span></div></div><div class="resident-month-grid">${days.map(([date,value,type])=>`<article class="resident-day ${type.toLowerCase()}"><span>${date}</span><strong>${value}</strong><small>${type}</small></article>`).join("")}</div></section>
  </section>`;
}

function residentMasterView() {
  const rotations = ["Floor","NICU","Elective","PICU","ED","Newborn","Elective","Floor","Heme/Onc","Vacation","Gold","Newborn","Elective"];
  const [statusClass, statusLabel] = annualPreferenceStatus();
  const firstTemplate = masterScheduleTemplates.find((item) => item.name === annualPreferenceSubmission.templateRanking[0]);
  return `<section class="page resident-detail-page"><div class="page-head"><div><p class="eyebrow">Private annual plan</p><h1>My master schedule</h1><p>This page is visible only to you and authorized chiefs. Other residents cannot view it.</p></div><span class="privacy-badge"><span class="icon" data-icon="check"></span> Private</span></div><section class="panel private-master"><div class="private-master-row">${academicBlocks.map(([number,dates],index)=>`<article><span>Block ${number}</span><strong>${rotations[index] || "Elective"}</strong><small>${dates}</small>${rotations[index]==="Vacation"?'<i>Vacation eligible</i>':""}</article>`).join("")}</div></section>
    <section class="panel preference-summary"><div class="panel-header"><div><h2>Submitted annual preferences</h2><p>Chiefs review these beside the editable annual schedule. Preferences guide decisions but do not automatically assign rotations.</p></div><div class="profile-actions"><span class="status-pill ${statusClass}">${statusLabel}</span><button class="secondary-button compact" data-resident-view="resident-annual">Open preferences</button></div></div><div class="preference-grid"><span><small>Fellowship planning</small><strong>${annualPreferenceSubmission.fellowshipApplying ? `Yes · ${escapeHtml(annualPreferenceSubmission.fellowshipSpecialty)}` : "No"}</strong></span><span><small>Top vacation request</small><strong>Block ${annualPreferenceSubmission.vacationRequests[0]?.block || "Not selected"}</strong></span><span><small>Top master template</small><strong>${annualPreferenceSubmission.templateRanking[0]} · starts ${firstTemplate?.first || "TBD"}</strong></span><span><small>Top elective</small><strong>${escapeHtml(annualPreferenceSubmission.electiveRanking[0])}</strong></span></div></section></section>`;
}

function residentRequestsView() {
  const mine = residentRequests.filter((request) => request.resident === "Resident A");
  return `<section class="page resident-detail-page"><div class="page-head"><div><p class="eyebrow">Requests and approvals</p><h1>My requests</h1><p>Submit block preferences, PTO, sick leave, vacation, or a proposed switch. Chiefs make the final decision before approved data enters scheduling.</p></div><button class="primary-button compact" data-resident-action="request"><span class="icon" data-icon="plus"></span> New request</button></div>
    <div class="request-deadline-banner"><span class="icon" data-icon="clock"></span><div><strong>Requests normally close 90 days before each block begins.</strong><p>Block 13 started June 1, 2026, so its standard deadline was March 3, 2026. Late requests remain visible but require explicit chief approval.</p></div></div>
    <section class="panel resident-request-history"><div class="request-history-head"><span>Request</span><span>Block</span><span>Submitted</span><span>Priority information</span><span>Status</span></div>${mine.map(request=>`<div class="request-history-row"><span><strong>${request.type}</strong><small>${request.detail}</small></span><span>Block ${request.block}</span><span>${request.submitted}</span><span>${request.priority}</span><span class="status-pill ${request.status==="approved"?"ready":request.status==="declined"?"missing":"review"}">${request.status}</span></div>`).join("")}</section>
    <div class="request-type-grid">${[["calendar","Block request","Weekend, day off, call restriction","resident-request"],["grid","Annual preferences","Master templates, vacation timing, and electives","resident-annual"],["clock","PTO or sick leave","Planned PTO or urgent absence","resident-request"],["users","Call switch","Offer a call or volunteer for an available call","resident-switches"]].map(([icon,title,copy,view])=>`<button class="request-type-card" data-resident-view="${view}"><span class="metric-icon purple"><span class="icon" data-icon="${icon}"></span></span><strong>${title}</strong><small>${copy}</small></button>`).join("")}</div>
  </section>`;
}

function residentSelfRecordView() {
  const resident = residentProfiles["Resident A"];
  const record = ensureResidentActivityRecord("Resident A");
  const policy = record.didacticPolicies[currentBlock - 1];
  const approvedLeave = record.leave.filter((item) => item.status === "approved");
  const totalLeave = approvedLeave.reduce((sum, item) => sum + item.days, 0);
  const content = activeResidentSelfSection === "didactics"
    ? `<section class="panel self-record-panel"><div class="panel-header"><div><h2>My didactic attendance</h2><p>Attendance requirements are based on your institution and Block ${currentBlock} ${residentRotation("Resident A")} assignment.</p></div><span class="status-pill ${policy.missed?"review":"ready"}">${policy.missed} missed this block</span></div>
        <div class="self-policy-banner"><span class="icon" data-icon="clipboard"></span><div><strong>${policy.required ? "Attendance is required this block" : "Attendance is optional when service coverage requires it"}</strong><p>${policy.day} · ${policy.virtual ? "Virtual attendance is allowed" : "In-person attendance is required"}</p></div></div>
        <div class="self-attendance-list">${record.attendance.map((item)=>`<div><span><strong>${item.date}</strong><small>${item.topic} · ${item.mode}</small></span><span class="status-pill ${item.status==="Attended"?"ready":item.status==="Missed"?"missing":"review"}">${item.status}</span><em>${item.note || "No scheduling note"}</em></div>`).join("")}</div>
      </section>`
    : activeResidentSelfSection === "leave"
      ? `<section class="panel self-record-panel"><div class="panel-header"><div><h2>My PTO and leave record</h2><p>See how each absence affected clinic, elective, ED, ICU, or floor coverage.</p></div><button class="primary-button compact" data-resident-view="resident-requests">Submit request</button></div>
          <div class="profile-section-summary"><span><small>Total approved</small><strong>${totalLeave} days</strong><em>this academic year</em></span><span><small>Sick leave</small><strong>${approvedLeave.filter((item)=>item.type==="Sick day").reduce((sum,item)=>sum+item.days,0)} day</strong><em>recorded</em></span><span><small>PTO</small><strong>${approvedLeave.filter((item)=>item.type==="PTO").reduce((sum,item)=>sum+item.days,0)} days</strong><em>approved</em></span><span><small>Pending</small><strong>${record.leave.filter((item)=>item.status==="pending").length}</strong><em>chief review</em></span></div>
          <div class="self-leave-list">${record.leave.map((item)=>`<div><span><strong>${item.type} · ${item.start}${item.end!==item.start?`–${item.end}`:""}</strong><small>Block ${item.block} ${item.rotation} · ${item.coverage}</small></span><strong>${item.days} day${item.days===1?"":"s"}</strong><span class="status-pill ${item.status==="approved"?"ready":item.status==="declined"?"missing":"review"}">${item.status}</span></div>`).join("")}</div>
        </section>`
      : activeResidentSelfSection === "requests"
        ? `<section class="panel self-record-panel"><div class="panel-header"><div><h2>My requests and switches</h2><p>All resident submissions and chief decisions in one place.</p></div><div class="profile-actions"><button class="secondary-button compact" data-resident-view="resident-requests">Open requests</button><button class="primary-button compact" data-resident-view="resident-switches">Open call switches</button></div></div>
            <div class="self-request-grid"><article><span class="metric-icon amber"><span class="icon" data-icon="calendar"></span></span><strong>${profileRequests("Resident A").length} requests</strong><small>${profileRequests("Resident A").filter((item)=>item.status==="pending").length} awaiting decision</small></article><article><span class="metric-icon purple"><span class="icon" data-icon="users"></span></span><strong>${profileSwitches("Resident A").length} switches</strong><small>Offers and proposed exchanges</small></article><article><span class="metric-icon teal"><span class="icon" data-icon="grid"></span></span><strong>Annual preferences</strong><small>${annualPreferenceStatus()[1]}</small></article></div>
          </section>`
        : `<div class="self-record-overview">
            <div class="profile-summary-grid"><article><span class="metric-icon purple"><span class="icon" data-icon="grid"></span></span><small>Current rotation</small><strong>${residentRotation("Resident A")}</strong><em>Block ${currentBlock}</em></article><article><span class="metric-icon amber"><span class="icon" data-icon="clipboard"></span></span><small>Didactics</small><strong>${policy.attended}/${policy.sessions}</strong><em>${policy.missed} missed this block</em></article><article><span class="metric-icon teal"><span class="icon" data-icon="clock"></span></span><small>Leave used</small><strong>${totalLeave} days</strong><em>PTO, sick leave, conference</em></article><article><span class="metric-icon red"><span class="icon" data-icon="alert"></span></span><small>Pending decisions</small><strong>${profileRequests("Resident A").filter((item)=>item.status==="pending").length + record.leave.filter((item)=>item.status==="pending").length}</strong><em>chief review</em></article></div>
            <section class="panel self-record-panel"><div class="panel-header"><div><h2>What the schedule knows about me</h2><p>This is the same information chiefs see while building your schedule.</p></div></div><div class="profile-context-list"><span><small>Master rotation</small><strong>${residentRotation("Resident A")}</strong></span><span><small>Clinic</small><strong>${resident.clinic[currentBlock-1]}</strong></span><span><small>Didactic requirement</small><strong>${policy.required?"Required":"Optional"}</strong></span><span><small>Attendance mode</small><strong>${policy.virtual?"Virtual allowed":"In person"}</strong></span><span><small>Call eligibility</small><strong>${record.eligibility.jeopardy?"Jeopardy eligible":"Not eligible"}</strong></span></div></section>
          </div>`;
  return `<section class="page resident-detail-page"><div class="page-head"><div><p class="eyebrow">My active profile</p><h1>My records and requirements</h1><p>Review the facts used for scheduling and the attendance, leave, request, and switch records shared with chiefs.</p></div><span class="privacy-badge"><span class="icon" data-icon="check"></span> Private</span></div>
    <div class="self-record-tabs">${[["overview","Overview"],["didactics","Didactics"],["leave","PTO & leave"],["requests","Requests & switches"]].map(([id,label])=>`<button class="${activeResidentSelfSection===id?"active":""}" data-self-section="${id}">${label}</button>`).join("")}<button data-resident-view="resident-master">Master schedule</button></div>
    ${content}
  </section>`;
}

function eligibilityMarkup(result) {
  return `<div class="eligibility-summary ${result.eligible ? "eligible" : "ineligible"}">
    <div class="eligibility-title"><span class="icon" data-icon="${result.eligible ? "check" : "alert"}"></span><span><strong>${result.eligible ? "Eligible to volunteer" : "Not eligible for this call"}</strong><small>${result.eligible ? "All scheduling checks passed. Chief approval is still required." : result.reasons[0]}</small></span></div>
    <div class="switch-eligibility-checks">${result.checks.map((check)=>`<div class="switch-eligibility-check ${check.pass ? "pass" : "fail"}"><span class="icon" data-icon="${check.pass ? "check" : "close"}"></span><span><strong>${check.label}</strong><small>${check.detail}</small></span></div>`).join("")}</div>
  </div>`;
}

function residentCallSwitchView() {
  const myOffers = callSwitchOffers.filter((offer) => offer.offeredBy === currentResidentName);
  const available = callSwitchOffers.filter((offer) => offer.offeredBy !== currentResidentName && ["open", "chief-review"].includes(offer.status));
  const myVolunteering = callSwitchOffers.filter((offer) => offer.volunteers.some((volunteer) => volunteer.resident === currentResidentName));
  return `<section class="page resident-detail-page call-switch-page">
    <div class="page-head"><div><p class="eyebrow">Resident call exchange</p><h1>Call switch center</h1><p>Offer an assigned call, review available calls, and see automatic clinic and back-to-back call checks before involving the chiefs.</p></div><span class="privacy-badge"><span class="icon" data-icon="check"></span> Schedule checked</span></div>
    <div class="switch-how-it-works">
      <span><i>1</i><strong>Resident offers</strong><small>Select an assigned call and acceptable alternatives.</small></span>
      <em>→</em><span><i>2</i><strong>Another resident volunteers</strong><small>Eligibility is checked instantly against calls and clinic.</small></span>
      <em>→</em><span><i>3</i><strong>Chief approves</strong><small>The published schedule changes only after final approval.</small></span>
    </div>
    <div class="call-switch-layout">
      <section class="panel call-offer-form">
        <div class="panel-header"><div><h2>Offer one of my calls</h2><p>Only your assigned Block 13 calls are listed.</p></div><span class="status-pill ready">Private draft</span></div>
        <div class="call-offer-fields">
          <label><span>Call to offer</span><select class="call-offer-assignment">${[
            ["2026-06-04","Clinic Call · Jun 4 · 17:00-22:00"],
            ["2026-06-09","Jeopardy 1 · Jun 9 · 07:00-19:00"],
            ["2026-06-17","Jeopardy 2 · Jun 17 · 17:00-07:00"],
            ["2026-06-25","Crossover · Jun 25 · 17:00-21:00"]
          ].map(([value,label])=>`<option value="${value}">${label}</option>`).join("")}</select></label>
          <div class="switch-date-pair"><label><span>Preferred exchange date</span><input class="call-preferred-date-one" type="date" min="2026-06-01" max="2026-06-30" value="2026-06-20"></label><label><span>Second option</span><input class="call-preferred-date-two" type="date" min="2026-06-01" max="2026-06-30" value="2026-06-27"></label></div>
          <label><span>Note for residents and chiefs</span><textarea class="call-offer-note" placeholder="Example: I can exchange for another weekend call."></textarea></label>
          <button class="primary-button submit-call-offer"><span class="icon" data-icon="plus"></span> Publish call offer</button>
          <p class="form-help">Publishing an offer does not remove the call from your schedule. It remains assigned until a chief approves a specific exchange.</p>
        </div>
      </section>
      <section class="switch-marketplace">
        <div class="resident-section-head"><div><h2>Calls available to switch</h2><p>Eligibility below is personalized to ${currentResidentName}.</p></div><span class="status-pill review">${available.length} available</span></div>
        ${available.map((offer)=>{
          const eligibility = callSwitchEligibility(currentResidentName, offer.callDate);
          const alreadyVolunteered = offer.volunteers.some((volunteer)=>volunteer.resident===currentResidentName);
          const [statusClass,statusLabel] = callSwitchStatus(offer.status);
          return `<article class="panel switch-offer-card" data-switch-id="${offer.id}">
            <div class="switch-offer-head"><span class="date-tile switch-date">${formatCallDate(offer.callDate).replace(",","<br>")}</span><span><strong>${escapeHtml(offer.callLabel)}</strong><small>${escapeHtml(offer.shift)} · offered by ${escapeHtml(offer.offeredBy)}</small></span><span class="status-pill ${statusClass}">${statusLabel}</span></div>
            <div class="switch-preferences"><span><small>Requested alternatives</small><strong>${offer.preferredDates.map(formatCallDate).join(" or ")}</strong></span><span><small>Offer note</small><strong>${escapeHtml(offer.note || "Open to options")}</strong></span></div>
            ${eligibilityMarkup(eligibility)}
            <div class="switch-card-actions"><span>${alreadyVolunteered ? "Your request is waiting for chief review." : eligibility.eligible ? "You can volunteer without opening another schedule." : "Resolve the highlighted conflict before volunteering."}</span><button class="primary-button volunteer-call-switch" ${!eligibility.eligible || alreadyVolunteered || offer.status==="chief-review" ? "disabled" : ""}>${alreadyVolunteered ? "Request sent" : offer.status==="chief-review" ? "Match pending" : "Volunteer for this call"}</button></div>
          </article>`;
        }).join("") || '<section class="panel empty-review">No calls are currently offered.</section>'}
      </section>
    </div>
    <section class="panel my-switch-activity">
      <div class="panel-header"><div><h2>My call-switch activity</h2><p>Your offers and requests remain visible through chief review.</p></div></div>
      ${[...myOffers, ...myVolunteering].length ? [...myOffers, ...myVolunteering].map((offer)=>{
        const [statusClass,statusLabel] = callSwitchStatus(offer.status);
        const mine = offer.offeredBy === currentResidentName;
        return `<div class="my-switch-row"><span class="request-kind">${mine ? "My offer" : "Requested"}</span><span><strong>${escapeHtml(offer.callLabel)} · ${formatCallDate(offer.callDate)}</strong><small>${mine ? `Waiting for a volunteer · ${offer.volunteers.length} interested` : `Offered by ${escapeHtml(offer.offeredBy)}`}</small></span><span class="status-pill ${statusClass}">${statusLabel}</span>${mine && offer.status==="open" ? `<button class="text-button cancel-call-offer" data-switch-id="${offer.id}">Cancel offer</button>` : "<span></span>"}</div>`;
      }).join("") : '<div class="empty-review">You have no active call-switch activity.</div>'}
    </section>
  </section>`;
}

function residentPublicSchedulesView() {
  const services = configuredServices();
  if (!activePublishedService || !services.includes(activePublishedService)) {
    return `<section class="page resident-detail-page"><div class="page-head"><div><p class="eyebrow">Published program schedules</p><h1>Shared Block ${currentBlock} schedules</h1><p>Open a service to see every published resident assignment, work hours, role, coverage responsibility, and shift time.</p></div><span class="privacy-badge"><span class="icon" data-icon="check"></span> Read only</span></div>${blockNavigator("resident-public")}<div class="public-service-grid">${services.map((service,index)=>`<article class="panel public-service-card"><span class="service-icon ${programTeams[index]?.color || "purple"}">${service.slice(0,2).toUpperCase()}</span><div><h3>${service}</h3><p>${serviceRuleProfiles[service]?.staffing || "Published team schedule"}</p><small>${publishedServiceRoster(service).length} residents · assignments and hours published</small></div><button class="secondary-button compact open-published-service" data-published-service="${escapeHtml(service)}">Open roster</button></article>`).join("")}</div></section>`;
  }
  const roster = publishedServiceRoster(activePublishedService);
  const dates = [["Mon","Jun 1"],["Tue","Jun 2"],["Wed","Jun 3"],["Thu","Jun 4"],["Fri","Jun 5"],["Sat","Jun 6"],["Sun","Jun 7"]];
  const totalHours = roster.reduce((sum,resident)=>sum + resident.assignments.reduce((hours,assignment)=>hours + assignment.hours,0),0);
  const nightCount = roster.reduce((sum,resident)=>sum + resident.assignments.filter((assignment)=>assignment.type==="night").length,0);
  const roleSummary = Object.entries(roster.reduce((counts,resident)=>({ ...counts, [resident.role]: (counts[resident.role] || 0) + 1 }), {})).map(([role,count])=>`${count} ${role.toLowerCase()}${count===1?"":"s"}`).join(" · ");
  return `<section class="page resident-detail-page">
    <div class="page-head"><div><button class="back-to-services"><span class="icon" data-icon="chevron"></span> All published schedules</button><p class="eyebrow">Block ${currentBlock} · Published roster</p><h1>${escapeHtml(activePublishedService)} schedule</h1><p>Names, roles, coverage responsibilities, shifts, and scheduled work hours. Residents can view but cannot edit this roster.</p></div><span class="privacy-badge"><span class="icon" data-icon="check"></span> Published · read only</span></div>
    <div class="published-summary">
      <div><small>Residents</small><strong>${roster.length}</strong><span>${roleSummary}</span></div>
      <div><small>Scheduled hours</small><strong>${totalHours}</strong><span>Week 1 team total</span></div>
      <div><small>Night shifts</small><strong>${nightCount}</strong><span>including weekend night</span></div>
      <div><small>Coverage rule</small><strong>${escapeHtml(serviceRuleProfiles[activePublishedService]?.staffing || "Configured staffing")}</strong><span>Published by chiefs</span></div>
    </div>
    <section class="panel published-roster-panel">
      <div class="published-roster-scroll">
        <div class="published-roster-grid">
          <div class="published-roster-head"><span>Resident</span><span>Role</span><span>Coverage responsibility</span>${dates.map(([day,date])=>`<span><strong>${day}</strong><small>${date}</small></span>`).join("")}<span>Week hours</span></div>
          ${roster.map((resident,index)=>{
            const hours = resident.assignments.reduce((sum,assignment)=>sum+assignment.hours,0);
            return `<div class="published-roster-row"><span class="published-person"><i class="avatar" style="background:${avatarColor(index)}">${initials(resident.name)}</i><span><strong>${resident.name}</strong><small>${resident.pgy}</small></span></span><span><strong>${resident.role}</strong><small>${resident.pgy}</small></span><span class="coverage-assignment">${escapeHtml(resident.coverage)}</span>${resident.assignments.map((assignment)=>`<span class="published-shift ${assignment.type}"><strong>${assignment.label}</strong><small>${assignment.hours ? `${assignment.hours} hrs` : "Rest"}</small></span>`).join("")}<span class="published-hours"><strong>${hours}</strong><small>hours</small></span></div>`;
          }).join("")}
        </div>
      </div>
    </section>
    <section class="panel published-coverage-key"><div class="panel-header"><div><h2>Who is covering what</h2><p>Service responsibility remains visible even when the daily shift changes.</p></div></div><div class="coverage-key-grid">${roster.map((resident,index)=>`<div><span class="avatar" style="background:${avatarColor(index)}">${initials(resident.name)}</span><span><strong>${resident.coverage}</strong><small>${resident.name} · ${resident.role} · ${resident.assignments.reduce((sum,item)=>sum+item.hours,0)} hrs this week</small></span></div>`).join("")}</div></section>
  </section>`;
}

function residentRequestView() {
  return `<section class="resident-form-page">
    <div class="resident-form-top"><button class="back-resident"><span class="icon" data-icon="chevron"></span> Back to home</button><span>Block 13 request</span><span class="save-state"><span class="icon" data-icon="check"></span> Draft saved</span></div>
    <div class="request-progress"><span class="complete"><i>1</i><b>Rotation</b></span><em></em><span class="complete"><i>2</i><b>Vacation</b></span><em></em><span class="complete"><i>3</i><b>Days off</b></span><em></em><span class="active"><i>4</i><b>Weekends</b></span><em></em><span><i>5</i><b>Review</b></span></div>
    <div class="request-card">
      <div class="request-card-head"><span class="submission-icon purple"><span class="icon" data-icon="calendar"></span></span><div><span>Step 4 of 5</span><h1>Weekend preferences</h1><p>Choose your preferred golden weekend and any individual weekend days you need off.</p></div></div>
      <div class="request-section"><div class="request-label"><strong>Preferred golden weekend</strong><span>Select one Saturday and Sunday pair. We will prioritize it when coverage allows.</span></div><div class="weekend-options">${[["Jun 6–7","Week 1"],["Jun 13–14","Week 2"],["Jun 20–21","Week 3"],["Jun 27–28","Week 4"]].map(([date,week],i)=>`<label class="weekend-option ${i===2?"selected":""}"><input type="radio" name="golden" ${i===2?"checked":""}><span class="radio-mark"></span><span><small>${week}</small><strong>${date}</strong><em>${i===2?"Preferred":"Available"}</em></span></label>`).join("")}</div></div>
      <div class="request-section"><div class="request-label"><strong>Additional weekend day off</strong><span>Optional. Select one Saturday or Sunday outside your golden weekend.</span></div><div class="chip-options">${["Sat, Jun 6","Sun, Jun 7","Sat, Jun 13","Sun, Jun 14","Sat, Jun 27","Sun, Jun 28"].map((x,i)=>`<button class="${i===3?"selected":""}">${x}</button>`).join("")}</div></div>
      <label class="request-notes"><span>Anything the chiefs should know? <small>Optional</small></span><textarea placeholder="Add context about your weekend request..."></textarea></label>
      <div class="request-actions"><button class="secondary-button">Previous</button><div><button class="text-button">Save and finish later</button><button class="resident-primary review-request">Review request <span class="icon" data-icon="chevron"></span></button></div></div>
    </div>
  </section>`;
}

function profileDisplayName(name) {
  return name === "Resident A" ? currentResidentName : name;
}

function profileRequests(name) {
  return residentRequests.filter((request) => request.resident === name);
}

function profileSwitches(name) {
  const displayName = profileDisplayName(name);
  return callSwitchOffers.filter((offer) => offer.offeredBy === displayName || offer.volunteers.some((volunteer) => volunteer.resident === displayName));
}

function residentProfileOverview(name, resident, record) {
  const policy = record.didacticPolicies[currentBlock - 1];
  const totalMissed = record.didacticPolicies.reduce((sum, item) => sum + item.missed, 0);
  const sickDays = record.leave.filter((item) => item.type === "Sick day").reduce((sum, item) => sum + item.days, 0);
  const ptoDays = record.leave.filter((item) => item.type === "PTO").reduce((sum, item) => sum + item.days, 0);
  const pending = profileRequests(name).filter((item) => item.status === "pending").length + profileSwitches(name).filter((item) => item.status === "chief-review").length;
  const rotation = residentRotation(name);
  return `<div class="profile-overview">
    <div class="profile-summary-grid">
      <article><span class="metric-icon purple"><span class="icon" data-icon="grid"></span></span><small>Current rotation</small><strong>${rotation}</strong><em>Block ${currentBlock} · ${academicBlocks[currentBlock - 1][1]}</em></article>
      <article><span class="metric-icon amber"><span class="icon" data-icon="clipboard"></span></span><small>Didactic attendance</small><strong>${policy.attended}/${policy.sessions}</strong><em>${policy.missed} missed this block · ${totalMissed} this year</em></article>
      <article><span class="metric-icon teal"><span class="icon" data-icon="clock"></span></span><small>Leave used</small><strong>${ptoDays + sickDays} days</strong><em>${ptoDays} PTO · ${sickDays} sick</em></article>
      <article><span class="metric-icon red"><span class="icon" data-icon="alert"></span></span><small>Needs review</small><strong>${pending}</strong><em>Requests and proposed switches</em></article>
    </div>
    <div class="profile-overview-grid">
      <section class="profile-context-card"><div class="panel-header"><div><h3>Block ${currentBlock} scheduling context</h3><p>Automatically derived from the master schedule and institution profile.</p></div></div>
        <div class="profile-context-list">
          <span><small>Service</small><strong>${rotation}</strong></span>
          <span><small>Clinic</small><strong>${resident.clinic[currentBlock - 1] === "None" ? "No continuity clinic" : resident.clinic[currentBlock - 1]}</strong></span>
          <span><small>Didactics</small><strong>${policy.required ? "Attendance required" : "Attendance optional"}</strong></span>
          <span><small>Attendance mode</small><strong>${policy.virtual ? "Virtual allowed" : "In person required"}</strong></span>
          <span><small>Protected time</small><strong>${policy.day}</strong></span>
        </div>
      </section>
      <section class="profile-attention-card"><h3>Attention summary</h3>
        ${policy.missed ? `<span class="warn"><span class="icon" data-icon="alert"></span>${policy.missed} didactic session missed during ${rotation}.</span>` : `<span><span class="icon" data-icon="check"></span>No didactic attendance gap this block.</span>`}
        ${record.leave.some((item) => item.status === "pending") ? `<span class="warn"><span class="icon" data-icon="clock"></span>One leave request needs coverage review.</span>` : `<span><span class="icon" data-icon="check"></span>No pending leave requests.</span>`}
        <span><span class="icon" data-icon="check"></span>Clinic and protected time are linked to schedule generation.</span>
      </section>
    </div>
    <section class="profile-timeline"><div class="panel-header"><div><h3>Recent activity</h3><p>One record shared between resident and chief portals.</p></div></div>
      <div><span class="pattern-icon didactic"></span><span><strong>Didactic attendance updated</strong><small>June 17 · Quality Improvement marked missed</small></span><button class="link-button profile-tab-link" data-profile-section="didactics">Review</button></div>
      <div><span class="pattern-icon conference"></span><span><strong>PTO request submitted</strong><small>June 29–30 · clinic cancellation flagged</small></span><button class="link-button profile-tab-link" data-profile-section="leave">Review</button></div>
      <div><span class="pattern-icon clinic"></span><span><strong>Annual preference record synchronized</strong><small>Master schedule and electives visible to chiefs</small></span><button class="link-button profile-tab-link" data-profile-section="requests">Review</button></div>
    </section>
  </div>`;
}

function residentProfileClinic(name, resident) {
  return `<div class="block-clinic-grid">
    <div class="clinic-grid-header"><span>Block</span><span>Dates / rotation</span><span>Clinic pattern</span><span>Frequency</span><span>Scheduling action</span></div>
    ${academicBlocks.map(([number,dates],index)=>`<div class="clinic-grid-row ${index+1===currentBlock?"current":""}" data-clinic-block="${index}">
      <span><strong>Block ${number}</strong>${index+1===currentBlock?'<i>Current</i>':""}</span>
      <span>${dates}<small>${residentRotation(name, index)}</small></span>
      <label><select class="resident-clinic-input"><option ${resident.clinic[index]==="None"?"selected":""}>None</option>${["Mon AM","Mon PM","Tue AM","Tue PM","Wed AM","Wed PM","Thu AM","Thu PM","Fri AM","Fri PM"].map(pattern=>`<option ${resident.clinic[index]===pattern?"selected":""}>${pattern}</option>`).join("")}</select></label>
      <label><select><option>Weekly</option><option>1st & 3rd week</option><option>2nd & 4th week</option><option>Selected dates</option></select></label>
      <span class="clinic-action ${resident.clinic[index]==="None"?"none":"protect"}">${resident.clinic[index]==="None"?"No clinic":"Protect time"}</span>
    </div>`).join("")}
  </div>`;
}

function residentProfileDidactics(name, resident, record) {
  const totalSessions = record.didacticPolicies.reduce((sum, item) => sum + item.sessions, 0);
  const totalMissed = record.didacticPolicies.reduce((sum, item) => sum + item.missed, 0);
  return `<div class="profile-section-content">
    <div class="profile-section-summary">
      <span><small>Academic year</small><strong>${totalSessions - totalMissed}/${totalSessions}</strong><em>sessions attended</em></span>
      <span><small>Missed this year</small><strong>${totalMissed}</strong><em>${Math.round((totalSessions-totalMissed)/totalSessions*100)}% attendance</em></span>
      <span><small>Current block</small><strong>${record.didacticPolicies[currentBlock-1].missed}</strong><em>missed sessions</em></span>
      <span><small>Institution source</small><strong>${resident.institution}</strong><em>${resident.didactic}</em></span>
    </div>
    <section class="didactic-policy-table">
      <div class="didactic-policy-head"><span>Block / rotation</span><span>Attendance day</span><span>Requirement</span><span>Mode</span><span>Attendance</span></div>
      ${record.didacticPolicies.map((policy,index)=>`<div class="didactic-policy-row ${index+1===currentBlock?"current":""}" data-didactic-block="${index}">
        <span><strong>Block ${index+1}</strong><small>${residentRotation(name,index)}</small></span>
        <label><input class="didactic-day-input" value="${escapeHtml(policy.day)}"></label>
        <label><select class="didactic-required-input"><option value="true" ${policy.required?"selected":""}>Required</option><option value="false" ${!policy.required?"selected":""}>Optional / service need</option></select></label>
        <label><select class="didactic-virtual-input"><option value="false" ${!policy.virtual?"selected":""}>In person only</option><option value="true" ${policy.virtual?"selected":""}>Virtual allowed</option></select></label>
        <span class="attendance-score ${policy.missed?"warn":""}"><strong>${policy.attended}/${policy.sessions}</strong><small>${policy.missed} missed</small></span>
      </div>`).join("")}
    </section>
    <section class="attendance-log"><div class="panel-header"><div><h3>Block ${currentBlock} attendance log</h3><p>Track individual lectures and the scheduling reason for an absence.</p></div><button class="secondary-button compact add-attendance-session"><span class="icon" data-icon="plus"></span> Add session</button></div>
      ${record.attendance.map((item,index)=>`<div class="attendance-log-row" data-attendance-index="${index}"><span><strong>${item.date}</strong><small>${item.topic}</small></span><span>${item.mode}</span><label><select class="attendance-status-input"><option ${item.status==="Scheduled"?"selected":""}>Scheduled</option><option ${item.status==="Attended"?"selected":""}>Attended</option><option ${item.status==="Missed"?"selected":""}>Missed</option><option ${item.status==="Excused"?"selected":""}>Excused</option></select></label><span class="${item.status==="Missed"?"attendance-note warn":"attendance-note"}">${item.note || "No note"}</span></div>`).join("") || '<div class="empty-review">No attendance sessions recorded.</div>'}
    </section>
  </div>`;
}

function residentProfileLeave(name, record) {
  const approved = record.leave.filter((item)=>item.status==="approved");
  const sick = approved.filter((item)=>item.type==="Sick day").reduce((sum,item)=>sum+item.days,0);
  const pto = approved.filter((item)=>item.type==="PTO").reduce((sum,item)=>sum+item.days,0);
  const inpatient = approved.filter((item)=>["Floor","PICU","NICU"].includes(item.rotation)).reduce((sum,item)=>sum+item.days,0);
  return `<div class="profile-section-content">
    <div class="profile-section-summary">
      <span><small>Approved PTO</small><strong>${pto} days</strong><em>academic year total</em></span>
      <span><small>Sick leave</small><strong>${sick} day</strong><em>academic year total</em></span>
      <span><small>Inpatient days affected</small><strong>${inpatient}</strong><em>Floor, PICU, or NICU</em></span>
      <span><small>Pending review</small><strong>${record.leave.filter((item)=>item.status==="pending").length}</strong><em>coverage decision needed</em></span>
    </div>
    <div class="leave-guidance"><span class="icon" data-icon="alert"></span><div><strong>Coverage impact is recorded with every leave entry</strong><p>This lets chiefs distinguish elective or vacation time from absences affecting clinic, ED, ICU, or floor coverage. Residents see the same totals.</p></div></div>
    <section class="leave-ledger"><div class="leave-ledger-head"><span>Type / dates</span><span>Block and rotation</span><span>Coverage affected</span><span>Days</span><span>Status</span><span></span></div>
      ${record.leave.map((item)=>`<div class="leave-ledger-row" data-leave-id="${item.id}"><span><strong>${item.type}</strong><small>${item.start}${item.end!==item.start?` – ${item.end}`:""}</small></span><span><strong>Block ${item.block} · ${item.rotation}</strong><small>${item.note}</small></span><span>${item.coverage}</span><strong>${item.days}</strong><span class="status-pill ${item.status==="approved"?"ready":item.status==="declined"?"missing":"review"}">${item.status}</span><span class="request-decision-actions">${item.status==="pending"?'<button class="approve-leave">Approve</button><button class="decline-leave">Decline</button>':'<button class="reopen-leave">Reopen</button>'}</span></div>`).join("")}
    </section>
    <button class="secondary-button compact add-leave-entry"><span class="icon" data-icon="plus"></span> Add leave or exam</button>
  </div>`;
}

function residentProfileMaster(name) {
  const row = residentMasterIndex(name);
  return `<div class="profile-section-content"><div class="profile-section-intro"><div><h3>Individual master schedule</h3><p>Changes here update the resident’s rotation context, didactic rules, call eligibility, and monthly service roster.</p></div><button class="secondary-button compact" data-view-target="master">Open full master schedule</button></div>
    <div class="resident-master-strip">${academicBlocks.map(([number,dates],index)=>`<label class="${index+1===currentBlock?"current":""}"><span>Block ${number}</span><small>${dates}</small><select class="resident-master-rotation" data-master-block="${index}">${masterRotationOptions.map((option)=>`<option ${masterAssignments[row][index].rotation===option.name?"selected":""}>${option.name}</option>`).join("")}</select></label>`).join("")}</div>
  </div>`;
}

function residentProfileRequests(name) {
  const requests = profileRequests(name);
  const switches = profileSwitches(name);
  const annualSubmission = name === annualPreferenceSubmission.resident ? annualPreferenceSubmission : null;
  return `<div class="profile-section-content">
    ${annualSubmission ? `<section class="profile-request-card"><div><span class="request-kind">Annual plan</span><h3>Master schedule and elective preferences</h3><p>${annualSubmission.submittedAt} · top templates ${annualSubmission.templateRanking.slice(0,4).join(", ")}</p></div><span class="status-pill ${annualPreferenceStatus()[0]}">${annualPreferenceStatus()[1]}</span><button class="secondary-button compact open-annual-master">Open in master schedule</button></section>` : ""}
    <section class="profile-request-list"><div class="panel-header"><div><h3>Resident requests</h3><p>Approvals immediately become available to schedule generation.</p></div><span class="status-pill review">${requests.filter((item)=>item.status==="pending").length} pending</span></div>
      ${requests.map(request=>`<div class="chief-request-row" data-request-id="${request.id}"><span class="request-kind">${request.type}</span><span><strong>${request.detail}</strong><small>Block ${request.block} · ${request.submitted}</small></span><span class="request-conflict ${request.conflict?"warn":""}">${request.conflict || "No detected conflict"}</span><span class="status-pill ${request.status==="approved"?"ready":request.status==="declined"?"missing":"review"}">${request.status}</span><span class="request-decision-actions">${request.status==="pending"?'<button class="approve-request">Approve</button><button class="decline-request">Decline</button>':'<button class="reset-request">Reopen</button>'}</span></div>`).join("") || '<div class="empty-review">No requests submitted.</div>'}
    </section>
    <section class="profile-request-list"><div class="panel-header"><div><h3>Call switches</h3><p>Offers and proposed exchanges involving this resident.</p></div><span class="status-pill review">${switches.filter((item)=>item.status==="chief-review").length} awaiting decision</span></div>
      ${switches.map((offer)=>`<div class="profile-switch-row"><span><strong>${offer.callLabel}</strong><small>${formatCallDate(offer.callDate)} · ${offer.offeredBy}</small></span><span>${offer.volunteers[0]?.resident ? `Proposed receiver: ${offer.volunteers[0].resident}` : "Waiting for volunteer"}</span><span class="status-pill ${callSwitchStatus(offer.status)[0]}">${callSwitchStatus(offer.status)[1]}</span><div class="request-decision-actions">${offer.status==="chief-review"?`<button class="approve-call-switch" data-switch-id="${offer.id}">Approve</button><button class="decline-call-switch" data-switch-id="${offer.id}">Decline</button>`:""}</div></div>`).join("") || '<div class="empty-review">No call switches involve this resident.</div>'}
    </section>
  </div>`;
}

function residentProfileEligibility(name, resident, record) {
  const eligibility = record.eligibility;
  return `<div class="profile-section-content"><div class="profile-section-intro"><div><h3>Scheduling eligibility</h3><p>These settings combine PGY level, institution, annual track, and current master-schedule rotation.</p></div></div>
    <div class="profile-eligibility-grid">
      ${[["Call pool","callPool","May cover eligible gaps"],["Night coverage","nightCoverage","Eligible for night assignments"],["Jeopardy","jeopardy","Eligible for J1–J3 and crossover"],["Advanced electives","advancedElectives","PGY-3 restricted choices"],["Outside rotator","outsideRotator","Institution-specific rules apply"]].map(([label,key,copy])=>`<label><span><strong>${label}</strong><small>${copy}</small></span><span class="switch"><input class="profile-eligibility-input" data-eligibility-key="${key}" type="checkbox" ${eligibility[key]?"checked":""}><span></span></span></label>`).join("")}
    </div>
    <div class="eligibility-explanation"><span class="icon" data-icon="spark"></span><div><strong>Current decision note</strong><p>${escapeHtml(eligibility.note)}</p><p>Current Block ${currentBlock}: ${residentRotation(name)} · ${resident.institution} · ${resident.pgy}</p></div></div>
  </div>`;
}

function residentProfileContent(name, resident, record) {
  if (activeResidentSection === "clinic") return residentProfileClinic(name, resident);
  if (activeResidentSection === "master") return residentProfileMaster(name);
  if (activeResidentSection === "didactics") return residentProfileDidactics(name, resident, record);
  if (activeResidentSection === "leave") return residentProfileLeave(name, record);
  if (activeResidentSection === "requests") return residentProfileRequests(name);
  if (activeResidentSection === "eligibility") return residentProfileEligibility(name, resident, record);
  return residentProfileOverview(name, resident, record);
}

function residentsView() {
  const resident = residentProfiles[activeResident];
  const record = ensureResidentActivityRecord(activeResident);
  const returnButton = profileReturnContext ? `<button class="secondary-button compact profile-return-button"><span class="icon" data-icon="chevron"></span> ${escapeHtml(profileReturnContext.label)}</button>` : "";
  const tabs = [
    ["overview","Overview"],["clinic","Clinic plan"],["master","Master schedule"],
    ["didactics","Didactics"],["leave","Leave, PTO & exams"],["requests","Requests & switches"],["eligibility","Eligibility"]
  ];
  return `<section class="page resident-admin-page">
    <div class="page-head"><div><p class="eyebrow">People and availability</p><h1>Resident profiles</h1><p>One active record for master rotations, clinic, didactics, attendance, leave, requests, switches, and eligibility.</p></div><div class="page-head-actions">${returnButton}<button class="secondary-button compact"><span class="icon" data-icon="download"></span> Import roster</button><button class="primary-button compact add-resident"><span class="icon" data-icon="plus"></span> Add resident</button></div></div>
    <div class="resident-admin-layout">
      <aside class="panel resident-directory">
        <div class="directory-search"><span class="icon" data-icon="search"></span><input placeholder="Search 72 residents"></div>
        <div class="directory-filters"><button class="active">All</button><button>PGY-1</button><button>PGY-2</button><button>PGY-3</button></div>
        ${Object.entries(residentProfiles).map(([name,item],index)=>`<button class="resident-directory-item ${name===activeResident?"active":""}" data-profile-resident="${name}"><span class="avatar" style="background:${avatarColor(index)}">${initials(profileDisplayName(name))}</span><span><strong>${profileDisplayName(name)}</strong><small>${item.pgy} · ${item.institution}</small></span><span class="profile-complete"><span class="icon" data-icon="check"></span></span></button>`).join("")}
        <div class="directory-more">Showing sample profiles · roster supports 72+</div>
      </aside>
      <section class="resident-profile-column">
        <section class="panel resident-profile-editor active-profile-editor">
          <div class="profile-editor-head"><span class="avatar profile-avatar">${initials(profileDisplayName(activeResident))}</span><div><span>Resident profile</span><h2>${profileDisplayName(activeResident)}</h2><p>${resident.pgy} · ${resident.institution} · Block ${currentBlock} ${residentRotation(activeResident)}</p></div><div class="profile-actions"><button class="secondary-button compact">Edit details</button><button class="primary-button compact save-profile">Save profile</button></div></div>
          <div class="auto-pull-banner"><span class="icon" data-icon="spark"></span><div><strong>One profile feeds every schedule</strong><p>Master rotation, clinic, didactics, leave, and approved requests are checked before shifts and calls are assigned.</p></div><label class="switch"><input type="checkbox" checked><span></span></label></div>
          <div class="profile-tabs">${tabs.map(([id,label])=>`<button class="${activeResidentSection===id?"active":""}" data-profile-section="${id}">${label}</button>`).join("")}</div>
          ${residentProfileContent(activeResident, resident, record)}
        </section>
      </section>
    </div>
  </section>`;
}

function attendanceView() {
  const session = attendanceSessionById();
  const roster = Object.entries(residentProfiles);
  const attended = roster.filter(([name]) => session?.attendance?.[name] === "Attended").length;
  const unresolved = roster.filter(([name]) => ["Not checked in", undefined].includes(session?.attendance?.[name])).length;
  const required = roster.filter(([name]) => ensureResidentActivityRecord(name).didacticPolicies[(session?.block || currentBlock) - 1].required).length;
  return `<section class="page attendance-page">
    <div class="page-head">
      <div><p class="eyebrow">Didactics and education</p><h1>Lecture attendance</h1><p>Open a session on the chief iPad and let each resident tap their name. Every check-in updates the resident profile and both portals immediately.</p></div>
      <div class="page-head-actions"><button class="secondary-button compact attendance-export"><span class="icon" data-icon="download"></span> Export log</button><button class="primary-button compact new-attendance-session"><span class="icon" data-icon="plus"></span> New lecture</button></div>
    </div>
    <div class="attendance-layout">
      <aside class="panel attendance-session-list">
        <div class="attendance-list-head"><div><h2>Sessions</h2><p>Block ${currentBlock} lecture log</p></div><span>${didacticAttendanceSessions.filter((item)=>item.block===currentBlock).length}</span></div>
        ${didacticAttendanceSessions.filter((item)=>item.block===currentBlock).sort((a,b)=>b.date.localeCompare(a.date)).map((item)=>`
          <button class="attendance-session-item ${item.id===session?.id?"active":""}" data-attendance-session="${item.id}">
            <span class="attendance-session-date"><strong>${new Date(`${item.date}T12:00:00`).getDate()}</strong><small>${new Date(`${item.date}T12:00:00`).toLocaleDateString("en-US",{month:"short"})}</small></span>
            <span><strong>${escapeHtml(item.type)}</strong><small>${escapeHtml(item.time)} · ${escapeHtml(item.mode)}</small></span>
            <i class="${item.status.toLowerCase()}">${item.status}</i>
          </button>`).join("")}
      </aside>
      <div class="attendance-main">
        <section class="panel attendance-session-builder">
          <div class="attendance-session-title"><div><span>Active lecture</span><h2>${escapeHtml(session?.type || "New lecture")}</h2><p>${escapeHtml(session?.topic || "Add a topic or lecture title")}</p></div><span class="live-session-badge"><i></i>${session?.status === "Open" ? "Check-in open" : "Session closed"}</span></div>
          <div class="attendance-session-fields">
            <label><span>Block</span><select class="attendance-block-input">${academicBlocks.map(([number,dates])=>`<option value="${number}" ${Number(number)===(session?.block||currentBlock)?"selected":""}>Block ${number} · ${dates}</option>`).join("")}</select></label>
            <label><span>Date</span><input class="attendance-date-input" type="date" value="${session?.date || "2026-06-24"}"></label>
            <label><span>Time</span><input class="attendance-time-input" value="${escapeHtml(session?.time || "12:30–13:30")}"></label>
            <label><span>Lecture type</span><select class="attendance-type-input">${["Morning Report","Grand Rounds","Radiology Rounds","Board Review","Morbidity and Mortality","Quality Improvement","Simulation","Other"].map((type)=>`<option ${type===session?.type?"selected":""}>${type}</option>`).join("")}</select></label>
            <label class="attendance-topic-field"><span>Topic or title</span><input class="attendance-topic-input" value="${escapeHtml(session?.topic || "")}" placeholder="Optional lecture title"></label>
            <label><span>Attendance mode</span><select class="attendance-mode-input">${["In person","Virtual","Hybrid"].map((mode)=>`<option ${mode===session?.mode?"selected":""}>${mode}</option>`).join("")}</select></label>
          </div>
          <div class="attendance-session-actions"><span>Changes are saved to this session and linked resident profiles.</span><button class="secondary-button compact toggle-attendance-session">${session?.status === "Open" ? "Close check-in" : "Reopen check-in"}</button><button class="primary-button compact save-attendance-session">Save lecture</button></div>
        </section>
        <div class="attendance-metrics">
          <article><small>Checked in</small><strong>${attended}/${roster.length}</strong><span>${Math.round(attended/roster.length*100)}% of roster</span></article>
          <article><small>Required today</small><strong>${required}</strong><span>Based on Block ${session?.block || currentBlock} rotations</span></article>
          <article class="${unresolved?"warn":""}"><small>Not checked in</small><strong>${unresolved}</strong><span>${unresolved ? "Waiting for attendance" : "Roster complete"}</span></article>
        </div>
        <section class="panel attendance-roster-panel">
          <div class="attendance-roster-head"><div><h2>Resident check-in</h2><p>Tap a name once to mark attended. Chiefs can also mark an absence as missed or excused.</p></div><div class="attendance-roster-tools"><input class="attendance-roster-search" placeholder="Search residents"><button class="secondary-button compact mark-unchecked-missed">Close and mark unchecked missed</button></div></div>
          <div class="attendance-roster">
            ${roster.map(([name,resident],index)=>{
              const status = session?.attendance?.[name] || "Not checked in";
              const policy = ensureResidentActivityRecord(name).didacticPolicies[(session?.block || currentBlock)-1];
              return `<article class="attendance-person ${attendanceStatusClass(status)}" data-attendance-resident="${name}" data-search-name="${profileDisplayName(name).toLowerCase()}">
                <button class="attendance-check" aria-label="Toggle ${profileDisplayName(name)} attendance"><span class="icon" data-icon="${status==="Attended"?"check":"plus"}"></span></button>
                <span class="avatar" style="background:${avatarColor(index)}">${initials(profileDisplayName(name))}</span>
                <button class="attendance-person-name"><strong>${profileDisplayName(name)}</strong><small>${resident.pgy} · ${resident.institution}</small><em>${residentRotation(name, (session?.block || currentBlock)-1)} · ${policy.required?"Required":"Optional"} · ${policy.virtual?"Virtual allowed":"In person"}</em></button>
                <span class="attendance-person-status">${status}</span>
                <div class="attendance-person-actions"><button data-attendance-action="excused">Excused</button><button data-attendance-action="missed">Missed</button><button data-attendance-action="profile">Profile</button></div>
              </article>`;
            }).join("")}
          </div>
        </section>
      </div>
    </div>
  </section>`;
}

function render() {
  const views = {
    dashboard: chiefDashboard,
    builder: builderView,
    schedule: scheduleView,
    analytics: analyticsView,
    master: masterView,
    attendance: attendanceView,
    residents: residentsView,
    rules: rulesView,
    "resident-home": residentHome,
    "resident-request": residentRequestView,
    "resident-schedule": residentScheduleView,
    "resident-profile": residentSelfRecordView,
    "resident-master": residentMasterView,
    "resident-annual": residentAnnualPreferencesView,
    "resident-requests": residentRequestsView,
    "resident-switches": residentCallSwitchView,
    "resident-public": residentPublicSchedulesView
  };
  app.innerHTML = (views[currentView] || chiefDashboard)();
  hydrateIcons(app);
  bindViewActions();
  persistAppState();
}

function navigate(view) {
  currentView = view;
  if (view === "schedule") loadActiveScheduleDraft();
  document.querySelector("#sidebar").classList.remove("open");
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
window.navigate = navigate;

function configureNavigation(portal) {
  const nav = document.querySelector(".main-nav");
  if (portal === "resident") {
    nav.innerHTML = `
      <p class="nav-label">My workspace</p>
      <button class="nav-item ${currentView==="resident-home"?"active":""}" data-view="resident-home"><span class="icon" data-icon="home"></span><span>My overview</span></button>
      <button class="nav-item ${currentView==="resident-profile"?"active":""}" data-view="resident-profile"><span class="icon" data-icon="clipboard"></span><span>My profile & records</span></button>
      <button class="nav-item ${currentView==="resident-profile"&&activeResidentSelfSection==="didactics"?"active":""}" data-view="resident-profile" data-resident-section="didactics"><span class="icon" data-icon="check"></span><span>My attendance</span></button>
      <button class="nav-item ${currentView==="resident-schedule"?"active":""}" data-view="resident-schedule"><span class="icon" data-icon="calendar"></span><span>My schedule</span></button>
      <button class="nav-item ${currentView==="resident-master"?"active":""}" data-view="resident-master"><span class="icon" data-icon="grid"></span><span>My master schedule</span></button>
      <button class="nav-item ${currentView==="resident-annual"?"active":""}" data-view="resident-annual"><span class="icon" data-icon="clipboard"></span><span>Annual preferences</span><span class="nav-badge">${annualPreferenceSubmission.status === "approved" ? "✓" : "1"}</span></button>
      <button class="nav-item ${currentView==="resident-public"?"active":""}" data-view="resident-public"><span class="icon" data-icon="users"></span><span>Published schedules</span></button>
      <p class="nav-label">Requests</p>
      <button class="nav-item ${currentView==="resident-requests"||currentView==="resident-request"?"active":""}" data-view="resident-requests"><span class="icon" data-icon="clipboard"></span><span>Requests & approvals</span><span class="nav-badge">1</span></button>
      <button class="nav-item ${currentView==="resident-switches"?"active":""}" data-view="resident-switches"><span class="icon" data-icon="users"></span><span>Call switches</span><span class="nav-badge">${callSwitchOffers.filter((offer)=>offer.status==="open" && offer.offeredBy!==currentResidentName).length}</span></button>
      <button class="nav-item" data-view="resident-requests"><span class="icon" data-icon="clock"></span><span>PTO & sick leave</span></button>`;
  } else {
    nav.innerHTML = `
      <p class="nav-label">Workspace</p>
      <button class="nav-item ${currentView==="dashboard"?"active":""}" data-view="dashboard"><span class="icon" data-icon="home"></span><span>Overview</span></button>
      <button class="nav-item ${currentView==="builder"?"active":""}" data-view="builder"><span class="icon" data-icon="wand"></span><span>Schedule builder</span><span class="nav-badge">${residentRequests.filter(request=>request.status==="pending").length}</span></button>
      <button class="nav-item ${currentView==="schedule"?"active":""}" data-view="schedule"><span class="icon" data-icon="calendar"></span><span>Schedules</span></button>
      <button class="nav-item ${currentView==="analytics"?"active":""}" data-view="analytics"><span class="icon" data-icon="chart"></span><span>Analytics</span></button>
      <button class="nav-item ${currentView==="master"?"active":""}" data-view="master"><span class="icon" data-icon="grid"></span><span>Master schedule</span></button>
      <button class="nav-item ${currentView==="attendance"?"active":""}" data-view="attendance"><span class="icon" data-icon="clipboard"></span><span>Attendance</span><span class="nav-badge">${attendanceSessionById()?.status==="Open"?"Live":"✓"}</span></button>
      <p class="nav-label">People & rules</p>
      <button class="nav-item ${currentView==="residents"?"active":""}" data-view="residents"><span class="icon" data-icon="users"></span><span>Residents & approvals</span><span class="nav-badge">${residentRequests.filter(request=>request.status==="pending").length + callSwitchOffers.filter(offer=>offer.status==="chief-review").length}</span></button>
      <button class="nav-item ${currentView==="rules"?"active":""}" data-view="rules"><span class="icon" data-icon="settings"></span><span>Institution rules</span></button>`;
  }
  hydrateIcons(nav);
}

function bindViewActions() {
  app.querySelectorAll("[data-view-target]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.viewTarget)));
  app.querySelectorAll("[data-builder-step], [data-builder-step-target]").forEach((button) => button.addEventListener("click", () => {
    activeBuilderStep = button.dataset.builderStep || button.dataset.builderStepTarget;
    render();
  }));
  app.querySelectorAll("[data-master-step]").forEach((button) => button.addEventListener("click", () => {
    activeAnnualWorkbook = "masters";
    activeMasterStep = button.dataset.masterStep;
    render();
  }));
  app.querySelectorAll("[data-annual-workbook]").forEach((button) => button.addEventListener("click", () => {
    activeAnnualWorkbook = button.dataset.annualWorkbook;
    render();
  }));
  app.querySelectorAll("[data-workbook-display]").forEach((button) => button.addEventListener("click", () => {
    annualWorkbookDisplayMode = button.dataset.workbookDisplay;
    persistAppState();
    render();
    showToast(annualWorkbookDisplayMode === "excel" ? "Excel-like view enabled" : "Digital view enabled", annualWorkbookDisplayMode === "excel" ? "This workbook now shows familiar spreadsheet-style rows, columns, and resident names." : "This workbook is back to the focused card view.");
  }));
  app.querySelectorAll("[data-master-import-mode]").forEach((button) => button.addEventListener("click", () => {
    masterImportState.mode = button.dataset.masterImportMode;
    activeAnnualWorkbook = "masters";
    persistAppState();
    render();
  }));
  app.querySelectorAll(".trigger-master-import").forEach((button) => button.addEventListener("click", () => {
    app.querySelector(".master-import-file")?.click();
  }));
  app.querySelectorAll(".master-import-file").forEach((input) => input.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const extension = file.name.split(".").pop()?.toUpperCase() || "FILE";
    masterImportState = {
      ...masterImportState,
      mode: "import",
      status: "staged",
      fileName: file.name,
      fileType: extension,
      uploadedAt: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }),
      mappedRows: masterRowsForPgy(activeMasterPgy).length,
      mappedBlocks: academicBlocks.length,
      notes: [
        "Resident rows will match profile names.",
        "Block columns will become annual master rotations.",
        "Elective/vacation cells will feed call pool eligibility."
      ]
    };
    persistAppState();
    render();
    showToast("Master file staged", "Review the detected mapping, then apply it to make it the active source.");
  }));
  app.querySelectorAll(".apply-master-import").forEach((button) => button.addEventListener("click", () => {
    applyImportedMasterPrototype();
    persistAppState();
    render();
    showToast("Imported master applied", "Resident profiles, service coverage, call pools, and schedule builders now read from the imported master source.");
  }));
  app.querySelectorAll(".clear-master-import").forEach((button) => button.addEventListener("click", () => {
    masterImportState = {
      mode: "build",
      status: "empty",
      fileName: "",
      fileType: "",
      uploadedAt: "",
      mappedRows: 0,
      mappedBlocks: academicBlocks.length,
      detectedSheets: ["PGY1", "PGY2", "PGY3", "MedPeds"],
      notes: []
    };
    persistAppState();
    render();
    showToast("Import cleared", "The master builder is back to the resident-request workflow.");
  }));
  app.querySelectorAll("[data-coverage-service]").forEach((button) => button.addEventListener("click", () => {
    activeCoverageService = button.dataset.coverageService;
    render();
    showToast(`${activeCoverageService} opened`, "The service roster detail now shows resident names, source, and chief action notes.");
  }));
  app.querySelectorAll("[data-call-pool]").forEach((button) => button.addEventListener("click", () => {
    activeCallPool = button.dataset.callPool;
    render();
    showToast(`${activeCallPool} opened`, "This list is pulled from the selected block's master schedule eligibility.");
  }));
  app.querySelectorAll("[data-holiday-service]").forEach((button) => button.addEventListener("click", () => {
    activeHoliday = button.dataset.holiday || activeHoliday;
    activeHolidayService = button.dataset.holidayService;
    render();
    showToast(`${activeHolidayService} opened`, `${activeHoliday} now shows the master-linked resident names for that service.`);
  }));
  app.querySelectorAll("[data-holiday]:not([data-holiday-service])").forEach((button) => button.addEventListener("click", () => {
    activeHoliday = button.dataset.holiday;
    render();
    showToast(`${activeHoliday} selected`, "Holiday coverage cards and service details are now focused on this holiday.");
  }));
  app.querySelectorAll("[data-break-service]").forEach((button) => button.addEventListener("click", () => {
    activeBreak = button.dataset.break || activeBreak;
    activeBreakService = button.dataset.breakService;
    render();
    showToast(`${activeBreakService} opened`, `${activeBreak} now shows resident names pulled from the linked block master schedule.`);
  }));
  app.querySelectorAll("[data-break]:not([data-break-service])").forEach((button) => button.addEventListener("click", () => {
    activeBreak = button.dataset.break;
    render();
    showToast(`${activeBreak} selected`, "Holiday break staffing is now focused on this break period.");
  }));
  app.querySelectorAll("[data-master-block-service]").forEach((button) => button.addEventListener("click", () => {
    activeMasterBlockService = button.dataset.masterBlockService;
    render();
    showToast(`${activeMasterBlockService} opened`, `Block ${currentBlock} now shows the residents pulled from the finalized master schedule.`);
  }));
  app.querySelectorAll("button[data-master-block]").forEach((button) => button.addEventListener("click", () => {
    currentBlock = Number(button.dataset.masterBlock);
    if (activeAnnualWorkbook === "masters") activeMasterStep = "coverage";
    render();
    showToast(`Block ${currentBlock} selected`, activeAnnualWorkbook === "masters" ? "The master builder is showing service counts, assigned residents, and coverage gaps for this block." : "This workbook section is now showing counts and coverage details for the selected block.");
  }));
  app.querySelectorAll(".builder-block-select").forEach((select) => select.addEventListener("change", () => {
    currentBlock = Number(select.value);
    render();
    showToast(`Block ${currentBlock} selected`, "Builder roster, protected time, and requests were refreshed from linked records.");
  }));
  app.querySelectorAll(".builder-service-select").forEach((select) => select.addEventListener("change", () => {
    activeBuilderService = select.value;
    render();
    showToast(`${activeBuilderService} selected`, "The builder now shows the residents and rules for this service.");
  }));
  app.querySelectorAll(".master-class-size-input").forEach((input) => input.addEventListener("change", () => {
    const rule = ensurePgyMasterRule(activeMasterPgy);
    rule.classSize = Math.max(1, Number(input.value) || masterRowsForPgy(activeMasterPgy).length || 1);
    persistAppState();
    render();
    showToast("Master template count updated", `${activeMasterPgy} now expects ${rule.classSize} annual master schedule assignments.`);
  }));
  app.querySelectorAll(".program-block-count-input").forEach((input) => input.addEventListener("change", () => {
    programSettings.blockCount = Math.max(1, Number(input.value) || academicBlocks.length);
    persistAppState();
    render();
    showToast("Year structure updated", `This program is set to ${programSettings.blockCount} scheduling block${programSettings.blockCount === 1 ? "" : "s"} per year.`);
  }));
  app.querySelectorAll(".master-planning-option").forEach((input) => input.addEventListener("change", () => {
    masterPlanningOptions[input.dataset.planningOption] = input.checked;
    persistAppState();
    render();
    showToast("Master scheduling goal updated", "The builder will use this as decision support while balancing templates.");
  }));
  app.querySelectorAll("[data-master-add-rotation]").forEach((button) => button.addEventListener("click", () => {
    const rule = ensurePgyMasterRule(activeMasterPgy);
    const nextNumber = rule.rotations.filter((item) => item.name.startsWith("New rotation")).length + 1;
    const newRule = { name: `New rotation ${nextNumber}`, min: 0, max: 2, mandatory: false, feedsService: "" };
    rule.rotations.push(newRule);
    syncMasterRotationOption(newRule, activeMasterPgy);
    persistAppState();
    render();
    showToast("Rotation added", "Rename it, set the min/max target, and choose whether it is core for this PGY class.");
  }));
  app.querySelectorAll("[data-master-rule-delete]").forEach((button) => button.addEventListener("click", () => {
    const rule = ensurePgyMasterRule(activeMasterPgy);
    const removed = rule.rotations.splice(Number(button.dataset.masterRuleDelete), 1)[0];
    persistAppState();
    render();
    showToast("Rotation removed from this PGY", `${removed?.name || "Rotation"} will no longer be counted as a ${activeMasterPgy} requirement.`);
  }));
  app.querySelectorAll("[data-master-rule-move]").forEach((button) => button.addEventListener("click", () => {
    const rule = ensurePgyMasterRule(activeMasterPgy);
    const index = Number(button.dataset.masterRuleMove);
    const nextIndex = button.dataset.direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= rule.rotations.length) return;
    const [item] = rule.rotations.splice(index, 1);
    rule.rotations.splice(nextIndex, 0, item);
    persistAppState();
    render();
  }));
  app.querySelectorAll(".master-rule-input").forEach((input) => input.addEventListener("change", () => {
    const rule = ensurePgyMasterRule(activeMasterPgy);
    const row = rule.rotations[Number(input.dataset.ruleIndex)];
    if (!row) return;
    const field = input.dataset.field;
    if (field === "mandatory") row.mandatory = input.checked;
    else if (field === "min" || field === "max") row[field] = Math.max(0, Number(input.value) || 0);
    else row[field] = input.value.trim();
    if (row.max < row.min) row.max = row.min;
    syncMasterRotationOption(row, activeMasterPgy);
    persistAppState();
    render();
    showToast("Rotation requirement updated", "Coverage counters and final master validation now use this edited rule.");
  }));
  app.querySelectorAll(".master-ranking-sort").forEach((select) => select.addEventListener("change", () => {
    masterRankingSort = select.value;
    render();
  }));
  app.querySelectorAll(".profile-return-button").forEach((button) => button.addEventListener("click", () => {
    if (!profileReturnContext) return;
    currentView = profileReturnContext.view;
    activeMasterStep = profileReturnContext.masterStep;
    activeAnnualWorkbook = profileReturnContext.annualWorkbook;
    currentBlock = profileReturnContext.block;
    profileReturnContext = null;
    render();
  }));
  app.querySelectorAll(".builder-add-outside-rotator").forEach((button) => button.addEventListener("click", () => {
    showToast("Outside rotator option", "This step is ready to add a supplemental resident or imported rotator roster for the selected block.");
  }));
  app.querySelectorAll(".generate-service-draft").forEach((button) => button.addEventListener("click", () => {
    saveBuilderConfigFromForm();
    scheduleDraftStore[scheduleDraftKey(currentBlock, activeBuilderService)] = generateServiceDraft(activeBuilderService, currentBlock);
    setScheduleLifecycle(currentBlock, activeBuilderService, "Draft");
    activeScheduleService = activeBuilderService;
    selectedScheduleWeek = 0;
    loadActiveScheduleDraft();
    navigate("schedule");
    showToast(`${activeBuilderService} draft generated`, `Block ${currentBlock} is now open in the Schedules tab for chief editing.`);
  }));
  app.querySelectorAll("[data-attendance-session]").forEach((button) => button.addEventListener("click", () => {
    activeAttendanceSessionId = Number(button.dataset.attendanceSession);
    render();
  }));
  app.querySelectorAll(".new-attendance-session").forEach((button) => button.addEventListener("click", () => {
    const id = Date.now();
    const session = {
      id, block: currentBlock, date: "2026-06-24", time: "12:30–13:30", type: "Morning Report",
      topic: "", mode: "In person", status: "Open",
      attendance: Object.fromEntries(Object.keys(residentProfiles).map((name)=>[name,"Not checked in"]))
    };
    didacticAttendanceSessions.unshift(session);
    activeAttendanceSessionId = id;
    persistAppState();
    render();
    showToast("New lecture ready", "Choose the lecture details, then residents can begin checking in.");
  }));
  app.querySelectorAll(".save-attendance-session").forEach((button) => button.addEventListener("click", () => {
    const session = attendanceSessionById();
    session.block = Number(app.querySelector(".attendance-block-input").value);
    session.date = app.querySelector(".attendance-date-input").value;
    session.time = app.querySelector(".attendance-time-input").value.trim();
    session.type = app.querySelector(".attendance-type-input").value;
    session.topic = app.querySelector(".attendance-topic-input").value.trim();
    session.mode = app.querySelector(".attendance-mode-input").value;
    Object.entries(session.attendance).forEach(([name,status]) => {
      if (status !== "Not checked in") syncAttendanceToResident(session, name, status);
    });
    persistAppState();
    render();
    showToast("Lecture saved", "Session details and resident profiles are synchronized.");
  }));
  app.querySelectorAll(".toggle-attendance-session").forEach((button) => button.addEventListener("click", () => {
    const session = attendanceSessionById();
    session.status = session.status === "Open" ? "Closed" : "Open";
    persistAppState();
    render();
    showToast(`Check-in ${session.status.toLowerCase()}`, session.status === "Open" ? "Residents can tap their names now." : "The roster is preserved and can be reopened.");
  }));
  app.querySelectorAll(".attendance-check, .attendance-person-name").forEach((button) => button.addEventListener("click", () => {
    const row = button.closest("[data-attendance-resident]");
    const name = row.dataset.attendanceResident;
    const session = attendanceSessionById();
    if (session.status !== "Open") {
      showToast("Check-in is closed", "Reopen this lecture before changing resident check-ins.");
      return;
    }
    const next = session.attendance[name] === "Attended" ? "Not checked in" : "Attended";
    session.attendance[name] = next;
    if (next === "Attended") syncAttendanceToResident(session, name, next);
    else {
      const record = ensureResidentActivityRecord(name);
      record.attendance = record.attendance.filter((item)=>item.sessionId !== session.id);
      const policy = record.didacticPolicies[session.block - 1];
      const blockEntries = record.attendance.filter((item)=>(item.block || currentBlock)===session.block);
      policy.sessions = blockEntries.length;
      policy.attended = blockEntries.filter((item)=>item.status==="Attended").length;
      policy.missed = blockEntries.filter((item)=>item.status==="Missed").length;
    }
    persistAppState();
    render();
    showToast(next === "Attended" ? `${profileDisplayName(name)} checked in` : "Check-in removed", "The resident’s didactics profile has been updated.");
  }));
  app.querySelectorAll("[data-attendance-action]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    const row = button.closest("[data-attendance-resident]");
    const name = row.dataset.attendanceResident;
    if (button.dataset.attendanceAction === "profile") {
      profileReturnContext = {
        view: currentView,
        masterStep: activeMasterStep,
        annualWorkbook: activeAnnualWorkbook,
        block: currentBlock,
        label: "Back to attendance"
      };
      activeResident = name;
      activeResidentSection = "didactics";
      navigate("residents");
      return;
    }
    const session = attendanceSessionById();
    const status = button.dataset.attendanceAction === "excused" ? "Excused" : "Missed";
    session.attendance[name] = status;
    syncAttendanceToResident(session, name, status);
    persistAppState();
    render();
    showToast(`${profileDisplayName(name)} marked ${status.toLowerCase()}`, "The attendance history is visible in both portals.");
  }));
  app.querySelectorAll(".mark-unchecked-missed").forEach((button) => button.addEventListener("click", () => {
    const session = attendanceSessionById();
    Object.keys(residentProfiles).forEach((name) => {
      if (!session.attendance[name] || session.attendance[name] === "Not checked in") {
        session.attendance[name] = "Missed";
        syncAttendanceToResident(session, name, "Missed");
      }
    });
    session.status = "Closed";
    persistAppState();
    render();
    showToast("Attendance finalized", "Unchecked residents were marked missed and all profiles were updated.");
  }));
  app.querySelectorAll(".attendance-roster-search").forEach((input) => input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    app.querySelectorAll(".attendance-person").forEach((row) => row.hidden = !row.dataset.searchName.includes(query));
  }));
  app.querySelectorAll(".attendance-export").forEach((button) => button.addEventListener("click", () => showToast("Attendance log prepared", "The current lecture roster is ready for export in the production version.")));
  app.querySelectorAll("[data-profile-section]").forEach((button) => button.addEventListener("click", () => {
    activeResidentSection = button.dataset.profileSection;
    render();
  }));
  app.querySelectorAll("[data-self-section]").forEach((button) => button.addEventListener("click", () => {
    activeResidentSelfSection = button.dataset.selfSection;
    render();
  }));
  app.querySelectorAll(".resident-master-rotation").forEach((select) => select.addEventListener("change", () => {
    const blockIndex = Number(select.dataset.masterBlock);
    const row = residentMasterIndex(activeResident);
    masterAssignments[row][blockIndex].rotation = select.value;
    const policy = ensureResidentActivityRecord(activeResident).didacticPolicies[blockIndex];
    const suggested = defaultDidacticPolicy(activeResident, blockIndex);
    policy.required = suggested.required;
    policy.virtual = suggested.virtual;
    persistAppState();
    render();
    showToast("Resident master schedule updated", `Block ${blockIndex + 1} is now ${select.value}; didactic and eligibility context was refreshed.`);
  }));
  app.querySelectorAll(".didactic-day-input, .didactic-required-input, .didactic-virtual-input").forEach((field) => field.addEventListener("change", () => {
    const row = field.closest("[data-didactic-block]");
    const policy = ensureResidentActivityRecord(activeResident).didacticPolicies[Number(row.dataset.didacticBlock)];
    policy.day = row.querySelector(".didactic-day-input").value.trim();
    policy.required = row.querySelector(".didactic-required-input").value === "true";
    policy.virtual = row.querySelector(".didactic-virtual-input").value === "true";
    persistAppState();
  }));
  app.querySelectorAll(".attendance-status-input").forEach((select) => select.addEventListener("change", () => {
    const record = ensureResidentActivityRecord(activeResident);
    const item = record.attendance[Number(select.closest("[data-attendance-index]").dataset.attendanceIndex)];
    item.status = select.value;
    const policy = record.didacticPolicies[currentBlock - 1];
    const blockItems = record.attendance;
    policy.sessions = blockItems.length;
    policy.attended = blockItems.filter((entry) => entry.status === "Attended").length;
    policy.missed = blockItems.filter((entry) => entry.status === "Missed").length;
    persistAppState();
    render();
  }));
  app.querySelectorAll(".add-attendance-session").forEach((button) => button.addEventListener("click", () => {
    const record = ensureResidentActivityRecord(activeResident);
    record.attendance.push({ date: "New session", topic: "Didactic session", mode: record.didacticPolicies[currentBlock - 1].virtual ? "Virtual allowed" : "In person", status: "Scheduled", note: "" });
    persistAppState();
    render();
  }));
  app.querySelectorAll(".approve-leave, .decline-leave, .reopen-leave").forEach((button) => button.addEventListener("click", () => {
    const item = ensureResidentActivityRecord(activeResident).leave.find((entry) => entry.id === Number(button.closest("[data-leave-id]").dataset.leaveId));
    item.status = button.classList.contains("approve-leave") ? "approved" : button.classList.contains("decline-leave") ? "declined" : "pending";
    persistAppState();
    render();
    showToast(`Leave ${item.status}`, `${item.type} for ${item.start} now shows the chief decision to the resident.`);
  }));
  app.querySelectorAll(".add-leave-entry").forEach((button) => button.addEventListener("click", () => {
    const rotation = residentRotation(activeResident);
    ensureResidentActivityRecord(activeResident).leave.push({
      id: Date.now(), type: "PTO", start: "New date", end: "New date", days: 1, block: currentBlock,
      rotation, coverage: ["Floor","PICU","NICU"].includes(rotation) ? `${rotation} coverage review required` : rotation === "ED" ? "ED shift coverage review required" : "No inpatient coverage",
      status: "pending", note: "New chief-entered record"
    });
    persistAppState();
    render();
  }));
  app.querySelectorAll(".profile-eligibility-input").forEach((input) => input.addEventListener("change", () => {
    ensureResidentActivityRecord(activeResident).eligibility[input.dataset.eligibilityKey] = input.checked;
    persistAppState();
  }));
  app.querySelectorAll("[data-annual-section]").forEach((button) => button.addEventListener("click", () => {
    activeAnnualPreferenceSection = button.dataset.annualSection;
    render();
  }));
  app.querySelectorAll(".rank-up, .rank-down").forEach((button) => button.addEventListener("click", () => {
    const from = Number(button.dataset.rankIndex);
    const to = from + (button.classList.contains("rank-up") ? -1 : 1);
    if (to < 0 || to >= annualPreferenceSubmission.templateRanking.length) return;
    [annualPreferenceSubmission.templateRanking[from], annualPreferenceSubmission.templateRanking[to]] =
      [annualPreferenceSubmission.templateRanking[to], annualPreferenceSubmission.templateRanking[from]];
    persistAppState();
    render();
  }));
  app.querySelectorAll(".annual-field").forEach((field) => field.addEventListener("change", () => {
    annualPreferenceSubmission[field.dataset.annualField] =
      field.dataset.annualField === "fellowshipApplying" ? field.value === "true" : field.value;
    persistAppState();
    render();
  }));
  app.querySelectorAll(".vacation-block, .vacation-timing, .vacation-reason").forEach((field) => field.addEventListener("change", () => {
    const request = annualPreferenceSubmission.vacationRequests[Number(field.dataset.vacationIndex)];
    if (field.classList.contains("vacation-block")) request.block = Number(field.value);
    if (field.classList.contains("vacation-timing")) request.timing = field.value;
    if (field.classList.contains("vacation-reason")) request.reason = field.value;
    persistAppState();
  }));
  app.querySelectorAll(".annual-life-event, .annual-life-note").forEach((field) => field.addEventListener("change", () => {
    annualPreferenceSubmission.lifeEvent[field.classList.contains("annual-life-event") ? "timing" : "confidentialNote"] = field.value.trim();
    persistAppState();
  }));
  app.querySelectorAll(".elective-rank-select").forEach((select) => select.addEventListener("change", () => {
    annualPreferenceSubmission.electiveRanking[Number(select.dataset.electiveIndex)] = select.value;
    persistAppState();
    render();
  }));
  app.querySelectorAll(".annual-split-enabled").forEach((input) => input.addEventListener("change", () => {
    annualPreferenceSubmission.splitBlock = input.checked;
    persistAppState();
  }));
  app.querySelectorAll(".annual-split-request").forEach((field) => field.addEventListener("change", () => {
    annualPreferenceSubmission.splitBlockRequest = field.value.trim();
    persistAppState();
  }));
  app.querySelectorAll(".add-vacation-preference").forEach((button) => button.addEventListener("click", () => {
    if (annualPreferenceSubmission.vacationRequests.length >= 3) {
      showToast("Three vacation priorities already listed", "Edit the existing ranked requests before adding another.");
      return;
    }
    annualPreferenceSubmission.vacationRequests.push({
      priority: annualPreferenceSubmission.vacationRequests.length + 1,
      block: 10,
      timing: "Full block",
      reason: "Vacation"
    });
    persistAppState();
    render();
  }));
  app.querySelectorAll(".save-annual-draft").forEach((button) => button.addEventListener("click", () => {
    persistAppState();
    showToast("Annual preferences saved", "Your latest rankings and private scheduling context are stored.");
  }));
  app.querySelectorAll(".submit-annual-preferences").forEach((button) => button.addEventListener("click", () => {
    annualPreferenceSubmission.status = "chief-review";
    annualPreferenceSubmission.submittedAt = "June 13, 2026 · 9:18 AM";
    annualPreferenceSubmission.chiefDecision = "";
    persistAppState();
    render();
    showToast("Sent to chief review", "Your structured annual preferences now appear in the chief approval queue and master-schedule context.");
  }));
  app.querySelectorAll(".approve-annual-preferences, .request-annual-changes").forEach((button) => button.addEventListener("click", () => {
    const approved = button.classList.contains("approve-annual-preferences");
    annualPreferenceSubmission.status = approved ? "approved" : "changes-requested";
    annualPreferenceSubmission.chiefDecision = approved
      ? "Approved as planning input. Final assignments remain subject to capacity and curriculum requirements."
      : "Chief requested clarification before these preferences are used in the annual schedule.";
    persistAppState();
    render();
    showToast(approved ? "Annual inputs approved" : "Changes requested", approved ? "The preferences are now available as approved decision support in the master schedule." : "The resident can update and resubmit the annual form.");
  }));
  app.querySelectorAll(".open-annual-master").forEach((button) => button.addEventListener("click", () => navigate("master")));
  app.querySelectorAll(".open-generate").forEach((button) => button.addEventListener("click", openModal));
  app.querySelectorAll(".block-chip").forEach((button) => button.addEventListener("click", () => {
    currentBlock = Number(button.dataset.block);
    if (currentView === "schedule") loadActiveScheduleDraft();
    render();
    showToast(`Block ${currentBlock} selected`, `${academicBlocks[currentBlock - 1][1]} is now active across schedules and rules.`);
  }));
  app.querySelectorAll(".block-select").forEach((select) => select.addEventListener("change", () => {
    currentBlock = Number(select.value);
    if (currentView === "schedule") loadActiveScheduleDraft();
    render();
  }));
  app.querySelectorAll(".service-tab").forEach((button) => button.addEventListener("click", () => {
    activeScheduleService = button.dataset.service;
    loadActiveScheduleDraft();
    render();
    showToast(`${button.dataset.service} selected`, "The coordinated schedule view has been updated.");
  }));
  app.querySelectorAll("[data-schedule-layout]").forEach((button) => button.addEventListener("click", () => {
    activeScheduleLayout = button.dataset.scheduleLayout;
    selectedScheduleCell = null;
    addResidentPanelOpen = false;
    render();
    showToast(activeScheduleLayout === "excel" ? "Excel-style view opened" : "Builder view opened", activeScheduleLayout === "excel" ? "This mirrors the same draft in the familiar published schedule format." : "Click or drag assignments to keep editing the draft.");
  }));
  app.querySelectorAll(".dashboard-service-open").forEach((button) => button.addEventListener("click", () => {
    activeScheduleService = button.dataset.service;
    loadActiveScheduleDraft();
    navigate("schedule");
  }));
  app.querySelectorAll(".builder-service-tab").forEach((button) => button.addEventListener("click", () => {
    activeBuilderService = button.dataset.builderService;
    render();
  }));
  app.querySelectorAll(".add-builder-service").forEach((button) => button.addEventListener("click", () => {
    const number = programTeams.length + 1;
    const name = `New Service ${number}`;
    programTeams.push({ name, rotation: "Elective", category: "Custom", color: "purple", active: true, createdAtBlock: currentBlock });
    serviceRuleProfiles[name] = defaultServiceProfile(programTeams.at(-1));
    serviceMasterLinks[name] = ["Elective"];
    serviceScheduleSettings[name] = { nights: false, longCall: false, shortWeekend: false, label: "Custom service hours and coverage" };
    ensureServiceCoverageLanes(name);
    ensureServiceRules(name);
    ensureServiceBuilderConfig(name);
    activeBuilderService = name;
    setScheduleLifecycle(currentBlock, name, "Pending");
    render();
    showToast("Service added", "Name the service, link its master rotation, then configure roles and shifts.");
  }));
  app.querySelectorAll(".open-delete-service").forEach((button) => button.addEventListener("click", openDeleteServiceModal));
  app.querySelectorAll(".save-service-identity").forEach((button) => button.addEventListener("click", () => {
    const team = programTeams.find((item) => item.name === activeBuilderService);
    const oldName = activeBuilderService;
    const newName = app.querySelector(".builder-service-name").value.trim() || oldName;
    const rotation = app.querySelector(".builder-master-link").value;
    team.rotation = rotation;
    team.category = app.querySelector(".builder-service-category").value;
    if (newName !== oldName) {
      team.name = newName;
      serviceRuleProfiles[newName] = { ...serviceRuleProfiles[oldName], group: team.category };
      serviceDetailedRules[newName] = serviceDetailedRules[oldName];
      serviceBuilderConfigs[newName] = serviceBuilderConfigs[oldName];
      serviceShiftOverrides[newName] = serviceShiftOverrides[oldName] || {};
      serviceScheduleSettings[newName] = serviceScheduleSettings[oldName];
      serviceCoverageLanes[newName] = serviceCoverageLanes[oldName];
      serviceDistributionSettings[newName] = serviceDistributionSettings[oldName];
      serviceMasterLinks[newName] = [rotation];
      Object.keys(scheduleLifecycleStore).filter((key)=>key.endsWith(`:${oldName}`)).forEach((key)=>{
        scheduleLifecycleStore[key.replace(`:${oldName}`, `:${newName}`)] = scheduleLifecycleStore[key];
        delete scheduleLifecycleStore[key];
      });
      delete serviceRuleProfiles[oldName];
      delete serviceDetailedRules[oldName];
      delete serviceBuilderConfigs[oldName];
      delete serviceShiftOverrides[oldName];
      delete serviceScheduleSettings[oldName];
      delete serviceCoverageLanes[oldName];
      delete serviceDistributionSettings[oldName];
      delete serviceMasterLinks[oldName];
      Object.keys(scheduleDraftStore).filter(key=>key.endsWith(`:${oldName}`)).forEach(key=>delete scheduleDraftStore[key]);
      activeBuilderService = newName;
      if (activeScheduleService === oldName) activeScheduleService = newName;
    } else {
      serviceMasterLinks[oldName] = [rotation];
      serviceRuleProfiles[oldName].group = team.category;
    }
    render();
    showToast("Service details saved", `${newName} now pulls residents assigned to ${rotation} in the master schedule.`);
  }));
  app.querySelectorAll(".add-builder-role").forEach((button) => button.addEventListener("click", () => {
    saveBuilderConfigFromForm();
    serviceBuilderConfigs[activeBuilderService].roles.push({ name: "New role", count: 1, pgy: "Any eligible" });
    render();
  }));
  app.querySelectorAll(".add-builder-lane").forEach((button) => button.addEventListener("click", () => {
    saveBuilderConfigFromForm();
    ensureServiceCoverageLanes(activeBuilderService).push({ name: `New team ${serviceCoverageLanes[activeBuilderService].length + 1}`, color: "#4f83c4", minimum: 1 });
    render();
  }));
  app.querySelectorAll(".delete-builder-lane").forEach((button) => button.addEventListener("click", () => {
    saveBuilderConfigFromForm();
    const index = Number(button.closest("[data-lane-index]").dataset.laneIndex);
    if (serviceCoverageLanes[activeBuilderService].length > 1) serviceCoverageLanes[activeBuilderService].splice(index, 1);
    render();
  }));
  app.querySelectorAll(".delete-builder-role").forEach((button) => button.addEventListener("click", () => {
    saveBuilderConfigFromForm();
    serviceBuilderConfigs[activeBuilderService].roles.splice(Number(button.closest("[data-builder-role]").dataset.builderRole), 1);
    render();
  }));
  app.querySelectorAll(".builder-shift-enabled").forEach((input) => input.addEventListener("change", () => input.closest(".service-shift-card").classList.toggle("enabled", input.checked)));
  app.querySelectorAll(".add-service-shift").forEach((button) => button.addEventListener("click", () => {
    saveBuilderConfigFromForm();
    const count = shiftTemplates.filter(shift=>shift.code.startsWith("CUSTOM")).length + 1;
    const code = `CUSTOM${count}`;
    shiftTemplates.push({ name: `Custom assignment ${count}`, code, start: "08:00", end: "17:00", hours: "9", type: "Task", color: "task", colorHex: "#0f8f83", style: "soft", display: "label" });
    serviceBuilderConfigs[activeBuilderService].shifts.push(code);
    render();
  }));
  app.querySelectorAll(".save-service-builder").forEach((button) => button.addEventListener("click", () => {
    saveBuilderConfigFromForm();
    Object.keys(scheduleDraftStore).filter(key=>key.endsWith(`:${activeBuilderService}`)).forEach(key=>delete scheduleDraftStore[key]);
    setScheduleLifecycle(currentBlock, activeBuilderService, "Draft");
    if (activeScheduleService === activeBuilderService) loadActiveScheduleDraft();
    render();
    showToast(`${activeBuilderService} configuration saved`, "Staffing roles, eligible PGY levels, shift types, and service hours now drive schedule generation.");
  }));
  app.querySelectorAll(".shift-cell").forEach((cell) => cell.addEventListener("click", () => {
    selectedScheduleCell = { row: Number(cell.dataset.row), column: Number(cell.dataset.col) };
    addResidentPanelOpen = false;
    render();
  }));
  app.querySelectorAll(".schedule-week-select").forEach((select) => select.addEventListener("change", () => {
    selectedScheduleWeek = Number(select.value);
    selectedScheduleCell = null;
    render();
  }));
  app.querySelectorAll(".open-add-resident").forEach((button) => button.addEventListener("click", () => {
    addResidentPanelOpen = true;
    selectedScheduleCell = null;
    render();
  }));
  app.querySelectorAll(".close-add-resident").forEach((button) => button.addEventListener("click", () => {
    addResidentPanelOpen = false;
    render();
  }));
  app.querySelectorAll(".add-pool-resident").forEach((button) => button.addEventListener("click", () => {
    const candidate = callPoolCandidates[Number(button.dataset.poolIndex)];
    addScheduleResident(candidate.name, candidate.role, "Call-pool profile");
  }));
  app.querySelectorAll(".add-manual-resident").forEach((button) => button.addEventListener("click", () => {
    const name = app.querySelector(".manual-resident-name").value.trim();
    if (!name) {
      showToast("Resident name required", "Enter a name before adding the resident.");
      return;
    }
    addScheduleResident(name, app.querySelector(".manual-resident-role").value, "Chief manual addition");
  }));
  app.querySelectorAll(".shift-cell").forEach((cell) => {
    cell.addEventListener("dragstart", (event) => {
      draggedScheduleCell = { row: Number(cell.dataset.row), column: Number(cell.dataset.col) };
      cell.classList.add("dragging");
      event.dataTransfer?.setData("text/plain", `${cell.dataset.row}:${cell.dataset.col}`);
    });
    cell.addEventListener("dragend", () => {
      draggedScheduleCell = null;
      cell.classList.remove("dragging");
      app.querySelectorAll(".shift-cell").forEach(item=>item.classList.remove("drop-target"));
    });
    cell.addEventListener("dragover", (event) => {
      event.preventDefault();
      cell.classList.add("drop-target");
    });
    cell.addEventListener("dragleave", () => cell.classList.remove("drop-target"));
    cell.addEventListener("drop", (event) => {
      event.preventDefault();
      if (!draggedScheduleCell) return;
      const target = { row: Number(cell.dataset.row), column: Number(cell.dataset.col) };
      if (target.row === draggedScheduleCell.row && target.column === draggedScheduleCell.column) return;
      snapshotScheduleDraft();
      const originEntry = scheduleDraft[draggedScheduleCell.row].shifts[draggedScheduleCell.column];
      const targetEntry = scheduleDraft[target.row].shifts[target.column];
      scheduleDraft[target.row].shifts[target.column] = { ...originEntry, source: "Chief drag-and-drop" };
      scheduleDraft[draggedScheduleCell.row].shifts[draggedScheduleCell.column] = targetEntry.value ? { ...targetEntry, source: "Chief drag-and-drop swap" } : makeScheduleEntry("", draggedScheduleCell.column);
      selectedScheduleCell = target;
      draggedScheduleCell = null;
      render();
      showToast(targetEntry.value ? "Assignments swapped" : "Assignment moved", "Coverage, hours, nights, and weekend fairness were recalculated.");
    });
  });
  app.querySelectorAll(".number-input button").forEach((button) => button.addEventListener("click", () => {
    const input = button.parentElement.querySelector("input");
    input.value = Math.max(0, Number(input.value) + (button.textContent === "+" ? 1 : -1));
  }));
  app.querySelectorAll(".builder-next").forEach((button) => button.addEventListener("click", openModal));
  app.querySelectorAll(".publish-button").forEach((button) => button.addEventListener("click", () => {
    configuredServices().forEach((service) => {
      if (getScheduleLifecycle(currentBlock, service) !== "Pending") setScheduleLifecycle(currentBlock, service, "Published");
    });
    render();
    showToast("Block schedules published", "Ready and draft service schedules are now marked published; pending services remain flagged.");
  }));
  app.querySelectorAll("[data-resident-action='request']").forEach((button) => button.addEventListener("click", () => navigate("resident-request")));
  app.querySelectorAll("[data-resident-view]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.residentView)));
  app.querySelectorAll(".open-published-service").forEach((button) => button.addEventListener("click", () => {
    activePublishedService = button.dataset.publishedService;
    render();
  }));
  app.querySelectorAll(".back-to-services").forEach((button) => button.addEventListener("click", () => {
    activePublishedService = null;
    render();
  }));
  app.querySelectorAll(".back-resident").forEach((button) => button.addEventListener("click", () => navigate("resident-home")));
  app.querySelectorAll(".weekend-option").forEach((label) => label.addEventListener("click", () => app.querySelectorAll(".weekend-option").forEach((item) => item.classList.toggle("selected", item === label))));
  app.querySelectorAll(".chip-options button").forEach((button) => button.addEventListener("click", () => button.classList.toggle("selected")));
  app.querySelectorAll(".review-request").forEach((button) => button.addEventListener("click", () => showToast("Request ready for review", "Your weekend preferences have been saved.")));
  app.querySelectorAll(".submit-call-offer").forEach((button) => button.addEventListener("click", () => {
    const assignment = app.querySelector(".call-offer-assignment");
    const [callLabel, shift] = assignment.options[assignment.selectedIndex].text.split(" · ").filter((_, index)=>index !== 1);
    const preferredDates = [app.querySelector(".call-preferred-date-one").value, app.querySelector(".call-preferred-date-two").value].filter(Boolean);
    callSwitchOffers.unshift({
      id: Date.now(),
      offeredBy: currentResidentName,
      callDate: assignment.value,
      callLabel,
      shift: shift || "Assigned call",
      preferredDates,
      note: app.querySelector(".call-offer-note").value.trim(),
      status: "open",
      volunteers: []
    });
    persistAppState();
    render();
    showToast("Call offer published", "Other residents can now see it. Your assignment remains unchanged until chief approval.");
  }));
  app.querySelectorAll(".volunteer-call-switch").forEach((button) => button.addEventListener("click", () => {
    const offer = callSwitchOffers.find((item)=>item.id===Number(button.closest("[data-switch-id]").dataset.switchId));
    const eligibility = callSwitchEligibility(currentResidentName, offer.callDate);
    if (!eligibility.eligible) {
      showToast("Not eligible for this call", eligibility.reasons[0]);
      return;
    }
    offer.volunteers.push({ resident: currentResidentName, requestedAt: "Jun 10, 2026", eligibility, status: "pending" });
    offer.status = "chief-review";
    persistAppState();
    render();
    showToast("Switch sent for chief review", "The offerer, your eligibility checks, and the proposed exchange are now together in the chief approval queue.");
  }));
  app.querySelectorAll(".cancel-call-offer").forEach((button) => button.addEventListener("click", () => {
    callSwitchOffers = callSwitchOffers.filter((offer)=>offer.id!==Number(button.dataset.switchId));
    persistAppState();
    render();
    showToast("Call offer cancelled", "The original call remains on your published schedule.");
  }));
  app.querySelectorAll(".approve-call-switch, .decline-call-switch, .reopen-call-switch").forEach((button) => button.addEventListener("click", () => {
    const offer = callSwitchOffers.find((item)=>item.id===Number(button.closest("[data-switch-id]").dataset.switchId));
    offer.status = button.classList.contains("approve-call-switch") ? "approved" : button.classList.contains("decline-call-switch") ? "declined" : "chief-review";
    if (offer.volunteers[0]) offer.volunteers[0].status = offer.status;
    persistAppState();
    render();
    showToast(offer.status === "approved" ? "Call switch approved" : offer.status === "declined" ? "Call switch declined" : "Call switch reopened", offer.status === "approved" ? "The exchange is approved and ready to update the published schedule." : "Both residents can see the chief's decision.");
  }));
  app.querySelectorAll(".approve-request, .decline-request, .reset-request").forEach((button) => button.addEventListener("click", () => {
    const request = residentRequests.find((item) => item.id === Number(button.closest("[data-request-id]").dataset.requestId));
    request.status = button.classList.contains("approve-request") ? "approved" : button.classList.contains("decline-request") ? "declined" : "pending";
    render();
    showToast(`Request ${request.status}`, request.status === "approved" ? "This request will now be used when schedules are generated." : request.status === "declined" ? "This request will remain documented but will not affect generation." : "The request is back in the chief review queue.");
  }));
  app.querySelectorAll(".save-program-structure").forEach((button) => button.addEventListener("click", () => {
    const count = Number(app.querySelector(".program-block-count").value);
    programSettings.academicYear = app.querySelector(".program-year-input").value.trim();
    programSettings.blockCount = count;
    programSettings.blockModel = app.querySelector(".program-block-model").value;
    programSettings.requestLeadDays = Math.max(1, Number(app.querySelector(".program-lead-days").value));
    if (count !== academicBlocks.length) {
      academicBlocks = Array.from({ length: count }, (_, index) => [`${index + 1}`, programSettings.blockModel === "Two-week blocks" || count === 26 ? `Period ${index + 1} · 14 days` : `Program dates ${index + 1}`]);
      currentBlock = Math.min(currentBlock, count);
      masterAssignments = masterResidents.map((resident, row) => academicBlocks.map((_, column) => ({ rotation: ["Floor","NICU","Elective","PICU","ED"][(row * 2 + column) % 5], locked: false })));
    }
    render();
    showToast("Program structure updated", `${count} blocks and a ${programSettings.requestLeadDays}-day request deadline now apply across the program.`);
  }));
  app.querySelectorAll(".save-rules").forEach((button) => button.addEventListener("click", () => showToast("Rules saved", `Block ${currentBlock} and reusable institution settings are up to date.`)));
  app.querySelectorAll(".add-institution").forEach((button) => button.addEventListener("click", () => showToast("New institution profile", "A blank profile is ready for clinic, didactic, and eligibility rules.")));
  app.querySelectorAll(".add-pattern").forEach((button) => button.addEventListener("click", () => showToast("Protected-time pattern added", "Choose its recurrence, time, and affected residents.")));
  app.querySelectorAll(".edit-requirement").forEach((button) => button.addEventListener("click", () => {
    editingRequirement = { kind: "summary", service: activeServiceRule, key: button.dataset.requirementKey };
    render();
  }));
  app.querySelectorAll(".edit-detailed-rule").forEach((button) => button.addEventListener("click", () => {
    editingRequirement = {
      kind: "detail",
      service: activeServiceRule,
      index: Number(button.closest("[data-detail-index]").dataset.detailIndex)
    };
    render();
  }));
  app.querySelectorAll(".save-requirement").forEach((button) => button.addEventListener("click", () => {
    const editor = button.closest(".requirement-editor-panel");
    const copy = editor.querySelector(".requirement-copy-input").value.trim();
    const title = editor.querySelector(".requirement-title-input").value.trim();
    const type = editor.querySelector(".requirement-type-input").value;
    const hard = editor.querySelector(".requirement-hard-input").checked;
    if (!copy || !title) {
      showToast("Rule needs more information", "Add both a name and an instruction before saving.");
      return;
    }
    if (editor.dataset.editKind === "summary") {
      const key = editor.dataset.editKey;
      serviceRuleProfiles[activeServiceRule][key] = copy;
      const linkedDetailIndex = { staffing: 0, eligible: 1, nights: 2 }[key];
      if (Number.isInteger(linkedDetailIndex) && serviceDetailedRules[activeServiceRule][linkedDetailIndex]) {
        serviceDetailedRules[activeServiceRule][linkedDetailIndex].copy = copy;
      }
    } else {
      const rule = serviceDetailedRules[activeServiceRule][Number(editor.dataset.editIndex)];
      Object.assign(rule, { title, copy, type, hard });
    }
    editingRequirement = null;
    render();
    showToast("Requirement saved", `${activeServiceRule} schedule checks now use the updated rule.`);
  }));
  app.querySelectorAll(".cancel-requirement").forEach((button) => button.addEventListener("click", () => {
    editingRequirement = null;
    render();
  }));
  app.querySelectorAll(".add-requirement").forEach((button) => button.addEventListener("click", () => {
    const rules = serviceDetailedRules[activeServiceRule];
    rules.push({ title: "New requirement", copy: "Describe what the schedule generator must check.", type: "Coverage", enabled: true, hard: false });
    editingRequirement = { kind: "detail", service: activeServiceRule, index: rules.length - 1 };
    render();
  }));
  app.querySelectorAll(".delete-detailed-rule").forEach((button) => button.addEventListener("click", () => {
    const index = Number(button.closest("[data-detail-index]").dataset.detailIndex);
    serviceDetailedRules[activeServiceRule].splice(index, 1);
    if (editingRequirement?.kind === "detail") editingRequirement = null;
    render();
    showToast("Requirement removed", `${activeServiceRule} will no longer check that rule.`);
  }));
  app.querySelectorAll(".detailed-rule-toggle").forEach((input) => input.addEventListener("change", () => {
    const index = Number(input.closest("[data-detail-index]").dataset.detailIndex);
    serviceDetailedRules[activeServiceRule][index].enabled = input.checked;
    render();
    showToast(input.checked ? "Requirement enabled" : "Requirement paused", `The ${activeServiceRule} generator was updated.`);
  }));
  app.querySelectorAll(".add-team").forEach((button) => button.addEventListener("click", () => {
    const number = programTeams.length + 1;
    const name = `New Team ${number}`;
    programTeams.push({ name, rotation: "Choose master rotation", category: "Custom", color: "purple", active: true });
    serviceRuleProfiles[name] = defaultServiceProfile(programTeams.at(-1));
    ensureServiceRules(name);
    render();
    showToast("Team added", "Rename it and connect it to a master-schedule rotation.");
  }));
  app.querySelectorAll(".delete-team").forEach((button) => button.addEventListener("click", () => {
    const row = button.closest("[data-team-index]");
    const removed = programTeams.splice(Number(row.dataset.teamIndex), 1)[0];
    delete serviceRuleProfiles[removed.name];
    delete serviceDetailedRules[removed.name];
    if (!configuredServices().includes(activeServiceRule)) activeServiceRule = configuredServices()[0];
    render();
    showToast("Team removed", "Its schedule tab is no longer active.");
  }));
  app.querySelectorAll(".apply-team-changes").forEach((button) => button.addEventListener("click", () => {
    const oldNames = programTeams.map((team) => team.name);
    app.querySelectorAll("[data-team-index]").forEach((row) => {
      const index = Number(row.dataset.teamIndex);
      const oldName = programTeams[index].name;
      const newName = row.querySelector(".team-name-input").value.trim() || oldName;
      programTeams[index] = {
        ...programTeams[index],
        name: newName,
        rotation: row.querySelector(".team-rotation-input").value.trim(),
        category: row.querySelector(".team-category-input").value,
        color: row.querySelector(".team-color-input").value.toLowerCase(),
        active: row.querySelector(".team-active-input").checked
      };
      if (newName !== oldName) {
        serviceRuleProfiles[newName] = { ...(serviceRuleProfiles[oldName] || {}), group: programTeams[index].category, color: programTeams[index].color };
        serviceDetailedRules[newName] = serviceDetailedRules[oldName] || [];
        delete serviceRuleProfiles[oldName];
        delete serviceDetailedRules[oldName];
        if (activeServiceRule === oldName) activeServiceRule = newName;
      } else {
        serviceRuleProfiles[newName] = { ...ensureServiceRules(newName), group: programTeams[index].category, color: programTeams[index].color };
      }
    });
    render();
    showToast("Team structure updated", `${configuredServices().length} schedule tabs now follow this program's configuration.`);
  }));
  app.querySelectorAll(".add-shift-template").forEach((button) => button.addEventListener("click", () => {
    shiftTemplates.push({ name: "New shift", code: "NEW", start: "08:00", end: "17:00", hours: "9.0", type: "Day", color: "day" });
    render();
  }));
  app.querySelectorAll(".delete-shift-template").forEach((button) => button.addEventListener("click", () => {
    shiftTemplates.splice(Number(button.closest("[data-shift-index]").dataset.shiftIndex), 1);
    render();
  }));
  app.querySelectorAll(".apply-shift-changes").forEach((button) => button.addEventListener("click", () => {
    app.querySelectorAll("[data-shift-index]").forEach((row) => {
      const index = Number(row.dataset.shiftIndex);
      const start = row.querySelector(".shift-start-input").value;
      const end = row.querySelector(".shift-end-input").value;
      const type = row.querySelector(".shift-type-input").value;
      shiftTemplates[index] = {
        ...shiftTemplates[index],
        name: row.querySelector(".shift-name-input").value.trim(),
        code: row.querySelector(".shift-code-input").value.trim().toUpperCase(),
        start,
        end,
        hours: calculateShiftHours(start, end),
        type,
        color: type === "Night" ? "night" : type === "Protected" ? "protected" : type === "Recovery" || type === "Off" ? "off" : "day"
      };
    });
    render();
    showToast("Shift library saved", "Work-hour totals and schedule choices now use the updated times.");
  }));
  app.querySelectorAll(".save-profile").forEach((button) => button.addEventListener("click", () => {
    app.querySelectorAll("[data-clinic-block]").forEach((row) => {
      residentProfiles[activeResident].clinic[Number(row.dataset.clinicBlock)] = row.querySelector(".resident-clinic-input").value;
    });
    render();
    showToast("Resident profile saved", "Clinic patterns will be protected automatically during schedule generation.");
  }));
  app.querySelectorAll(".add-profile-event").forEach((button) => button.addEventListener("click", () => showToast("Protected event added", `Add an exam, conference, leave period, or day off for ${activeResident}.`)));
  app.querySelectorAll(".add-resident").forEach((button) => button.addEventListener("click", () => showToast("New resident profile", "A blank 13-block clinic and availability profile is ready.")));
  app.querySelectorAll(".preset-card").forEach((button) => button.addEventListener("click", () => {
    const presets = [
      [
        ["Blue Ward","General Pediatrics","Inpatient","purple"],["Green Ward","General Pediatrics","Inpatient","orange"],
        ["Newborn Nursery","Newborn","Inpatient","gold"],["NICU","NICU","Critical care","nicu"],
        ["PICU","PICU","Critical care","orange"],["Jeopardy","Call-eligible rotations","Call pool","purple"]
      ],
      [
        ["Ward A","General Medicine","Inpatient","purple"],["Ward B","General Medicine","Inpatient","orange"],
        ["Medical ICU","MICU","Critical care","nicu"],["Cardiac ICU","CCU","Critical care","gold"],
        ["Night Float","Night Float","Night coverage","purple"],["Consults","Consult rotations","Consult","nicu"]
      ],
      [
        ["Main ED","Emergency Medicine","Emergency","purple"],["Fast Track","Emergency Medicine","Emergency","orange"],
        ["Trauma","Trauma","Critical care","gold"],["Pediatric ED","Pediatric Emergency","Emergency","nicu"],
        ["Off-service","Off-service rotation","Custom","purple"]
      ],
      []
    ];
    programTeams = presets[Number(button.dataset.preset)].map(([name,rotation,category,color]) => ({ name,rotation,category,color,active:true }));
    programTeams.forEach((team) => {
      if (!serviceRuleProfiles[team.name]) serviceRuleProfiles[team.name] = defaultServiceProfile(team);
      ensureServiceRules(team.name);
    });
    activeServiceRule = configuredServices()[0] || "";
    render();
    showToast("Program preset applied", programTeams.length ? "Every team remains fully editable." : "Add your first custom team to begin.");
  }));
  app.querySelectorAll(".master-rotation-select").forEach((select) => select.addEventListener("change", () => {
    const cell = select.closest("[data-master-row]");
    masterAssignments[Number(cell.dataset.masterRow)][Number(cell.dataset.masterColumn)].rotation = select.value;
    persistAppState();
    render();
    showToast("Master assignment updated", "Capacity, requirements, and transition checks were recalculated.");
  }));
  app.querySelectorAll("[data-master-pgy]").forEach((button) => button.addEventListener("click", () => {
    activeMasterPgy = button.dataset.masterPgy;
    ensurePgyMasterRule(activeMasterPgy);
    render();
    showToast(`${activeMasterPgy} master selected`, "Coverage counters now use this PGY year’s curriculum and block requirements.");
  }));
  app.querySelectorAll(".master-assignment-cell[draggable='true']").forEach((cell) => {
    cell.addEventListener("dragstart", (event) => {
      draggedMasterCell = { row: Number(cell.dataset.masterRow), column: Number(cell.dataset.masterColumn) };
      event.dataTransfer?.setData("text/plain", JSON.stringify(draggedMasterCell));
      cell.classList.add("dragging");
    });
    cell.addEventListener("dragend", () => {
      cell.classList.remove("dragging");
      draggedMasterCell = null;
    });
    cell.addEventListener("dragover", (event) => event.preventDefault());
    cell.addEventListener("drop", (event) => {
      event.preventDefault();
      const source = draggedMasterCell;
      const target = { row: Number(cell.dataset.masterRow), column: Number(cell.dataset.masterColumn) };
      if (!source || masterAssignments[target.row]?.[target.column]?.locked) return;
      const sourceAssignment = masterAssignments[source.row][source.column];
      const targetAssignment = masterAssignments[target.row][target.column];
      if (sourceAssignment.locked) return;
      masterAssignments[source.row][source.column] = { ...targetAssignment, locked: sourceAssignment.locked };
      masterAssignments[target.row][target.column] = { ...sourceAssignment, locked: targetAssignment.locked };
      persistAppState();
      render();
      showToast("Master assignments swapped", "Coverage counters and resident requirements were recalculated.");
    });
  });
  app.querySelectorAll(".cell-lock").forEach((button) => button.addEventListener("click", () => {
    const cell = button.closest("[data-master-row]");
    const assignment = masterAssignments[Number(cell.dataset.masterRow)][Number(cell.dataset.masterColumn)];
    assignment.locked = !assignment.locked;
    render();
    showToast(assignment.locked ? "Assignment locked" : "Assignment unlocked", "Locked cells are preserved during optimization.");
  }));
  app.querySelectorAll(".master-conflict-item").forEach((button) => button.addEventListener("click", () => {
    const cell = app.querySelector(`[data-master-row="${button.dataset.conflictRow}"][data-master-column="${button.dataset.conflictColumn}"]`);
    cell?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    cell?.classList.add("focused-conflict");
    setTimeout(()=>cell?.classList.remove("focused-conflict"),1800);
  }));
  app.querySelectorAll(".validate-master").forEach((button) => button.addEventListener("click", () => {
    const conflicts = getMasterConflicts();
    showToast(conflicts.length ? `${conflicts.length} master-schedule issues found` : "Master schedule validated", conflicts.length ? "Open the conflict inspector to review them." : "No capacity, requirement, or transition problems found.");
  }));
  app.querySelectorAll(".save-master").forEach((button) => button.addEventListener("click", () => showToast("Master schedule saved", "Monthly schedule builders now use these rotation assignments.")));
  app.querySelectorAll(".manage-rotations").forEach((button) => button.addEventListener("click", () => showToast("Rotation option manager", "Add rotations, set colors, capacities, inpatient status, and annual requirements.")));
  app.querySelectorAll(".clear-master-selection").forEach((button) => button.addEventListener("click", () => {
    app.querySelectorAll(".master-assignment-cell").forEach(cell=>cell.classList.remove("selected"));
  }));
  app.querySelectorAll(".close-cell-editor").forEach((button) => button.addEventListener("click", () => {
    selectedScheduleCell = null;
    render();
  }));
  app.querySelectorAll("[data-excel-cell]").forEach((button) => button.addEventListener("click", () => {
    selectedScheduleCell = { row: Number(button.dataset.row), column: Number(button.dataset.col) };
    selectedScheduleWeek = Math.floor(selectedScheduleCell.column / 7);
    activeScheduleLayout = "builder";
    render();
    showToast("Opened in builder view", "The selected Excel-style cell is ready to edit.");
  }));
  app.querySelectorAll(".editor-shift-select").forEach((select) => select.addEventListener("change", () => {
    const customInput = app.querySelector(".editor-custom-value");
    if (select.value === "CUSTOM") {
      customInput.focus();
      return;
    }
    if (select.value === "CLINIC" || select.value === "DIDACTIC") customInput.value = select.value;
    else {
      const template = getServiceShiftTemplate(activeScheduleService, select.value);
      if (template) customInput.value = formatTemplateValue(template);
    }
  }));
  app.querySelectorAll(".apply-cell-edit").forEach((button) => button.addEventListener("click", () => {
    const originRow = Number(button.dataset.row);
    const originColumn = Number(button.dataset.column);
    const origin = scheduleDraft[originRow].shifts[originColumn];
    if (origin.protected && !origin.overridden && !app.querySelector(".confirm-protected-override")?.checked) {
      showToast("Protected entry not changed", "Confirm the clinic or didactic override first.");
      return;
    }
    const targetRow = Number(app.querySelector(".editor-resident-select").value);
    const targetColumn = Number(app.querySelector(".editor-date-select").value);
    const value = getEditorAssignmentValue();
    snapshotScheduleDraft();
    const updated = {
      value,
      templateCode: app.querySelector(".editor-shift-select").value && !["CUSTOM","CLINIC","DIDACTIC"].includes(app.querySelector(".editor-shift-select").value) ? app.querySelector(".editor-shift-select").value : "",
      lane: app.querySelector(".editor-lane-select")?.value || "",
      source: origin.protected ? "Chief override of profile" : "Chief-edited draft",
      protected: value === "CLINIC" || value === "DIDACTIC",
      overridden: origin.protected || origin.overridden,
      note: app.querySelector(".editor-cell-note").value.trim()
    };
    scheduleDraft[targetRow].shifts[targetColumn] = updated;
    if (targetRow !== originRow || targetColumn !== originColumn) {
      scheduleDraft[originRow].shifts[originColumn] = { value: "", templateCode: "", lane: "", source: "Unassigned", protected: false, overridden: false, note: "" };
    }
    selectedScheduleCell = { row: targetRow, column: targetColumn };
    render();
    showToast("Draft assignment updated", "Coverage, hours, and fairness were recalculated.");
  }));
  app.querySelectorAll(".copy-schedule-cell").forEach((button) => button.addEventListener("click", () => {
    const originRow = Number(button.dataset.row);
    const originColumn = Number(button.dataset.column);
    const targetRow = Number(app.querySelector(".editor-resident-select").value);
    const targetColumn = Number(app.querySelector(".editor-date-select").value);
    const origin = scheduleDraft[originRow].shifts[originColumn];
    if (origin.protected && !origin.overridden && !app.querySelector(".confirm-protected-override")?.checked && (targetRow !== originRow || targetColumn !== originColumn)) {
      showToast("Protected entry not copied", "Confirm the protected-time override first.");
      return;
    }
    snapshotScheduleDraft();
    scheduleDraft[targetRow].shifts[targetColumn] = {
      value: getEditorAssignmentValue(),
      source: "Copied by chief",
      protected: false,
      overridden: origin.protected || origin.overridden,
      note: app.querySelector(".editor-cell-note").value.trim()
    };
    selectedScheduleCell = { row: targetRow, column: targetColumn };
    render();
    showToast("Assignment copied", "The original assignment was kept.");
  }));
  app.querySelectorAll(".clear-schedule-cell").forEach((button) => button.addEventListener("click", () => {
    const row = Number(button.dataset.row);
    const column = Number(button.dataset.column);
    const entry = scheduleDraft[row].shifts[column];
    if (entry.protected && !entry.overridden && !app.querySelector(".confirm-protected-override")?.checked) {
      showToast("Protected entry not cleared", "Confirm the clinic or didactic override first.");
      return;
    }
    snapshotScheduleDraft();
    scheduleDraft[row].shifts[column] = { value: "", source: entry.protected ? "Chief override of profile" : "Unassigned", protected: false, overridden: entry.protected, note: "" };
    render();
    showToast("Assignment cleared", "The coverage inspector has been updated.");
  }));
  app.querySelectorAll(".move-resident-up, .move-resident-down").forEach((button) => button.addEventListener("click", () => {
    const from = Number(button.dataset.row);
    const direction = button.classList.contains("move-resident-up") ? -1 : 1;
    const to = from + direction;
    if (to < 0 || to >= scheduleDraft.length) return;
    snapshotScheduleDraft();
    [scheduleDraft[from], scheduleDraft[to]] = [scheduleDraft[to], scheduleDraft[from]];
    selectedScheduleCell = null;
    render();
    showToast("Resident order updated", "The display order changed; assignments stayed with the resident.");
  }));
  app.querySelectorAll(".undo-button").forEach((button) => button.addEventListener("click", () => {
    if (!scheduleUndoStack.length) return;
    scheduleRedoStack.push(JSON.stringify(scheduleDraft));
    restoreScheduleSnapshot(scheduleUndoStack.pop());
    showToast("Change undone", "The previous draft state was restored.");
  }));
  app.querySelectorAll(".redo-button").forEach((button) => button.addEventListener("click", () => {
    if (!scheduleRedoStack.length) return;
    scheduleUndoStack.push(JSON.stringify(scheduleDraft));
    const next = scheduleRedoStack.pop();
    scheduleDraft = JSON.parse(next);
    syncActiveScheduleDraft();
    selectedScheduleCell = null;
    render();
    showToast("Change redone", "The draft state was reapplied.");
  }));
  app.querySelectorAll(".save-draft").forEach((button) => button.addEventListener("click", () => {
    setScheduleLifecycle(currentBlock, activeScheduleService, "Ready");
    showToast("Schedule marked ready", `${activeScheduleService} now appears as Ready on the Block ${currentBlock} overview.`);
  }));
}

function calculateShiftHours(start, end) {
  if (!start || !end) return "0";
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  let minutes = endHour * 60 + endMinute - (startHour * 60 + startMinute);
  if (minutes <= 0) minutes += 24 * 60;
  return String(Math.round((minutes / 60) * 100) / 100);
}

function addScheduleResident(name, role, source) {
  if (scheduleDraft.some((resident) => resident.name === name)) {
    showToast("Resident already added", `${name} is already on this schedule.`);
    return;
  }
  snapshotScheduleDraft();
  scheduleDraft.push({
    id: `resident-${Date.now()}`,
    name,
    role,
    source,
    shifts: Array.from({ length: 28 }, (_, dayIndex) => makeScheduleEntry("", dayIndex))
  });
  addResidentPanelOpen = false;
  render();
  showToast("Resident added", `${name} is ready for assignments. Drag shifts onto the new row or click a cell to edit.`);
}

function saveBuilderConfigFromForm() {
  if (!app.querySelector(".service-builder-panel")) return;
  const config = ensureServiceBuilderConfig(activeBuilderService);
  serviceCoverageLanes[activeBuilderService] = [...app.querySelectorAll(".coverage-lane-row")].map((row) => ({
    name: row.querySelector(".builder-lane-name").value.trim() || "Coverage team",
    color: row.querySelector(".builder-lane-color").value,
    minimum: Math.max(0, Number(row.querySelector(".builder-lane-minimum").value))
  }));
  serviceDistributionSettings[activeBuilderService] = {
    cadence: app.querySelector(".builder-lane-cadence")?.value || "Weekly",
    nightHandoff: app.querySelector(".builder-night-handoff")?.value || "Staggered stretches",
    balance: app.querySelector(".builder-distribution-balance")?.value || "Equal weekends and weekdays"
  };
  config.roles = [...app.querySelectorAll(".builder-role-row")].map((row) => ({
    name: row.querySelector(".builder-role-name").value.trim() || "Resident",
    pgy: row.querySelector(".builder-role-pgy").value,
    count: Math.max(0, Number(row.querySelector(".builder-role-count").value))
  })).filter((role) => role.count > 0);
  config.shifts = [...app.querySelectorAll(".service-shift-card")].filter((card) => card.querySelector(".builder-shift-enabled").checked).map((card) => card.dataset.shiftCode);
  serviceShiftOverrides[activeBuilderService] = serviceShiftOverrides[activeBuilderService] || {};
  app.querySelectorAll(".service-shift-card").forEach((card) => {
    const code = card.dataset.shiftCode;
    const start = card.querySelector(".builder-shift-start").value;
    const end = card.querySelector(".builder-shift-end").value;
    serviceShiftOverrides[activeBuilderService][code] = {
      name: card.querySelector(".builder-shift-name").value.trim() || "Assignment",
      type: card.querySelector(".builder-shift-type").value,
      start,
      end,
      hours: calculateShiftHours(start, end),
      colorHex: card.querySelector(".builder-shift-color").value,
      style: card.querySelector(".builder-shift-style").value,
      display: card.querySelector(".builder-shift-display").value
    };
  });
  serviceScheduleSettings[activeBuilderService] = {
    ...(serviceScheduleSettings[activeBuilderService] || {}),
    nights: config.shifts.includes("NIGHT") || config.shifts.includes("WKND-N"),
    longCall: config.shifts.includes("LONG"),
    shortWeekend: config.shifts.includes("SHORT"),
    label: `${activeBuilderService} uses ${config.shifts.length} shift type${config.shifts.length === 1 ? "" : "s"} and ${config.roles.length} coverage role${config.roles.length === 1 ? "" : "s"}`
  };
  serviceRuleProfiles[activeBuilderService] = {
    ...ensureServiceRules(activeBuilderService),
    staffing: config.roles.map((role) => `${role.count} ${role.name}`).join(" + "),
    eligible: [...new Set(config.roles.map((role) => role.pgy))].join("; "),
    nights: config.shifts.includes("NIGHT") || config.shifts.includes("WKND-N") ? `Night coverage enabled; max ${app.querySelector(".builder-max-nights")?.value || 5} consecutive nights` : "No night coverage for this service",
    weekend: config.shifts.includes("LONG") || config.shifts.includes("SHORT") || config.shifts.includes("WKND-N") ? "Weekend coverage enabled by selected shift types" : "No routine weekend coverage configured"
  };
}

function snapshotScheduleDraft() {
  scheduleUndoStack.push(JSON.stringify(scheduleDraft));
  if (scheduleUndoStack.length > 40) scheduleUndoStack.shift();
  scheduleRedoStack = [];
}

function restoreScheduleSnapshot(serialized) {
  scheduleDraft = JSON.parse(serialized);
  syncActiveScheduleDraft();
  selectedScheduleCell = null;
  render();
}

function getEditorAssignmentValue() {
  const templateCode = app.querySelector(".editor-shift-select")?.value || "";
  const custom = app.querySelector(".editor-custom-value")?.value.trim() || "";
  if (templateCode === "CUSTOM") return custom;
  if (templateCode === "CLINIC" || templateCode === "DIDACTIC") return templateCode;
  const template = getServiceShiftTemplate(activeScheduleService, templateCode);
  return template ? formatTemplateValue(template) : custom;
}

function openModal() {
  document.querySelector("#modal-schedule-count").textContent = configuredServices().length;
  document.querySelector("#modal-backdrop").hidden = false;
}
function closeModal() { document.querySelector("#modal-backdrop").hidden = true; }
function openDeleteServiceModal() {
  document.querySelector("#delete-service-name").textContent = activeBuilderService;
  document.querySelector("#delete-service-modal").hidden = false;
}
function closeDeleteServiceModal() {
  document.querySelector("#delete-service-modal").hidden = true;
}
function deleteActiveService() {
  if (configuredServices().length <= 1) {
    closeDeleteServiceModal();
    showToast("Service not deleted", "The program must keep at least one active service.");
    return;
  }
  const deletedService = activeBuilderService;
  const teamIndex = programTeams.findIndex((team) => team.name === deletedService);
  if (teamIndex >= 0) programTeams.splice(teamIndex, 1);
  delete serviceRuleProfiles[deletedService];
  delete serviceDetailedRules[deletedService];
  delete serviceBuilderConfigs[deletedService];
  delete serviceShiftOverrides[deletedService];
  delete serviceScheduleSettings[deletedService];
  delete serviceCoverageLanes[deletedService];
  delete serviceDistributionSettings[deletedService];
  delete serviceMasterLinks[deletedService];
  Object.keys(scheduleDraftStore).filter((key) => key.endsWith(`:${deletedService}`)).forEach((key) => delete scheduleDraftStore[key]);
  Object.keys(scheduleLifecycleStore).filter((key) => key.endsWith(`:${deletedService}`)).forEach((key) => delete scheduleLifecycleStore[key]);
  const remaining = configuredServices();
  activeBuilderService = remaining[0] || "";
  if (activeScheduleService === deletedService) {
    activeScheduleService = activeBuilderService;
    loadActiveScheduleDraft();
  }
  if (activeServiceRule === deletedService) activeServiceRule = activeBuilderService;
  closeDeleteServiceModal();
  render();
  showToast("Service deleted", `${deletedService} and its linked draft schedules were removed.`);
}
function showToast(title = "Schedule updated", copy = "Your changes were saved.") {
  const toast = document.querySelector("#toast");
  toast.querySelector("strong").textContent = title;
  toast.querySelector("span:not(.icon)").textContent = copy;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

document.querySelector(".main-nav").addEventListener("click", (event) => {
  const item = event.target.closest(".nav-item");
  if (item) {
    if (item.dataset.residentSection) activeResidentSelfSection = item.dataset.residentSection;
    navigate(item.dataset.view);
  }
});
document.querySelectorAll("[data-view-target]").forEach((item) => item.addEventListener("click", () => navigate(item.dataset.viewTarget)));
function switchPortal(portal, button) {
  currentPortal = portal;
  document.querySelectorAll(".portal-switch > .portal-option").forEach((item) => item.classList.toggle("active", item === button));
  if (currentPortal === "resident") {
    currentView = "resident-home";
    document.querySelector(".main-nav").style.display = "";
    document.querySelector(".sidebar-support").style.display = "none";
    document.querySelector(".sidebar-user strong").textContent = currentResidentName;
    document.querySelector(".sidebar-user span").textContent = "PGY-3 resident";
    document.querySelector(".top-actions .primary-button").style.display = "none";
    configureNavigation("resident");
    render();
  } else {
    document.querySelector(".main-nav").style.display = "";
    document.querySelector(".sidebar-support").style.display = "";
    document.querySelector(".sidebar-user strong").textContent = "Dr. Elena Morgan";
    document.querySelector(".sidebar-user span").textContent = "Chief administrator";
    document.querySelector(".top-actions .primary-button").style.display = "";
    configureNavigation("chief");
    navigate("dashboard");
  }
}
window.switchPortal = switchPortal;
document.querySelector("#mobile-menu").addEventListener("click", () => document.querySelector("#sidebar").classList.toggle("open"));
document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-cancel").addEventListener("click", closeModal);
document.querySelector("#modal-backdrop").addEventListener("click", (event) => { if (event.target.id === "modal-backdrop") closeModal(); });
document.querySelector(".modal-confirm").addEventListener("click", () => {
  configuredServices().forEach((service) => {
    const key = scheduleDraftKey(currentBlock, service);
    if (!scheduleDraftStore[key]) scheduleDraftStore[key] = generateServiceDraft(service, currentBlock);
    setScheduleLifecycle(currentBlock, service, "Draft");
  });
  closeModal();
  showToast(`${configuredServices().length} schedules generated`, `Your editable Block ${currentBlock} draft is ready.`);
  setTimeout(() => navigate("schedule"), 450);
});
document.querySelector(".delete-service-close").addEventListener("click", closeDeleteServiceModal);
document.querySelector(".delete-service-cancel").addEventListener("click", closeDeleteServiceModal);
document.querySelector(".delete-service-confirm").addEventListener("click", deleteActiveService);
document.querySelector("#delete-service-modal").addEventListener("click", (event) => {
  if (event.target.id === "delete-service-modal") closeDeleteServiceModal();
});

hydrateIcons();
render();
