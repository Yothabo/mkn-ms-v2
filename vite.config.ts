import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    host: true,
    port: 5173
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-swipeable'],
          'lottie-vendor': ['@lottiefiles/dotlottie-react'],
          'icon-vendor': ['react-icons/io']
        }
      }
    }
  }
})
