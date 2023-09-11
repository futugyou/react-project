import './FlowPanel.css'

import React, { useState, useEffect } from "react"
import { Outlet, NavLink } from "react-router-dom"
import _ from 'lodash-es'
import { useAnimate, ElementOrSelector } from "framer-motion"

import { FlowRouteDataList } from './FlowRouteData'

const FlowPanel = (props: any) => {
    const [showIndex, setShowIndex] = useState(0)
    const [scope, animate] = useAnimate()

    useEffect(() => {
        const menus = document.getElementsByClassName("nav nav-pills flex-column")
        if (menus.length <= 0) {
            return
        }

        const enterAnimation = () => {
            const current = menus[showIndex]

            animate(current,
                { opacity: 1, display: 'flex' }, { duration: 0.7 })

            for (let index = 0; index < menus.length; index++) {
                if (index == showIndex) {
                    continue
                }
                const element = menus[index]

                animate(element,
                    { opacity: 0, display: 'none' }, { duration: 0.7 })
            }
        }

        enterAnimation()
    }, [showIndex])

    const groups = _.mapValues(_.groupBy(FlowRouteDataList, 'group'),
        clist => clist.map(car => _.omit(car, 'group')))

    const groupedLinks = _.keys(groups).map((group, index) => {
        return (
            <div className='flow-panel-menu-group' key={group}>
                <div className='menu-group-name' onClick={() => onGroupClick(index)}>
                    {group}
                </div>
                {/* {showIndex == index && ( */}
                <ul className="nav nav-pills flex-column mb-auto" style={{ display: 'none' }}>
                    {
                        _.get(groups, group).map((a) => {
                            return (
                                <li className="nav-item" key={a.name}>
                                    <NavLink to={a.linkpath} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >{a.display}</NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
                {/* )} */}
            </div>
        )
    })

    const onGroupClick = (index: number) => {
        setShowIndex(index)
    }

    return (
        <>
            <div className="flow-panel-container">
                <div className="flow-panel-menu" >
                    {groupedLinks}
                </div>
                <div className="flow-panel-content" ref={scope}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default React.memo(FlowPanel)