import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import TopNavigation from "@cloudscape-design/components/top-navigation"
import type { ButtonDropdownProps } from '@cloudscape-design/components'
import { RouteDescription } from "@/RouteDescription"
import { useAuth } from '@/Auth/index'

export interface IHeaderMenuProps {
    Routes: RouteDescription[]
}
const buttonVariant = (active: boolean): "link" | "primary-button" | undefined => {
    return active ? "primary-button" : "link"
}

const HeaderMenu = (props: IHeaderMenuProps) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { authService } = useAuth()
    const user = authService.getUser()

    const login = async () => {
        authService.authorize()
    }

    const logout = async () => {
        authService.logout()
    }

    const handleLogout = ({ detail }: CustomEvent<ButtonDropdownProps.ItemClickDetails>) => {
        const { id } = detail;
        if (id === "signout") {
            logout()
        }
    }

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

    const normalRoutes: RouteDescription[] = [
        ...props.Routes.filter(
            (p) => p.archived === undefined || p.archived === false
        ).filter((p) => (p.show && p.show()) || !p.show)
    ]
    const archivedRoutes = props.Routes
        .filter((p) => p.archived)
        .filter((p) => (p.show && p.show()) || !p.show)

    const handleNavigate = (path: string, event: React.MouseEvent) => {
        event.preventDefault()
        console.log("path:", path)
        navigate(path)
    }

    const handleItemClick = ({ detail }: CustomEvent<ButtonDropdownProps.ItemClickDetails>) => {
        const { id } = detail;
        console.log("path:", id)
        navigate(id)
    }

    const userinfo = (!authService.isAuthenticated() || user == null) ? {
        type: "button" as const,
        id: 'login',
        text: 'Login',
        onClick: (e: any) => login(),
        disableUtilityCollapse: true,
    } : {
        type: "menu-dropdown" as const,
        text: user.name,
        description: user.email,
        iconName: "user-profile" as const,
        items: [
            { id: "signout", text: "Sign out" }
        ],
        onItemClick: handleLogout,
        disableUtilityCollapse: true,
    }

    const topNavItems = [
        {
            type: "button" as const,
            id: "/",
            text: "Home",
            onClick: (e: any) => handleNavigate("/", e),
            disableUtilityCollapse: true,
        },
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
                    onItemClick: handleItemClick,
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
                    onItemClick: handleItemClick,
                    variant: buttonVariant(archivedRoutes.some((p) => location.pathname.startsWith(p.path))),
                },
            ]
            : []),
        userinfo,
    ]

    return (
        <TopNavigation
            identity={{
                title: "",
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
