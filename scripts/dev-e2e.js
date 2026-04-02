const { spawn } = require("node:child_process");
const path = require("node:path");

const nextBin = path.join(
  __dirname,
  "..",
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

const child = spawn(
  process.execPath,
  [nextBin, "dev", "-p", "3101"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_DIST_DIR: ".next-e2e",
    },
  },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
