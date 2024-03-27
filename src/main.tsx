import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// import 'bootstrap'
import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import microApp from '@micro-zoe/micro-app'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import Loading from '@/Common/Components/Loading'
import { ComponentProvider } from '@/Common/Components/ComponentProvider'
import { AuthProvider, authService } from '@/Auth/index'

import { router } from '@/Route'


microApp.start({
  'keep-alive': true,
  plugins: {
    modules: {
      'appname-react17': [{
        loader(code) {
          if (process.env.NODE_ENV === 'development' && code.indexOf('sockjs-node') > -1) {
            code = code.replace('window.location.port', '4005')
          }
          return code
        }
      }],
    }
  }
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchInterval: 60000, // ms
      refetchOnWindowFocus: false,
      retry: 1,
      gcTime: Infinity,
      staleTime: 1000 * 60 * 60 * 1, // 1 hours
    },
  },
})

const localStoragePersister = createSyncStoragePersister({ storage: window.localStorage })

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
})

ReactDOM.createRoot(document.getElementById('openai-web-root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <AuthProvider authService={authService} >
          <ComponentProvider >
            <RouterProvider router={router} />
            <Analytics></Analytics>
            <SpeedInsights></SpeedInsights>
          </ComponentProvider>
        </AuthProvider>
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>,
)
