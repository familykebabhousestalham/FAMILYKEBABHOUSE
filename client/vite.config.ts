// client/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Capacitor sets CAPACITOR_PLATFORM in its build env; keep native builds relative.
const isNative = !!process.env.CAPACITOR_PLATFORM

export default defineConfig({
  // Always serve assets relative to the current HTML file
  base: './',

  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')({
          overrideBrowserslist: [
            '> 1%',
            'last 2 versions',
            'Edge >= 79',
            'Safari >= 10'
          ]
        })
      ],
    },
  },
})
