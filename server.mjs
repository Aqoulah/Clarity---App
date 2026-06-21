import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT || 4173);
const root = process.cwd();
const seedPath = join(root, "data", "clarity-seed.json");
const devDbPath = join(root, "data", "clarity-dev-db.json");
const types = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml"
};

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function loadDatabase() {
  try {
    return await readJson(devDbPath);
  } catch {
    const seed = await readJson(seedPath);
    await mkdir(join(root, "data"), { recursive: true });
    await writeFile(devDbPath, `${JSON.stringify(seed, null, 2)}\n`);
    return seed;
  }
}

async function saveDatabase(database) {
  await mkdir(join(root, "data"), { recursive: true });
  database.updatedAt = new Date().toISOString();
  await writeFile(devDbPath, `${JSON.stringify(database, null, 2)}\n`);
}

async function readRequestBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json" });
  response.end(JSON.stringify(payload));
}

function sendNotFound(response) {
  sendJson(response, 404, { error: "Not found" });
}

async function handleApi(request, response, pathname) {
  const database = await loadDatabase();

  if (request.method === "GET" && pathname === "/api/health") {
    sendJson(response, 200, {
      ok: true,
      app: "Clarity Schedule MVP",
      version: database.version,
      residentCount: database.residents.length
    });
    return true;
  }

  if (request.method === "GET" && pathname === "/api/bootstrap") {
    sendJson(response, 200, database);
    return true;
  }

  if (request.method === "GET" && pathname === "/api/residents") {
    sendJson(response, 200, database.residents);
    return true;
  }

  const residentMatch = pathname.match(/^\/api\/residents\/([^/]+)$/);
  if (request.method === "GET" && residentMatch) {
    const residentId = decodeURIComponent(residentMatch[1]);
    const resident = database.residents.find((item) => item.id === residentId || item.name === residentId);
    if (!resident) return sendNotFound(response), true;
    sendJson(response, 200, {
      ...resident,
      masterAssignments: database.masterAssignments.filter((item) => item.residentId === resident.id),
      requests: database.requests.filter((item) => item.residentId === resident.id),
      ptoLeave: database.ptoLeave.filter((item) => item.residentId === resident.id),
      callSwitches: database.callSwitches.filter((item) => item.offeringResidentId === resident.id || item.receivingResidentId === resident.id)
    });
    return true;
  }

  if (request.method === "GET" && pathname === "/api/master-schedule") {
    sendJson(response, 200, database.masterAssignments);
    return true;
  }

  if (request.method === "GET" && pathname === "/api/service-coverage") {
    sendJson(response, 200, database.serviceCoverage);
    return true;
  }

  if (request.method === "GET" && pathname === "/api/call-pools") {
    sendJson(response, 200, database.callPools);
    return true;
  }

  if (request.method === "GET" && pathname === "/api/holidays") {
    sendJson(response, 200, database.holidays);
    return true;
  }

  if (request.method === "POST" && pathname === "/api/requests") {
    const body = await readRequestBody(request);
    const requestRecord = {
      id: `REQ-${Date.now()}`,
      status: "pending-chief-review",
      createdAt: new Date().toISOString(),
      ...body
    };
    database.requests.push(requestRecord);
    await saveDatabase(database);
    sendJson(response, 201, requestRecord);
    return true;
  }

  if (request.method === "POST" && pathname === "/api/call-switches") {
    const body = await readRequestBody(request);
    const callSwitch = {
      id: `SWITCH-${Date.now()}`,
      status: "pending-chief-review",
      eligibility: {
        noClinicSameDay: true,
        noClinicNextDay: true,
        noBackToBackCalls: true,
        needsChiefReview: true
      },
      createdAt: new Date().toISOString(),
      ...body
    };
    database.callSwitches.push(callSwitch);
    await saveDatabase(database);
    sendJson(response, 201, callSwitch);
    return true;
  }

  if (request.method === "POST" && pathname === "/api/attendance/check-in") {
    const body = await readRequestBody(request);
    const session = database.didacticAttendanceSessions.find((item) => String(item.id) === String(body.sessionId));
    if (!session) return sendNotFound(response), true;
    session.attendance = session.attendance || {};
    session.attendance[body.residentName] = body.status || "Attended";
    await saveDatabase(database);
    sendJson(response, 200, session);
    return true;
  }

  sendNotFound(response);
  return true;
}

createServer(async (request, response) => {
  const url = new URL(request.url, `http://127.0.0.1:${port}`);
  if (url.pathname.startsWith("/api/")) {
    try {
      await handleApi(request, response, url.pathname);
    } catch (error) {
      sendJson(response, 500, { error: "API error", details: error.message });
    }
    return;
  }

  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = normalize(join(root, requested));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(filePath);
    response.writeHead(200, { "Content-Type": types[extname(filePath)] || "text/plain" });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Schedule hub running at http://127.0.0.1:${port}`);
});
