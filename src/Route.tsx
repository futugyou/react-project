import { lazy } from 'react'
import { createBrowserRouter, RouteObject, Navigate } from 'react-router-dom'
import Layout from "@/Layout/Layout"

import { DemoRoute } from '@/ReactDemo/DemoRoute'
import { FlowRoute } from '@/Flow/FlowRoute'
import { OpenAIRoute } from '@/OpenAI/OpenAIRoute'
import { MicroAppRoute } from '@/MicroApp/MicroAppRoute'
import { BoardRoute } from '@/Whiteboards/Route'
import { ExcalidrawRoute } from '@/Excalidraw/Route'
import { TldrawRoute } from '@/Tldraw/Route'
import { RouteDescription, ToRouteObject } from './RouteDescription'

const WelcomePage = lazy(() => import('@/Layout/WelcomePage'))
const ErrorPage = lazy(() => import('@/Common/ErrorPage'))

export const WhiteRoute: RouteDescription = {
    display: "Boards",
    path: "/w",
    checkActive: (path: string) => path.startsWith('/w'),
    children: [
        BoardRoute,
        ExcalidrawRoute,
        ...TldrawRoute,
    ]
}

export const TotalRouteDescriptions: RouteDescription[] = [
    WhiteRoute,
    DemoRoute,
]

const childrenRoute: RouteObject[] = [
    {
        index: true,
        element: <WelcomePage />,
    },
    FlowRoute,
    ...TotalRouteDescriptions.map(p => ToRouteObject(p)),
    ...MicroAppRoute,
    ...OpenAIRoute,
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: childrenRoute,
    },
])

export { router }