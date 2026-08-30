import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Mirrors the vercel.json rewrites, which only apply on real Vercel
    // infra (production or `vercel dev`) — plain `vite dev` never reads
    // that file, so /platform needs its own proxy rule locally.
    proxy: {
      '/platform': {
        target: 'https://platform-pi-eight-48.vercel.app',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/platform/, '') || '/',
      },
    },
  },
})