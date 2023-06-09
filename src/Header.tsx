import './Header.css'

import React from "react"
import { NavLink } from "react-router-dom"

import { User } from "./User";

function Header(props: any) {
    return (
        <div className='header-container'>
            <div className="header-nav">
                <div>
                    <NavLink to="/">Home</NavLink>
                </div>
                <div>
                    <NavLink to="/examples">Examples</NavLink>
                </div>
                <div>
                    <NavLink to="/playground">Playground</NavLink>
                </div>
                <div className="header-dropdown-container" >
                    <a className="dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">React Demo</a>
                    <ul className="dropdown-menu" >
                        <li>
                            <NavLink to="/demo/app" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >App</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/game" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Game</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/from" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >NameForm</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/calculator" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Calculator</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/dialog" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >WelcomeDialog</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/split" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >SplitPaneApp</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/bailout" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Bailout</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/withbailout" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >WithoutBailout</NavLink>
                        </li>
                    </ul>
                </div>
            </div >
            <div className="header-user">
                <User></User>
            </div>
        </div >
    )
}

export default React.memo(Header)
