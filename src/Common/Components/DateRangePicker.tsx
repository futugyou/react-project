


import DateRangePicker, { DateRangePickerProps } from "@cloudscape-design/components/date-range-picker"
import { NonCancelableCustomEvent } from "@cloudscape-design/components"
import moment from "moment"
import React, { useCallback, useState } from "react"
import { dateRangeDateOnlyI18nStrings, dateRangeI18nStrings } from "./i18n"

interface DateRangePickerItem {
    StartDate: Date
    SetStartDate: React.Dispatch<React.SetStateAction<Date>>
    EndDate: Date
    SetEndDate: React.Dispatch<React.SetStateAction<Date>>
    DateOnly?: boolean
    InitData?: DateRangePickerProps.Value
    children?: React.ReactNode
}

const DateRangePickerEx = (prop: DateRangePickerItem) => {
    let i18n = prop.DateOnly ? dateRangeDateOnlyI18nStrings : dateRangeI18nStrings

    let initData = prop.InitData ?? {
        type: "absolute",
        startDate: prop.DateOnly ? moment(prop.StartDate).format("yyyy-MM-DD") : prop.StartDate.toISOString(),
        endDate: prop.DateOnly ? moment(prop.EndDate).format("yyyy-MM-DD") : prop.EndDate.toISOString(),
    }

    const [dataRangeValue, setDataRangeValue] = useState<DateRangePickerProps.Value>(initData)

    const HandleDateRangePickerChange = useCallback((event: NonCancelableCustomEvent<DateRangePickerProps.ChangeDetail>) => {
        if (event.detail.value == null) {
            return
        }

        setDataRangeValue(event.detail.value)
        if (event.detail.value.type == "relative") {
            prop.SetEndDate(moment().year(new Date().getFullYear() + 1).dayOfYear(0).toDate())
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
            prop.SetStartDate(tmp)
        }

        if (event.detail.value.type == "absolute") {
            let start = moment(event.detail.value.startDate)
            let end = moment(event.detail.value.endDate).add(1, "day")
            prop.SetStartDate(start.toDate())
            prop.SetEndDate(end.toDate())
        }
    }, [])

    return (
        <DateRangePicker
            onChange={HandleDateRangePickerChange}
            value={dataRangeValue}
            i18nStrings={i18n}
            dateOnly={prop.DateOnly}
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
    )
}

export default DateRangePickerEx