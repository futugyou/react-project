
import { lazy } from 'react'
import { RouteDescription } from '@/RouteDescription'

const BalanceChart = lazy(() => import('./BalanceChart'))
const CashChart = lazy(() => import('./CashChart'))

export const ChatRoute: RouteDescription[] = [{
    path: "balance",
    display: "Balance",
    element: <BalanceChart />,
}, {
    path: "cash",
    display: "Cash",
    element: <CashChart />,
}]
