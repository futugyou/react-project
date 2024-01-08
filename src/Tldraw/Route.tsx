
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const TldrawPage = lazy(() => import('./App'))

export const TldrawRoute: RouteObject = {
    path: "/tldraw",
    element: <TldrawPage />,
}
