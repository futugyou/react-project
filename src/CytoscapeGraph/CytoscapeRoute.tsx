
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
const Demo = lazy(() => import('./Demo'))

let childern: RouteObject[] = [
    {
        index: true,
        element: <Demo />,
    }]


export const CytoscapeRoute: RouteObject = {
    path: "/cytoscape",
    element: <Demo />,
    // children: childern,
}