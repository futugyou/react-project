import './chart.css'

import React, { useEffect, useState, useCallback } from "react"

import { useNewsData } from "./service"
import { News } from "./model"
import Paging from "@/Common/Paging"

import { Header, Badge, Link, Cards, SpaceBetween, TextFilter } from "@cloudscape-design/components"

import _ from "lodash"
import moment from "moment"

const News = () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [pagesCount, setPageCount] = useState(1)
    const [dataCount, setDataCount] = useState(1)
    const [filteringText, setFilteringText] = React.useState("")

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
            const data = _.filter(nodeData, f => f.Title.includes(filteringText) || f.Summary.includes(filteringText))

            let c = parseInt(data.length / pageSize as any)
            if (data.length % pageSize != 0) {
                c = c + 1
            }

            setItems(_.orderBy(
                _.take(
                    _.drop(
                        data,
                        (page - 1) * pageSize),
                    pageSize),
                'TimePublished',
                'desc'
            ))
            setPageCount(c)
            setDataCount(data.length)
        }
    }, [nodeData, isError, page, filteringText])

    useEffect(() => {
        setPage(1)
    }, [filteringText])

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
                header={<Header counter={"(" + dataCount + ")"}> News for {symbol} </Header>}
                pagination={
                    <Paging Page={page} PageCount={pagesCount} OnPageChange={HandlePageChange} />
                }
                filter={
                    <TextFilter
                        filteringText={filteringText}
                        filteringPlaceholder="Find resources"
                        onChange={({ detail }) =>
                            setFilteringText(detail.filteringText)
                        }
                    />
                }
            />
        </div>
    )
}

export default News