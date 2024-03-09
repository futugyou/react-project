
import React from "react"

import { useEarningsData } from "@/Alphavantage/service"
import BaseFundamentalsChart from "@/Alphavantage/BaseFundamentalsChart"

const DataTypes = [
    { value: "ReportedEPS", label: "Reported EPS", },
    { value: "EstimatedEPS", label: "Estimated EPS", },
    { value: "Surprise", label: "Surprise", },
    { value: "SurprisePercentage", label: "Surprise Percentage", },
]

const EarningsChart = () => {
    const { data: nodeData, refetch: loadSelected, isLoading, isFetching, isError } = useEarningsData()

    return (
        <BaseFundamentalsChart
            ChartName="Earnings"
            Data={nodeData}
            IsError={isError}
            IsLoading={isLoading}
            DataTypes={DataTypes}>
        </BaseFundamentalsChart>)
}

export default EarningsChart