import './chart.css'

import React, { useEffect, useState, useMemo, useCallback } from "react"

import LineChart from "@cloudscape-design/components/line-chart"
import { Link, Select, SelectProps } from "@cloudscape-design/components"
import { NonCancelableCustomEvent } from "@cloudscape-design/components/internal/events"

import _, { isNaN } from 'lodash-es'
import moment from 'moment'

import EmptyChart from '@/Alphavantage/EmptyChart'
import NoMatchChart from '@/Alphavantage/NoMatchChart'

const numberFormatter = (e: number) => {
    return Intl.NumberFormat('en-US').format(e)
}

const createRoutePath = (title: string, time: Date) => {
    return "#title=" + title + "&month=" + moment(time).format("yyyy-MM")
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
    const [series, setSeries] = useState<any[]>([])
    const [visibleSeries, setVisibleSeries] = useState<any[]>([])
    const [selectedDataTypeOption, setSelectedDataTypeOption] = useState(props.DataTypes[0])
    const [selectedDataGapTypeOption, setSelectedDataGapTypeOption] = useState(TimeIntervals[0])

    let yTitle: string = props.ChartName + " " + selectedDataGapTypeOption.label + " (" + selectedDataTypeOption.label + ") Data (USD)"
    if (props.NoDateGapType) {
        yTitle = props.ChartName + " (" + selectedDataTypeOption.label + ") Data (USD)"
    }

    const HandleDataTypeChange = useCallback((event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
        setSelectedDataTypeOption(event.detail.selectedOption as any)
    }, [])

    const HandleDataGapTypeChange = useCallback((event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
        setSelectedDataGapTypeOption(event.detail.selectedOption as any)
    }, [])

    const HandleFilterChange = useCallback(({ detail }: { detail: any }) => {
        setVisibleSeries(detail.visibleSeries)
    }, []);

    useEffect(() => {
        if (props.Data && !props.IsError) {
            const dic = _.groupBy(props.Data, 'Symbol')
            var s: any[] = []
            for (const key in dic) {
                const d = _.map(
                    _.orderBy(
                        _.filter(
                            dic[key],
                            a => (props.NoDateGapType == true || a.DataType == selectedDataGapTypeOption.value) && !isNaN(parseFloat(_.get(a, selectedDataTypeOption.value)))
                        ),
                        a => a.FiscalDateEnding),
                    a => {
                        let va = parseFloat(_.get(a, selectedDataTypeOption.value))
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
    }, [props.Data, props.IsError, selectedDataTypeOption, selectedDataGapTypeOption])

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
                        <div style={{ width: "300px" }}>
                            <Select
                                options={props.DataTypes}
                                selectedOption={selectedDataTypeOption}
                                placeholder={props.ChartName + " Data Type"}
                                onChange={HandleDataTypeChange}
                            />
                        </div>
                    )}
                    {!props.NoDateGapType && (
                        <div style={{ width: "300px" }}>
                            <Select
                                options={TimeIntervals}
                                selectedOption={selectedDataGapTypeOption}
                                placeholder={props.ChartName + " Data Gap Type"}
                                onChange={HandleDataGapTypeChange}
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
