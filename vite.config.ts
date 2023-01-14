import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

const entry = resolve(__dirname, "packages/hooks/index.ts")

const outDir = resolve(__dirname, "packages/hooks/dist")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry,
      name: "react-custom-hooks",
      // the proper extensions will be added
      fileName: "index",
    },
    outDir,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["react"],
      output: [
        {
          name: "customHooks",
          format: "umd",
          exports: "named",
          entryFileNames: "index.umd.js",
          globals: { customHooks: "customHooks" },
        },
        {
          format: "es",
          exports: "named",
          sourcemap: false,
          entryFileNames: "index.mjs",
          chunkFileNames: "[name].mjs",
        },

        {
          format: "cjs",
          exports: "named",
          sourcemap: false,
          entryFileNames: "index.js",
          chunkFileNames: "[name].js",
        },
      ],
    },
  },
})
