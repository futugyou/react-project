import './chart.css'

import { useEffect, useMemo, useState } from "react"
import { useHref } from "react-router-dom"

import Board from "@cloudscape-design/board-components/board"
import BoardItem from "@cloudscape-design/board-components/board-item"

import { boardI18nStrings, boardItemI18nStrings } from "@/Common/Components/i18n"
import EmptyChart from '@/Alphavantage/EmptyChart'

import { useCompanyData } from '@/Alphavantage/service'
import { Header, Link, SpaceBetween } from "@cloudscape-design/components"
import { Company } from "./model"
import CompanyBoardDetail from "./CompanyBoardDetail"
import { patchWindowOpen } from '@/MicroApp/event'

const CompanyBoard = () => {
    const { data: nodeData, isLoading, isFetching, isError } = useCompanyData()
    const [items, setItems] = useState([])
    const Empty = useMemo(EmptyChart, [])

    const openExternalUrl = (url: string) => {
        patchWindowOpen(url)
    }

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

    const links = [
        { key: "news", title: "News" },
        { key: "stockSeries", title: "Stock" },
        { key: "balance", title: "Balance" },
        { key: "cash", title: "Cash" },
        { key: "earnings", title: "Earnings" },
        { key: "income", title: "Income" },
        { key: "expected", title: "Expected" },
    ]

    return (
        <Board
            data-style="board-style"
            renderItem={item => (
                <BoardItem
                    i18nStrings={boardItemI18nStrings}
                    header={
                        <Header
                            actions={
                                <SpaceBetween direction="horizontal" size="xs">
                                    {links.map(i => {
                                        const href = useHref(`/e/${i.key}?symbol=${item.data.Symbol}`);
                                        return (
                                            <Link
                                                key={i.key}
                                                external={true}
                                                onFollow={() => openExternalUrl(href)}
                                            >
                                                {i.title}
                                            </Link>
                                        );
                                    })}
                                </SpaceBetween>
                            }
                        >
                            {item.data.Name}
                        </Header>
                    }
                >
                    <CompanyBoardDetail
                        Date={item.data}
                        FieldsToRemove={["Id", "Name", "Type", "MatchScore"]}
                    />
                </BoardItem>
            )}
            onItemsChange={event => setItems(event.detail.items as any)}
            items={items}
            i18nStrings={boardI18nStrings<Company>("Symbol")}
            empty={Empty}
        />
    )
}

export default CompanyBoard