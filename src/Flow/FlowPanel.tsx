import './FlowPanel.css'

import React, { useState } from "react"
import { Outlet, NavLink } from "react-router-dom"

import { FlowRouteDataList } from './FlowRouteData'
import _ from 'lodash-es'

const FlowPanel = (props: any) => {
    const [showIndex, setShowIndex] = useState(0)

    const groups = _.mapValues(_.groupBy(FlowRouteDataList, 'group'),
        clist => clist.map(car => _.omit(car, 'group')))

    const groupedLinks = _.keys(groups).map((group, index) => {
        return (
            <div className='flow-panel-menu-group' key={group}>
                <div className='menu-group-name' onClick={() => onGroupClick(index)}>
                    {group}
                </div>
                {showIndex == index && (
                    <ul className="nav nav-pills flex-column mb-auto">
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
                )}
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
                <div className="flow-panel-content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default React.memo(FlowPanel)