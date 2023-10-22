
import { ColumnLayout, SpaceBetween, Box } from '@cloudscape-design/components'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

const Item = (configuration: any) => {
    const parsedConfig = configuration
    return (
        <ColumnLayout columns={2} variant='text-grid'>
            <SpaceBetween size='l'>
                <ValueWithLabel label='Launched'>
                    {`${dayjs(parsedConfig.launchTime).format('llll')} (${dayjs(parsedConfig.launchTime).fromNow()})`}
                </ValueWithLabel>
                <ValueWithLabel label='Architecture'>
                    {parsedConfig.architecture}
                </ValueWithLabel>
                <ValueWithLabel label='AMI'>{parsedConfig.imageId}</ValueWithLabel>
                <ValueWithLabel label='Instance type'>
                    {parsedConfig.instanceType}
                </ValueWithLabel>
                <ValueWithLabel label='Private DNS'>
                    {parsedConfig.privateDnsName}
                </ValueWithLabel>
                <ValueWithLabel label='Private IP'>
                    {`${parsedConfig.privateIpAddress}`}
                </ValueWithLabel>
            </SpaceBetween>
            <SpaceBetween size='l'>
                <ValueWithLabel label='Public DNS'>
                    {parsedConfig.publicDnsName}
                </ValueWithLabel>
                <ValueWithLabel label='Public IP'>
                    {`${parsedConfig.publicIpAddress}`}
                </ValueWithLabel>
                <ValueWithLabel label='Monitoring'>
                    {parsedConfig.monitoring.state}
                </ValueWithLabel>
                <ValueWithLabel label='Platform'>
                    {parsedConfig.platform}
                </ValueWithLabel>
                <ValueWithLabel label='CPU cores'>
                    {parsedConfig.cpuOptions.coreCount}
                </ValueWithLabel>
                <ValueWithLabel label='CPU threads per core'>
                    {parsedConfig.cpuOptions.threadsPerCore}
                </ValueWithLabel>
            </SpaceBetween>
        </ColumnLayout>
    )
}

export default Item