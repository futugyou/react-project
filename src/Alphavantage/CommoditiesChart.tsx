
import React from "react"

import { useAllCommoditiesData } from '@/Alphavantage/service'
import BaseCommoditiesChart from '@/Alphavantage/BaseCommoditiesChart'

// const TimeIntervals = [
//     { value: "daily", label: "Daily", },
//     { value: "weekly", label: "Weekly", },
//     { value: "monthly", label: "Monthly", },
//     { value: "quarterly", label: "Quarterly", },
//     { value: "annual", label: "Annual", },
// ]
const TimeIntervals = [
    { value: "monthly", label: "Monthly", },
    { value: "daily", label: "Daily", },
]

const UnitTypes = [
    { value: "dollars per barrel", label: "Dollars Per Barrel", },
    { value: "dollars per million BTU", label: "Dollars Per Million BTU", },
    { value: "dollar per metric ton", label: "Dollar Per Metric Ton", },
    { value: "cents per pound", label: "Cents Per Pound", },
]

const CommoditiesChart = () => {
    const { data: nodeData, isLoading, isFetching, isError } = useAllCommoditiesData()

    return (
        <BaseCommoditiesChart
            ChartName="Commodities"
            Data={nodeData}
            IsError={isError}
            IsLoading={isLoading}
            TimeIntervals={TimeIntervals}
            UnitTypes={UnitTypes}
        >
        </BaseCommoditiesChart>
    )
}

export default CommoditiesChart
