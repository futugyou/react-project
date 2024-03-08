

import Box from "@cloudscape-design/components/box"
import Button from "@cloudscape-design/components/button"

const NoMatchChart = () => {
    return (
        < Box textAlign="center" color="inherit" >
            <b>No matching data</b>
            <Box variant="p" color="inherit">
                There is no matching data to display
            </Box>
            <Button>Clear filter</Button>
        </Box >
    )
}

export default NoMatchChart