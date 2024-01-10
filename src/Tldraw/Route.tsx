
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const TldrawPage = lazy(() => import('./App'))
const MiniTldrawPage = lazy(() => import('./MiniApp'))

export const TldrawRoute: RouteObject[] = [{
    path: "/tldraw",
    element: <TldrawPage />,
}, {
    path: "/minitldraw",
    element: <MiniTldrawPage />,
}]
