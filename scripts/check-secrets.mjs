import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const patterns = [
  /SUPABASE_SERVICE_ROLE_KEY\s*=/i,
  new RegExp(["service", "role"].join("_"), "i"),
  /sb_secret_[A-Za-z0-9_-]+/,
  /sk_live_[A-Za-z0-9]+/,
  /ghp_[A-Za-z0-9]{30,}/,
  /github_pat_[A-Za-z0-9_]{30,}/,
  /vercel_[A-Za-z0-9]{20,}/i,
];

const files = execFileSync("git", ["ls-files", "--others", "--cached", "--exclude-standard"], {
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean)
  .filter((file) => !file.startsWith("node_modules/"))
  .filter((file) => file !== "scripts/check-secrets.mjs");

const findings = [];

for (const file of files) {
  let content;

  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }

  for (const pattern of patterns) {
    if (pattern.test(content)) {
      findings.push(`${file} matched ${pattern}`);
    }
  }
}

if (findings.length) {
  console.error("Possible secrets found:");
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

console.log("No obvious secrets found in tracked/unignored files.");
