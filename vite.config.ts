import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/pulipuli/",
  publicDir: "static",
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.tsx",
    },
  },
});
