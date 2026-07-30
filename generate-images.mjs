/*
  EZE Funded — image generator (Magnific Mystic API)
  ===================================================
  Verified against docs.magnific.com (Jul 2026):
    POST https://api.magnific.com/v1/ai/mystic     → returns { data: { task_id, status } }
    GET  https://api.magnific.com/v1/ai/mystic/{task_id}  → poll until status: "COMPLETED"
    Auth header: x-magnific-api-key

  USAGE (on your own machine, Node 18+):
    1. Put this file next to eze-funded.html
    2. Set your key as an environment variable — never hard-code it:
         Windows (PowerShell):  $env:MAGNIFIC_API_KEY="your-key"
         Mac/Linux:             export MAGNIFIC_API_KEY="your-key"
    3. node generate-images.mjs

  The site already prefers assets/<name>.jpg and falls back to stock photos,
  so partial runs are completely fine — rerun any time; existing files are skipped.

  CREDITS: Mystic at 2k resolution costs more credits per image. If you want to
  save credits while iterating, change RESOLUTION to "1k", review the results,
  then regenerate your favourites at "2k".
*/

import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const API_KEY = process.env.MAGNIFIC_API_KEY;
if (!API_KEY) {
  console.error("Set MAGNIFIC_API_KEY first — do not paste keys into code files.");
  process.exit(1);
}

const BASE = "https://api.magnific.com/v1/ai/mystic";
const HEADERS = { "Content-Type": "application/json", "x-magnific-api-key": API_KEY };
const RESOLUTION = "2k";        // "1k" is cheaper for drafts
const MODEL = "realism";        // photorealistic Mystic variant
const POLL_MS = 5000;           // poll interval
const TIMEOUT_MS = 4 * 60_000;  // give up on a task after 4 minutes

const STYLE =
  "photorealistic, cinematic lighting, dark modern fintech environment, deep blue and " +
  "teal tones with warm accents, shallow depth of field, natural skin texture, candid, " +
  "no text, no watermark, no logos";

// One entry per <img> on the site. Key = filename saved as assets/<key>.jpg
const IMAGES = {
  banner:  { ar: "widescreen_16_9", prompt: `Professional trader at a desk with three curved monitors showing candlestick charts, seen from behind, night office, ${STYLE}` },
  how1:    { ar: "widescreen_16_9", prompt: `Close-up of hands completing an online checkout on a laptop, credit card resting beside the keyboard, ${STYLE}` },
  how2:    { ar: "widescreen_16_9", prompt: `Focused trader analysing a candlestick chart on a large monitor, side profile, screen glow on face, ${STYLE}` },
  how3:    { ar: "widescreen_16_9", prompt: `Confident young professional reading good news on a laptop, subtle smile, office at dusk, ${STYLE}` },
  how4:    { ar: "widescreen_16_9", prompt: `Person glancing at a payment-received notification on a smartphone, cozy cafe, ${STYLE}` },
  payout:  { ar: "square_1_1",      prompt: `Happy person holding a phone showing a banking app notification, natural window light, candid moment, ${STYLE}` },
  vid1:    { ar: "widescreen_16_9", prompt: `Webcam-interview still of a South Asian man in his late 20s talking to camera, home office with warm lamp light, ${STYLE}` },
  vid2:    { ar: "widescreen_16_9", prompt: `Webcam-interview still of a Brazilian man in his 30s speaking to camera, plants and bookshelf behind him, ${STYLE}` },
  vid3:    { ar: "widescreen_16_9", prompt: `Webcam-interview still of an American man in his 40s wearing a headset, dual trading monitors behind him, ${STYLE}` },
  vid4:    { ar: "widescreen_16_9", prompt: `Webcam-interview still of a German man in his 30s in a bright modern apartment, speaking to camera, ${STYLE}` },
  acad:    { ar: "widescreen_16_9", prompt: `Professional woman presenting to camera in a video studio, soft key light, education-video still, ${STYLE}` },
  support: { ar: "widescreen_16_9", prompt: `Customer support team wearing headsets in a modern office at night, blue monitor glow, over-shoulder view, ${STYLE}` },
  team:    { ar: "widescreen_16_9", prompt: `Diverse startup team of about twenty people posing together on an office rooftop terrace at golden hour, candid laughter, wide shot, ${STYLE}` },
  t1:      { ar: "widescreen_16_9", prompt: `Two young founders shaking hands in a small startup office, early-days energy, ${STYLE}` },
  t2:      { ar: "widescreen_16_9", prompt: `Team members collaborating around laptops at a long wooden table, ${STYLE}` },
  t3:      { ar: "widescreen_16_9", prompt: `Abstract globe made of glowing connection lines over a dark world map, data-network visual, ${STYLE}` },
  bl1:     { ar: "widescreen_16_9", prompt: `Trader resting chin on hand, deep in thought in front of charts, moody low light, ${STYLE}` },
  bl2:     { ar: "widescreen_16_9", prompt: `Printed price charts, calculator and pen arranged on a desk, top-down flat lay, ${STYLE}` },
  bl3:     { ar: "widescreen_16_9", prompt: `Order book and market depth chart glowing on a screen in a dark room, extreme close-up, ${STYLE}` },
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function api(url, opts = {}, attempt = 1) {
  const res = await fetch(url, { headers: HEADERS, ...opts });
  if (res.status === 429 && attempt <= 4) {
    console.log(`    rate-limited — waiting ${attempt * 8}s…`);
    await sleep(attempt * 8000);
    return api(url, opts, attempt + 1);
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} — ${JSON.stringify(body).slice(0, 300)}`);
  }
  return body;
}

async function generate(name, cfg) {
  // 1. create the task
  const created = await api(BASE, {
    method: "POST",
    body: JSON.stringify({
      prompt: cfg.prompt,
      model: MODEL,
      resolution: RESOLUTION,
      aspect_ratio: cfg.ar,
      filter_nsfw: true,
    }),
  });
  const taskId = created.data?.task_id;
  if (!taskId) throw new Error("No task_id in response: " + JSON.stringify(created).slice(0, 200));
  process.stdout.write(`    task ${taskId.slice(0, 8)}… `);

  // 2. poll until done
  const deadline = Date.now() + TIMEOUT_MS;
  while (true) {
    await sleep(POLL_MS);
    const st = await api(`${BASE}/${taskId}`);
    const status = st.data?.status;
    if (status === "COMPLETED") {
      const url = st.data?.generated?.[0];
      if (!url) throw new Error("COMPLETED but no image URL in generated[]");
      // 3. download and save
      const img = await fetch(url);
      if (!img.ok) throw new Error(`download failed: ${img.status}`);
      const buf = Buffer.from(await img.arrayBuffer());
      await writeFile(`assets/${name}.jpg`, buf);
      console.log(`saved (${(buf.length / 1024).toFixed(0)} KB)`);
      return;
    }
    if (status === "FAILED") throw new Error("task FAILED");
    if (Date.now() > deadline) throw new Error("timed out waiting for task");
    process.stdout.write(".");
  }
}

await mkdir("assets", { recursive: true });
const todo = Object.entries(IMAGES).filter(([n]) => !existsSync(`assets/${n}.jpg`));
console.log(`${todo.length} to generate, ${Object.keys(IMAGES).length - todo.length} already exist.\n`);

let ok = 0, fail = 0;
for (const [name, cfg] of todo) {
  console.log(`→ ${name}`);
  try { await generate(name, cfg); ok++; }
  catch (e) { console.error(`    FAILED: ${e.message}`); fail++; }
}

console.log(`\nDone — ${ok} generated, ${fail} failed.`);
console.log("Open eze-funded.html: assets/ images load first, stock photos remain as fallback.");
if (fail) console.log("Rerun the script to retry failed ones — existing files are skipped.");
