import './FlowPanel.css'

import React, { useState } from "react"
import { Outlet, NavLink } from "react-router-dom"

import { FlowRouteDataList } from './FlowRouteData'

const FlowPanel = (props: any) => {
    const [showIndex, setShowIndex] = useState(0)
    const links = FlowRouteDataList.map(a => {
        return (
            <li className="nav-item" key={a.name}>
                <NavLink to={a.linkpath} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >{a.display}</NavLink>
            </li>
        )
    })

    const onGroupClick = (index: number) => {
        setShowIndex(index)
    }

    return (
        <>
            <div className="flow-panel-container">
                <div className="flow-panel-menu" >
                    <div className='flow-panel-menu-group'>
                        <div className='menu-group-name' onClick={() => onGroupClick(0)}>
                            NetCore
                        </div>
                        {showIndex == 0 && (<ul className="nav nav-pills flex-column mb-auto">
                            {links}
                        </ul>)}
                    </div>
                    <div className='flow-panel-menu-group'>
                        <div className='menu-group-name' onClick={() => onGroupClick(1)} >
                            Fake
                        </div>
                    {showIndex == 1 && (<ul className="nav nav-pills flex-column mb-auto">
                        {links}
                    </ul>)}
                </div>
            </div>
            <div className="flow-panel-content">
                <Outlet />
            </div>
        </div>
        </>
    )
}

export default React.memo(FlowPanel)