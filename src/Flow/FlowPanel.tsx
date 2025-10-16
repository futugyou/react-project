
import React, { useEffect } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"

import SideNavigation, { SideNavigationProps } from "@cloudscape-design/components/side-navigation"
import Grid from "@cloudscape-design/components/grid"

import { FlowRouteDataList } from "./Route"

const FlowPanel = (props: any) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [activeHref, setActiveHref] = React.useState<string>(location.pathname || "/")

    const prefix = "/flow/dotnet/"
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

    const items = React.useMemo<SideNavigationProps.Item[]>(() => {
        return FlowRouteDataList.children!.filter(r => r.path == "dotnet").flatMap(r => r.children)
            .filter(route => {
                if (typeof route!.show === "function") return route!.show()
                return route!.show !== false
            })
            .map(route => {
                const baseHref = createHref(route!.path, prefix)
                return {
                    type: "link",
                    text: route!.display,
                    href: baseHref,
                } as SideNavigationProps.Item
            })
    }, [])

    const HandleFollow = (event: CustomEvent<SideNavigationProps.FollowDetail>) => {
        const href = event.detail.href
        if (event.detail.external) {
            return
        }
        event.preventDefault()

        setActiveHref(href)

        if (location.pathname !== href) {
            navigate(href, { replace: true })
        }
    }

    if (location.pathname.indexOf('dotnet') == -1) {
        return <Outlet />
    }

    return (
        <Grid disableGutters gridDefinition={[{ colspan: 2 }, { colspan: 10 }]}>
            <SideNavigation
                data-style-nowrap
                data-style-font-size-16
                activeHref={activeHref}
                onFollow={HandleFollow}
                items={items}
            />
            <Outlet />
        </Grid>
    )
}

export default React.memo(FlowPanel)
