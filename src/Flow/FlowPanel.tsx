import './FlowPanel.css'

import React, { useState, useEffect } from "react"
import { Outlet, NavLink, useLocation } from "react-router-dom"
import _ from 'lodash-es'
import { useAnimate } from "framer-motion"

import { FlowRouteDataList } from './FlowRouteData'

const defaultPage = '/flow/demo'

const FlowPanel = (props: any) => {
    const [showIndex, setShowIndex] = useState(0)
    const [scope, animate] = useAnimate()
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(defaultPage)
    const refs = FlowRouteDataList.reduce((acc: any, value) => {
        acc[value.linkpath] = React.createRef();
        return acc;
    }, {});

    const groups = _.mapValues(_.groupBy(FlowRouteDataList, 'group'),
        clist => clist.map(car => _.omit(car, 'group')))
    const keys = _.keys(groups)

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

    useEffect(() => {
        let path = location.pathname
        if (path == '/flow') {
            path = '/flow/demo'
        }

        const i = keys.findIndex(k => k == FlowRouteDataList.find(p => p.linkpath == path)?.group)
        setShowIndex(i)
        setCurrentPage(path)
    }, [location])

    useEffect(() => {
        refs[currentPage].current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
    }, [currentPage])

    const checkMenuSelect = (path: string) => {
        if (currentPage == path) {
            return true
        }

        return false
    }

    const groupedLinks = _.keys(groups).map((group, index) => {
        return (
            <div className='flow-panel-menu-group' key={group}>
                <div className='menu-group-name' onClick={() => onGroupClick(index)}>
                    {group}
                </div>
                <ul className="nav nav-pills flex-column mb-auto" style={{ display: 'none' }}>
                    {
                        _.get(groups, group).map((a) => {
                            return (
                                <li ref={refs[a.linkpath]} className={checkMenuSelect(a.linkpath) ? 'nav-item flow-panel-menu-hover' : 'nav-item'} key={a.name} >
                                    <NavLink to={a.linkpath} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >{a.display}</NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
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