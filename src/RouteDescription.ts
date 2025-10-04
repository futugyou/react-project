import { RouteObject } from 'react-router-dom'

import { DemoRoute } from '@/ReactDemo/DemoRoute'
import { OpenAIRoute } from '@/OpenAI/OpenAIRoute'
import { BookshelfRoute } from '@/Bookshelf/Route'
import { ChatRoute } from '@/Alphavantage/Route'
import { BoardRoute } from '@/Whiteboards/Route'
import { ExcalidrawRoute } from '@/Excalidraw/Route'
import { TldrawRoute } from '@/Tldraw/Route'
import { FlowRouteDataList2 } from './Flow/FlowRoute'
import { MicroAppRoute2 } from '@/MicroApp/MicroAppRoute'

const WhiteRoute: RouteDescription = {
    display: "Whiteboard",
    path: "/w",
    checkActive: (path: string) => path.startsWith('/w'),
    children: [
        BoardRoute,
        ...ExcalidrawRoute,
        ...TldrawRoute,
    ]
}

export const TotalRouteDescriptions: RouteDescription[] = [
    FlowRouteDataList2,
    BookshelfRoute,
    ChatRoute,
    WhiteRoute,
    DemoRoute,
    OpenAIRoute,
    ...MicroAppRoute2,
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
    archived?: boolean
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