import './chart.css'

import React, { useState } from "react"

import moment from 'moment'

import BaseStockSeriesChart from '@/Alphavantage/BaseStockSeriesChart'
import { useStockSeriesDataRange } from '@/Alphavantage/service'

export interface IStockSeriesChartProps {
    Symbol?: string
    children?: React.ReactNode
}

const StockSeriesChart = (props: IStockSeriesChartProps) => {
    let searchParams = new URLSearchParams(location.search || "")
    let symbol = searchParams.get("symbol") ?? props.Symbol ?? "IBM"
    const [startDate, setStartDate] = useState(moment().year(2000).dayOfYear(1).toDate())
    const [endDate, setEndDate] = useState(moment().year(2005).dayOfYear(0).toDate())
    const { data: nodeData, isLoading, isFetching, isError } = useStockSeriesDataRange(symbol, startDate.getFullYear(), endDate.getFullYear())

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
                Colnum={["Volume"]}
                Symbol={symbol}>
            </BaseStockSeriesChart>
            <BaseStockSeriesChart
                StartDate={startDate}
                SetStartDate={setStartDate}
                EndDate={endDate}
                SetEndDate={setEndDate}
                NodeData={nodeData}
                IsLoading={isLoading}
                IsError={isError}
                Colnum={["Open", "High", "Low", "Close"]}
                Symbol={symbol}>
            </BaseStockSeriesChart>
        </div>

    )
}

export default StockSeriesChart
