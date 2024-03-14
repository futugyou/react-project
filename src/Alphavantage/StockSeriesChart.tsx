import './chart.css'

import React, { useEffect, useState, useMemo } from "react"

import LineChart from "@cloudscape-design/components/line-chart"
import { Link } from "@cloudscape-design/components"

import _, { isNaN } from 'lodash-es'
import moment from 'moment'

import EmptyChart from '@/Alphavantage/EmptyChart'
import NoMatchChart from '@/Alphavantage/NoMatchChart'
import { useStockSeriesData } from '@/Alphavantage/service'

const numberFormatter = (e: number) => {
    return Intl.NumberFormat('en-US').format(e)
}

const createRoutePath = (title: string, time: Date) => {
    return "#title=" + title + "&month=" + moment(time).format("yyyy-MM-DD hh:mm")
}

const StockSeriesChart = () => {
    const [series, setSeries] = useState<any[]>([])

    const { data: nodeData, refetch: loadSelected, isLoading, isFetching, isError } = useStockSeriesData("IBM", 2001)

    useEffect(() => {
        if (nodeData && !isError) {
            var s: any[] = []
            const sd = _.orderBy(nodeData, a => a.Time)

            for (const key of ["Volume", "Open", "High", "Low", "Close"]) {// "Volume", "Open", "High", "Low", "Close"
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
    }, [nodeData, isError])

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
            empty={Empty}
            noMatch={NoMatch}
            statusType={isLoading ? "loading" : "finished"}
            detailPopoverSeriesContent={({ series, x, y }) => ({
                key: (
                    <Link external={true} href={createRoutePath(series.title, x as Date)}>
                        {series.title}
                    </Link>
                ),
                value: numberFormatter(y)
            })}
        />

    )
}

export default StockSeriesChart
