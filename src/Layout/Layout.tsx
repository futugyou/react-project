import React, { Suspense } from 'react'
import { Outlet } from "react-router-dom"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Header from "./Header"
import Loading from '@/Common/Components/Loading'

const Layout = () => {
    return (
        <>
            <Row className="header">
                <Col>
                    <Header></Header>
                </Col>
            </Row>
            <Row className="route-out-container">
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </Row>
        </>
    )
}

export default Layout