
import Box from "@cloudscape-design/components/box"

const EmptyChart = () => {
    return (
        <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
                There is no data available
            </Box>
        </Box>
    )
}

export default EmptyChart
