import { lazy } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Layout from "@/Layout/Layout"

import { TotalRouteDescriptions, ToRouteObject } from './RouteDescription'

const WelcomePage = lazy(() => import('@/Layout/Welcome'))
const Comment = lazy(() => import('@/Common/Components/Comment'))
const ErrorPage = lazy(() => import('@/Common/Components/ErrorPage'))

const childrenRoute: RouteObject[] = [
    {
        index: true,
        element: <WelcomePage />,
    },
    {
        path: "/gitalk",
        element: <Comment />,
    },
    ...TotalRouteDescriptions.map(p => ToRouteObject(p)),
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