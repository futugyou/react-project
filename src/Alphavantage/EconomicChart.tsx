
import React from "react"

import { useAllEconomicData } from '@/Alphavantage/service'
import BaseEconomicChart from '@/Alphavantage/BaseEconomicChart'

const TimeIntervals = [
    { value: "monthly", label: "Monthly", },
    { value: "quarterly", label: "Quarterly", },
    { value: "annual", label: "Annual", },
    { value: "daily", label: "Daily", },
]

const UnitTypes = [
    { value: "billions of dollars", label: "Billions Of Dollars", },
    { value: "millions of dollars", label: "Millions Of Dollars", },
    { value: "chained 2012 dollars", label: "Chained 2012 Dollars", }, 
    { value: "percent", label: "Percent", }, 
    { value: "index 1982-1984=100", label: "Index 1982-1984=100", }, 
    { value: "thousands of persons", label: "Thousands Of Persons", }, 
]

const EconomicChart = () => {
    const { data: nodeData, isLoading, isFetching, isError } = useAllEconomicData()

    return (
        <BaseEconomicChart
            ChartName="Economic Indicators"
            Data={nodeData}
            IsError={isError}
            IsLoading={isLoading}
            TimeIntervals={TimeIntervals}
            UnitTypes={UnitTypes}
        >
        </BaseEconomicChart>
    )
}

export default EconomicChart
