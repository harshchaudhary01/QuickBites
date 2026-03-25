import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: true, // This exposes the server to your local network (0.0.0.0)
    port: 5173,
    watch: {
      usePolling: true, // Vital for Hot Module Replacement (HMR) to work on Windows
    },
  },
})