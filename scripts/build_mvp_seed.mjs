import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = process.cwd();
const sourcePath = join(root, "demo-workbook-data.js");
const outputPath = join(root, "data", "clarity-seed.json");

function normalizeRotationName(value = "") {
  return String(value).trim() || "Elective";
}

function residentInitials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function buildMasterAssignments(demo) {
  return demo.masterResidents.flatMap((resident) => {
    const cells = demo.masterAssignments[resident.id] || demo.masterAssignments[resident.name] || [];
    return demo.blockLabels.map((blockLabel, index) => {
      const cell = cells[index] || {};
      return {
        id: `${resident.id}-B${index + 1}`,
        residentId: resident.id,
        residentName: resident.name,
        pgy: resident.pgy,
        institution: resident.institution,
        blockNumber: index + 1,
        blockLabel,
        blockDates: demo.blockDates[index],
        rotation: normalizeRotationName(cell.rotation),
        sourceLabel: cell.sourceLabel || cell.rotation || "Elective",
        locked: Boolean(cell.locked)
      };
    });
  });
}

function buildServiceCoverage(demo, masterAssignments) {
  const teams = demo.programTeams || [];
  const links = demo.serviceMasterLinks || {};
  return demo.blockLabels.flatMap((blockLabel, index) => {
    const blockNumber = index + 1;
    return teams.map((team) => {
      const linkedRotations = links[team.name] || [team.rotation || team.name];
      const residents = masterAssignments
        .filter((assignment) => (
          assignment.blockNumber === blockNumber
          && linkedRotations.includes(assignment.rotation)
        ))
        .map((assignment) => ({
          residentId: assignment.residentId,
          name: assignment.residentName,
          pgy: assignment.pgy,
          institution: assignment.institution,
          rotation: assignment.rotation,
          initials: residentInitials(assignment.residentName)
        }));

      const minimum = team.minimum ?? team.min ?? 1;
      const maximum = team.maximum ?? team.max ?? Math.max(minimum, 6);
      return {
        id: `${team.name.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-B${blockNumber}`,
        blockNumber,
        blockLabel,
        blockDates: demo.blockDates[index],
        service: team.name,
        category: team.category || team.type || "Service",
        linkedRotations,
        minimum,
        maximum,
        assigned: residents.length,
        status: residents.length < minimum ? "short" : residents.length > maximum ? "over" : "ready",
        gap: Math.max(0, minimum - residents.length),
        overage: Math.max(0, residents.length - maximum),
        residents
      };
    });
  });
}

function buildCallPools(demo, masterAssignments) {
  const callEligible = new Set(["Elective", "Vacation", "Research", "Clinic/Advo", "Board Review"]);
  return demo.blockLabels.map((blockLabel, index) => {
    const blockNumber = index + 1;
    const eligible = masterAssignments
      .filter((assignment) => assignment.blockNumber === blockNumber && callEligible.has(assignment.rotation))
      .map((assignment) => ({
        residentId: assignment.residentId,
        name: assignment.residentName,
        pgy: assignment.pgy,
        institution: assignment.institution,
        rotation: assignment.rotation,
        initials: residentInitials(assignment.residentName)
      }));

    const interns = eligible.filter((resident) => resident.pgy === "PGY-1");
    const seniors = eligible.filter((resident) => resident.pgy !== "PGY-1");
    return {
      blockNumber,
      blockLabel,
      blockDates: demo.blockDates[index],
      pools: [
        { name: "Clinic Call / Jeopardy", targetMin: 18, targetMax: 24, residents: seniors },
        { name: "Floor Intern Cross Cover", targetMin: 10, targetMax: 13, residents: interns },
        { name: "No call: seniors", targetMin: 8, targetMax: 12, residents: seniors.slice(0, 10) },
        { name: "No call: interns", targetMin: 3, targetMax: 6, residents: interns.slice(0, 6) },
        { name: "LOA / unavailable", targetMin: 0, targetMax: 3, residents: [] }
      ].map((pool) => ({
        ...pool,
        assigned: pool.residents.length,
        status: pool.residents.length < pool.targetMin ? "short" : pool.residents.length > pool.targetMax ? "over" : "ready"
      }))
    };
  });
}

function buildHolidays(demo, serviceCoverage) {
  const holidays = [
    { name: "4th of July", blockNumber: 1 },
    { name: "Labor Day", blockNumber: 3 },
    { name: "Thanksgiving", blockNumber: 6 },
    { name: "Christmas Eve", blockNumber: 7 },
    { name: "Christmas Day", blockNumber: 7 },
    { name: "New Year's Eve", blockNumber: 7 },
    { name: "New Year's Day", blockNumber: 7 },
    { name: "MLK Day", blockNumber: 8 },
    { name: "Memorial Day", blockNumber: 12 }
  ];

  const requiredServices = ["PICU", "NICU", "Floor Senior", "Gold Senior", "Floors: Purple", "Floors: Orange", "Cardiology", "Heme/Onc", "Newborn"];
  return holidays.map((holiday) => {
    const services = requiredServices.map((service) => {
      const coverage = serviceCoverage.find((item) => item.blockNumber === holiday.blockNumber && item.service === service);
      const residents = coverage?.residents?.slice(0, Math.max(1, Math.min(coverage.residents.length, 4))) || [];
      return {
        service,
        residents,
        assigned: residents.length,
        status: residents.length ? "ready" : "short"
      };
    });
    return {
      ...holiday,
      blockLabel: demo.blockLabels[holiday.blockNumber - 1],
      blockDates: demo.blockDates[holiday.blockNumber - 1],
      services,
      gaps: services.filter((service) => service.status === "short").length
    };
  });
}

const source = await readFile(sourcePath, "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
const demo = sandbox.window.CLARITY_WORKBOOK_DEMO;

const masterAssignments = buildMasterAssignments(demo);
const serviceCoverage = buildServiceCoverage(demo, masterAssignments);
const callPools = buildCallPools(demo, masterAssignments);
const holidays = buildHolidays(demo, serviceCoverage);

const seed = {
  version: "clarity-mvp-seed-v1",
  generatedAt: new Date().toISOString(),
  academicYear: demo.academicYear,
  sourceFile: demo.sourceFile,
  blocks: demo.blockLabels.map((label, index) => ({
    number: index + 1,
    label,
    dates: demo.blockDates[index]
  })),
  residents: demo.masterResidents.map((resident) => ({
    ...resident,
    initials: residentInitials(resident.name),
    profile: {
      ...(demo.residentProfiles?.[resident.name] || {}),
      id: resident.id,
      name: resident.name,
      pgy: resident.pgy,
      institution: resident.institution
    }
  })),
  rotations: demo.masterRotationOptions || [],
  services: demo.programTeams || [],
  serviceMasterLinks: demo.serviceMasterLinks || {},
  masterAssignments,
  serviceCoverage,
  callPools,
  holidays,
  didacticAttendanceSessions: demo.didacticAttendanceSessions || [],
  requests: [],
  ptoLeave: [],
  callSwitches: []
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(seed, null, 2)}\n`);
console.log(`Wrote ${outputPath}`);
