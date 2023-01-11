import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react"],
      input: resolve(__dirname, "./packages/hooks/index.ts"),
      output: [
        {
          format: "es",
          exports: "named",
          dir: resolve(__dirname, "./packages/hooks/dist/esm"),
          preserveModules: false,
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
        },
      ],
    },
  },
})
