
import React, { useEffect, useState, useMemo, useCallback } from "react"

import { useNewsData } from "./service"

import Table from "@cloudscape-design/components/table"
import Box from "@cloudscape-design/components/box"
import SpaceBetween from "@cloudscape-design/components/space-between"
import Button from "@cloudscape-design/components/button"
import Header from "@cloudscape-design/components/header"
import { NonCancelableCustomEvent, Pagination, PaginationProps } from "@cloudscape-design/components"
import _ from "lodash"


const News = () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const [pagesCount, setPageCount] = useState(1)

    let searchParams = new URLSearchParams(location.search || "")
    let symbol = searchParams.get("symbol") || ""
    const { data: nodeData, isLoading, isFetching, isError } = useNewsData(symbol, {})
    const [items, setItems] = useState([])

    const HandlePageChange = (event: NonCancelableCustomEvent<PaginationProps.ChangeDetail>) => {
        const i = event.detail.currentPageIndex
        if (1 <= i && i <= pagesCount) {
            setPage(i)
        }
    }


    useEffect(() => {
        if (nodeData && !isError) {
            let l = []
            for (const d of _.take(_.drop(nodeData, (page - 1) * pageSize), pageSize)) {
                l.push({
                    name: d.Title,
                    alt: d.Topics,
                    description: d.Summary,
                    type: d.Authors,
                    size: d.TimePublished
                })
            }
            setItems(l as any)
            let c = parseInt(nodeData.length / pageSize as any)
            if (nodeData.length % pageSize != 0) {
                c = c + 1
            }
            setPageCount(c)
        }
    }, [nodeData, isError, page])

    return (<Table
        columnDefinitions={[
            {
                id: "variable",
                header: "Variable name",
                cell: (item: any) => item.name || "-",
                sortingField: "name",
                isRowHeader: true
            },
            {
                id: "alt",
                header: "Text value",
                cell: (item: any) => item.alt || "-",
                sortingField: "alt"
            },
            {
                id: "description",
                header: "Description",
                cell: (item: any) => item.description || "-"
            }
        ]}
        enableKeyboardNavigation
        items={items}
        loading={isLoading}
        loadingText="Loading resources"
        sortingDisabled
        empty={
            <Box
                margin={{ vertical: "xs" }}
                textAlign="center"
                color="inherit"
            >
                <SpaceBetween size="m">
                    <b>No resources</b>
                    <Button>Create resource</Button>
                </SpaceBetween>
            </Box>
        }
        header={<Header> Simple table </Header>}
        pagination={
            <Pagination currentPageIndex={page} pagesCount={pagesCount} openEnd={true} onChange={HandlePageChange} />
        }
    />)
}

export default News