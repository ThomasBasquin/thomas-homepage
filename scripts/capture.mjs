/**
 * Génère les médias réels des projets à partir des sites en production.
 *
 *   node scripts/capture.mjs            tous les projets
 *   node scripts/capture.mjs nook       un seul
 *
 * Chaque projet produit poster.webp, capture-1.webp, capture-2.webp,
 * loop.webm et loop.mp4 dans public/media/<slug>/. Les fichiers sont écrits
 * dans un dossier temporaire puis promus d'un bloc : un site momentanément
 * cassé ne détruit pas des médias corrects.
 */

import { chromium } from "playwright";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, readdir, readFile, rm, cp, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(ROOT, "src/content/projects");
const MEDIA = path.join(ROOT, "public/media");
const WORK = path.join(ROOT, ".capture-tmp");

const VIEWPORT = {
  browser: { width: 1440, height: 900 },
  phone: { width: 390, height: 844 },
};
const LOOP_SECONDS = 5;
const MAX_LOOP_BYTES = 1_500_000;

/* -------------------------------------------------------------------------
   Configuration par projet
   ------------------------------------------------------------------------- */

/**
 * Un scénario reçoit la page déjà chargée et stabilisée, et anime pendant
 * environ LOOP_SECONDS. `prepare` s'exécute avant la navigation.
 */
const SCENARIOS = {
  "marie-wach": {
    // Le thème du site est circadien (clair le jour, sombre la nuit) : on le
    // fige pour que deux exécutions donnent la même image.
    prepare: (page) =>
      page.addInitScript(() => sessionStorage.setItem("theme", "light")),
    act: (page) => smoothScroll(page, 0, 0.85),
    stills: [0.35, 0.7],
  },
  "martin-basquin": {
    act: (page) => smoothScroll(page, 0, 0.9),
    stills: [0.4, 0.75],
  },
  pokedex: {
    // La page ne défile pas : ce qui vit, c'est la recherche — chaque résultat
    // repeint l'écran entier à la couleur du type de la créature.
    act: async (page) => {
      await searchPokemon(page, "Dracaufeu");
      await page.waitForTimeout(1600);
      await searchPokemon(page, "Mewtwo");
      await page.waitForTimeout(1400);
    },
    stills: async (page, shoot) => {
      await searchPokemon(page, "Dracaufeu");
      await page.waitForTimeout(1400);
      await shoot();
      await searchPokemon(page, "Ectoplasma");
      await page.waitForTimeout(1400);
      await shoot();
      await searchPokemon(page, "Bulbizarre");
      await page.waitForTimeout(1200);
    },
  },
  nook: {
    login: async (page) => {
      const email = process.env.NOOK_EMAIL;
      const password = process.env.NOOK_PASSWORD;
      if (!email || !password) return false;
      await page.goto("https://nook.thomasbasquin.fr/login", {
        waitUntil: "domcontentloaded",
      });
      await page.fill("#login-email", email);
      await page.fill("#login-password", password);
      await Promise.all([
        page.waitForURL((url) => !url.pathname.startsWith("/login"), {
          timeout: 20000,
        }),
        page.click('button[type="submit"]'),
      ]);
      return true;
    },
    // La bibliothèque tient dans un écran (72 px de défilement) : faire défiler
    // ne montrerait rien. Ce qui vaut d'être montré, c'est l'argument même du
    // produit — jeux, films, séries et animés au même endroit — donc on
    // parcourt les quatre onglets, chacun repeignant l'écran de ses jaquettes.
    act: async (page) => {
      for (const tab of ["/movies", "/tv", "/anime", "/games"]) {
        await openTab(page, tab);
        await page.waitForTimeout(LOOP_SECONDS * 230);
      }
    },
    stills: async (page, shoot) => {
      await openTab(page, "/movies");
      await page.waitForTimeout(1300);
      await shoot();
      await openTab(page, "/anime");
      await page.waitForTimeout(1300);
      await shoot();
      await openTab(page, "/games");
      await page.waitForTimeout(1100);
    },
  },
};

/* -------------------------------------------------------------------------
   Utilitaires
   ------------------------------------------------------------------------- */

/** Lecture des seuls champs dont le script a besoin — pas de parseur YAML. */
async function readProjects() {
  const files = (await readdir(CONTENT)).filter((f) => f.endsWith(".md"));
  const projects = [];
  for (const file of files) {
    const raw = await readFile(path.join(CONTENT, file), "utf8");
    const front = raw.split(/^---$/m)[1] ?? "";
    const demo = front.match(/^\s*demo:\s*"([^"]+)"/m)?.[1];
    const device = front.match(/^\s*device:\s*"?(phone|browser)"?/m)?.[1];
    const order = Number(front.match(/^order:\s*(\d+)/m)?.[1] ?? 99);
    if (demo) {
      projects.push({
        slug: file.replace(/\.md$/, ""),
        url: demo,
        device: device ?? "browser",
        order,
      });
    }
  }
  return projects.sort((a, b) => a.order - b.order);
}

async function settle(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts.ready).catch(() => {});
  await page.waitForTimeout(700);
}

/** Défilement animé avec easing — un scroll brut donne une boucle mécanique. */
function smoothScroll(page, fromRatio, toRatio) {
  return page.evaluate(
    ([from, to, duration]) =>
      new Promise((resolve) => {
        const max = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const start = max * from;
        const distance = max * to - start;
        const t0 = performance.now();
        const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
        const step = (now) => {
          const t = Math.min(1, (now - t0) / duration);
          window.scrollTo(0, start + distance * ease(t));
          if (t < 1) requestAnimationFrame(step);
          else resolve();
        };
        requestAnimationFrame(step);
      }),
    [fromRatio, toRatio, LOOP_SECONDS * 1000]
  );
}

function openTab(page, href) {
  return page.click(`a[href="${href}"]`, { timeout: 5000 }).catch(() => {});
}

/** Frappe visible plutôt que `fill` : la boucle doit montrer l'usage réel. */
async function searchPokemon(page, name) {
  const input = page.locator("input").first();
  await input.fill("", { force: true });
  await input.pressSequentially(name, { delay: 55 });
  await input.press("Enter");
}

async function scrollToRatio(page, ratio) {
  await page.evaluate((r) => {
    const max = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    window.scrollTo(0, max * r);
  }, ratio);
  await page.waitForTimeout(600);
}

async function toWebp(pngPath, webpPath, maxWidth) {
  await run("ffmpeg", [
    "-y",
    "-loglevel", "error",
    "-i", pngPath,
    "-vf", `scale='min(${maxWidth},iw)':-2:flags=lanczos`,
    "-quality", "82",
    webpPath,
  ]);
}

/**
 * Ré-encode la capture brute de Playwright en webm (VP9) + mp4 (h264),
 * muettes, coupées à la fenêtre utile et redescendues sous le budget de poids.
 */
async function encodeLoop(sourceVideo, offsetSeconds, outDir, device) {
  const height = device === "phone" ? 960 : 720;
  const common = [
    "-y",
    "-loglevel", "error",
    "-ss", offsetSeconds.toFixed(2),
    "-t", String(LOOP_SECONDS),
    "-i", sourceVideo,
    "-an",
    "-vf", `scale=-2:'min(${height},ih)':flags=lanczos`,
  ];
  const webm = path.join(outDir, "loop.webm");
  const mp4 = path.join(outDir, "loop.mp4");

  for (const crf of [34, 38, 42]) {
    await run("ffmpeg", [
      ...common,
      "-c:v", "libvpx-vp9",
      "-crf", String(crf),
      "-b:v", "0",
      "-row-mt", "1",
      "-deadline", "good",
      webm,
    ]);
    if ((await stat(webm)).size <= MAX_LOOP_BYTES) break;
  }

  await run("ffmpeg", [
    ...common,
    "-c:v", "libx264",
    "-crf", "28",
    "-preset", "slow",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    mp4,
  ]);
}

/* -------------------------------------------------------------------------
   Capture d'un projet
   ------------------------------------------------------------------------- */

async function capture(browser, project) {
  const { slug, url, device } = project;
  const scenario = SCENARIOS[slug] ?? { act: (p) => smoothScroll(p, 0, 0.85), stills: [0.35, 0.7] };
  const outDir = path.join(WORK, slug);
  const videoDir = path.join(WORK, `${slug}-video`);
  await mkdir(outDir, { recursive: true });
  await mkdir(videoDir, { recursive: true });

  const viewport = VIEWPORT[device];
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    locale: "fr-FR",
    timezoneId: "Europe/Paris",
    isMobile: device === "phone",
    hasTouch: device === "phone",
    reducedMotion: "no-preference",
    recordVideo: { dir: videoDir, size: viewport },
  });

  const contextStart = Date.now();
  const page = await context.newPage();

  try {
    if (scenario.prepare) await scenario.prepare(page);

    // Sans identifiants on capture quand même l'écran public : mieux vaut une
    // image réelle mais pauvre qu'un chemin mort dans les fiches projet.
    const loggedIn = scenario.login ? await scenario.login(page) : null;
    if (loggedIn === false) {
      console.warn(
        `  ⚠ ${slug} : identifiants absents du .env — seul l'écran de connexion ` +
          `sera capturé. Renseigner NOOK_EMAIL / NOOK_PASSWORD puis relancer ` +
          `« npm run captures ${slug} » pour montrer l'application elle-même.`
      );
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    } else if (loggedIn === null) {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    }

    await settle(page);

    // Poster et captures fixes — pris avant l'enregistrement utile pour que
    // la boucle démarre sur une page déjà chaude.
    const png = path.join(outDir, "_shot.png");
    const maxWidth = device === "phone" ? 900 : 1600;
    let shotIndex = 0;
    const shoot = async (name) => {
      await page.screenshot({ path: png });
      await toWebp(png, path.join(outDir, `${name ?? `capture-${++shotIndex}`}.webp`), maxWidth);
    };

    await shoot("poster");

    const stills = scenario.stills ?? [0.35, 0.7];
    if (typeof stills === "function") {
      await stills(page, shoot);
    } else {
      for (const ratio of stills) {
        await scrollToRatio(page, ratio);
        await shoot();
      }
      await scrollToRatio(page, 0);
    }
    await rm(png, { force: true });

    await page.waitForTimeout(400);
    const loopStart = Date.now();
    await scenario.act(page);
    await page.waitForTimeout(400);

    const offset = Math.max(0, (loopStart - contextStart) / 1000);
    const videoPath = await page.video().path();
    await context.close();
    await encodeLoop(videoPath, offset, outDir, device);
    await rm(videoDir, { recursive: true, force: true });
    return true;
  } catch (error) {
    await context.close().catch(() => {});
    await rm(videoDir, { recursive: true, force: true });
    throw error;
  }
}

/* -------------------------------------------------------------------------
   Entrée
   ------------------------------------------------------------------------- */

async function loadDotEnv() {
  const file = path.join(ROOT, ".env");
  if (!existsSync(file)) return;
  for (const line of (await readFile(file, "utf8")).split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match) process.env[match[1]] ??= match[2].replace(/^["']|["']$/g, "");
  }
}

async function main() {
  await loadDotEnv();
  const only = process.argv.slice(2);
  const projects = (await readProjects()).filter(
    (p) => only.length === 0 || only.includes(p.slug)
  );
  if (projects.length === 0) {
    console.error("Aucun projet à capturer.");
    process.exit(1);
  }

  await rm(WORK, { recursive: true, force: true });
  await mkdir(WORK, { recursive: true });

  const browser = await chromium.launch();
  const done = [];
  try {
    for (const project of projects) {
      console.log(`→ ${project.slug} (${project.device}) ${project.url}`);
      if (await capture(browser, project)) done.push(project.slug);
    }
  } finally {
    await browser.close();
  }

  // Promotion : les médias ne sont remplacés qu'une fois tout produit.
  for (const slug of done) {
    const target = path.join(MEDIA, slug);
    await rm(target, { recursive: true, force: true });
    await cp(path.join(WORK, slug), target, { recursive: true });
    console.log(`  ✓ public/media/${slug}`);
  }
  await rm(WORK, { recursive: true, force: true });

  if (done.length < projects.length) {
    console.warn("\nCertains projets ont été ignorés (voir ci-dessus).");
  }
}

await main();
