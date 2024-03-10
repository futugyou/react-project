
import { lazy } from 'react'
import { RouteDescription } from '@/RouteDescription'

const BalanceChart = lazy(() => import('./BalanceChart'))
const CashChart = lazy(() => import('./CashChart'))
const EarningsChart = lazy(() => import('./EarningsChart'))
const ExpectedChart = lazy(() => import('./ExpectedChart'))
const IncomeChart = lazy(() => import('./IncomeChart'))
const CommoditiesChart = lazy(() => import('./CommoditiesChart'))

export const ChatRoute: RouteDescription[] = [{
    path: "balance",
    display: "Balance",
    element: <BalanceChart />,
}, {
    path: "cash",
    display: "Cash",
    element: <CashChart />,
}, {
    path: "earnings",
    display: "Earnings",
    element: <EarningsChart />,
}, {
    path: "expected",
    display: "Expected",
    element: <ExpectedChart />,
}, {
    path: "income",
    display: "Income",
    element: <IncomeChart />,
}, {
    path: "commodities",
    display: "Commodities",
    element: <CommoditiesChart />,
}]
