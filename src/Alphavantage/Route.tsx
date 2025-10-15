
import { lazy } from 'react'
import { RouteDescription } from '@/Common/Route/RouteDescription'

const BalanceChart = lazy(() => import('./BalanceChart'))
const CashChart = lazy(() => import('./CashChart'))
const EarningsChart = lazy(() => import('./EarningsChart'))
const ExpectedChart = lazy(() => import('./ExpectedChart'))
const IncomeChart = lazy(() => import('./IncomeChart'))
const CommoditiesChart = lazy(() => import('./CommoditiesChart'))
const EconomicChart = lazy(() => import('./EconomicChart'))
const StockSeriesChart = lazy(() => import('./StockSeriesCanvasChart'))
const CompanyBoard = lazy(() => import('./CompanyBoard'))
const EconomicPanel = lazy(() => import('./EconomicPanel'))
const NewsForCompany = lazy(() => import('./NewsForCompany'))

export const ChatRoute: RouteDescription = {
    display: "Economic",
    path: "/e",
    element: <EconomicPanel />,
    checkActive: (path: string) => path.startsWith('/e'),
    children: [{
        display: "",
        path: "",
        element: <CompanyBoard />,
        show: () => false,
    }, {
        path: "company",
        display: "Company",
        element: <CompanyBoard />,
    }, {
        path: "news",
        display: "News",
        element: <NewsForCompany />,
    }, {
        path: "economic",
        display: "Economic",
        element: <EconomicChart />,
    }, {
        path: "commodities",
        display: "Commodities",
        element: <CommoditiesChart />,
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
        path: "income",
        display: "Income",
        element: <IncomeChart />,
    }, {
        path: "expected",
        display: "Expected",
        element: <ExpectedChart />,
    }, {
        path: "stockSeries",
        display: "StockSeries",
        element: <StockSeriesChart />,
        show: () => false,
    },
    ]
}