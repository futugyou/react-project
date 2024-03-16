
import React, { useEffect, useState, useMemo, useCallback } from "react"

import { useNewsData } from "./service"

import Table from "@cloudscape-design/components/table"
import Box from "@cloudscape-design/components/box"
import SpaceBetween from "@cloudscape-design/components/space-between"
import Button from "@cloudscape-design/components/button"
import Header from "@cloudscape-design/components/header"


const News = () => {
    let searchParams = new URLSearchParams(location.search || "")
    let symbol = searchParams.get("symbol") || ""
    const { data: nodeData, isLoading, isFetching, isError } = useNewsData(symbol, {})
    const [items, setItems] = useState([])


    useEffect(() => {
        if (nodeData && !isError) {
            let l = []
            for (const d of nodeData) {
                l.push({
                    name: d.Title,
                    alt: d.Topics,
                    description: d.Summary,
                    type: d.Authors,
                    size: d.TimePublished
                })
            }
            setItems(l as any)
        }
    }, [nodeData, isError])

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
    />)
}

export default News