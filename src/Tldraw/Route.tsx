
import { lazy } from 'react'
import { RouteDescription } from '@/RouteDescription'

const TldrawPage = lazy(() => import('./App'))
const MiniTldrawPage = lazy(() => import('./MiniApp'))

export const TldrawRoute: RouteDescription[] = [{
    path: "tldraw",
    display: "Tldraw",
    element: <TldrawPage />,
}, {
    path: "minitldraw",
    show: () => process.env.NODE_ENV == "development",
    display: "MiniTldraw",
    element: <MiniTldrawPage />,
}]
