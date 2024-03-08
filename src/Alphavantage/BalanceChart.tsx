import React, { useEffect, useState, useMemo } from "react"

import LineChart from "@cloudscape-design/components/line-chart"
import { Link } from "@cloudscape-design/components"

import _ from 'lodash-es'
import moment from 'moment'

import { useBalanceData } from '@/Alphavantage/service'
import EmptyChart from '@/Alphavantage/EmptyChart'
import NoMatchChart from '@/Alphavantage/NoMatchChart'

const numberFormatter = (e: number) => {
    return Intl.NumberFormat('en-US').format(e)
}

const createRoutePath = (title: string, time: Date) => {
    return "#title=" + title + "&month=" + moment(time).format("yyyy-MM")
}

const BalanceChart = () => {
    const { data: nodeData, refetch: loadSelected, isLoading, isFetching, isError } = useBalanceData()
    const [Series, SetSeries] = useState<any[]>([])

    useEffect(() => {
        if (nodeData && !isError) {
            const dic = _.groupBy(nodeData, 'Symbol')
            var s: any[] = []
            for (const key in dic) {
                const d = _.map(_.orderBy(_.filter(dic[key], a => a.DataType == "Quarterly"), a => a.FiscalDateEnding),
                    a => { return { x: new Date(a.FiscalDateEnding), y: parseFloat(a.TotalAssets) } })
                s.push({
                    title: key,
                    type: "line",
                    data: d,
                    valueFormatter: numberFormatter
                })
            }

            SetSeries(s)
        } else {
            SetSeries([])
        }
    }, [nodeData, isError])

    const NoMatch = useMemo(NoMatchChart, [])
    const Empty = useMemo(EmptyChart, [])

    return (
        <LineChart
            series={Series}
            i18nStrings={
                {
                    xTickFormatter: e => {
                        if (e instanceof Date) {
                            return moment(e).format("yyyy-MM")
                        }
                        return ""
                    },

                    yTickFormatter: numberFormatter
                }
            }
            xScaleType="time"
            xTitle="Quarterly"
            yTitle="Balance Quarterly Data (USD)"
            empty={Empty}
            noMatch={NoMatch}
            statusType={isLoading ? "loading" : "finished"}
            detailPopoverSeriesContent={({ series, x, y }) => ({
                key: (
                    <Link external={true} href={createRoutePath(series.title,x as Date)}>
                        {series.title}
                    </Link>
                ),
                value: numberFormatter(y)
            })}
        />
    )
}

export default BalanceChart
