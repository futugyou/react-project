
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
const CytoscapePanel = lazy(() => import('@/CytoscapeGraph/CytoscapePanel'))

export const CytoscapeRoute: RouteObject = {
    path: "/cytoscape",
    element: <CytoscapePanel />,
}