import { Box, ColumnLayout, Header, SpaceBetween } from "@cloudscape-design/components"
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
            {props.children && (<div>
                {props.children}
            </div>)}
            <div>
                <Header variant="h3">Overview</Header>
                <SpaceBetween size="s">
                    {detailInfos}
                </SpaceBetween>
            </div>
        </ColumnLayout>
    )
}

export default CompanyBoardDetail