import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: true,
    },
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['@mui/material/utils'],
    }
  },
  // Important for Vercel deployment
  base: './',
  // Add this for better chunking
  optimizeDeps: {
    include: ['@mui/icons-material']
  }
});
