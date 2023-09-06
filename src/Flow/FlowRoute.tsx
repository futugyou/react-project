
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const FlowPanel = lazy(() => import('./FlowPanel'))
const DI = lazy(() => import('./Dotnet/DependencyInjection/Flow'))
const File = lazy(() => import('./Dotnet/FileSystem/Flow'))
const Configuration = lazy(() => import('./Dotnet/Configuration/Flow'))
const Options = lazy(() => import('./Dotnet/Options/Flow'))
const TraceSource = lazy(() => import('./Dotnet/TraceSource/Flow'))
const EventSource = lazy(() => import('./Dotnet/EventSource/Flow'))

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
        {
            path: "dotnet/option",
            element: <Options />,
        },
        {
            path: "dotnet/trace",
            element: <TraceSource />,
        },
        {
            path: "dotnet/event",
            element: <EventSource />,
        },
    ]
}