import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // svgr options
        icon: true,
        dimensions: false,
        expandProps: true,
        svgo: true,
        titleProp: true,
        ref: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    hmr: {
      overlay: false,
      protocol: 'ws',
      host: 'localhost',
      clientPort: 3000
    },
    fs: {
      strict: false,
      allow: ['..']
    },
    middlewareMode: false,
    allowedHosts: ['www.myjob.com', 'employer.myjob.com']
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
}) 