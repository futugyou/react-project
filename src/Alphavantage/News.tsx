import './chart.css'

import React, { useEffect, useState, useMemo, useCallback } from "react"

import { useNewsData } from "./service"
import { News } from "./model"
import Paging from "@/Common/Paging"

import { Table, Box, Header, Badge, Link } from "@cloudscape-design/components"

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
            <Table
                columnDefinitions={[
                    {
                        id: "Title",
                        header: "Title",
                        cell: (item) => <Link href={item.URL} external={true}>{item.Title}</Link>,
                        sortingField: "Title",
                        isRowHeader: true
                    },
                    {
                        id: "TimePublished",
                        header: "Publication Time",
                        cell: (item: any) => moment(item.TimePublished).format("yyyy-MM-DD hh:mm"),
                    },
                    {
                        id: "Summary",
                        header: "Summary",
                        cell: (item: any) => <Box variant="p">{item.Summary}</Box>,
                    },
                    // {
                    //     id: "BannerImage",
                    //     header: "Image",
                    //     cell: (item: any) => <img src={item.BannerImage} alt={item.URL}></img>,
                    // },
                    {
                        id: "Source",
                        header: "Source",
                        cell: (item: any) => item.Source,
                    },
                    {
                        id: "Authors",
                        header: "Authors",
                        cell: (item: any) => <>{item.Authors?.map((s: string) => <Box variant="span" key={s}>{s}</Box>)}</>,
                    },
                    {
                        id: "Topics",
                        header: "Topics",
                        cell: (item: any) => <>{item.Topics?.map((s: string) => <Badge key={s} >{s}</Badge>)}</>,
                    },
                ]}
                enableKeyboardNavigation
                items={items}
                loading={isLoading}
                loadingText="Loading resources"
                sortingDisabled
                header={<Header> Company News </Header>}
                pagination={
                    <Paging Page={page} PageCount={pagesCount} OnPageChange={HandlePageChange} />
                }
            />
        </div>
    )
}

export default News