import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      // Uncomment to proxy API in dev instead of CORS:
      // '/api': { target: 'http://localhost:8000', changeOrigin: true }
    }
  }
})
