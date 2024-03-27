import './chart.css'

import { useEffect, useMemo, useState } from "react"

import Board from "@cloudscape-design/board-components/board"
import BoardItem from "@cloudscape-design/board-components/board-item"

import { boardI18nStrings, boardItemI18nStrings } from "@/Common/Components/i18n"
import EmptyChart from '@/Alphavantage/EmptyChart'

import { useCompanyData } from '@/Alphavantage/service'
import { Header, Link, SpaceBetween } from "@cloudscape-design/components"
import { Company } from "./model"
import CompanyBoardDetail from "./CompanyBoardDetail"

const CompanyBoard = () => {
    const { data: nodeData, isLoading, isFetching, isError } = useCompanyData()
    const [items, setItems] = useState([])
    const Empty = useMemo(EmptyChart, [])

    useEffect(() => {
        if (nodeData && !isError) {
            let columnSpan = 1
            if (nodeData.length > 1) {
                columnSpan = 2
            }

            let rowSpan = nodeData.length / columnSpan
            let d = []
            for (let i = 0; i < nodeData.length; i++) {
                const e = nodeData[i]
                d.push({
                    id: i + 1,
                    rowSpan: rowSpan,
                    columnSpan: columnSpan,
                    data: e
                })
            }
            setItems([...d] as any)
        }
    }, [nodeData, isError])

    return (
        <Board data-style="board-style"
            renderItem={item => (
                <BoardItem i18nStrings={boardItemI18nStrings}
                    header={
                        <Header actions={
                            <SpaceBetween direction="horizontal" size="xs">
                                <Link external={true} href={'/e/news?symbol=' + (item.data.Symbol)}>
                                    News
                                </Link>
                                <Link external={true} href={'/e/stockSeries?symbol=' + (item.data.Symbol)}>
                                    Stock
                                </Link>
                                <Link external={true} href={'/e/balance?symbol=' + (item.data.Symbol)}>
                                    Balance
                                </Link>
                                <Link external={true} href={'/e/cash?symbol=' + (item.data.Symbol)}>
                                    Cash
                                </Link>
                                <Link external={true} href={'/e/earnings?symbol=' + (item.data.Symbol)}>
                                    Earnings
                                </Link>
                                <Link external={true} href={'/e/income?symbol=' + (item.data.Symbol)}>
                                    Income
                                </Link>
                                <Link external={true} href={'/e/expected?symbol=' + (item.data.Symbol)}>
                                    Expected
                                </Link>
                            </SpaceBetween>
                        }>
                            {item.data.Name}
                        </Header>
                    }
                >
                    <CompanyBoardDetail
                        Date={item.data}
                        FieldsToRemove={["Id", "Name", "Type", "MatchScore"]}>
                    </CompanyBoardDetail>
                </BoardItem>
            )}
            onItemsChange={event =>
                setItems(event.detail.items as any)
            }
            items={items}
            i18nStrings={boardI18nStrings<Company>("Symbol")}
            empty={Empty}
        />
    )
}

export default CompanyBoard