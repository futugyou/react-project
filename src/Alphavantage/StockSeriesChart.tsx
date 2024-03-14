import './chart.css'

import React, { useState } from "react"

import moment from 'moment'

import BaseStockSeriesChart from '@/Alphavantage/BaseStockSeriesChart'
import { useStockSeriesDataRange } from '@/Alphavantage/service'

const StockSeriesChart = () => {
    const [startDate, setStartDate] = useState(moment().year(2000).dayOfYear(1).toDate())
    const [endDate, setEndDate] = useState(moment().year(2005).dayOfYear(0).toDate())
    const { data: nodeData, isLoading, isFetching, isError } = useStockSeriesDataRange("IBM", startDate.getFullYear(), endDate.getFullYear())

    return (
        <div className='stock-series'>
            <BaseStockSeriesChart
                StartDate={startDate}
                SetStartDate={setStartDate}
                EndDate={endDate}
                SetEndDate={setEndDate}
                NodeData={nodeData}
                IsLoading={isLoading}
                IsError={isError}
                Colnum={["Volume"]}>
            </BaseStockSeriesChart>
            <BaseStockSeriesChart
                StartDate={startDate}
                SetStartDate={setStartDate}
                EndDate={endDate}
                SetEndDate={setEndDate}
                NodeData={nodeData}
                IsLoading={isLoading}
                IsError={isError}
                Colnum={["Open", "High", "Low", "Close"]}>
            </BaseStockSeriesChart>
        </div>

    )
}

export default StockSeriesChart
