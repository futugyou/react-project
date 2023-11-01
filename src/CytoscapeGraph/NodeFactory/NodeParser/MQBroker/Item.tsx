
import { ColumnLayout, SpaceBetween, Box } from '@cloudscape-design/components'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

const Item = (configuration: any) => {
    const parsedConfig = configuration

    const sgs = parsedConfig.SecurityGroups.map((p: any) => <li key={p}>{p}</li>)
    const sns = parsedConfig.SubnetIds.map((p: any) => <li key={p}>{p}</li>)

    return (
        <ColumnLayout columns={2} variant='text-grid'>
            <SpaceBetween size='l'>
                <ValueWithLabel label='BrokerName'>
                    {parsedConfig.BrokerName}
                </ValueWithLabel>
                <ValueWithLabel label='DeploymentMode'>
                    {parsedConfig.DeploymentMode}
                </ValueWithLabel>
                <ValueWithLabel label='EngineType'>
                    {parsedConfig.EngineType}
                </ValueWithLabel>
                <ValueWithLabel label='HostInstanceType'>
                    {parsedConfig.HostInstanceType}
                </ValueWithLabel>
            </SpaceBetween>
            <SpaceBetween size='l'>
                <ValueWithLabel label='encryptionAlgorithms'>
                    <ul>
                        {sgs}
                    </ul>
                </ValueWithLabel>
                <ValueWithLabel label='macAlgorithms'>
                    <ul>
                        {sns}
                    </ul>
                </ValueWithLabel>
            </SpaceBetween>
        </ColumnLayout>
    )
}

export default Item