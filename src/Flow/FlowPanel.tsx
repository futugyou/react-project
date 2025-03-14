import './FlowPanel.css'

import React, { useState, useEffect } from "react"
import { Outlet, NavLink, useLocation } from "react-router-dom"
import { groupBy, omit, get, mapValues, keys as lodashKeys } from 'lodash-es'
import { useAnimate } from "framer-motion"
import { BsListUl } from "react-icons/bs"

import { FlowRouteDataList } from '@/Flow/FlowRouteData'

const defaultPage = '/flow/demo'

const FlowPanel = (props: any) => {
    const [showMenu, setShowMenu] = useState(false)
    const [showIndex, setShowIndex] = useState(0)
    const [scope, animate] = useAnimate()
    const [menuScope = scope, menuAnimate = animate] = useAnimate()
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(defaultPage)
    const refs = FlowRouteDataList.reduce((acc: any, value) => {
        acc[value.linkpath] = React.createRef();
        return acc;
    }, {});

    const groups = mapValues(groupBy(FlowRouteDataList, 'group'),
        clist => clist.map(car => omit(car, 'group')))
    const keys = lodashKeys(groups)

    useEffect(() => {
        const menus = document.getElementsByClassName("nav nav-pills flex-column")
        if (menus.length <= 0 || showIndex < 0 || showIndex > menus.length) {
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
        if (path == '/flow' || path == '/flow/') {
            path = '/flow/demo'
        }

        const i = keys.findIndex(k => k == FlowRouteDataList.find(p => p.linkpath == path)?.group)
        setShowIndex(i)
        setCurrentPage(path)
    }, [location])

    useEffect(() => {
        const menus = document.getElementsByClassName("flow-panel-menu")
        if (menus.length <= 0) {
            return
        }

        const enterAnimation = () => {
            const current = menus[0]
            if (showMenu) {
                menuAnimate(current, { opacity: 1, display: 'inline' }, { duration: 0.7 })
            } else {
                menuAnimate(current, { opacity: 0, display: 'none' }, { duration: 0.7 })
            }
        }

        enterAnimation()
    }, [showMenu])

    useEffect(() => {
        if (refs == undefined || currentPage == undefined || refs[currentPage] == undefined) {
            return
        }

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

    const groupedLinks = lodashKeys(groups).map((group, index) => {
        return (
            <div className='flow-panel-menu-group' key={group}>
                <div className='menu-group-name' onClick={() => onGroupClick(index)}>
                    {group}
                </div>
                <ul className="nav nav-pills flex-column mb-auto" style={{ display: 'none' }}>
                    {
                        get(groups, group).map((a) => {
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
                <div className='flow-panel-controller' onClick={() => setShowMenu(a => !a)}><BsListUl /></div>
                <div className="flow-panel-menu" ref={menuScope} >
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