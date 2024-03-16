import './chart.css'

import React, { useEffect, useState, useMemo } from "react"

import LineChart from "@cloudscape-design/components/line-chart"
import { Link } from "@cloudscape-design/components"

import _ from 'lodash-es'
import moment from 'moment'

import EmptyChart from '@/Alphavantage/EmptyChart'
import NoMatchChart from '@/Alphavantage/NoMatchChart'
import { StockSeries } from '@/Alphavantage/model'
import DateRangePicker from '@/Common/DateRangePicker'

const numberFormatter = (e: number) => {
    return Intl.NumberFormat('en-US').format(e)
}

const createRoutePath = (symbol: string) => {
    return '/e/news?symbol=' + symbol
}

export interface IBaseStockSeriesChartProp {
    StartDate: Date
    SetStartDate: React.Dispatch<React.SetStateAction<Date>>
    EndDate: Date
    SetEndDate: React.Dispatch<React.SetStateAction<Date>>
    NodeData: StockSeries[][]
    IsLoading: boolean
    IsError: boolean
    Colnum: string[]
    Symbol: string
    children?: React.ReactNode
}

const BaseStockSeriesChart = (props: IBaseStockSeriesChartProp) => {
    const [series, setSeries] = useState<any[]>([])

    useEffect(() => {
        if (props.NodeData && !props.IsError) {
            var s: any[] = []
            let data: StockSeries[] = []
            for (const d of props.NodeData) {
                if (d != undefined && d.length > 0) {
                    data.push(...d)
                }
            }
            const sd = _.orderBy(data, a => a.Time)

            for (const key of props.Colnum) {
                const d = _.map(
                    sd,
                    a => {
                        let va = parseFloat(_.get(a, key))
                        return { x: new Date(a.Time), y: va }
                    })

                s.push({
                    title: key,
                    type: "line",
                    data: d,
                    valueFormatter: numberFormatter
                })
            }

            if (s.length == 0) {
                s = [{
                    title: "Volume",
                    type: "line",
                    data: [{ x: new Date(), y: 0 }],
                    valueFormatter: numberFormatter
                }]
            }

            setSeries(s)
        }
    }, [props.NodeData, props.IsError, props.StartDate, props.EndDate])

    const NoMatch = useMemo(NoMatchChart, [])
    const Empty = useMemo(EmptyChart, [])

    return (
        <LineChart
            series={series}
            i18nStrings={
                {
                    xTickFormatter: e => {
                        if (e instanceof Date) {
                            return moment(e).format("yyyy-MM-DD hh:mm")
                        }
                        return ""
                    },

                    yTickFormatter: numberFormatter
                }
            }
            xScaleType="time"
            yScaleType='linear'
            fitHeight={true}
            empty={Empty}
            noMatch={NoMatch}
            statusType={props.IsLoading ? "loading" : "finished"}
            detailPopoverSeriesContent={({ series, x, y }) => ({
                key: (
                    <Link external={true} href={createRoutePath(props.Symbol)}>
                        {series.title}
                    </Link>
                ),
                value: numberFormatter(y)
            })}
            additionalFilters={
                <div className='drop-down-group'>
                    <div>
                        <DateRangePicker
                            StartDate={props.StartDate}
                            SetStartDate={props.SetStartDate}
                            EndDate={props.EndDate}
                            SetEndDate={props.SetEndDate}
                            DateOnly
                            InitData={{
                                type: "absolute",
                                startDate: moment(props.StartDate).format("yyyy-MM-DD"),
                                endDate: moment(props.EndDate).format("yyyy-MM-DD"),
                            }}>
                        </DateRangePicker>
                    </div>
                </div>
            }
        />

    )
}

export default BaseStockSeriesChart
