import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigation, useLocation } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { BsListUl } from "react-icons/bs";

import Header from "./Header";

function Layout() {
    const navigation = useNavigation();
    const location = useLocation();
    useEffect(() => {
        const pathname = location.pathname;
        console.log(pathname)
        setShow(false)
    }, [location]);

    const [show, setShow] = useState(false);

    let popover = show ? "hide the menu" : "open the menu";
    const HandleShowIconClick = (e: any) => {
        setShow(s => !s)
    }

    const showPopover = (
        <Popover id="stop-popover">
            <Popover.Body style={{ color: '#10a37f' }}>
                {popover}
            </Popover.Body>
        </Popover>
    );
    return (
        <>
            <OverlayTrigger placement="right" overlay={showPopover}>
                <div className='sidebar-menu-icon' onClick={HandleShowIconClick}>
                    <BsListUl />
                </div>
            </OverlayTrigger>
            <Row className="header">
                <Col>
                    <Header></Header>
                </Col>
            </Row>
            <Row className="route-out-container">
                {show && (
                    <Col xs={2}>
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <NavLink to={`app`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >App</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`playground`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >OpenAI Playground</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`game`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Game</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`from`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >NameForm</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`calculator`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Calculator</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`dialog`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >WelcomeDialog</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`split`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >SplitPaneApp</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`bailout`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Bailout</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={`withbailout`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >WithoutBailout</NavLink>
                            </li>
                        </ul>
                    </Col>
                )}
                <Col xs={show ? 10 : 12} className="route-out-container">
                    <Row className="route-out-container" >
                        <Outlet />
                    </Row>
                </Col>
            </Row>
        </>
    );
}
export default Layout