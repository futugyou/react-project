
import { lazy } from 'react'
import { RouteDescription } from '@/RouteDescription'

const BoardPage = lazy(() => import('./App'))

export const BoardRoute: RouteDescription = {
    path: "fluid",
    display: "Fluid",
    show: () => import.meta.env.MODE == "development",
    element: <BoardPage />,
}
