
import { lazy } from 'react'
import { RouteDescription } from '@/RouteDescription'

const BalanceChart = lazy(() => import('./BalanceChart'))
const CashChart = lazy(() => import('./CashChart'))
const EarningsChart = lazy(() => import('./EarningsChart'))
const ExpectedChart = lazy(() => import('./ExpectedChart'))
const IncomeChart = lazy(() => import('./IncomeChart'))
const CommoditiesChart = lazy(() => import('./CommoditiesChart'))
const EconomicChart = lazy(() => import('./EconomicChart'))
const StockSeriesChart = lazy(() => import('./StockSeriesChart'))
const CompanyBoard = lazy(() => import('./CompanyBoard'))
const EconomicPanel = lazy(() => import('./EconomicPanel'))
const NewsForCompany = lazy(() => import('./NewsForCompany'))

export const ChatRoute: RouteDescription = {
    display: "Economic Data",
    path: "/e",
    element: <EconomicPanel />,
    checkActive: (path: string) => path.startsWith('/e'),
    children: [
        {
            path: "",
            index: true,
            element: <BalanceChart />,
        }, {
            path: "company",
            display: "Company",
            element: <CompanyBoard />,
        }, {
            path: "economic",
            display: "Economic",
            element: <EconomicChart />,
        }, {
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
        }, {
            path: "stockSeries",
            display: "StockSeries",
            element: <StockSeriesChart />,
            show: () => false,
        }, {
            path: "news",
            display: "news",
            element: <NewsForCompany />,
            show: () => false,
        },
    ]
}