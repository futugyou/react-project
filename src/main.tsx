import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Loading from './Loading'

import { AuthProvider, authService } from './Auth/index'

import { router } from './Route'

import microApp from '@micro-zoe/micro-app'

microApp.start({
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


ReactDOM.createRoot(document.getElementById('openai-web-root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <AuthProvider authService={authService} >
        <RouterProvider router={router} />
      </AuthProvider>
    </Suspense>
  </React.StrictMode>,
)
