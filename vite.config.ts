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
    rollupOptions: {
      external: ['@mui/material/utils'],
    }
  },
  optimizeDeps: {
    // Remove the dependencies that aren't installed
    include: ['@mui/icons-material'] // Only include what you actually have
  }
});
