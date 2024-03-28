import styles from './HeaderMenu.module.css'

import React from "react"
import { Overflow, OverflowItem, useIsOverflowItemVisible, useOverflowMenu } from "@fluentui/react-components"

import { RouteDescription } from '@/RouteDescription'
import SideNavigation from '@/Common/Components/SideNavigation'

export interface IHeaderMenuProps {
    Routes: RouteDescription[]
}

const staticRoutes: RouteDescription[] = [{
    display: "Home",
    path: "/",
},]

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

    const staticItems = staticRoutes.map(route =>
        <OverflowItem key={route.display} id={route.display}>
            <li className={styles.menu} >
                <a href={route.path} data-active={checkActiveStatic(route.path, location.pathname)}>{route.display}</a>
            </li>
        </OverflowItem>
    )

    const nomalRoutes = props.Routes
        .filter(p => p.archived == undefined || p.archived == false)
        .filter(p => p.show && p.show() || !p.show)

    const nomalItems = nomalRoutes.map(route => {
        return (
            <OverflowItem key={route.display} id={route.display!}>
                <li key={route.display} className={styles.menu} >
                    <a data-active={checkActive(route, location.pathname)}>{route.display}</a>
                    {/* <a href={route.path} data-active={checkActive(route, location.pathname)}>{route.display}</a> */}
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

                    {route.additionalRoute && (
                        <div className={styles.sub}>
                            {
                                route.additionalRoute?.filter(p => p.path)
                                    .filter(p => p.show && p.show() || !p.show).map(p => {
                                        return (
                                            <a key={p.path} href={p.path} className={styles.item} data-active={checkActive(p, location.pathname, route.path)}>{p.display}</a>
                                        )
                                    })
                            }
                        </div>
                    )}
                </li>
            </OverflowItem>
        )
    })

    const archivedRoutes = props.Routes
        .filter(p => p.archived)
        .filter(p => p.show && p.show() || !p.show)

    const checkArchivedActive = (pathname: string) => {
        return archivedRoutes.filter(p => pathname.startsWith(p.path)).length > 0
    }

    let additionalItems: JSX.Element = <></>

    if (archivedRoutes.length > 0) {
        additionalItems =
            <OverflowItem key={"Archived"} id={"Archived"}>
                <li key={"Archived"} id={"archived"} className={styles.menu}  >
                    <a data-active={checkArchivedActive(location.pathname)}>Archived</a>
                    {/* <a href={archivedRoutes[0].path} data-active={checkArchivedActive(location.pathname)}>Archived</a> */}
                    <div className={styles.sub}>
                        {archivedRoutes
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
    }

    const itemIds = staticRoutes.concat(nomalRoutes).concat(archivedRoutes)

    return (
        <Overflow>
            <div className={styles.container}>
                <ul className={styles.menuul} >
                    {staticItems}
                    {nomalItems}
                    {additionalItems}
                    <OverflowMenu itemIds={itemIds} />
                </ul>
            </div>
        </Overflow>)
}

const OverflowMenuItem = (item: RouteDescription) => {
    const isVisible = useIsOverflowItemVisible(item.display)

    if (isVisible) {
        return null
    }

    return item
}

const OverflowMenu: React.FC<{ itemIds: RouteDescription[] }> = ({ itemIds }) => {
    const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLAnchorElement>()
    const items = itemIds.filter((i) => OverflowMenuItem(i) != undefined)

    if (!isOverflowing) {
        return null
    }

    return (
        <li className={styles.menu} >
            <a href="#" ref={ref}>+{overflowCount} Menus</a>
            <div className={`${styles.sub} ${styles.subHiden}`} >
                <SideNavigation Routes={items} DefaultExpanded={false} headNavigate={false}></SideNavigation>
            </div>
        </li>
    )
}

export default HeaderMenu
