
import React from "react"

import { useIncomeData } from "@/Alphavantage/service"
import BaseFundamentalsChart from "@/Alphavantage/BaseFundamentalsChart"

const DataTypes = [
    { label: "Total Revenue", value: "TotalRevenue" },
    { label: "Gross Profit", value: "GrossProfit" },
    { label: "Cost Of Revenue", value: "CostOfRevenue" },
    { label: "Costof Goods And Services Sold", value: "CostofGoodsAndServicesSold" },
    { label: "Operating Income", value: "OperatingIncome" },
    { label: "Selling General And Administrative", value: "SellingGeneralAndAdministrative" },
    { label: "Research And Development", value: "ResearchAndDevelopment" },
    { label: "Operating Expenses", value: "OperatingExpenses" },
    { label: "Investment Income Net", value: "InvestmentIncomeNet" },
    { label: "Net Interest Income", value: "NetInterestIncome" },
    { label: "Interest Income", value: "InterestIncome" },
    { label: "Interest Expense", value: "InterestExpense" },
    { label: "Non Interest Income", value: "NonInterestIncome" },
    { label: "Other Non Operating Income", value: "OtherNonOperatingIncome" },
    { label: "Depreciation", value: "Depreciation" },
    { label: "Depreciation And Amortization", value: "DepreciationAndAmortization" },
    { label: "Income Before Tax", value: "IncomeBeforeTax" },
    { label: "Income Tax Expense", value: "IncomeTaxExpense" },
    { label: "Interest And Debt Expense", value: "InterestAndDebtExpense" },
    { label: "Net Income From Continuing Operations", value: "NetIncomeFromContinuingOperations" },
    { label: "Comprehensive Income Net Of Tax", value: "ComprehensiveIncomeNetOfTax" },
    { label: "Ebit", value: "Ebit" },
    { label: "Ebitda", value: "Ebitda" },
    { label: "Net Income", value: "NetIncome" },
]

const IncomeChart = () => {
    const { data: nodeData, refetch: loadSelected, isLoading, isFetching, isError } = useIncomeData()

    return (
        <BaseFundamentalsChart
            ChartName="Income"
            Data={nodeData}
            IsError={isError}
            IsLoading={isLoading}
            DataTypes={DataTypes}>
        </BaseFundamentalsChart>)
}

export default IncomeChart