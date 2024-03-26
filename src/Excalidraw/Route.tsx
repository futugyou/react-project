
import { lazy } from 'react'
import { RouteDescription } from '@/RouteDescription'

const ExcalidrawPage = lazy(() => import('./App'))

export const ExcalidrawRoute: RouteDescription[] = [{
    display: "",
    path: "",
    element: <ExcalidrawPage />,
    show: () => false,
}, {
    path: "excalidraw",
    display: "Excalidraw",
    element: <ExcalidrawPage />,
}]