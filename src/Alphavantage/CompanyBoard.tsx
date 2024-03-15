
import { useEffect, useMemo, useState } from "react"

import Board from "@cloudscape-design/board-components/board"
import BoardItem from "@cloudscape-design/board-components/board-item"

import { boardI18nStrings, boardItemI18nStrings } from "@/Common/i18n"
import EmptyChart from '@/Alphavantage/EmptyChart'

import { useCompanyData } from '@/Alphavantage/service'
import { Header } from "@cloudscape-design/components"
import { Company } from "./model"
import CompanyBoardDetail from "./CompanyBoardDetail"
import StockSeriesChart from "./StockSeriesChart"

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
                    data: e
                })
            }
            setItems([...d] as any)
        }
    }, [nodeData, isError])

    return (
        <Board
            renderItem={item => (
                <BoardItem i18nStrings={boardItemI18nStrings}
                    header={
                        <Header>
                            {item.data.Name}
                        </Header>
                    }
                >
                    <CompanyBoardDetail
                        Date={item.data}
                        FieldsToRemove={["Id", "Name", "Type", "MatchScore"]}>
                        <StockSeriesChart Symbol={item.data.Symbol}>
                        </StockSeriesChart>
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