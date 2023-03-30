import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./Layout";
import Spinner from 'react-bootstrap/Spinner';

const App = lazy(() => import('./App'))
const Game = lazy(() => import('./00.Tutorial/Game'))
const QA = lazy(() => import('./ChatGPT/Components/DefaultQA'))
const NameForm = lazy(() => import('./09.Forms/NameForm'))
const Calculator = lazy(() => import('./10.LiftingStateUp/Calculator'))
const WelcomeDialog = lazy(() => import('./11.Compose/WelcomeDialog'))
const SplitPaneApp = lazy(() => import('./11.Compose/SplitPane'))
const ErrorPage = lazy(() => import('./ErrorPage'))
const Bailout = lazy(() => import('./MiniReactHook/bailout').then(module => ({ default: module.Bailout })))
const WithoutBailout = lazy(() => import('./MiniReactHook/bailout').then(module => ({ default: module.WithoutBailout })))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/app",
        element: <App />,
      },
      {
        path: "/game",
        element: <Game />,
      },
      {
        path: "/default-qa",
        element: <QA />,
      },
      {
        path: "/from",
        element: <NameForm />,
      },
      {
        path: "/calculator",
        element: <Calculator />,
      },
      {
        path: "/dialog",
        element: <WelcomeDialog />,
      },
      {
        path: "/split",
        element: <SplitPaneApp />,
      },
      {
        path: "/bailout",
        element: <Bailout />,
      },
      {
        path: "/withbailout",
        element: <WithoutBailout />,
      },
    ],
  },

]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Spinner animation="border" variant="dark" />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
)

