import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: `/${process.env.GITHUB_REPOSITORY?.split("/")[1] || "val-doise-a-la-loupe"}/`,
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
  build: {
    outDir: "dist-github",
    emptyOutDir: true,
  },
});
