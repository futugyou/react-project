import styles from './HeaderMenu.module.css'

import React, { useState, useEffect, useCallback } from "react"
import { useLocation } from "react-router-dom"

import { RouteDescription, ToRouteObject } from '@/RouteDescription'

export interface IHeaderMenuProps {
    Routes: RouteDescription[]
}

const HeaderMenu = (props: IHeaderMenuProps) => {

    const checkActive = (current: RouteDescription, pathname: string, parentPath?: string) => {
        if (current.checkActive) {
            return current.checkActive(pathname)
        }

        let path = current.path
        if (parentPath) {
            path = parentPath + "/" + path
        }

        return pathname.startsWith(path)
    }

    const checkActiveStatic = (path: string, pathname: string) => {
        if (pathname == '/' && path == '/home') {
            return true
        }
        return pathname.startsWith(path)
    }

    const archivedRoute = props.Routes
        .filter(p => p.archived)
        .filter(p => p.show && p.show() || !p.show)

    const checkArchivedActive = (pathname: string) => {
        return archivedRoute.filter(p => pathname.startsWith(p.path)).length > 0
    }

    const additionalItems =
        <li key={"Archived"} id={"archived"} className={styles.menu}  >
            <a href="#" data-active={checkArchivedActive(location.pathname)}>Archived</a>
            <div className={styles.sub}>
                {archivedRoute
                    .map(route =>
                        route.children?.filter(p => p.path)
                            .filter(p => p.show && p.show() || !p.show).map(p => {
                                let href = route.path + "/" + p.path
                                let display = p.display
                                if (!display) {
                                    display = p.path
                                }
                                return (
                                    <a key={href} href={href} className={styles.item} data-active={checkActive(p, location.pathname, route.path)}>{display}</a>
                                )
                            })
                    )}
            </div>
        </li>


    const items =
        props.Routes
            .filter(p => p.archived == undefined || p.archived == false)
            .filter(p => p.show && p.show() || !p.show).map(route => {
                return (
                    <li key={route.display} className={styles.menu} >
                        <a href="#" data-active={checkActive(route, location.pathname)}>{route.display}</a>
                        {route.children && (
                            <div className={styles.sub}>
                                {
                                    route.children?.filter(p => p.path)
                                        .filter(p => p.show && p.show() || !p.show).map(p => {
                                            let href = route.path + "/" + p.path
                                            let display = p.display
                                            if (!display) {
                                                display = p.path
                                            }
                                            return (
                                                <a key={href} href={href} className={styles.item} data-active={checkActive(p, location.pathname, route.path)}>{display}</a>
                                            )
                                        })
                                }
                            </div>
                        )}


                    </li>
                )
            })

    return (<div className={styles.container}>
        <ul className={styles.menuul} >
            <li className={styles.menu} >
                <a href="/" data-active={checkActiveStatic("/home", location.pathname)}>Home</a>
            </li>
            <li className={styles.menu} >
                <a href="/vue" data-active={checkActiveStatic("/vue", location.pathname)}>Vue</a>
            </li>
            <li className={styles.menu} >
                <a href="/flow" data-active={checkActiveStatic("/flow", location.pathname)}>Flow</a>
            </li>
            {items}
            {additionalItems}
        </ul>
    </div>)
}

export default HeaderMenu
