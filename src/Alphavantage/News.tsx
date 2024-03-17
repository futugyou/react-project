import './chart.css'

import React, { useEffect, useState, useCallback } from "react"

import { useNewsData } from "./service"
import { News } from "./model"
import Paging from "@/Common/Paging"

import { Header, Badge, Link, Cards, SpaceBetween } from "@cloudscape-design/components"

import _ from "lodash"
import moment from "moment"


const News = () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [pagesCount, setPageCount] = useState(1)

    let searchParams = new URLSearchParams(location.search || "")
    let symbol = searchParams.get("symbol") || ""
    const { data: nodeData, isLoading, isFetching, isError } = useNewsData(symbol, {})
    const [items, setItems] = useState<News[]>([])

    const HandlePageChange = useCallback((pageIndex: number) => {
        if (1 <= pageIndex && pageIndex <= pagesCount) {
            setPage(pageIndex)
        }
    }, [pagesCount])

    useEffect(() => {
        if (nodeData && !isError) {
            setItems(_.orderBy(_.take(_.drop(nodeData, (page - 1) * pageSize), pageSize), 'TimePublished', 'desc'))
            let c = parseInt(nodeData.length / pageSize as any)
            if (nodeData.length % pageSize != 0) {
                c = c + 1
            }
            setPageCount(c)
        }
    }, [nodeData, isError, page])

    return (
        <div data-style="board-style">
            <Cards
                cardDefinition={{
                    header: item => (
                        <Link href={item.URL} external={true}>{item.Title}</Link>
                    ),
                    sections: [
                        {
                            id: "Image",
                            content: (item) => (
                                <img
                                    style={{ width: "100%" }}
                                    src={item.BannerImage}
                                    alt=""
                                />
                            )
                        },
                        {
                            id: "TimePublished",
                            content: item => (
                                <div>
                                    By {item.Authors?.map((s: string) => <strong key={s}>{s}</strong>)} –
                                    <strong>{moment(item.TimePublished).format(" yyyy-MM-DD hh:mm")}</strong>
                                </div>
                            ),
                        },
                        {
                            id: "Summary",
                            header: (
                                <div>
                                    <span>Summary</span>
                                </div>
                            ),
                            content: item => <div>{item.Summary}</div>
                        },
                        {
                            id: "Source",
                            header: (
                                <div>
                                    <span>Source</span>
                                </div>
                            ),
                            content: item => (
                                <Link href={"https://" + item.SourceDomain} external={true}>{item.Source}</Link>
                            ),
                        },
                        {
                            id: "Topics",
                            header: "Topics",
                            content: item => (
                                <SpaceBetween direction="horizontal" size="xs">
                                    {item.Topics?.map((s: string) => <Badge key={s} >{s}</Badge>)}
                                </SpaceBetween>
                            ),
                        },
                        {
                            id: "Ticker",
                            header: "Tickers",
                            content: item => (
                                <SpaceBetween direction="horizontal" size="xs">
                                    {item.TickerSentiment?.map((s: string) => <Badge key={s} >{s}</Badge>)}
                                </SpaceBetween>
                            ),
                        }
                    ]
                }}
                items={items}
                loading={isLoading}
                loadingText="Loading resources"
                header={<Header> Company News </Header>}
                pagination={
                    <Paging Page={page} PageCount={pagesCount} OnPageChange={HandlePageChange} />
                }
            />
        </div>
    )
}

export default News