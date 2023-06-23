import "./DemoPanel.css"

import React from "react"

import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from "react-router-dom";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { BsListUl } from "react-icons/bs";

const DemoPanel = (props: any) => {
    const [show, setShow] = useState(true);
    const location = useLocation();
    useEffect(() => {
        const pathname = location.pathname;
        console.log(pathname)
        setShow(true)
    }, [location]);

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
            <div className="react-demo-container">
                {show && (
                    <div className="left-mune" >
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <NavLink to="/demo/app" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >App</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/demo/game" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Game</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/demo/from" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >NameForm</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/demo/calculator" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Calculator</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/demo/dialog" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >WelcomeDialog</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/demo/split" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >SplitPaneApp</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/demo/bailout" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Bailout</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/demo/withbailout" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >WithoutBailout</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
                <div className="right-content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default React.memo(DemoPanel)