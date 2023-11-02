import * as R from 'ramda'
import { ColumnLayout, SpaceBetween, Table } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const loadBalancers = parsedConfig.LoadBalancerArns?.map((p: any) => <li key={p}>{p}</li>)

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='HealthCheckPath'>
          {parsedConfig.HealthCheckPath}
        </ValueWithLabel>
        <ValueWithLabel label='HealthCheckPort'>
          {parsedConfig.HealthCheckPort}
        </ValueWithLabel>
        <ValueWithLabel label='HealthCheckProtocol'>
          {parsedConfig.HealthCheckProtocol}
        </ValueWithLabel>
        <ValueWithLabel label='IpAddressType'>
          {parsedConfig.IpAddressType}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Port'>
          {parsedConfig.Port}
        </ValueWithLabel>
        <ValueWithLabel label='TargetGroupName'>
          {parsedConfig.TargetGroupName}
        </ValueWithLabel>
        <ValueWithLabel label='TargetType'>
          {parsedConfig.TargetType}
        </ValueWithLabel>
        <ValueWithLabel label='VpcId'>
          {parsedConfig.VpcId}
        </ValueWithLabel>
        <ValueWithLabel label='LoadBalancers'>
          <ul>
            {loadBalancers}
          </ul>
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
