import './FlowPanel.css'

import React from "react"
import { Outlet, NavLink } from "react-router-dom"

const FlowPanel = (props: any) => {
    return (
        <>
            <div className="flow-panel-container">
                <div className="flow-panel-menu" >
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/di" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >DI</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/file" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >File</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/conf" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Configuration</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/option" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Options</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/trace" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >TraceSource</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/event" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >EventSource</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/diagnostic" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Diagnostic</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/logger" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >ILogger</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/metrics" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Metrics</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/objectpool" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >ObjectPool</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/cache" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Cache</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/flow/dotnet/httpclient" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >HttpClient</NavLink>
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