import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import '@/Common/MicroApp/init'

import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/Common/ReactQuery/client'

import Loading from '@/Common/Components/Loading'
import { ComponentProvider } from '@/Common/Components/ComponentProvider'
import { AuthProvider, authService } from '@/Auth/index'

import { router } from '@/Route'

let root: ReactDOM.Root | null = null

function mount() {
  const container = document.getElementById('react-web-root') as HTMLElement
  if (!container) throw new Error('Root container not found')

  root = ReactDOM.createRoot(container)
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <AuthProvider authService={authService}>
            <ComponentProvider>
              <RouterProvider router={router} />
              <Analytics />
              <SpeedInsights />
            </ComponentProvider>
          </AuthProvider>
        </Suspense>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

function unmount() {
  if (root) {
    root.unmount()
    root = null
    console.log('sub app react unmount!')
  }
}

if (window.__MICRO_APP_ENVIRONMENT__) {
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
} else {
  mount()
}
