// client/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path  from 'path'

// Capacitor sets CAPACITOR_PLATFORM in its build env, so we can detect “native” builds
const isNative = !!process.env.CAPACITOR_PLATFORM

export default defineConfig({
  // ./ for packaged apps, your GH Pages path otherwise
  base: isNative ? './' : '/FAMILYKEBABHOUSE/',

  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  css: {
    postcss: {
      plugins: [
        // if you’re already using tailwind, keep it here
        require('tailwindcss'),

        // Autoprefixer will generate -webkit- & -ms- plus the standard property
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
