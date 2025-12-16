import path from "path"
import { fileURLToPath } from "url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// 1. Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Root domain for GitHub Pages user site
  resolve: {
    alias: {
      // 2. Correctly map "@" to the "src" folder
      "@": path.resolve(__dirname, "./src"),
    },
  },
})