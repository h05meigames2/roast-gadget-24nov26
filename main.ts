// One-Line Roast: The Gadget You Use Every Day
// make.fun bounty: u-daring-gecko-25-one-line-roast-the-gadget-you-use-3d6aa610
//
// Writes one original roast line (at most 200 characters) to entry.txt
// inside the output directory (MAKEFUN_OUTPUT_DIR when set, otherwise
// /output). The roast targets the smartwatch's stand reminder: it cheers
// every time you stand, then silently shames you for sitting back down
// eight seconds later — a fitness coach that celebrates the attempt and
// punishes the follow-through. Standard library only, fully deterministic,
// no network access.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My smartwatch throws a little party every time I stand up, then silently judges me for sitting back down eight seconds later.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

function validate(line: string): void {
  const stripped = line.trim();
  if (stripped.length < MIN_LENGTH || stripped.length > MAX_LENGTH) {
    throw new Error(
      `line is ${stripped.length} characters, must be ${MIN_LENGTH}-${MAX_LENGTH}`,
    );
  }
  if (stripped.includes("\n") || stripped.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (stripped.length === 0) {
    throw new Error("line must not be only whitespace");
  }
}

function main(): void {
  validate(ROAST);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  const path = join(outputDir, "entry.txt");
  writeFileSync(path, ROAST + "\n", "utf8");
  console.log(`Wrote ${ROAST.length} characters to ${path}`);
}

main();
