import { forwardRef, useMemo } from "react"

import AreaChart from "@cloudscape-design/components/area-chart"

import EmptyChart from '@/Alphavantage/EmptyChart'
import NoMatchChart from '@/Alphavantage/NoMatchChart'

export interface IAreaChartProps {
    series: any[]
    xTitle?: string
    yTitle?: string
    i18nStrings?: any
    filters?: React.ReactNode
    children?: React.ReactNode
    isLoading: boolean
}

const CustomAreaChart = forwardRef((props: IAreaChartProps, ref) => {
    const NoMatch = useMemo(NoMatchChart, [])
    const Empty = useMemo(EmptyChart, [])

    return (
        <AreaChart
            series={props.series}
            i18nStrings={props.i18nStrings}
            detailPopoverSize="large"
            xScaleType="time"
            yTitle={props.yTitle}
            empty={Empty}
            noMatch={NoMatch}
            statusType={props.isLoading ? "loading" : "finished"}
            additionalFilters={props.filters}
        />)
})

export default CustomAreaChart
