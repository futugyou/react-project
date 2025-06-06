import './chart.css'

import React, { useEffect, useState, useMemo, useCallback } from "react"

import LineChart from "@cloudscape-design/components/line-chart"
import { Link, Select, SelectProps } from "@cloudscape-design/components"
import { NonCancelableCustomEvent } from "@cloudscape-design/components"

import { map, orderBy, filter, groupBy, get, isNaN } from 'lodash-es'
import moment from 'moment'

import EmptyChart from '@/Alphavantage/EmptyChart'
import NoMatchChart from '@/Alphavantage/NoMatchChart'

const numberFormatter = (e: number) => {
    return Intl.NumberFormat('en-US').format(e)
}

const createRoutePath = (title: string, time: Date) => {
    // return "#title=" + title + "&month=" + moment(time).format("yyyy-MM")
    return '/e/news?symbol=' + title
}

const TimeIntervals = [
    { value: "Quarterly", label: "Quarterly", },
    { value: "Annual", label: "Annual", },
]

export interface IBaseFundamentalsChartProp {
    ChartName: string
    Data: any[]
    IsError: boolean
    IsLoading: boolean
    DataTypes: { value: string, label: string }[]
    NoDateGapType?: boolean
    children?: React.ReactNode
}

const BaseFundamentalsChart = (props: IBaseFundamentalsChartProp) => {
    let searchParams = new URLSearchParams(location.search || "")
    let symbol = searchParams.get("symbol") ?? ""

    const [series, setSeries] = useState<any[]>([])
    const [visibleSeries, setVisibleSeries] = useState<any[]>([])
    const [selectedDataTypeOption, setSelectedDataTypeOption] = useState(props.DataTypes[0])
    const [selectedTimeIntervalsOption, setSelectedTimeIntervalsOption] = useState(TimeIntervals[0])

    let yTitle: string = props.ChartName + " " + selectedTimeIntervalsOption.label + " (" + selectedDataTypeOption.label + ") Data (USD)"
    if (props.NoDateGapType) {
        yTitle = props.ChartName + " (" + selectedDataTypeOption.label + ") Data (USD)"
    }

    const HandleDataTypeChange = useCallback((event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
        setSelectedDataTypeOption(event.detail.selectedOption as any)
    }, [])

    const HandleTimeIntervalsChange = useCallback((event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
        setSelectedTimeIntervalsOption(event.detail.selectedOption as any)
    }, [])

    const HandleFilterChange = useCallback(({ detail }: { detail: any }) => {
        setVisibleSeries(detail.visibleSeries)
    }, []);

    useEffect(() => {
        if (props.Data && !props.IsError) {
            let data = props.Data
            if (symbol != "") {
                data = filter(data, a => a.Symbol == symbol)
            }

            const dic = groupBy(data, 'Symbol')
            var s: any[] = []
            for (const key in dic) {
                const d = map(
                    orderBy(
                        filter(
                            dic[key],
                            a => (props.NoDateGapType == true || a.DataType == selectedTimeIntervalsOption.value) && !isNaN(parseFloat(get(a, selectedDataTypeOption.value)))
                        ),
                        a => a.FiscalDateEnding),
                    a => {
                        let va = parseFloat(get(a, selectedDataTypeOption.value))
                        return { x: new Date(a.FiscalDateEnding), y: va }
                    })

                s.push({
                    title: key,
                    type: "line",
                    data: d,
                    valueFormatter: numberFormatter
                })
            }

            setSeries(s)
            setVisibleSeries(s)
        } else {
            setSeries([])
            setVisibleSeries([])
        }
    }, [props.Data, props.IsError, selectedDataTypeOption, selectedTimeIntervalsOption])

    const NoMatch = useMemo(NoMatchChart, [])
    const Empty = useMemo(EmptyChart, [])

    return (
        <LineChart
            series={series}
            visibleSeries={visibleSeries}
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
            yTitle={yTitle}
            empty={Empty}
            noMatch={NoMatch}
            statusType={props.IsLoading ? "loading" : "finished"}
            detailPopoverSeriesContent={({ series, x, y }) => ({
                key: (
                    <Link external={true} href={createRoutePath(series.title, x as Date)}>
                        {series.title}
                    </Link>
                ),
                value: numberFormatter(y)
            })}
            additionalFilters={
                <div className='drop-down-group'>
                    {props.DataTypes.length > 1 && (
                        <div className='drop-down-group-item'>
                            <Select
                                options={props.DataTypes}
                                selectedOption={selectedDataTypeOption}
                                placeholder={props.ChartName + " Data Type"}
                                onChange={HandleDataTypeChange}
                            />
                        </div>
                    )}
                    {!props.NoDateGapType && (
                        <div className='drop-down-group-item'>
                            <Select
                                options={TimeIntervals}
                                selectedOption={selectedTimeIntervalsOption}
                                placeholder={props.ChartName + " Time Intervals Type"}
                                onChange={HandleTimeIntervalsChange}
                            />
                        </div>
                    )}
                </div>
            }
            onFilterChange={HandleFilterChange}
        />

    )
}

export default BaseFundamentalsChart
