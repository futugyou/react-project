
import { RouteDescription } from '@/RouteDescription'
import { lazy } from 'react'

const DemoPanel = lazy(() => import('./DemoPanel'))
const App = lazy(() => import('./00.Tutorial/App'))
const Game = lazy(() => import('./00.Tutorial/Game'))
const NameForm = lazy(() => import('./09.Forms/NameForm'))
const Calculator = lazy(() => import('./10.LiftingStateUp/Calculator'))
const WelcomeDialog = lazy(() => import('./11.Compose/WelcomeDialog'))
const SplitPaneApp = lazy(() => import('./11.Compose/SplitPane'))
const Bailout = lazy(() => import('./MiniReactHook/bailout').then(module => ({ default: module.Bailout })))
const WithoutBailout = lazy(() => import('./MiniReactHook/bailout').then(module => ({ default: module.WithoutBailout })))
const Pusher = lazy(() => import('./Pusher'))
const PlateEditor = lazy(() => import('./PlateEditor'))

export const DemoRoute: RouteDescription = {
    display: "Basic",
    path: "/basic",
    element: <DemoPanel />,
    checkActive: (path: string) => {
        if (path.startsWith('/basic')) {
            return true
        } else {
            return false
        }
    },
    children: [
        {
            index: true,
            element: <App />,
        },
        {
            path: "app",
            element: <App />,
        },
        {
            path: "game",
            element: <Game />,
        },
        {
            path: "form",
            display: "Form",
            show: () => process.env.NODE_ENV == "development",
            element: <NameForm />,
        },
        {
            path: "calculator",
            show: () => process.env.NODE_ENV == "development",
            element: <Calculator />,
        },
        {
            path: "dialog",
            show: () => process.env.NODE_ENV == "development",
            element: <WelcomeDialog />,
        },
        {
            path: "split",
            show: () => process.env.NODE_ENV == "development",
            element: <SplitPaneApp />,
        },
        {
            path: "bailout",
            show: () => process.env.NODE_ENV == "development",
            element: <Bailout />,
        },
        {
            path: "withbailout",
            show: () => process.env.NODE_ENV == "development",
            element: <WithoutBailout />,
        },
        {
            path: "pusher",
            element: <Pusher />,
        },
        {
            path: "plate",
            element: <PlateEditor />,
        },
    ]
}