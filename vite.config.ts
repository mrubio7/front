import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'

import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})