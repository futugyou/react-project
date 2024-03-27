
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
    }, {
        display: "Translate",
        path: "/vue?vueawsapp=%2Ftranslate",
    }, {
        display: "OCR",
        path: "/vue?vueawsapp=%2Focr",
    },]
}]