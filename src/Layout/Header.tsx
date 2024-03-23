import './Header.css'

import React    from "react" 
import { TotalRouteDescriptions } from '@/Route'
import { User } from "@/User/User"

import HeaderNav from './HeaderNav'

const Header = (props: any) => {
    return (
        <div className='header-container'>
            <div className="header-nav">
                <HeaderNav Routes={TotalRouteDescriptions}></HeaderNav>
            </div>
            <div className="header-user">
                <User></User>
            </div>
        </div >
    )
}

export default React.memo(Header)
