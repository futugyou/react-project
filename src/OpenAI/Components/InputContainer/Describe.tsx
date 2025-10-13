
import { Box, ColumnLayout } from '@cloudscape-design/components'

const Describe = ({ display, subDisplay }: { display: string, subDisplay: string }) => {
    return (
        <>
            <ColumnLayout columns={1} borders="vertical">
                <Box>{display}</Box>
            </ColumnLayout>
            {
                subDisplay && (
                    <ColumnLayout columns={1} borders="vertical">
                        <Box className="control-note">{subDisplay}</Box>
                    </ColumnLayout>
                )
            }
        </>
    )
}

export default Describe