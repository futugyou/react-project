import React, { useEffect } from "react"
import SideNavigation, { SideNavigationProps } from "@cloudscape-design/components/side-navigation"
import { RouteDescription } from '@/Common/Route/RouteDescription'
import { useNavigate, useLocation } from "react-router-dom"

export interface ISideMenuProps {
    Routes: RouteDescription[]
    DefaultExpanded?: boolean
    Prefix?: string // optional prefix (e.g. '/test')
    OnAnchorClick?: (href: string) => void
    headNavigate?: boolean
}

const joinPath = (...parts: (string | undefined)[]) =>
    parts
        .filter(Boolean)
        .map(p => (p as string).replace(/(^\/+|\/+$)/g, ""))
        .filter(Boolean)
        .join("/")
        .replace(/^(.+)$/, "/$1")

const createHref = (href: string, prefix?: string) => {
    if (!href) return prefix ?? "/"
    if (prefix) {
        return joinPath(prefix, href)
    }
    return href.startsWith("/") ? href : `/${href}`
}

const SideMenu = (props: ISideMenuProps) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [activeHref, setActiveHref] = React.useState<string>(location.pathname || "/")

    const items = React.useMemo<SideNavigationProps.Item[]>(() => {
        return props.Routes
            .filter(route => {
                if (typeof route.show === "function") return route.show()
                return route.show !== false
            })
            .map(route => {
                const baseHref = createHref(route.path, props.Prefix)
                const defaultExpanded =
                    props.DefaultExpanded === undefined
                        ? activeHref.startsWith(baseHref)
                        : !!props.DefaultExpanded && activeHref.startsWith(baseHref)

                const childrenSources = route.children ?? route.additionalRoute ?? []
                const childItems = (childrenSources as any[])
                    .filter((p: any) => {
                        if (typeof p.show === "function") return p.show()
                        return p.show !== false
                    })
                    .filter(p => p && p.path)
                    .map(p => {
                        const childPath =
                            route.children && route.children.length ? `${route.path}/${p.path}` : p.path
                        const href = createHref(childPath, props.Prefix)
                        const display = p.display ?? p.path
                        return {
                            type: "link",
                            text: display,
                            href,
                        } as SideNavigationProps.Item
                    })

                return {
                    type: "section",
                    text: route.display,
                    // href: baseHref,
                    defaultExpanded,
                    items: childItems,
                } as SideNavigationProps.Item
            })
    }, [props.Routes, props.Prefix, props.DefaultExpanded, activeHref])

    const HandleFollow = (event: CustomEvent<SideNavigationProps.FollowDetail>) => {
        const href = event.detail.href
        if (event.detail.external) {
            return
        }
        event.preventDefault()

        setActiveHref(href)
        props.OnAnchorClick?.(href)

        if (location.pathname !== href) {
            navigate(href, { replace: true })
        }
    }

    useEffect(() => {
        if (location.pathname !== activeHref) {
            setActiveHref(location.pathname)
        }
    }, [location.pathname])

    return (
        <SideNavigation
            header={{ href: "#/", text: "React Web" }}
            activeHref={activeHref}
            onFollow={HandleFollow}
            items={items}
        />
    )
}

export default React.memo(SideMenu)
