import "./Layout.css"

import React, { useState, useEffect, Suspense } from 'react'
import { Outlet } from "react-router-dom"
import { GrSettingsOption } from "react-icons/gr"

import Box from '@cloudscape-design/components/box'
import Grid from "@cloudscape-design/components/grid"

import SideNavigation from '@/Common/Components/SideNavigation'
import Loading from '@/Common/Components/Loading'
import Observability from '@/Common/Components/Observability'
import useMediaQuery from "@/Common/Hooks/useMediaQuery"

import { TotalRouteDescriptions, RouteDescription } from '@/Common/Route/RouteDescription'
import HeaderMenu from './HeaderMenu'

const Layout = () => {
    const insub = window.__MICRO_APP_ENVIRONMENT__

    const normalRoutes: RouteDescription[] = [
        ...TotalRouteDescriptions.filter((p) => (p.show && p.show()) || !p.show)
    ]

    const isSmallDevice = useMediaQuery("(max-width : 768px)")
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (isSmallDevice) {
            setShow(false)
        } else {
            setShow(true)
        }
    }, [isSmallDevice])

    const HandleShowIconClick = (e: any) => {
        setShow(s => !s)
    }

    if (insub) {
        return (
            <>
                <div className='sidebar-menu-icon' onClick={HandleShowIconClick}>
                    <GrSettingsOption />
                </div>
                <div className="split-panel-container">
                    {show && (
                        <div className="left-menu" >
                            <SideNavigation Routes={normalRoutes}  ></SideNavigation>
                        </div>
                    )}
                    <div className="right-content">
                        <Box data-style="route-out-container">
                            <Suspense fallback={<Loading />}>
                                <Outlet />
                            </Suspense>
                        </Box>
                        <Observability />
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <HeaderMenu Routes={normalRoutes}></HeaderMenu>
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