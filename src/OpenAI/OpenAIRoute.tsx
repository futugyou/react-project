
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import { playgroundLoader } from './Components/Playground'
import { examplesLoader } from './Components/Examples'

const Playground = lazy(() => import('./Components/Playground'))
const Examples = lazy(() => import('./Components/Examples'))

export const OpenAIRoute: RouteObject[] = [
    {
        path: "/playground",
        element: <Playground />,
        loader: playgroundLoader,
        shouldRevalidate: () => false,
    },
    {
        path: "playground/p/:parameter",
        element: <Playground />,
        loader: playgroundLoader,
        shouldRevalidate: () => false,
    },
    {
        path: "/examples",
        element: <Examples />,
        loader: examplesLoader,
        shouldRevalidate: () => false,
    },
]