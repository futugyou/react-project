
import { lazy } from 'react'
import { RouteDescription } from '@/RouteDescription'

const BalanceChart = lazy(() => import('./BalanceChart'))

export const ChatRoute: RouteDescription[] = [{
    path: "balance",
    display: "Balance",
    element: <BalanceChart />,
}]
