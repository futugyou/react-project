import React from "react"

import { useExpectedData } from '@/Alphavantage/service'
import BaseFundamentalsChart from '@/Alphavantage/BaseFundamentalsChart'

const DataTypes = [
    { value: "Estimate", label: "Estimate", },
]


const ExpectedChart = () => {
    const { data: nodeData, refetch: loadSelected, isLoading, isFetching, isError } = useExpectedData()

    return (
        <BaseFundamentalsChart
            ChartName="Expected"
            Data={nodeData}
            IsError={isError}
            IsLoading={isLoading}
            DataTypes={DataTypes}
            NoDateGapType={true}>
        </BaseFundamentalsChart>
    )
}

export default ExpectedChart
