
import { Box } from '@cloudscape-design/components'

export const ValueWithLabel = ({ label, children }: any) => (
    <div>
        <Box margin={{ bottom: 'xxxs' }} color='text-label'>
            {label}
        </Box>
        <div>{children}</div>
    </div>
)
