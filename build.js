import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["src/Neon-energy-flow-card.ts"],
  bundle: true,
  format: "esm",
  outfile: "dist/neon-energy-flow-card.js",
  loader: {
    ".ts": "ts"
  }
}).catch(() => process.exit(1));
