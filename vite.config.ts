import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  loadEnv(mode, process.cwd(), '')

  return {
    base: "./",
    plugins: [react(),],
    envPrefix: "REACT_APP_",
    resolve: {
      alias: {
        '@': '/src',
        '~bootstrap': '/node_modules/bootstrap',
      }
    },
    define: {
      'process.env': {}
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: [".cloudstudio.work", ".cloudstudio.club", ".github.app"]
    }
  }
})
