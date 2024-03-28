import React, { useEffect } from "react"
import SideNavigation, { SideNavigationProps } from "@cloudscape-design/components/side-navigation"

import { RouteDescription } from '@/RouteDescription'
import { useNavigate } from "react-router-dom"

export interface ISideMenuProps {
    Routes: RouteDescription[]
    DefaultExpanded?: boolean
    Prefix?: string
    OnAnchorClick?: (href: string) => void
}

const createHref = (href: string, prefix?: string) => {
    if (prefix) {
        return prefix + href
    }
    return href
}

const SideMenu = (props: ISideMenuProps) => {
    const navigate = useNavigate()
    const [activeHref, setActiveHref] = React.useState(location.pathname)

    const item = props.Routes
        .filter(p => p.show && p.show() || !p.show).map(route => {
            return ({
                type: "expandable-link-group",
                text: route.display,
                href: createHref(route.path, props.Prefix),
                defaultExpanded: props.DefaultExpanded == false ? activeHref.startsWith(createHref(route.path, props.Prefix)) : true,
                items: route.children == undefined ? (route.additionalRoute == undefined ? [] :
                    route.additionalRoute
                        .filter(p => p.show && p.show() || !p.show).map(p => {
                            return (
                                {
                                    type: "link",
                                    text: p.display,
                                    href: createHref(p.path, props.Prefix),
                                }
                            )
                        })
                ) : route.children.filter(p => p.path)
                    .filter(p => p.show && p.show() || !p.show).map(p => {
                        let href = route.path + "/" + p.path
                        let display = p.display
                        if (!display) {
                            display = p.path
                        }
                        return (
                            {
                                type: "link",
                                text: display,
                                href: createHref(href, props.Prefix),
                            }
                        )
                    })
            })
        })

    const HandleFollow = (event: CustomEvent<SideNavigationProps.FollowDetail>) => {
        if (!event.detail.external) {
            event.preventDefault()
            setActiveHref(event.detail.href)
            if (props.OnAnchorClick) {
                props.OnAnchorClick(event.detail.href)
            }
        }
    }

    useEffect(() => {
        navigate(activeHref, { replace: true })
    }, [activeHref])

    return (
        <SideNavigation data-style-nowrap data-style-font-size-16
            activeHref={activeHref}
            // header={{ href: "#/", text: "Service name" }}
            onFollow={HandleFollow}
            items={item as SideNavigationProps.Item[]}
        />
    )
}

export default React.memo(SideMenu)
