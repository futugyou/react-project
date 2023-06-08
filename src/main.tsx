import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Spinner from 'react-bootstrap/Spinner'

import { AuthProvider } from 'react-oauth2-pkce'
import authService from "./Auth"

import { router } from './Route'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Spinner animation="border" variant="dark" />}>
      <AuthProvider authService={authService} >
        <RouterProvider router={router} />
      </AuthProvider>
    </Suspense>
  </React.StrictMode>,
)

