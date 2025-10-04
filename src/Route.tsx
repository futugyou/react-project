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

let baseUrl = import.meta.env.BASE_URL
if (window.__MICRO_APP_ENVIRONMENT__) {
    if (window.__MICRO_APP_BASE_ROUTE__) {
        baseUrl = window.__MICRO_APP_BASE_ROUTE__
    } else {
        baseUrl = "/react"
    }
}
console.log('the react app base url is:', baseUrl)
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: childrenRoute,
    },
],
    {
        basename: baseUrl
    }
)

export { router }