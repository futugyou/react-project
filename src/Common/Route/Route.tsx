import { lazy } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Layout from "@/Layout/Layout"

import { TotalRouteDescriptions, ToRouteObject } from '@/Common/Route/RouteDescription'

const WelcomePage = lazy(() => import('@/Layout/Welcome'))
const ErrorPage = lazy(() => import('@/Common/Components/ErrorPage'))

const childrenRoute: RouteObject[] = [
    {
        index: true,
        element: <WelcomePage />,
    },
    ...TotalRouteDescriptions.map(p => ToRouteObject(p)),
]

let baseUrl = import.meta.env.BASE_URL
if (window.__MICRO_APP_ENVIRONMENT__) {
    if (window.__MICRO_APP_BASE_ROUTE__) {
        baseUrl = window.__MICRO_APP_BASE_ROUTE__
    } else {
        baseUrl = "/react/"
    }
} else {
    const path = window.location.pathname;
    baseUrl = path.startsWith('/react') ? '/react/' : '/';
}
baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'
document.querySelector('#react-app-base')?.setAttribute('href', baseUrl);
console.log('href is:', window.location.href, 'base url is:', baseUrl)

if (baseUrl.startsWith('/react')) {
    const path = window.location.pathname;
    if (path === '/react') {
        window.history.replaceState(null, '', '/react/');
    }
}

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