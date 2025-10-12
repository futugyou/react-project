import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import TopNavigation from "@cloudscape-design/components/top-navigation"
import SideNavigation from "@cloudscape-design/components/side-navigation"
import { ButtonDropdownProps } from '@cloudscape-design/components/button-dropdown/interfaces'
import { RouteDescription } from "@/RouteDescription"

export interface IHeaderMenuProps {
    Routes: RouteDescription[]
}
const buttonVariant = (active: boolean): "link" | "primary-button" | undefined => {
    return active ? "primary-button" : "link"
}

const HeaderMenu = (props: IHeaderMenuProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    const checkActive = (
        current: RouteDescription,
        pathname: string,
        parentPath?: string
    ) => {
        if (current.checkActive) return current.checkActive(pathname)
        let path = current.path
        if (parentPath) path = parentPath + "/" + path
        return pathname.startsWith(path)
    }

    const normalRoutes = props.Routes.filter(
        (p) => p.archived == undefined || p.archived == false
    ).filter((p) => (p.show && p.show()) || !p.show)

    const archivedRoutes = props.Routes
        .filter((p) => p.archived)
        .filter((p) => (p.show && p.show()) || !p.show)

    const handleNavigate = (path: string, event: React.MouseEvent) => {
        event.preventDefault()
        navigate(path)
    }

    const ItemClick = ({ detail }: ButtonDropdownProps.ItemClickDetails) => {
        event.preventDefault()
        console.log("path:", detail)
        navigate(detail.id)
    }

    const topNavItems = [
        ...normalRoutes.map((r) => {
            if (r.children && r.children.length > 0) {
                return {
                    type: "menu-dropdown" as const,
                    id: r.path,
                    text: r.display,
                    items: r.children
                        .filter((c) => c.path)
                        .filter((c) => (c.show && c.show()) || !c.show)
                        .map((c) => ({
                            id: r.path + "/" + c.path,
                            text: c.display ?? c.path,
                        })),
                    onItemClick: ItemClick,
                    variant: buttonVariant(checkActive(r, location.pathname)),
                }
            } else {
                return {
                    type: "button" as const,
                    id: r.path,
                    text: r.display,
                    onClick: (e: any) => handleNavigate(r.path, e),
                    variant: buttonVariant(checkActive(r, location.pathname)),
                }
            }
        }),

        ...(archivedRoutes.length > 0
            ? [
                {
                    type: "menu-dropdown" as const,
                    id: "archived",
                    text: "Archived",
                    items: archivedRoutes.flatMap((route) =>
                        (route.children ?? [])
                            .filter((c) => c.path)
                            .filter((c) => (c.show && c.show()) || !c.show)
                            .map((c) => ({
                                id: route.path + "/" + c.path,
                                text: c.display ?? c.path,
                            }))
                    ),
                    onItemClick: ItemClick,
                    variant: buttonVariant(archivedRoutes.some((p) => location.pathname.startsWith(p.path))),
                },
            ]
            : []),
    ]

    return (
        <TopNavigation
            identity={{
                title: "Home",
                href: "./",
                onFollow: (e) => {
                    e.preventDefault()
                    navigate("/")
                },
            }}
            utilities={topNavItems}
            i18nStrings={{
                overflowMenuTriggerText: "More",
                overflowMenuTitleText: "All",
            }}
            data-custom-css="main-nav"
        />
    )
}

export default HeaderMenu
