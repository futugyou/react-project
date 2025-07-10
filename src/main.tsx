import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import '@/Common/MicroApp/init'

import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { QueryClientProvider, } from '@tanstack/react-query'
import { queryClient } from '@/Common/ReactQuery/client'

import Loading from '@/Common/Components/Loading'
import { ComponentProvider } from '@/Common/Components/ComponentProvider'
import { AuthProvider, authService } from '@/Auth/index'

import { router } from '@/Route'

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
