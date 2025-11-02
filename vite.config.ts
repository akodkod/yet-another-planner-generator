import path from "node:path"
import { createRequire } from "node:module"
import { defineConfig, normalizePath } from "vite"
import { viteStaticCopy } from "vite-plugin-static-copy"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from "@tailwindcss/vite"

const require = createRequire(import.meta.url)

const pdfjsDistPath = path.dirname(require.resolve("pdfjs-dist/package.json"))
const wasmDir = normalizePath(path.join(pdfjsDistPath, "wasm"))
const cMapsDir = normalizePath(path.join(pdfjsDistPath, "cmaps"))

const config = defineConfig({
  plugins: [
    // this is the plugin that enables path aliases
    tsconfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart({
      srcDirectory: "lib",
      router: {
        routesDirectory: "../app",
        quoteStyle: "double",
        semicolons: false,
      },
    }),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: wasmDir,
          dest: "",
        },
        {
          src: cMapsDir,
          dest: "",
        },
      ],
    }),
  ],
})

export default config
