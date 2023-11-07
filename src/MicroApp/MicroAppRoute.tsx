
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const VueProject = lazy(() => import('./VueProject'))

export const MicroAppRoute: RouteObject = {
    path: "/aws",
    element: <VueProject />
}