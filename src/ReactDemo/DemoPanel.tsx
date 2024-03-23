import "./DemoPanel.css"

import React from "react"

import { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from "react-router-dom"

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { BsListUl } from "react-icons/bs"

import { DemoRoute } from '@/ReactDemo/DemoRoute'

const DemoPanel = (props: any) => {
    const [show, setShow] = useState(true)
    const location = useLocation()
    useEffect(() => {
        const pathname = location.pathname
        console.log(pathname)
        setShow(true)
    }, [location])

    let popover = show ? "hide the menu" : "open the menu"
    const HandleShowIconClick = (e: any) => {
        setShow(s => !s)
    }

    const showPopover = (
        <Popover id="stop-popover">
            <Popover.Body style={{ color: '#10a37f' }}>
                {popover}
            </Popover.Body>
        </Popover>
    )

    const liList = DemoRoute.children?.filter(p => p.path)
        .filter(p => p.show && p.show() || !p.show).map(p => {
            let href = DemoRoute.path + "/" + p.path
            let display = p.display
            if (!display) {
                display = p.path
            }

            return (
                <li className="nav-item" key={href}>
                    <NavLink key={href} to={href} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >{display}</NavLink>
                </li>
            )
        })

    return (
        <>
            <OverlayTrigger placement="right" overlay={showPopover}>
                <div className='sidebar-menu-icon' onClick={HandleShowIconClick}>
                    <BsListUl />
                </div>
            </OverlayTrigger>
            <div className="react-demo-container">
                {show && (
                    <div className="left-menu" >
                        <ul className="nav nav-pills flex-column mb-auto">
                            {liList}
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