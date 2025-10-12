import React, { Suspense } from 'react'
import { Outlet } from "react-router-dom"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Header from "./Header"
import Loading from '@/Common/Components/Loading'
import Observability from '@/Common/Components/Observability'

import { TotalRouteDescriptions } from '@/RouteDescription'
import { User } from "@/User/User"
import HeaderMenu from './HeaderMenu'
const Layout = () => {
    return (
        <>
            <HeaderMenu Routes={TotalRouteDescriptions}></HeaderMenu>
            <Row className="route-out-container">
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </Row>
            <Observability />
        </>
    )
}

export default Layout