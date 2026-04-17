import { defineConfig } from "vite";
import { readdirSync } from "node:fs";
import { resolve, basename, extname } from "node:path";

const rootDir = process.cwd();
const htmlEntries = Object.fromEntries(
  readdirSync(rootDir)
    .filter((file) => extname(file) === ".html")
    .map((file) => [basename(file, ".html"), resolve(rootDir, file)]),
);

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: htmlEntries,
    },
  },
});
