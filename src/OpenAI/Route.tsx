
import { lazy } from 'react'

import GuardedRoute from '@/Common/Components/GuardedRoute'
import { RouteDescription } from '@/Common/Route/RouteDescription'

const Playground = lazy(() => import('./Components/Playground'))
const Examples = lazy(() => import('./Components/Examples'))

export const OpenAIRoute: RouteDescription = {
    display: "OpenAI",
    path: "/openai",
    checkActive: (path: string) => path.startsWith('/openai'),
    children: [
        {
            display: "",
            path: "",
            element: <Examples />,
            show: () => false,
        },
        {
            display: "Examples",
            path: "examples",
            element: <Examples />,
        }, {
            display: "Playground",
            path: "playground",
            element: <Playground />,
        },
        {
            display: "Playground",
            path: "playground/p/:parameter",
            element: <Playground />,
            show: () => false,
        },
    ]
}