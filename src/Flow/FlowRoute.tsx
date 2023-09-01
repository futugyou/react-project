
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const FlowPanel = lazy(() => import('./FlowPanel'))
const DI = lazy(() => import('./Dotnet/DependencyInjection/DI'))
const File = lazy(() => import('./Dotnet/FileSystem/File'))
const Configuration = lazy(() => import('./Dotnet/Configuration/Flow'))

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
        {
            path: "dotnet/file",
            element: <File />,
        },
        {
            path: "dotnet/conf",
            element: <Configuration />,
        },
    ]
}