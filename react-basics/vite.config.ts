import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// GitHub Pages servește proiectul la https://<user>.github.io/<repo>/, nu la rădăcina domeniului.
// De aceea build-ul (și `npm run preview`, care servește build-ul) are nevoie de numele repo-ului ca bază;
// `npm run dev` rămâne pe `/`.
const PAGES_BASE = "/react-basics-tutorial/";

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  base: command === "build" || isPreview ? PAGES_BASE : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
}));
