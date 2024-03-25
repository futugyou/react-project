import './Header.css'

import React from "react"

import { TotalRouteDescriptions } from '@/RouteDescription'
import { User } from "@/User/User"
import HeaderMenu from './HeaderMenu'

const Header = (props: any) => {
    return (
        <div className='header-container'>
            <div className="header-nav">
                <HeaderMenu Routes={TotalRouteDescriptions}></HeaderMenu>
            </div>
            <User></User>
        </div >
    )
}

export default React.memo(Header)
