import React, { Suspense } from 'react'
import { Outlet } from "react-router-dom"

import { Box } from '@cloudscape-design/components'

import Loading from '@/Common/Components/Loading'
import Observability from '@/Common/Components/Observability'

import { TotalRouteDescriptions } from '@/Common/Route/RouteDescription'
import { User } from "@/User/User"
import HeaderMenu from './HeaderMenu'

const Layout = () => {
    return (
        <>
            <HeaderMenu Routes={TotalRouteDescriptions}></HeaderMenu>
            <Box data-style="route-out-container">
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </Box>
            <Observability />
        </>
    )
}

export default Layout