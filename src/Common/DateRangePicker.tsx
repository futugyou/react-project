import DateRangePicker, { DateRangePickerProps } from "@cloudscape-design/components/date-range-picker"
import { NonCancelableEventHandler } from "@cloudscape-design/components/internal/events"



const formatRelativeRange = (range: DateRangePickerProps.RelativeValue): string => {
    const unit = range.amount === 1 ? range.unit : `${range.unit}s`
    return `Previous ${range.amount} ${unit}`
}

const i18nStrings: DateRangePickerProps['i18nStrings'] = {
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
    dateTimeConstraintText: "For date, use YYYY/MM/DD hh:mm:ss",
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

const i18nStringsDateOnly: DateRangePickerProps['i18nStrings'] = { ...i18nStrings, dateTimeConstraintText: "For date, use YYYY/MM/DD", }

interface DateRangePickerItem {
    OnChange: NonCancelableEventHandler<DateRangePickerProps.ChangeDetail>
    Value: DateRangePickerProps.Value
    DateOnly?: boolean
}

const DateRangePickerEx = (prop: DateRangePickerItem) => {
    let i18n = prop.DateOnly ? i18nStringsDateOnly : i18nStrings

    return (
        <DateRangePicker
            onChange={prop.OnChange}
            value={prop.Value}
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