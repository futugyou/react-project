import "./DemoPanel.css"

import React from "react"

import { useState, useEffect } from 'react'
import { Outlet, useLocation } from "react-router-dom"

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { BsListUl } from "react-icons/bs"

import SideNavigation from '@/Common/SideNavigation'

import { TotalRouteDescriptions } from '@/Route'

const DemoPanel = (props: any) => {
    const [show, setShow] = useState(true)
    const location = useLocation()

    useEffect(() => {
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

    const items = TotalRouteDescriptions.filter(p => p.archived)

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
                        <SideNavigation Routes={items}></SideNavigation>
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