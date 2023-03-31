import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Spinner from 'react-bootstrap/Spinner';
import { router } from './Route';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Spinner animation="border" variant="dark" />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
)

