import React from "react"

import { useBalanceData } from '@/Alphavantage/service'
import BaseFundamentalsChart from '@/Alphavantage/BaseFundamentalsChart'

const DataTypes = [
    { value: "TotalAssets", label: "Total Assets", },
    { value: "TotalCurrentAssets", label: "Total Current Assets", },
    { value: "CashAndCashEquivalentsAtCarryingValue", label: "Cash And Cash Equivalents At Carrying Value", },
    { value: "CashAndShortTermInvestments", label: "Cash And Short Term Investments", },
    { value: "Inventory", label: "Inventory", },
    { value: "CurrentNetReceivables", label: "Current Net Receivables", },
    { value: "TotalNonCurrentAssets", label: "Total Non Current Assets", },
    { value: "PropertyPlantEquipment", label: "Property Plant Equipment", },
    { value: "AccumulatedDepreciationAmortizationPPE", label: "Accumulated Depreciation Amortization PPE", },
    { value: "IntangibleAssets", label: "Intangible Assets", },
    { value: "IntangibleAssetsExcludingGoodwill", label: "Intangible Assets Excluding Goodwill", },
    { value: "Goodwill", label: "Goodwill", },
    { value: "Investments", label: "Investments", },
    { value: "LongTermInvestments", label: "Long Term Investments", },
    { value: "ShortTermInvestments", label: "Short Term Investments", },
    { value: "OtherCurrentAssets", label: "Other Current Assets", },
    { value: "OtherNonCurrentAssets", label: "Other Non CurrentAssets", },
    { value: "TotalLiabilities", label: "Total Liabilities", },
    { value: "TotalCurrentLiabilities", label: "Total Current Liabilities", },
    { value: "CurrentAccountsPayable", label: "Current Accounts Payable", },
    { value: "DeferredRevenue", label: "Deferred Revenue", },
    { value: "CurrentDebt", label: "Current Debt", },
    { value: "ShortTermDebt", label: "Short Term Debt", },
    { value: "TotalNonCurrentLiabilities", label: "Total Non Current Liabilities", },
    { value: "CapitalLeaseObligations", label: "Capital Lease Obligations", },
    { value: "LongTermDebt", label: "Long Term Debt", },
    { value: "CurrentLongTermDebt", label: "Current Long Term Debt", },
    { value: "LongTermDebtNoncurrent", label: "Long Term Debt Noncurrent", },
    { value: "ShortLongTermDebtTotal", label: "Short Long Term Debt Total", },
    { value: "OtherCurrentLiabilities", label: "Other Current Liabilities", },
    { value: "OtherNonCurrentLiabilities", label: "Other Non Current Liabilities", },
    { value: "TotalShareholderEquity", label: "Total Shareholder Equity", },
    { value: "TreasuryStock", label: "Treasury Stock", },
    { value: "RetainedEarnings", label: "Retained Earnings", },
    { value: "CommonStock", label: "Common Stock", },
    { value: "CommonStockSharesOutstanding", label: "Common Stock Shares Outstanding", }
]

const BalanceChart = () => {
    const { data: nodeData, refetch: loadSelected, isLoading, isFetching, isError } = useBalanceData()

    return (
        <BaseFundamentalsChart
            ChartName="Balance"
            Data={nodeData}
            IsError={isError}
            IsLoading={isLoading}
            DataTypes={DataTypes}>
        </BaseFundamentalsChart>
    )
}

export default BalanceChart
