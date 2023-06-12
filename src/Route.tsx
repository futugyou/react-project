import { lazy } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Layout from "./Layout"

import { DemoRoute } from './ReactDemo/DemoRoute'
import { OpenAIRoute } from './OpenAI/OpenAIRoute'

const App = lazy(() => import('./ReactDemo/00.Tutorial/App'))
const ErrorPage = lazy(() => import('./ErrorPage'))

declare global {
    interface Window {
        microApp: any
        __MICRO_APP_NAME__: string
        __MICRO_APP_ENVIRONMENT__: string
        __MICRO_APP_BASE_ROUTE__: string
    }
}

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

let childrenRoute: RouteObject[] = [
    {
        index: true,
        element: <App />,
    },
    DemoRoute
]

childrenRoute = childrenRoute.concat(OpenAIRoute)

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: childrenRoute,
    },
],
    {
        basename: window.__MICRO_APP_BASE_ROUTE__ || '/',
    })

export { router }