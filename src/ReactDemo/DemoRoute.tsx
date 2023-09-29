
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'


const DemoPanel = lazy(() => import('./DemoPanel'))
const App = lazy(() => import('./00.Tutorial/App'))
const Game = lazy(() => import('./00.Tutorial/Game'))
const NameForm = lazy(() => import('./09.Forms/NameForm'))
const Calculator = lazy(() => import('./10.LiftingStateUp/Calculator'))
const WelcomeDialog = lazy(() => import('./11.Compose/WelcomeDialog'))
const SplitPaneApp = lazy(() => import('./11.Compose/SplitPane'))
const Bailout = lazy(() => import('./MiniReactHook/bailout').then(module => ({ default: module.Bailout })))
const WithoutBailout = lazy(() => import('./MiniReactHook/bailout').then(module => ({ default: module.WithoutBailout })))


export const DemoRoute: RouteObject = {
    path: "/demo",
    element: <DemoPanel />,
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
            element: <NameForm />,
        },
        {
            path: "calculator",
            element: <Calculator />,
        },
        {
            path: "dialog",
            element: <WelcomeDialog />,
        },
        {
            path: "split",
            element: <SplitPaneApp />,
        },
        {
            path: "bailout",
            element: <Bailout />,
        },
        {
            path: "withbailout",
            element: <WithoutBailout />,
        },
    ]
}