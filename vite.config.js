import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ Correct for username.github.io repo
  server: {
    host: true,
    strictPort: true,
    port: 3000
  },
  define: {
    global: 'window',
  }
})