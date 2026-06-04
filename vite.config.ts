import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Kya Banaon',
        short_name: 'KyaBanaon',
        description: 'Meal Planner App',
        theme_color: '#1a1a1a',
        icons: [] // Needs actual icons later
      }
    })
  ],
  base: '/',
})
