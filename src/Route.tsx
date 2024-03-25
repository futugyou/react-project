import { lazy } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Layout from "@/Layout/Layout"

import { FlowRoute } from '@/Flow/FlowRoute'
import { MicroAppRoute } from '@/MicroApp/MicroAppRoute'
import { TotalRouteDescriptions, ToRouteObject } from './RouteDescription'

const WelcomePage = lazy(() => import('@/Layout/Welcome'))
const Comment = lazy(() => import('@/Common/Comment'))
const ErrorPage = lazy(() => import('@/Common/ErrorPage'))

const childrenRoute: RouteObject[] = [
    {
        index: true,
        element: <WelcomePage />,
    },
    {
        path: "/gitalk",
        element: <Comment />,
    },
    // FlowRoute,
    ...TotalRouteDescriptions.map(p => ToRouteObject(p)),
    ...MicroAppRoute,
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