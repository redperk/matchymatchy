import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/matchymatchy/",
  plugins: [react()],
  server: {
    host: true,
  },
});
