
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import { qaloader } from './Components/Playground'

const Playground = lazy(() => import('./Components/Playground'))
const Examples = lazy(() => import('./Components/Examples'))

export const OpenAIRoute: RouteObject[] = [
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
]