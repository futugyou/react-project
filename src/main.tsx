import React, { Suspense, lazy } from 'react';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./Layout";
import Spinner from 'react-bootstrap/Spinner';
import { qaloader } from './OpenAI/Components/DefaultQA';

const App = lazy(() => import('./App'))
const Game = lazy(() => import('./00.Tutorial/Game'))
const QA = lazy(() => import('./OpenAI/Components/DefaultQA'))
const NameForm = lazy(() => import('./09.Forms/NameForm'))
const Calculator = lazy(() => import('./10.LiftingStateUp/Calculator'))
const WelcomeDialog = lazy(() => import('./11.Compose/WelcomeDialog'))
const SplitPaneApp = lazy(() => import('./11.Compose/SplitPane'))
const ErrorPage = lazy(() => import('./ErrorPage'))
const Bailout = lazy(() => import('./MiniReactHook/bailout').then(module => ({ default: module.Bailout })))
const WithoutBailout = lazy(() => import('./MiniReactHook/bailout').then(module => ({ default: module.WithoutBailout })))

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />} errorElement={<ErrorPage />}    >
//       <Route errorElement={<ErrorPage />}>
//         <Route index element={<App />} />
//         <Route path="app" element={<App />} />
//         <Route path="game" element={<Game />} />
//         <Route path="default-qa" element={<QA />} loader={qaloader} />
//         <Route path="from" element={<NameForm />} />
//         <Route path="calculator" element={<Calculator />} />
//         <Route path="dialog" element={<WelcomeDialog />} />
//         <Route path="split" element={<SplitPaneApp />} />
//         <Route path="bailout" element={<Bailout />} />
//         <Route path="withoutbailout" element={<WithoutBailout />} />
//       </Route>
//     </Route>
//   )
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
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
        loader: qaloader,
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

