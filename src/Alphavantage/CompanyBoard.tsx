
import { useEffect, useMemo, useState } from "react"

import Board from "@cloudscape-design/board-components/board"
import BoardItem from "@cloudscape-design/board-components/board-item"

import { boardI18nStrings, boardItemI18nStrings } from "@/Common/i18n"
import EmptyChart from '@/Alphavantage/EmptyChart'

import { useCompanyData } from '@/Alphavantage/service'

const CompanyBoard = () => {
    const { data: nodeData, isLoading, isFetching, isError } = useCompanyData()

    const [items, setItems] = useState([])

    const Empty = useMemo(EmptyChart, [])

    useEffect(() => {
        if (nodeData && !isError) {
            let d = []
            for (let i = 0; i < nodeData.length; i++) {
                const e = nodeData[i]
                d.push({
                    id: i + 1,
                    rowSpan: 2,
                    columnSpan: 2,
                    data: {
                        title: e.Symbol,
                        content: e.Name
                    }
                })
            }
            setItems([...d] as any)
        }
    }, [nodeData, isError])

    return (
        <Board
            renderItem={item => (
                <BoardItem i18nStrings={boardItemI18nStrings}                >
                    {item.data.content}
                </BoardItem>
            )}
            onItemsChange={event =>
                setItems(event.detail.items as any)
            }
            items={items}
            i18nStrings={boardI18nStrings}
            empty={Empty}
        />
    )
}

export default CompanyBoard