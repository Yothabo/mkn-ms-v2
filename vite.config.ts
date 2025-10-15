import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: true, // Enable error overlay
    },
    port: 5173,
    host: true, // Expose to network for mobile testing
  },
});
