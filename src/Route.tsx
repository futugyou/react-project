import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from "./Layout"
import { qaloader } from './OpenAI/Components/Playground'

import { DemoRoute } from './ReactDemo/DemoRoute'

const App = lazy(() => import('./ReactDemo/00.Tutorial/App'))
const Playground = lazy(() => import('./OpenAI/Components/Playground'))
const Examples = lazy(() => import('./OpenAI/Components/Examples'))
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
                path: "/playground",
                element: <Playground />,
                loader: qaloader,
                shouldRevalidate: () => false,
            },
            {
                path: "playground/p/:parameter",
                element: <Playground />,
                loader: qaloader,
                shouldRevalidate: () => false,
            },
            {
                path: "/examples",
                element: <Examples />,
                shouldRevalidate: () => false,
            },
            DemoRoute
        ],
    },
])

export { router }