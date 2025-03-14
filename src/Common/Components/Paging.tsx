
import React from "react"

import { NonCancelableCustomEvent } from "@cloudscape-design/components"
import Pagination from "@cloudscape-design/components/pagination"
import { PaginationProps } from "@cloudscape-design/components"

export interface IPagingProps {
    Page: number
    PageCount: number
    OnPageChange?: (page: number) => void
}

const Paging = (props: IPagingProps) => {
    const HandlePageChange = (event: NonCancelableCustomEvent<PaginationProps.ChangeDetail>) => {
        if (props.OnPageChange) {
            props.OnPageChange(event.detail.currentPageIndex)
        }
    }

    return (<Pagination currentPageIndex={props.Page} pagesCount={props.PageCount} onChange={HandlePageChange} />)
}

export default Paging
