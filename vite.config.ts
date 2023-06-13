import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(process.env.NODE_ENV)

  return {
    plugins: [react(),],
    envPrefix: "REACT_APP_",
    server: {
      cors: {
        origin: true,
        methods: ["GET", "OPTIONS", "PATCH", "DELETE", "POST", "PUT"],
        allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "Authorization", "Access-Control-Allow-Headers", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "x-requested-with"],
        exposedHeaders: ["Access-Control-Allow-Origin", "Origin", "Authorization", "Access-Control-Allow-Headers", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "x-requested-with"],
        credentials: true
      }
    }
  }
})
