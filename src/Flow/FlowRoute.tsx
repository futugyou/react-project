
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { FlowRouteDataList } from './FlowRouteData'

const FlowPanel = lazy(() => import('./FlowPanel'))
const DI = lazy(() => import('./Dotnet/DependencyInjection/Flow'))

let childern: RouteObject[] = [
    {
        index: true,
        element: <DI />,
    }]

childern = childern.concat(FlowRouteDataList.map(p => {
    return {
        path: p.path,
        element: <p.element />,
    }
}))

export const FlowRoute: RouteObject = {
    path: "/flow",
    element: <FlowPanel />,
    children: childern,
}