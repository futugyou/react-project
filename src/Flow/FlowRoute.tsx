
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const FlowPanel = lazy(() => import('./FlowPanel'))
const DI = lazy(() => import('./Dotnet/DependencyInjection/DI'))

export const FlowRoute: RouteObject = {
    path: "/flow",
    element: <FlowPanel />,
    children: [
        {
            index: true,
            element: <DI />,
        },
        {
            path: "dotnet/di",
            element: <DI />,
        },
    ]
}