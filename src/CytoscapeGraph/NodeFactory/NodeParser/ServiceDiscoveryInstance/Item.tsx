import * as R from 'ramda'
import { ColumnLayout, SpaceBetween, Table } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='InstanceId'>
          {parsedConfig.InstanceId}
        </ValueWithLabel>
        <ValueWithLabel label='ServiceId'>
          {parsedConfig.ServiceId}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='AVAILABILITY_ZONE'>
          {parsedConfig.InstanceAttributes.AVAILABILITY_ZONE}
        </ValueWithLabel>
        <ValueWithLabel label='AWS_INIT_HEALTH_STATUS'>
          {parsedConfig.InstanceAttributes.AWS_INIT_HEALTH_STATUS}
        </ValueWithLabel>
        <ValueWithLabel label='AWS_INSTANCE_IPV4'>
          {parsedConfig.InstanceAttributes.AWS_INSTANCE_IPV4}
        </ValueWithLabel>
        <ValueWithLabel label='ECS_CLUSTER_NAME'>
          {parsedConfig.InstanceAttributes.ECS_CLUSTER_NAME}
        </ValueWithLabel>
        <ValueWithLabel label='ECS_SERVICE_NAME'>
          {parsedConfig.InstanceAttributes.ECS_SERVICE_NAME}
        </ValueWithLabel>
        <ValueWithLabel label='ECS_TASK_DEFINITION_FAMILY'>
          {parsedConfig.InstanceAttributes.ECS_TASK_DEFINITION_FAMILY}
        </ValueWithLabel>
        <ValueWithLabel label='REGION'>
          {parsedConfig.InstanceAttributes.REGION}
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
