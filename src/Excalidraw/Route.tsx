
import { lazy } from 'react'
import { RouteDescription } from '@/RouteDescription'

const ExcalidrawPage = lazy(() => import('./App'))

export const ExcalidrawRoute: RouteDescription = {
    path: "excalidraw",
    display: "Excalidraw",
    element: <ExcalidrawPage />,
}
