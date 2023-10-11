import { lazy } from 'react'
import { createBrowserRouter, RouteObject, Navigate } from 'react-router-dom'
import Layout from "@/Layout/Layout"

import { DemoRoute } from '@/ReactDemo/DemoRoute'
import { FlowRoute } from '@/Flow/FlowRoute'
import { OpenAIRoute } from '@/OpenAI/OpenAIRoute'
import { MicroAppRoute } from '@/MicroApp/MicroAppRoute'
import { CytoscapeRoute } from '@/CytoscapeGraph/CytoscapeRoute'

const WelcomePage = lazy(() => import('@/Layout/WelcomePage'))
const ErrorPage = lazy(() => import('@/Common/ErrorPage'))

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
        element: <WelcomePage />,
    },
    FlowRoute,
    DemoRoute,
    MicroAppRoute,
    CytoscapeRoute,
]

childrenRoute = childrenRoute.concat(OpenAIRoute)

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: childrenRoute,
    },
])

export { router }