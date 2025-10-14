
import { lazy } from 'react'
import { RouteDescription } from '@/RouteDescription'

const TldrawPage = lazy(() => import('./App'))

export const TldrawRoute: RouteDescription[] = [{
    path: "tldraw",
    display: "Tldraw",
    show: () => import.meta.env.MODE == "development",
    element: <TldrawPage />,
}]
