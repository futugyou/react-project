import './chart.css'

import React, { useEffect, useState, useMemo, useCallback } from "react"

import AreaChart from "@cloudscape-design/components/area-chart"
import { Select, SelectProps } from "@cloudscape-design/components"
import { NonCancelableCustomEvent } from "@cloudscape-design/components/internal/events"

import _, { isNaN } from 'lodash-es'
import moment from 'moment'

import EmptyChart from '@/Alphavantage/EmptyChart'
import NoMatchChart from '@/Alphavantage/NoMatchChart'
import { Commodities } from '@/Alphavantage/model'

const numberFormatter = (e: number) => {
    return Intl.NumberFormat('en-US').format(e)
}

const createRoutePath = (title: string, time: Date) => {
    return "#title=" + title + "&month=" + moment(time).format("yyyy-MM")
}

export interface IBaseCommoditiesCharttProp {
    ChartName: string
    Data: Commodities[][]
    IsError: boolean
    IsLoading: boolean
    TimeIntervals: { value: string, label: string }[]
    UnitTypes: { value: string, label: string }[]
    children?: React.ReactNode
}

const BaseCommoditiesChart = (props: IBaseCommoditiesCharttProp) => {
    const [series, setSeries] = useState<any[]>([])
    const [visibleSeries, setVisibleSeries] = useState<any[]>([])
    const [selectedDataGapTypeOption, setSelectedDataGapTypeOption] = useState(props.TimeIntervals[0])
    const [selectedUnitTypesOption, setselectedUnitTypesOption] = useState(props.UnitTypes[0])

    let yTitle: string = props.ChartName + " " + selectedDataGapTypeOption.label + " Data (" + selectedUnitTypesOption.label + ")"

    const HandleDataGapTypeChange = useCallback((event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
        setSelectedDataGapTypeOption(event.detail.selectedOption as any)
    }, [])

    const HandleUnitTypesChange = useCallback((event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
        setselectedUnitTypesOption(event.detail.selectedOption as any)
    }, [])

    const HandleFilterChange = useCallback(({ detail }: { detail: any }) => {
        setVisibleSeries(detail.visibleSeries)
    }, []);

    useEffect(() => {
        if (props.Data && !props.IsLoading) {
            var s: any[] = []
            for (const ds of props.Data) {
                if (ds.length < 1) {
                    continue
                }
                const d = _.map(
                    _.orderBy(
                        _.filter(
                            ds,
                            a => a.Interval == selectedDataGapTypeOption.value
                                && !isNaN(parseFloat(a.Value))
                                && a.Unit == selectedUnitTypesOption.value
                        ),
                        a => a.Date),
                    a => {
                        return { x: new Date(a.Date), y: parseFloat(a.Value) }
                    })

                if (d.length > 0) {
                    s.push({
                        title: ds[0].DataType,
                        type: "area",
                        data: d,
                        valueFormatter: numberFormatter
                    })
                }
            }
            s = _.reverse(_.sortBy(s, (o) => o.data.length))
            setSeries(s)
            setVisibleSeries(s)
        }
    }, [props.Data, props.IsLoading, selectedDataGapTypeOption, selectedUnitTypesOption])

    const NoMatch = useMemo(NoMatchChart, [])
    const Empty = useMemo(EmptyChart, [])

    return (
        <AreaChart
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
            detailPopoverSize="large"
            xScaleType="time"
            yTitle={yTitle}
            empty={Empty}
            noMatch={NoMatch}
            statusType={props.IsLoading ? "loading" : "finished"}
            additionalFilters={
                <div className='drop-down-group'>
                    <div style={{ width: "300px" }}>
                        <Select
                            options={props.TimeIntervals}
                            selectedOption={selectedDataGapTypeOption}
                            placeholder={props.ChartName + " Data Gap Type"}
                            onChange={HandleDataGapTypeChange}
                        />
                    </div>
                    <div style={{ width: "300px" }}>
                        <Select
                            options={props.UnitTypes}
                            selectedOption={selectedUnitTypesOption}
                            placeholder={props.ChartName + " Unit Type"}
                            onChange={HandleUnitTypesChange}
                        />
                    </div>
                </div>
            }
            onFilterChange={HandleFilterChange}
        />

    )
}

export default BaseCommoditiesChart
