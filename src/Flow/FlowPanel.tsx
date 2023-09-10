import './FlowPanel.css'

import React from "react"
import { Outlet, NavLink } from "react-router-dom"
import { FlowRouteDataList } from './FlowRouteData'

const FlowPanel = (props: any) => {
    const links = FlowRouteDataList.map(a => {
        return (
            <li className="nav-item" key={a.name}>
                <NavLink to={a.linkpath} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >{a.display}</NavLink>
            </li>
        )
    })
    return (
        <>
            <div className="flow-panel-container">
                <div className="flow-panel-menu" >
                    <ul className="nav nav-pills flex-column mb-auto">
                        {links}
                    </ul>
                </div>
                <div className="flow-panel-content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default React.memo(FlowPanel)