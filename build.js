import esbuild from "esbuild";
import { rmSync, cpSync } from "fs";

rmSync("dist", { recursive: true, force: true });

esbuild.build({
  entryPoints: ["src/Neon-energy-flow-card.ts"],
  bundle: true,
  format: "esm",
  outfile: "dist/neon-energy-flow-card.js",
  loader: {
    ".ts": "ts"
  },
  external: ["lit"]
}).catch(() => process.exit(1));

// kopiowanie assetów
cpSync("assets", "dist/assets", { recursive: true });
