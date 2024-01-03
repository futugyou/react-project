
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const ExcalidrawPage = lazy(() => import('./App'))

export const ExcalidrawRoute: RouteObject = {
    path: "/excalidraw",
    element: <ExcalidrawPage />,
}
