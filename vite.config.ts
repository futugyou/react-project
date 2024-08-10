import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  loadEnv(mode, process.cwd(), '')

  return {
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
  }
})
