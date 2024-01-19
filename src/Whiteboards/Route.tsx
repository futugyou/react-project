
import { lazy } from 'react'
import { RouteDescription } from '@/RouteDescription'

const BoardPage = lazy(() => import('./App'))

export const BoardRoute: RouteDescription = {
    path: "fluid",
    display: "Fluid",
    show: () => process.env.NODE_ENV == "development",
    element: <BoardPage />,
}
