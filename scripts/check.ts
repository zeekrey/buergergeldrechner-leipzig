const checks = [
  "typecheck",
  "lint",
  "test:unit",
  "test:e2e",
  "build",
] as const;

const failures: string[] = [];

for (const check of checks) {
  console.log(`\n=== bun run ${check} ===\n`);

  const result = Bun.spawnSync({
    cmd: ["bun", "run", check],
    stdout: "inherit",
    stderr: "inherit",
  });

  if (result.exitCode !== 0) {
    failures.push(check);
  }
}

if (failures.length > 0) {
  console.error(`\nFailed checks: ${failures.join(", ")}`);
  process.exit(1);
}

console.log("\nAll checks passed.");
