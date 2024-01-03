
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

let ExcalidrawPage
const DivEmpty = () => { return <div /> }
if (process.env.NODE_ENV == 'development') {
    ExcalidrawPage = lazy(() => import('./App'))
} else {
    ExcalidrawPage = DivEmpty
}

export const ExcalidrawRoute: RouteObject = {
    path: "/excalidraw",
    element: <ExcalidrawPage />,
}
