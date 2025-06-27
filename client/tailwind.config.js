// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* your existing custom colors */
        background: '#F9FAFB', // for bg-background
        border:     '#E5E7EB', // for border-border

        /* ADD THIS: your “foreground” (main text) color */
        foreground: '#111827',  // or whatever hex you prefer

        /* and any other semantic names you use: */
        charcoal: '#333333',
        primary:  '#1E40AF',
        accent:   '#F97316',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // …other plugins
  ],
}
