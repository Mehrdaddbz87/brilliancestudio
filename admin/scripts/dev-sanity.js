const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const runtimeIndexPath = path.join(__dirname, "..", ".sanity", "runtime", "index.html");
const runtimeAppPath = path.join(__dirname, "..", ".sanity", "runtime", "app.js");
const runtimeScriptPattern = /\/\.sanity(?:\\|\\\\)runtime(?:\\|\\\\)app\.js/g;
const runtimeScriptReplacement = "/.sanity/runtime/app.js";
const runtimeImportPattern =
  /from "\.\.(?:\\|\/){1,2}\.\.(?:\\|\/){1,2}sanity\.config\.ts"/g;
const runtimeImportReplacement = 'from "../../sanity.config.ts"';

function replaceIfNeeded(filePath, pattern, replacement, message) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const current = fs.readFileSync(filePath, "utf8");
  const next = current.replace(pattern, replacement);

  if (next !== current) {
    fs.writeFileSync(filePath, next, "utf8");
    process.stdout.write(`${message}\n`);
  }
}

function normalizeRuntimeIndex() {
  replaceIfNeeded(
    runtimeIndexPath,
    runtimeScriptPattern,
    runtimeScriptReplacement,
    "Patched Sanity runtime index path for Windows.",
  );
  replaceIfNeeded(
    runtimeAppPath,
    runtimeImportPattern,
    runtimeImportReplacement,
    "Patched Sanity runtime app imports for Windows.",
  );
}

const command = process.platform === "win32" ? "cmd.exe" : "npx";
const args = process.platform === "win32" ? ["/c", "npx", "sanity", "dev"] : ["sanity", "dev"];

const child = spawn(command, args, {
  cwd: path.join(__dirname, ".."),
  stdio: "inherit",
  shell: false,
});

const patchInterval = setInterval(normalizeRuntimeIndex, 500);

child.on("exit", (code, signal) => {
  clearInterval(patchInterval);

  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
