import './chart.css'

import React, { useEffect, useState, useMemo, useCallback } from "react"

import AreaChart from "@cloudscape-design/components/area-chart"
import { Select, SelectProps } from "@cloudscape-design/components"
import { NonCancelableCustomEvent } from "@cloudscape-design/components/internal/events"

import _, { isNaN } from 'lodash-es'
import moment from 'moment'

import EmptyChart from '@/Alphavantage/EmptyChart'
import NoMatchChart from '@/Alphavantage/NoMatchChart'
import { Commodities, CommoditiesEnum } from '@/Alphavantage/model'
import DateRangePicker from '@/Common/DateRangePicker'

const numberFormatter = (e: number) => {
    return Intl.NumberFormat('en-US').format(e)
}

type CommoditiesEnumT = keyof typeof CommoditiesEnum

export interface IBaseCommoditiesChartProp {
    ChartName: string
    Data: Commodities[][]
    IsError: boolean
    IsLoading: boolean
    TimeIntervals: { value: string, label: string }[]
    UnitTypes: { value: string, label: string }[]
    children?: React.ReactNode
}

const BaseCommoditiesChart = (props: IBaseCommoditiesChartProp) => {
    const [series, setSeries] = useState<any[]>([])
    const [selectedTimeIntervalsOption, setSelectedTimeIntervalsOption] = useState(props.TimeIntervals[0])
    const [selectedUnitTypesOption, setselectedUnitTypesOption] = useState(props.UnitTypes[0])

    const [startDate, setStartDate] = useState(moment().year(new Date().getFullYear() - 10).dayOfYear(1).toDate())
    const [endDate, setEndDate] = useState(moment().year(new Date().getFullYear() + 1).dayOfYear(0).toDate())

    let yTitle: string = props.ChartName + " " + selectedTimeIntervalsOption.label + " Data (" + selectedUnitTypesOption.label + ")"

    const HandleTimeIntervalsChange = useCallback((event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
        setSelectedTimeIntervalsOption(event.detail.selectedOption as any)
    }, [])

    const HandleUnitTypesChange = useCallback((event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
        setselectedUnitTypesOption(event.detail.selectedOption as any)
    }, [])

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
                            a => a.Interval == selectedTimeIntervalsOption.value
                                && !isNaN(parseFloat(a.Value))
                                && a.Unit == selectedUnitTypesOption.value
                                && new Date(a.Date) >= startDate
                                && new Date(a.Date) <= endDate
                        ),
                        a => a.Date),
                    a => {
                        return { x: new Date(a.Date), y: parseFloat(a.Value) }
                    })

                if (d.length > 0) {
                    s.push({
                        title: CommoditiesEnum[ds[0].DataType as CommoditiesEnumT],
                        type: "area",
                        data: d,
                        valueFormatter: numberFormatter
                    })
                }
            }
            s = _.reverse(_.sortBy(s, (o) => o.data.length))
            if (s.length == 0) {
                s = [{
                    title: "wti",
                    type: "area",
                    data: [{ x: new Date(), y: 0 }],
                    valueFormatter: numberFormatter
                }]
            }
            setSeries(s)
        }
    }, [props.Data, props.IsLoading, selectedTimeIntervalsOption, selectedUnitTypesOption, startDate, endDate])

    const NoMatch = useMemo(NoMatchChart, [])
    const Empty = useMemo(EmptyChart, [])

    return (
        <AreaChart
            series={series}
            i18nStrings={
                {
                    xTickFormatter: e => {
                        if (e instanceof Date) {
                            if (selectedTimeIntervalsOption.value == "monthly") {
                                return moment(e).format("yyyy-MM")
                            } else {
                                return moment(e).format("yyyy-MM-D")
                            }
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
                    <div className='drop-down-group-item'>
                        <Select
                            options={props.TimeIntervals}
                            selectedOption={selectedTimeIntervalsOption}
                            placeholder={props.ChartName + " Time Intervals Type"}
                            onChange={HandleTimeIntervalsChange}
                        />
                    </div>
                    <div className='drop-down-group-item'>
                        <Select
                            options={props.UnitTypes}
                            selectedOption={selectedUnitTypesOption}
                            placeholder={props.ChartName + " Unit Type"}
                            onChange={HandleUnitTypesChange}
                        />
                    </div>
                    <div className='drop-down-group-item'>
                        <DateRangePicker
                            StartDate={startDate}
                            SetStartDate={setStartDate}
                            EndDate={endDate}
                            SetEndDate={setEndDate}
                            DateOnly
                            InitData={{
                                type: "relative",
                                amount: 10,
                                unit: "year"
                            }}>
                        </DateRangePicker>
                    </div>
                </div>
            }
        />

    )
}

export default BaseCommoditiesChart
