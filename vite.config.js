import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Project_Weather-APP/", // ⬅️ WAJIB
  plugins: [tailwindcss(), react()],
});