

import { lazy } from 'react'
import { Outlet } from "react-router-dom"

import { RouteDescription } from '@/RouteDescription'

const App = lazy(() => import('./00.Tutorial/App'))
const Game = lazy(() => import('./00.Tutorial/Game'))
const NameForm = lazy(() => import('./09.Forms/NameForm'))
const Calculator = lazy(() => import('./10.LiftingStateUp/Calculator'))
const WelcomeDialog = lazy(() => import('./11.Compose/WelcomeDialog'))
const SplitPaneApp = lazy(() => import('./11.Compose/SplitPane'))
const Bailout = lazy(() => import('./MiniReactHook/bailout').then(module => ({ default: module.Bailout })))
const WithoutBailout = lazy(() => import('./MiniReactHook/bailout').then(module => ({ default: module.WithoutBailout })))
const Pusher = lazy(() => import('./Pusher'))

export const DemoRoute: RouteDescription = {
    display: "Basic",
    path: "/basic",
    element: <Outlet />,
    archived: true,
    checkActive: (path: string) => path.startsWith('/basic'),
    children: [
        {
            display: "",
            path: "",
            element: <App />,
            show: () => false,
        },
        {
            display: "App",
            path: "app",
            element: <App />,
        },
        {
            display: "Game",
            path: "game",
            element: <Game />,
        },
        {
            display: "Form",
            path: "form",
            show: () => import.meta.env.MODE == "development",
            element: <NameForm />,
        },
        {
            display: "Calculator",
            path: "calculator",
            show: () => import.meta.env.MODE == "development",
            element: <Calculator />,
        },
        {
            display: "Dialog",
            path: "dialog",
            show: () => import.meta.env.MODE == "development",
            element: <WelcomeDialog />,
        },
        {
            display: "Split",
            path: "split",
            show: () => import.meta.env.MODE == "development",
            element: <SplitPaneApp />,
        },
        {
            display: "Bailout",
            path: "bailout",
            show: () => import.meta.env.MODE == "development",
            element: <Bailout />,
        },
        {
            display: "Withbailout",
            path: "withbailout",
            show: () => import.meta.env.MODE == "development",
            element: <WithoutBailout />,
        },
        {
            display: "Pusher",
            path: "pusher",
            element: <Pusher />,
        },
    ]
}