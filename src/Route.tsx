import { lazy } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from "./Layout";
import { qaloader } from './OpenAI/Components/Playground';

const App = lazy(() => import('./00.Tutorial/App'))
const Game = lazy(() => import('./00.Tutorial/Game'))
const Playground = lazy(() => import('./OpenAI/Components/Playground'))
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
                path: "/playground",
                element: <Playground />,
                loader: qaloader,
            },
            {
                path: "/playground/p/:parameter",
                element: <Playground />,
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

export { router }