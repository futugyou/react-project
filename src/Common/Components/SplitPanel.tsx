import "./SplitPanel.css"

import React from "react"

import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom"

import Popover from "@cloudscape-design/components/popover"
import { BsListUl } from "react-icons/bs"

import SideNavigation from '@/Common/Components/SideNavigation'

import { RouteDescription } from "@/RouteDescription"
import useMediaQuery from "@/Common/Hooks/useMediaQuery"

export interface ISplitPanelProps {
    Route: RouteDescription[]
    Prefix?: string
}

const SplitPanel = (props: ISplitPanelProps) => {
    const isSmallDevice = useMediaQuery("(max-width : 768px)")

    const [show, setShow] = useState(false)

    useEffect(() => {
        if (isSmallDevice) {
            setShow(false)
        } else {
            setShow(true)
        }
    }, [isSmallDevice])

    let popover = show ? "hide the menu" : "open the menu"
    const HandleShowIconClick = (e: any) => {
        setShow(s => !s)
    }

    return (
        <>
            <div className='sidebar-menu-icon' style={{ color: '#10a37f' }} onClick={HandleShowIconClick}>
                <Popover
                    dismissButton={false}
                    content={
                        <>{popover}</>
                    }
                    position="right"
                    triggerType="hover"
                    size="small"
                >
                    <BsListUl />
                </Popover >
            </div>
            <div className="split-panel-container">
                {show && (
                    <div className="left-menu" >
                        <SideNavigation Routes={props.Route} Prefix={props.Prefix}></SideNavigation>
                    </div>
                )}
                <div className="right-content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default React.memo(SplitPanel)