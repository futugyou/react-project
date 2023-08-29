import './FlowPanel.css'

import React from "react"
import { Outlet, NavLink } from "react-router-dom"

const FlowPanel = (props: any) => {
    return (
        <>
            <div className="flow-panel-container">
                <div className="flow-panel-mune" >
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/di" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >DI</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/file" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >File</NavLink>
                        </li>
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