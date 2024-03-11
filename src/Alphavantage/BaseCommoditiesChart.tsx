import './chart.css'

import React, { useEffect, useState, useMemo, useCallback } from "react"

import AreaChart from "@cloudscape-design/components/area-chart"
import { Select, SelectProps, DateRangePicker, DateRangePickerProps } from "@cloudscape-design/components"
import { NonCancelableCustomEvent } from "@cloudscape-design/components/internal/events"

import _, { isNaN } from 'lodash-es'
import moment from 'moment'

import EmptyChart from '@/Alphavantage/EmptyChart'
import NoMatchChart from '@/Alphavantage/NoMatchChart'
import { Commodities, CommoditiesEnum } from '@/Alphavantage/model'

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

const formatRelativeRange = (range: DateRangePickerProps.RelativeValue): string => {
    const unit = range.amount === 1 ? range.unit : `${range.unit}s`
    return `Previous ${range.amount} ${unit}`
}

export const i18nStrings: DateRangePickerProps['i18nStrings'] = {
    ariaLabel: 'Filter by a date and time range',
    todayAriaLabel: 'Today',
    nextMonthAriaLabel: 'Next month',
    previousMonthAriaLabel: 'Previous month',
    customRelativeRangeDurationLabel: 'Duration',
    customRelativeRangeDurationPlaceholder: 'Enter duration',
    customRelativeRangeOptionLabel: 'Custom range',
    customRelativeRangeOptionDescription: 'Set a custom range in the past',
    customRelativeRangeUnitLabel: 'Unit of time',
    formatRelativeRange: formatRelativeRange,
    formatUnit: (unit, value) => (value === 1 ? unit : `${unit}s`),
    dateTimeConstraintText: "For date, use YYYY/MM/DD. For time, use 24 hr format.",
    modeSelectionLabel: 'Date range mode',
    relativeModeTitle: 'Relative range',
    absoluteModeTitle: 'Absolute range',
    relativeRangeSelectionHeading: 'Choose a range',
    startDateLabel: 'Start date',
    endDateLabel: 'End date',
    startTimeLabel: 'Start time',
    endTimeLabel: 'End time',
    clearButtonLabel: 'Clear and dismiss',
    cancelButtonLabel: 'Cancel',
    applyButtonLabel: 'Apply',
    errorIconAriaLabel: 'Error',
    renderSelectedAbsoluteRangeAriaLive: (startDate, endDate) => `Range selected from ${startDate} to ${endDate}`,
}

const BaseCommoditiesChart = (props: IBaseCommoditiesChartProp) => {
    const [series, setSeries] = useState<any[]>([])
    const [selectedTimeIntervalsOption, setSelectedTimeIntervalsOption] = useState(props.TimeIntervals[0])
    const [selectedUnitTypesOption, setselectedUnitTypesOption] = useState(props.UnitTypes[0])

    const [startDate, setStartDate] = useState(moment().year(new Date().getFullYear() - 10).dayOfYear(1).toDate())
    const [endDate, setEndDate] = useState(moment().year(new Date().getFullYear() + 1).dayOfYear(0).toDate())
    const [dataRangeValue, setDataRangeValue] = React.useState<DateRangePickerProps.Value | null>({
        type: "relative",
        amount: 10,
        unit: "year"
    })

    let yTitle: string = props.ChartName + " " + selectedTimeIntervalsOption.label + " Data (" + selectedUnitTypesOption.label + ")"

    const HandleTimeIntervalsChange = useCallback((event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
        setSelectedTimeIntervalsOption(event.detail.selectedOption as any)
    }, [])

    const HandleUnitTypesChange = useCallback((event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
        setselectedUnitTypesOption(event.detail.selectedOption as any)
    }, [])

    const HandleDateRangePickerChange = useCallback((event: NonCancelableCustomEvent<DateRangePickerProps.ChangeDetail>) => {
        if (event.detail.value == null) {
            return
        }

        setDataRangeValue(event.detail.value)
        if (event.detail.value.type == "relative") {
            setEndDate(moment().year(new Date().getFullYear() + 1).dayOfYear(0).toDate())
            const amount = event.detail.value?.amount
            let tmp = new Date()
            switch (event.detail.value.unit) {
                case 'day':
                    tmp = moment().day(tmp.getDay() - amount).hour(0).minute(0).second(0).toDate()
                    break
                case 'week':
                    tmp = moment().week(moment().week() - amount).hour(0).minute(0).second(0).toDate()
                    break
                case 'month':
                    tmp = moment().month(tmp.getMonth() - amount).hour(0).minute(0).second(0).toDate()
                    break
                case 'year':
                    tmp = moment().year(tmp.getFullYear() - amount).dayOfYear(1).hour(0).minute(0).second(0).toDate()
                    break
                default:
                    break
            }
            setStartDate(tmp)
        }

        if (event.detail.value.type == "absolute") {
            let start = moment(event.detail.value.startDate)
            let end = moment(event.detail.value.endDate).add(1, "day")
            setStartDate(start.toDate())
            setEndDate(end.toDate())
        }
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
                    <div style={{ width: "300px" }}>
                        <Select
                            options={props.TimeIntervals}
                            selectedOption={selectedTimeIntervalsOption}
                            placeholder={props.ChartName + " Time Intervals Type"}
                            onChange={HandleTimeIntervalsChange}
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
                    <div>
                        <DateRangePicker
                            onChange={HandleDateRangePickerChange}
                            value={dataRangeValue}
                            i18nStrings={i18nStrings}
                            dateOnly
                            expandToViewport
                            hideTimeOffset
                            placeholder="Filter by a date and time range"
                            isValidRange={range => {
                                if (range != null && range.type === 'absolute') {
                                    const [startDateWithoutTime] = range.startDate.split('T')
                                    const [endDateWithoutTime] = range.endDate.split('T')

                                    if (!startDateWithoutTime || !endDateWithoutTime) {
                                        return {
                                            valid: false,
                                            errorMessage: 'The selected date range is incomplete. Select a start and end date for the date range.',
                                        }
                                    }

                                    if (new Date(range.startDate) > new Date(range.endDate)) {
                                        return {
                                            valid: false,
                                            errorMessage: 'The selected date range is invalid. The start date must be before the end date.',
                                        }
                                    }
                                }
                                if (range != null && range.type === 'relative') {
                                    if (range.amount < 1) {
                                        return {
                                            valid: false,
                                            errorMessage: 'The selected date range is invalid. The amount must big than 0.',
                                        }
                                    }
                                }
                                return { valid: true }
                            }}
                            relativeOptions={[]}
                        />
                    </div>
                </div>
            }
        />

    )
}

export default BaseCommoditiesChart
