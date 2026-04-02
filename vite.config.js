import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-htaccess',
      closeBundle() {
        fs.copyFileSync(
          path.resolve(__dirname, 'public/.htaccess'),
          path.resolve(__dirname, 'dist/.htaccess')
        )
      }
    }
  ],
  build: {
    target: 'es2020',
    cssMinify: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
      },
      format: {
        comments: false,
      },
    },
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }
          if (id.includes('node_modules/@iconify')) {
            return 'icons';
          }
          if (id.includes('node_modules/react-helmet-async')) {
            return 'seo';
          }
        }
      }
    }
  },
  oxc: {
    legalComments: 'none'
  }
})
