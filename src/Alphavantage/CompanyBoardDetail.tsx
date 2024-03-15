import './chart.css'
import { useState } from "react"

import { Box, ColumnLayout, Header, SpaceBetween, Icon } from "@cloudscape-design/components"
import _ from "lodash"

export interface ICompanyBoardDetailProp {
    Date: any
    FieldsToRemove?: string[]
    children?: React.ReactNode
}

const CompanyBoardDetail = (props: ICompanyBoardDetailProp) => {
    const [columns, setColumns] = useState(props.children ? 2 : 1)
    const [index, setIndex] = useState(2)

    const detailInfos = _.filter(Object.keys(props.Date), p => !props.FieldsToRemove || !props.FieldsToRemove.includes(p)).map(k => (
        <div key={k}>
            <Box variant="awsui-key-label">
                {k}
            </Box>
            <div>{_.get(props.Date, k)}</div>
        </div>
    ))

    const HandlerIconClick = () => {
        const i = (index + 1) % 3
        if (i == 0 || i == 1) {
            setColumns(1)
        } else {
            setColumns(2)
        }
        setIndex(i)
    }
    return (
        <div style={{ position: "relative" }}>
            <ColumnLayout columns={columns} variant="text-grid">
                {(index == 0 || index == 2) && props.children && (<div>
                    {props.children}
                </div>)}
                {(index == 1 || index == 2) && (
                    <div>
                        <Header variant="h3">Overview</Header>
                        <SpaceBetween size="s">
                            {detailInfos}
                        </SpaceBetween>
                    </div>
                )}
            </ColumnLayout>
            <div className="absolute-icon" onClick={HandlerIconClick}><Icon name="menu" /></div>
        </div>
    )
}

export default CompanyBoardDetail