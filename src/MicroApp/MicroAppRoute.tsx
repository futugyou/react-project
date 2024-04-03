
import { RouteDescription } from '@/RouteDescription'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const VueProject = lazy(() => import('./VueProject'))
const NextjsProject = lazy(() => import('./NextjsProject'))

export const MicroAppRoute: RouteObject[] = [{
    path: "/vue",
    element: <VueProject />
}, {
    path: "/nextjs",
    element: <NextjsProject />
}]

export const MicroAppRoute2: RouteDescription[] = [{
    display: "Tools",
    path: "/vue",
    element: <VueProject />,
    additionalRoute: [{
        display: "PDF Reader",
        path: "/vue?vueawsapp=%2Fpdf",
        subPath: "/pdf",
        appName: "vueawsapp",
    }, {
        display: "Translate",
        path: "/vue?vueawsapp=%2Ftranslate",
        subPath: "/translate",
        appName: "vueawsapp",
    }, {
        display: "OCR",
        path: "/vue?vueawsapp=%2Focr",
        subPath: "/ocr",
        appName: "vueawsapp",
    },]
}, {
    display: "Nextjs",
    path: "/nextjs",
    element: <NextjsProject />,
    show: () => false,
    additionalRoute: [{
        display: "edge geo",
        path: "/nextjs?nextjsapp=%2Fapi%2Fedge-geo",
        subPath: "/api/edge-geo",
        appName: "nextjsapp",
    }, {
        display: "og",
        path: "/nextjs?nextjsapp=%2Fog%2Fgithub",
        subPath: "/og/github",
        appName: "nextjsapp",
    },]
}]