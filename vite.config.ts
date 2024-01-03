import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(process.env.NODE_ENV)
  
  return {
    plugins: [react(),],
    envPrefix: "REACT_APP_",
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      }
    },
    server: {
      cors: {
        origin: true,
        methods: ["GET", "OPTIONS", "PATCH", "DELETE", "POST", "PUT"],
        allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "Authorization", "Access-Control-Allow-Headers", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "x-requested-with"],
        exposedHeaders: ["Access-Control-Allow-Origin", "Origin", "Authorization", "Access-Control-Allow-Headers", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "x-requested-with"],
        credentials: true
      }
    },
    define: {
      'process.env': {}
    },
    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks(id) {
    //         if (id.includes('node_modules')) {
    //           return id.toString().split('node_modules/')[1].split('/')[0].toString()
    //         }
    //       }
    //     }
    //   }
    // }
  }
})
