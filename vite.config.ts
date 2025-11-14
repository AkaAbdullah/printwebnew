import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-pages";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    Pages({
      extensions: ["tsx"],
    }),
    Layouts(),
  ],
});
