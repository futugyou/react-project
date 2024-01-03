
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const VueProject = lazy(() => import('./VueProject'))
const NextjsProject = lazy(() => import('./NextjsProject'))

export const MicroAppRoute: RouteObject[] = [{
    path: "/vue",
    element: <VueProject />
}, {
    path: "/nextjs",
    element: <NextjsProject />
}]