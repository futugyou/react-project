
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import { playgroundLoader } from './Components/PlaygroundLoader'
import { examplesLoader } from './Components/ExamplesLoader'
import GuardedRoute from '../GuardedRoute'

const Playground = lazy(() => import('./Components/Playground'))
const Examples = lazy(() => import('./Components/Examples'))

export const OpenAIRoute: RouteObject[] = [
    {
        path: "/playground",
        element: <GuardedRoute><Playground /></GuardedRoute>,
        loader: playgroundLoader,
        shouldRevalidate: () => false,
    },
    {
        path: "playground/p/:parameter",
        element: <GuardedRoute><Playground /></GuardedRoute>,
        loader: playgroundLoader,
        shouldRevalidate: () => false,
    },
    {
        path: "/examples",
        element: <GuardedRoute><Examples /></GuardedRoute>,
        loader: examplesLoader,
        shouldRevalidate: () => false,
    },
]