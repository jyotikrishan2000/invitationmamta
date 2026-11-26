import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const COUPLE_IMG = path.join(ROOT, "public", "images", "couple-portrait.jpg");
const OUT_OG = path.join(ROOT, "public", "og-cover.png");

function findBrowser() {
  const candidates = [
    `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env["ProgramFiles(x86)"]}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env.ProgramFiles}\\Microsoft\\Edge\\Application\\msedge.exe`,
    `${process.env["ProgramFiles(x86)"]}\\Microsoft\\Edge\\Application\\msedge.exe`,
  ];
  for (const p of candidates) {
    if (p && fs.existsSync(p)) return p;
  }
  throw new Error("Chrome or Edge not found");
}

const coupleBase64 = fs.readFileSync(COUPLE_IMG).toString("base64");
const html = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Tiro+Devanagari+Hindi&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background: linear-gradient(135deg, #7A1226 0%, #580B19 60%, #420712 100%);
      font-family: 'Noto Sans Devanagari', 'Nirmala UI', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px;
      position: relative;
    }
    .frame {
      width: 100%;
      height: 100%;
      border: 2px solid rgba(212, 166, 74, 0.7);
      border-radius: 28px;
      background: rgba(255, 253, 248, 0.04);
      display: flex;
      align-items: center;
      gap: 44px;
      padding: 36px 52px;
    }
    .portrait-wrap {
      width: 340px;
      height: 440px;
      flex-shrink: 0;
      border-radius: 170px 170px 24px 24px;
      border: 4px solid #D4A64A;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
      background: #FAF3EA;
    }
    .portrait-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
    .content {
      flex: 1;
      color: #FFFDF8;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 14px;
    }
    .inv {
      font-size: 18px;
      color: #F6E4BD;
      letter-spacing: 0.03em;
    }
    .title {
      font-family: 'Tiro Devanagari Hindi', 'Noto Sans Devanagari', serif;
      font-size: 76px;
      color: #F6E4BD;
      line-height: 1.15;
    }
    .couple {
      font-size: 32px;
      font-weight: 700;
      color: #FFFDF8;
      line-height: 1.45;
    }
    .date-pill {
      margin-top: 6px;
      padding: 12px 36px;
      border-radius: 999px;
      background: #FFFDF8;
      color: #721022;
      font-family: 'Cinzel', sans-serif;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 0.14em;
      border: 2px solid #D4A64A;
    }
    .venue {
      font-size: 20px;
      color: #F6E4BD;
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <div class="frame">
    <div class="portrait-wrap">
      <img src="data:image/jpeg;base64,${coupleBase64}" alt="Couple" />
    </div>
    <div class="content">
      <div class="inv">|| नागणेची माता नमः || श्री गणेशाय नमः ||</div>
      <div class="title">शुभ विवाह</div>
      <div class="couple">सौ. कां. ममता कुमारी संग चि. जितेन्द्र जी</div>
      <div class="date-pill">03.12.2026</div>
      <div class="venue">ऐलाना, जालोर (राजस्थान) • राठौड़ परिवार</div>
    </div>
  </div>
</body>
</html>`;

const tmpHtml = path.join(ROOT, ".og-tmp.html");
fs.writeFileSync(tmpHtml, html, "utf8");

const browser = findBrowser();
const proc = spawn(
  browser,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--window-size=1200,630",
    `--screenshot=${OUT_OG}`,
    `file://${tmpHtml.replace(/\\/g, "/")}`,
  ],
  { stdio: "inherit" }
);

proc.on("exit", (code) => {
  fs.rmSync(tmpHtml, { force: true });
  if (code !== 0) {
    process.exit(code || 1);
  }
  console.log("Generated", OUT_OG);
});
