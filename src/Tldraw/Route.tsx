
import { lazy } from 'react'
import { RouteDescription } from '@/RouteDescription'

const TldrawPage = lazy(() => import('./App'))

export const TldrawRoute: RouteDescription[] = [{
    display: "",
    path: "",
    index: true,
    element: <TldrawPage />,
    show: () => false,
}, {
    path: "tldraw",
    display: "Tldraw",
    element: <TldrawPage />,
}]
