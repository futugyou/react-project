
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const BoardPage = lazy(() => import('./App'))

export const BoardRoute: RouteObject = {
    path: "/whiteboards",
    element: <BoardPage />,
}