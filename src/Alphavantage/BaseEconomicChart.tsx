import './chart.css'

import React, { useEffect, useState, useMemo, useCallback } from "react"

import BarChart from "@cloudscape-design/components/bar-chart"
import { Select, SelectProps } from "@cloudscape-design/components"
import { NonCancelableCustomEvent } from "@cloudscape-design/components"

import { map, orderBy, filter, reverse, sortBy, isNaN } from 'lodash-es'
import moment from 'moment'

import EmptyChart from '@/Alphavantage/EmptyChart'
import NoMatchChart from '@/Alphavantage/NoMatchChart'
import { Commodities, EconomicIndicatorsEnum } from '@/Alphavantage/model'
import DateRangePicker from '@/Common/Components/DateRangePicker'

const numberFormatter = (e: number) => {
    return Intl.NumberFormat('en-US').format(e)
}

type EconomicIndicatorsEnumT = keyof typeof EconomicIndicatorsEnum

export interface IBaseEconomicChartProp {
    ChartName: string
    Data: Commodities[][]
    IsError: boolean
    IsLoading: boolean
    TimeIntervals: { value: string, label: string }[]
    UnitTypes: { value: string, label: string }[]
    children?: React.ReactNode
}

const BaseEconomicChart = (props: IBaseEconomicChartProp) => {
    const [series, setSeries] = useState<any[]>([])
    const [selectedTimeIntervalsOption, setSelectedTimeIntervalsOption] = useState(props.TimeIntervals[0])
    const [selectedUnitTypesOption, setselectedUnitTypesOption] = useState(props.UnitTypes[0])

    const [startDate, setStartDate] = useState(moment().year(new Date().getFullYear() - 5).dayOfYear(1).toDate())
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
                const d = map(
                    orderBy(
                        filter(
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
                        title: EconomicIndicatorsEnum[ds[0].DataType as EconomicIndicatorsEnumT],
                        type: "bar",
                        data: d,
                        valueFormatter: numberFormatter
                    })
                }
            }
            s = reverse(sortBy(s, (o) => o.data.length))
            if (s.length == 0) {
                s = [{
                    title: "Real GDP",
                    type: "bar",
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
        <BarChart
            series={series}
            i18nStrings={
                {
                    xTickFormatter: e => {
                        if (e instanceof Date) {
                            if (selectedTimeIntervalsOption.value == "monthly") {
                                return moment(e).format("yyyy-MM")
                            } else {
                                return moment(e).format("yyyy-MM-DD")
                            }
                        }
                        return ""
                    },

                    yTickFormatter: numberFormatter
                }
            }
            detailPopoverSize="large"
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
                                amount: 5,
                                unit: "year"
                            }}>
                        </DateRangePicker>
                    </div>
                </div>
            }
        />

    )
}

export default BaseEconomicChart
