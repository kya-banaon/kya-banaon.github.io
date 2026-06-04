import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'sitemap.xml', 'images/*.png'],
      manifest: {
        name: 'Kya Banaon',
        short_name: 'KyaBanaon',
        description: 'Never ask Kya Banaon again. The Ultimate Indian Meal Planner.',
        theme_color: '#E65100',
        background_color: '#F4EFE8',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,ico,json}']
      }
    })
  ],
  base: '/',
})
