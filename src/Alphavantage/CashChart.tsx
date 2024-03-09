
import React from "react"

import { useCashData } from '@/Alphavantage/service'
import BaseFundamentalsChart from '@/Alphavantage/BaseFundamentalsChart'

const DataTypes = [
    { label: "Operating Cashflow", value: "OperatingCashflow", },
    { label: "Payments For Operating Activities", value: "PaymentsForOperatingActivities", },
    { label: "Proceeds From Operating Activities", value: "ProceedsFromOperatingActivities", },
    { label: "Change In Operating Liabilities", value: "ChangeInOperatingLiabilities", },
    { label: "Change In Operating Assets", value: "ChangeInOperatingAssets", },
    { label: "Depreciation Depletion And Amortization", value: "DepreciationDepletionAndAmortization", },
    { label: "Capital Expenditures", value: "CapitalExpenditures", },
    { label: "Change In Receivables", value: "ChangeInReceivables", },
    { label: "Change In Inventory", value: "ChangeInInventory", },
    { label: "Profit Loss", value: "ProfitLoss", },
    { label: "Cashflow From Investment", value: "CashflowFromInvestment", },
    { label: "Cashflow From Financing", value: "CashflowFromFinancing", },
    { label: "Proceeds From Repayments Of Short Term Debt", value: "ProceedsFromRepaymentsOfShortTermDebt", },
    { label: "Payments For Repurchase Of Common Stock", value: "PaymentsForRepurchaseOfCommonStock", },
    { label: "Payments For Repurchase Of Equity", value: "PaymentsForRepurchaseOfEquity", },
    { label: "Payments For Repurchase Of Preferred Stock", value: "PaymentsForRepurchaseOfPreferredStock", },
    { label: "Dividend Payout", value: "DividendPayout", },
    { label: "Dividend Payout Common Stock", value: "DividendPayoutCommonStock", },
    { label: "Dividend Payout Preferred Stock", value: "DividendPayoutPreferredStock", },
    { label: "Proceeds From Issuance Of Common Stock", value: "ProceedsFromIssuanceOfCommonStock", },
    { label: "Proceeds From Issuance Of Long Term Debt And Capital Securities Net", value: "ProceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet", },
    { label: "Proceeds From Issuance Of Preferred Stock", value: "ProceedsFromIssuanceOfPreferredStock", },
    { label: "Proceeds From Repurchase Of Equity", value: "ProceedsFromRepurchaseOfEquity", },
    { label: "Proceeds From Sale Of Treasury Stock", value: "ProceedsFromSaleOfTreasuryStock", },
    { label: "Change In Cash And Cash Equivalents", value: "ChangeInCashAndCashEquivalents", },
    { label: "Change In Exchange Rate", value: "ChangeInExchangeRate", },
    { label: "Net Income", value: "NetIncome", },
]

const CashChart = () => {
    const { data: nodeData, refetch: loadSelected, isLoading, isFetching, isError } = useCashData()

    return (
        <BaseFundamentalsChart
            ChartName="Cash"
            Data={nodeData}
            IsError={isError}
            IsLoading={isLoading}
            DataTypes={DataTypes}>
        </BaseFundamentalsChart>
    )
}

export default CashChart
