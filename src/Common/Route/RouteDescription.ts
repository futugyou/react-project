import { RouteObject } from 'react-router-dom'

import { DemoRoute } from '@/ReactDemo/Route'
import { OpenAIRoute } from '@/OpenAI/Route'
import { BookshelfRoute } from '@/Bookshelf/Route'
import { ChatRoute } from '@/Alphavantage/Route'
import { BoardRoute } from '@/Fluid/Route'
import { ExcalidrawRoute } from '@/Excalidraw/Route'
import { TldrawRoute } from '@/Tldraw/Route'
import { FlowRouteDataList } from '@/Flow/Route'
import { PusherRoute } from '@/Pusher/Route'

const WhiteRoute: RouteDescription = {
    display: "Whiteboard",
    path: "/w",
    checkActive: (path: string) => path.startsWith('/w'),
    children: [
        BoardRoute,
        ...ExcalidrawRoute,
        ...TldrawRoute,
        PusherRoute,
    ]
}

export const TotalRouteDescriptions: RouteDescription[] = [
    FlowRouteDataList,
    BookshelfRoute,
    ChatRoute,
    WhiteRoute,
    DemoRoute,
    OpenAIRoute,
]

export interface AdditionalRoute {
    path: string
    subPath: string
    display: string
    appName: string
    show?: (key?: string) => boolean
}

export interface RouteDescription {
    path: string
    display: string
    show?: (key?: string) => boolean
    element?: React.ReactNode
    checkActive?: (key: string) => boolean
    additionalRoute?: AdditionalRoute[]
    children?: RouteDescription[]
}

export const ToRouteObject = (d: RouteDescription) => {
    const route: RouteObject = {}
    // route.path = d.path
    route.path = d.path.startsWith('/') ? d.path.slice(1) : d.path;
    route.element = d.element
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