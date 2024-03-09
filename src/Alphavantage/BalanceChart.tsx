import React, { useEffect, useState, useMemo } from "react"

import LineChart from "@cloudscape-design/components/line-chart"
import { Link, Select, SelectProps } from "@cloudscape-design/components"

import _, { isNaN } from 'lodash-es'
import moment from 'moment'

import { useBalanceData } from '@/Alphavantage/service'
import EmptyChart from '@/Alphavantage/EmptyChart'
import NoMatchChart from '@/Alphavantage/NoMatchChart'
import Dropdown, { DropdownItem } from "@/Common/Dropdown"
import { NonCancelableCustomEvent, NonCancelableEventHandler } from "@cloudscape-design/components/internal/events"

const numberFormatter = (e: number) => {
    return Intl.NumberFormat('en-US').format(e)
}

const createRoutePath = (title: string, time: Date) => {
    return "#title=" + title + "&month=" + moment(time).format("yyyy-MM")
}

const dataTypes = [
    { value: "TotalAssets", label: "TotalAssets", },
    { value: "TotalCurrentAssets", label: "TotalCurrentAssets", },
    { value: "CashAndCashEquivalentsAtCarryingValue", label: "CashAndCashEquivalentsAtCarryingValue", },
    { value: "CashAndShortTermInvestments", label: "CashAndShortTermInvestments", },
    { value: "Inventory", label: "Inventory", },
    { value: "CurrentNetReceivables", label: "CurrentNetReceivables", },
    { value: "TotalNonCurrentAssets", label: "TotalNonCurrentAssets", },
    { value: "PropertyPlantEquipment", label: "PropertyPlantEquipment", },
    { value: "AccumulatedDepreciationAmortizationPPE", label: "AccumulatedDepreciationAmortizationPPE", },
    { value: "IntangibleAssets", label: "IntangibleAssets", },
    { value: "IntangibleAssetsExcludingGoodwill", label: "IntangibleAssetsExcludingGoodwill", },
    { value: "Goodwill", label: "Goodwill", },
    { value: "Investments", label: "Investments", },
    { value: "LongTermInvestments", label: "LongTermInvestments", },
    { value: "ShortTermInvestments", label: "ShortTermInvestments", },
    { value: "OtherCurrentAssets", label: "OtherCurrentAssets", },
    { value: "OtherNonCurrentAssets", label: "OtherNonCurrentAssets", },
    { value: "TotalLiabilities", label: "TotalLiabilities", },
    { value: "TotalCurrentLiabilities", label: "TotalCurrentLiabilities", },
    { value: "CurrentAccountsPayable", label: "CurrentAccountsPayable", },
    { value: "DeferredRevenue", label: "DeferredRevenue", },
    { value: "CurrentDebt", label: "CurrentDebt", },
    { value: "ShortTermDebt", label: "ShortTermDebt", },
    { value: "TotalNonCurrentLiabilities", label: "TotalNonCurrentLiabilities", },
    { value: "CapitalLeaseObligations", label: "CapitalLeaseObligations", },
    { value: "LongTermDebt", label: "LongTermDebt", },
    { value: "CurrentLongTermDebt", label: "CurrentLongTermDebt", },
    { value: "LongTermDebtNoncurrent", label: "LongTermDebtNoncurrent", },
    { value: "ShortLongTermDebtTotal", label: "ShortLongTermDebtTotal", },
    { value: "OtherCurrentLiabilities", label: "OtherCurrentLiabilities", },
    { value: "OtherNonCurrentLiabilities", label: "OtherNonCurrentLiabilities", },
    { value: "TotalShareholderEquity", label: "TotalShareholderEquity", },
    { value: "TreasuryStock", label: "TreasuryStock", },
    { value: "RetainedEarnings", label: "RetainedEarnings", },
    { value: "CommonStock", label: "CommonStock", },
    { value: "CommonStockSharesOutstanding", label: "CommonStockSharesOutstanding", }
]

const BalanceChart = () => {
    const { data: nodeData, refetch: loadSelected, isLoading, isFetching, isError } = useBalanceData()
    const [Series, SetSeries] = useState<any[]>([])
    const [selectedDataTypeOption, setSelectedDataTypeOption] = useState({ value: "TotalAssets", label: "TotalAssets", })

    const HandleDataTypeChange = (event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
        setSelectedDataTypeOption(event.detail.selectedOption as any)
    }

    useEffect(() => {
        if (nodeData && !isError) {
            const dic = _.groupBy(nodeData, 'Symbol')
            var s: any[] = []
            for (const key in dic) {
                const d = _.map(
                    _.orderBy(
                        _.filter(
                            dic[key],
                            a => a.DataType == "Quarterly" // && !isNaN(parseFloat(_.get(a, selectedDataTypeOption.value)))
                        ),
                        a => a.FiscalDateEnding),
                    a => {
                        let va = parseFloat(_.get(a, selectedDataTypeOption.value))
                        if (isNaN(va)) {
                            va = 0
                        }
                        return { x: new Date(a.FiscalDateEnding), y: va }
                    })

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
    }, [nodeData, isError, selectedDataTypeOption])

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
            yTitle={"Balance Quarterly " + selectedDataTypeOption.label + " Data (USD)"}
            empty={Empty}
            noMatch={NoMatch}
            statusType={isLoading ? "loading" : "finished"}
            detailPopoverSeriesContent={({ series, x, y }) => ({
                key: (
                    <Link external={true} href={createRoutePath(series.title, x as Date)}>
                        {series.title}
                    </Link>
                ),
                value: numberFormatter(y)
            })}
            additionalFilters={
                <div style={{ padding: "4px", width: "300px" }}>
                    <Select
                        options={dataTypes}
                        selectedOption={selectedDataTypeOption}
                        placeholder="Balance Data Type"
                        onChange={HandleDataTypeChange}
                    />
                </div>
            }
        />

    )
}

export default BalanceChart
