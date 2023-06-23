import { Outlet } from "react-router-dom"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Header from "./Header"

const Layout = () => {
    return (
        <>
            <Row className="header">
                <Col>
                    <Header></Header>
                </Col>
            </Row>
            <Row className="route-out-container">
                <Outlet />
            </Row>
        </>
    )
}

export default Layout