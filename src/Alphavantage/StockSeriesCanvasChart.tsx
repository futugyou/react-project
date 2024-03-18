
import React, { useState, useEffect, useRef } from "react"
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-stockcharts'
import moment from 'moment'

import { useStockSeriesDataRange } from '@/Alphavantage/service'
import { StockSeries } from "./model"
import EmptyChart from "./EmptyChart"
import _ from "lodash"

var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart

export interface IStockSeriesCanvasChartProps {
    Symbol?: string
    children?: React.ReactNode
}

const StockSeriesCanvasChart = (props: IStockSeriesCanvasChartProps) => {
    let searchParams = new URLSearchParams(location.search || "")
    let symbol = searchParams.get("symbol") ?? props.Symbol ?? "IBM"
    const [options, setOptions] = useState({})
    const [startDate, setStartDate] = useState(moment().year(2000).dayOfYear(1).toDate())
    const [endDate, setEndDate] = useState(moment().year(new Date().getFullYear()).dayOfYear(0).toDate())
    const { data: nodeData, isLoading, isFetching, isError } = useStockSeriesDataRange(symbol, startDate.getFullYear(), endDate.getFullYear())

    useEffect(() => {
        if (nodeData && !isError) {
            var dps1 = [], dps2 = [], dps3 = []
            let data: StockSeries[] = []
            for (const d of nodeData) {
                if (d != undefined && d.length > 0) {
                    data.push(...d)
                }
            }

            data = _.orderBy(data, a => a.Time)
            for (let i = 0; i < data.length; i++) {
                const d = data[i];
                dps1.push({
                    x: new Date(d.Time),
                    y: [
                        Number(d.Open),
                        Number(d.High),
                        Number(d.Low),
                        Number(d.Close)
                    ]
                })
                dps2.push({ x: new Date(d.Time), y: Number(d.Volume) })
                dps3.push({ x: new Date(d.Time), y: Number(d.Close) })
            }

            setOptions(
                {
                    animationEnabled: true,
                    theme: "light2",
                    subtitles: [{
                        text: symbol + " OHLCV Chart"
                    }],
                    rangeSelector: {
                        enabled: true,
                        selectedRangeButtonIndex: 2,
                    },
                    charts: [{
                        axisX: {
                            lineThickness: 5,
                            tickLength: 0,
                            labelFormatter: (e: any) => "",
                            crosshair: {
                                enabled: true,
                                snapToDataPoint: true,
                                labelFormatter: (e: any) => ""
                            }
                        },
                        axisY: {
                            title: "OHLC",
                            prefix: "$",
                            tickLength: 0
                        },
                        toolTip: {
                            shared: true
                        },
                        data: [{
                            name: "Price (in USD)",
                            yValueFormatString: "$#,###.##",
                            type: "candlestick",
                            dataPoints: dps1
                        }]
                    }, {
                        axisX: {
                            crosshair: {
                                enabled: true,
                                snapToDataPoint: true
                            }
                        },
                        axisY: {
                            title: "Volume",
                            prefix: "$",
                            tickLength: 0
                        },
                        toolTip: {
                            shared: true
                        },
                        data: [{
                            name: "Volume",
                            yValueFormatString: "$#,###.##",
                            type: "column",
                            dataPoints: dps2
                        }]
                    }],
                    navigator: {
                        data: [{
                            dataPoints: dps3
                        }],
                    }
                }
            )
        }
    }, [nodeData, isError])

    const containerProps = {
        width: "100%",
        height: "100%",
        padding: "0px",
        margin: "auto",
    }

    if (isLoading) {
        return <EmptyChart></EmptyChart>
    }

    return (
        <CanvasJSStockChart containerProps={containerProps} options={options} />
    )
}

export default StockSeriesCanvasChart

