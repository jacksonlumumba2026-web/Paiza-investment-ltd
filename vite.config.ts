import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Absolute URLs: the site has pages below the root (e.g. /kitchens/), served from paiza-investment.co.ke.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
