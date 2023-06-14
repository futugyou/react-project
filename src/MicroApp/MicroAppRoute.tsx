
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const VueDemo = lazy(() => import('./VueDemo'))

export const MicroAppRoute: RouteObject = {
    path: "/aws",
    element: <VueDemo />
}