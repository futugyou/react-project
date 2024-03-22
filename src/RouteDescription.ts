import { RouteObject } from 'react-router-dom'

export interface RouteDescription {
    key?: string
    index?: boolean
    path?: string
    href?: string
    display?: string
    show?: (key?: string) => boolean
    element?: React.ReactNode
    checkActive?: (key: string) => boolean
    loader?: ({ params, request }: any) => Promise<any>
    shouldRevalidate?: () => boolean
    // only one layer
    children?: RouteDescription[]
}

export const ToRouteObject = (d: RouteDescription) => {
    const route: RouteObject = {}
    route.path = d.path
    route.element = d.element
    route.loader = d.loader
    route.shouldRevalidate = d.shouldRevalidate
    let subs: RouteObject[] = []
    if (d.children) {
        for (let i = 0; i < d.children.length; i++) {
            const sr = d.children[i]
            subs.push(ToRouteObject(sr))
        }
    }
    route.children = subs
    return route
}