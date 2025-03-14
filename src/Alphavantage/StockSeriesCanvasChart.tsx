
import React, { useState, useEffect } from "react"

import CanvasJSReact from '@/@types/canvasjs/canvasjs.react'
import moment from 'moment'
import { orderBy } from "lodash"

import { useStockSeriesDataRange } from '@/Alphavantage/service'
import { StockSeries } from "./model"
import Loading from "@/Common/Components/Loading"

var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart

export interface IStockSeriesCanvasChartProps {
    Symbol?: string
    children?: React.ReactNode
}

const StockSeriesCanvasChart = (props: IStockSeriesCanvasChartProps) => {
    let searchParams = new URLSearchParams(location.search || "")
    let symbol = searchParams.get("symbol") ?? props.Symbol ?? "IBM"
    const startDate = moment().year(2000).dayOfYear(1).toDate()
    const endDate = moment().year(new Date().getFullYear() + 1).dayOfYear(0).toDate()

    const [options, setOptions] = useState({})
    const { data: nodeData, isLoading, isFetching, isError } = useStockSeriesDataRange(symbol, startDate.getFullYear(), endDate.getFullYear())

    useEffect(() => {
        if (nodeData && !isError) {
            let lastDay = new Date()
            var dps1 = [], dps2 = [], dps3 = []
            let data: StockSeries[] = []
            for (const d of nodeData) {
                if (d != undefined && d.length > 0) {
                    data.push(...d)
                }
            }

            data = orderBy(data, a => a.Time)
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
                lastDay = d.Time
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
                        // selectedRangeButtonIndex: 2,
                        inputFields: {
                            startValue: moment(lastDay).add(-7, "day").toDate(),
                            endValue: new Date(lastDay)
                        },
                        verticalAlign: "bottom",
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
                        dynamicUpdate: true,
                        animationEnabled: true,
                        data: [{
                            dataPoints: dps3
                        }],
                        slider: {
                            outlineInverted: true,
                        }
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
        return <Loading></Loading>
    }

    return (
        <CanvasJSStockChart containerProps={containerProps} options={options} />
    )
}

export default StockSeriesCanvasChart

