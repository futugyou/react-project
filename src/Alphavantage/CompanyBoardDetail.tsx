import './chart.css'
import { useState } from "react"

import { Box, ColumnLayout } from "@cloudscape-design/components"
import _ from "lodash"

export interface ICompanyBoardDetailProp {
    Date: any
    FieldsToRemove?: string[]
    children?: React.ReactNode
}

const CompanyBoardDetail = (props: ICompanyBoardDetailProp) => {
    const detailInfos = _.filter(Object.keys(props.Date), p => !props.FieldsToRemove || !props.FieldsToRemove.includes(p)).map(k => (
        <div key={k}>
            <Box variant="awsui-key-label">
                {k}
            </Box>
            <div>{_.get(props.Date, k)}</div>
        </div>
    ))

    return (
        <ColumnLayout columns={2} variant="text-grid">
            {detailInfos}
        </ColumnLayout>
    )
}

export default CompanyBoardDetail