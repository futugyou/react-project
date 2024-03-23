import styles from './HeaderMenu.module.css'

import React from "react"
import { Overflow, OverflowItem } from "@fluentui/react-components"

import { RouteDescription } from '@/RouteDescription'

export interface IHeaderMenuProps {
    Routes: RouteDescription[]
}

const staticRouteData = [{
    display: "Home",
    path: "/",
}, {
    display: "Vue",
    path: "/vue",
}, {
    display: "Flow",
    path: "/flow",
}]

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
        if (pathname == '/' && path == '/') {
            return true
        }
        return path != '/' && pathname.startsWith(path)
    }

    const staticRoute = staticRouteData.map(route =>
        <OverflowItem key={route.display} id={route.display}>
            <li className={styles.menu} >
                <a href={route.path} data-active={checkActiveStatic(route.path, location.pathname)}>{route.display}</a>
            </li>
        </OverflowItem>
    )

    const archivedRoute = props.Routes
        .filter(p => p.archived)
        .filter(p => p.show && p.show() || !p.show)

    const checkArchivedActive = (pathname: string) => {
        return archivedRoute.filter(p => pathname.startsWith(p.path)).length > 0
    }

    const additionalItems =
        <OverflowItem key={"Archived"} id={"archived"}>
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
        </OverflowItem>

    const items =
        props.Routes
            .filter(p => p.archived == undefined || p.archived == false)
            .filter(p => p.show && p.show() || !p.show).map(route => {
                return (
                    <OverflowItem key={route.display} id={route.display!}>
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
                    </OverflowItem>
                )
            })

    return (
        <Overflow>
            <div className={styles.container}>
                <ul className={styles.menuul} >
                    {staticRoute}
                    {items}
                    {additionalItems}
                </ul>
            </div>
        </Overflow>)
}

export default HeaderMenu
