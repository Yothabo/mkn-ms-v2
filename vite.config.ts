import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  cacheDir: '.vite_cache',
  server: {
    hmr: {
      overlay: true,
    },
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    force: false,
    entries: ['./src/main.tsx'],
  },
  esbuild: {
    jsx: 'automatic',
    legalComments: 'none',
    drop: ['console', 'debugger'],
  },
  preview: {
    port: 4173,
    host: true,
  },
});
