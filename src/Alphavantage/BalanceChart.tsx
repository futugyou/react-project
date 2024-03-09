import './chart.css'

import React, { useEffect, useState, useMemo, useCallback } from "react"

import LineChart from "@cloudscape-design/components/line-chart"
import { AreaChartProps, Link, Select, SelectProps } from "@cloudscape-design/components"

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
    { value: "TotalAssets", label: "Total Assets", },
    { value: "TotalCurrentAssets", label: "Total Current Assets", },
    { value: "CashAndCashEquivalentsAtCarryingValue", label: "Cash And Cash Equivalents At Carrying Value", },
    { value: "CashAndShortTermInvestments", label: "Cash And Short Term Investments", },
    { value: "Inventory", label: "Inventory", },
    { value: "CurrentNetReceivables", label: "Current Net Receivables", },
    { value: "TotalNonCurrentAssets", label: "Total Non Current Assets", },
    { value: "PropertyPlantEquipment", label: "Property Plant Equipment", },
    { value: "AccumulatedDepreciationAmortizationPPE", label: "Accumulated Depreciation Amortization PPE", },
    { value: "IntangibleAssets", label: "Intangible Assets", },
    { value: "IntangibleAssetsExcludingGoodwill", label: "Intangible Assets Excluding Goodwill", },
    { value: "Goodwill", label: "Goodwill", },
    { value: "Investments", label: "Investments", },
    { value: "LongTermInvestments", label: "Long Term Investments", },
    { value: "ShortTermInvestments", label: "Short Term Investments", },
    { value: "OtherCurrentAssets", label: "Other Current Assets", },
    { value: "OtherNonCurrentAssets", label: "Other Non CurrentAssets", },
    { value: "TotalLiabilities", label: "Total Liabilities", },
    { value: "TotalCurrentLiabilities", label: "Total Current Liabilities", },
    { value: "CurrentAccountsPayable", label: "Current Accounts Payable", },
    { value: "DeferredRevenue", label: "Deferred Revenue", },
    { value: "CurrentDebt", label: "Current Debt", },
    { value: "ShortTermDebt", label: "Short Term Debt", },
    { value: "TotalNonCurrentLiabilities", label: "Total Non Current Liabilities", },
    { value: "CapitalLeaseObligations", label: "Capital Lease Obligations", },
    { value: "LongTermDebt", label: "Long Term Debt", },
    { value: "CurrentLongTermDebt", label: "Current Long Term Debt", },
    { value: "LongTermDebtNoncurrent", label: "Long Term Debt Noncurrent", },
    { value: "ShortLongTermDebtTotal", label: "Short Long Term Debt Total", },
    { value: "OtherCurrentLiabilities", label: "Other Current Liabilities", },
    { value: "OtherNonCurrentLiabilities", label: "Other Non Current Liabilities", },
    { value: "TotalShareholderEquity", label: "Total Shareholder Equity", },
    { value: "TreasuryStock", label: "Treasury Stock", },
    { value: "RetainedEarnings", label: "Retained Earnings", },
    { value: "CommonStock", label: "Common Stock", },
    { value: "CommonStockSharesOutstanding", label: "Common Stock Shares Outstanding", }
]

const dateGapTypes = [
    { value: "Quarterly", label: "Quarterly", },
    { value: "Annual", label: "Annual", },
]

const BalanceChart = () => {
    const { data: nodeData, refetch: loadSelected, isLoading, isFetching, isError } = useBalanceData()
    const [Series, SetSeries] = useState<any[]>([])
    const [selectedDataTypeOption, setSelectedDataTypeOption] = useState({ value: "TotalAssets", label: "TotalAssets", })
    const [selectedDataGapTypeOption, setSelectedDataGapTypeOption] = useState({ value: "Quarterly", label: "Quarterly", })

    const HandleDataTypeChange = (event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
        setSelectedDataTypeOption(event.detail.selectedOption as any)
    }

    const HandleDataGapTypeChange = (event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
        setSelectedDataGapTypeOption(event.detail.selectedOption as any)
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
                            a => a.DataType == selectedDataGapTypeOption.value // && !isNaN(parseFloat(_.get(a, selectedDataTypeOption.value)))
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
    }, [nodeData, isError, selectedDataTypeOption, selectedDataGapTypeOption])

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
            yTitle={"Balance " + selectedDataGapTypeOption.label + " (" + selectedDataTypeOption.label + ") Data (USD)"}
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
                <div className='drop-down-group'>
                    <div style={{ width: "300px" }}>
                        <Select
                            options={dataTypes}
                            selectedOption={selectedDataTypeOption}
                            placeholder="Balance Data Type"
                            onChange={HandleDataTypeChange}
                        />
                    </div>
                    <div style={{ width: "300px" }}>
                        <Select
                            options={dateGapTypes}
                            selectedOption={selectedDataGapTypeOption}
                            placeholder="Balance Data Gap Type"
                            onChange={HandleDataGapTypeChange}
                        />
                    </div>
                </div>
            }
        />

    )
}

export default BalanceChart
