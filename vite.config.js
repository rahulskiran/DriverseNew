import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',   // Bind to localhost only — prevents network exposure
    strictPort: true,    // Fail if port is already in use
  },
  // Strip console.log and debugger statements in production builds
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
})
