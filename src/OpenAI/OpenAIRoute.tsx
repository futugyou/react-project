
import { lazy } from 'react'

import { playgroundLoader } from './Components/PlaygroundLoader'
import { examplesLoader } from './Components/ExamplesLoader'
import GuardedRoute from '@/Common/GuardedRoute'
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
            index: true,
            element: <GuardedRoute><Examples /></GuardedRoute>,
            show: () => false,
        },
        {
            display: "Examples",
            path: "examples",
            element: <GuardedRoute><Examples /></GuardedRoute>,
            // loader: examplesLoader,
            shouldRevalidate: () => false,
        }, {
            display: "Playground",
            path: "playground",
            element: <GuardedRoute><Playground /></GuardedRoute>,
            loader: playgroundLoader,
            shouldRevalidate: () => false,
        },
        {
            display: "Playground",
            path: "playground/p/:parameter",
            element: <GuardedRoute><Playground /></GuardedRoute>,
            loader: playgroundLoader,
            shouldRevalidate: () => false,
            show: () => false,
        },
    ]
}