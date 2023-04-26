import './header.css'

import React from "react";
import { Outlet, NavLink, useNavigation, useLocation } from "react-router-dom";

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
            </div >
        </div>
    )
}

export default React.memo(Header)