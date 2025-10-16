

import { lazy } from 'react'
import { Outlet } from "react-router-dom"

import { RouteDescription } from '@/Common/Route/RouteDescription'

const Pusher = lazy(() => import('./App'))

export const PusherRoute: RouteDescription = {
    path: "pusher",
    display: "Pusher",
    element: <Pusher />,
}
