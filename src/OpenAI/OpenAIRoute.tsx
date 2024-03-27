
import { lazy } from 'react'

import GuardedRoute from '@/Common/Components/GuardedRoute'
import { RouteDescription } from '@/RouteDescription'

const Playground = lazy(() => import('./Components/Playground'))
const Examples = lazy(() => import('./Components/Examples'))

export const OpenAIRoute: RouteDescription = {
    display: "OpenAI",
    path: "/openai",
    checkActive: (path: string) => path.startsWith('/openai'),
    archived: true,
    children: [
        {
            display: "",
            path: "",
            element: <GuardedRoute><Examples /></GuardedRoute>,
            show: () => false,
        },
        {
            display: "Examples",
            path: "examples",
            element: <GuardedRoute><Examples /></GuardedRoute>,
        }, {
            display: "Playground",
            path: "playground",
            element: <GuardedRoute><Playground /></GuardedRoute>,
        },
        {
            display: "Playground",
            path: "playground/p/:parameter",
            element: <GuardedRoute><Playground /></GuardedRoute>,
            show: () => false,
        },
    ]
}