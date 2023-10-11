
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
const CytoscapePanel = lazy(() => import('./CytoscapePanel'))

let childern: RouteObject[] = [
    {
        index: true,
        element: <CytoscapePanel />,
    }]


export const CytoscapeRoute: RouteObject = {
    path: "/cytoscape",
    element: <CytoscapePanel />,
    // children: childern,
}