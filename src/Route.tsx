import { lazy } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Layout from "./Layout"

import { DemoRoute } from './ReactDemo/DemoRoute'
import { OpenAIRoute } from './OpenAI/OpenAIRoute'
import { MicroAppRoute } from './MicroApp/MicroAppRoute'

const DI = lazy(() => import('./Flow/Dotnet/DI'))
const ErrorPage = lazy(() => import('./ErrorPage'))

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
        element: <DI />,
    },
    DemoRoute
]

childrenRoute = childrenRoute.concat(OpenAIRoute).concat(MicroAppRoute)

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: childrenRoute,
    },
])

export { router }