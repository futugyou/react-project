
import { ColumnLayout, SpaceBetween, } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Arn'>
          {parsedConfig.arn}
        </ValueWithLabel>
        <ValueWithLabel label='AttachmentCount'>
          {parsedConfig.attachmentCount}
        </ValueWithLabel>
        <ValueWithLabel label='IsAttachable'>
          {parsedConfig.isAttachable}
        </ValueWithLabel>
        <ValueWithLabel label='Path'>
          {parsedConfig.path}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='PolicyId'>
          {parsedConfig.policyId}
        </ValueWithLabel>
        <ValueWithLabel label='PolicyName'>
          {parsedConfig.policyName}
        </ValueWithLabel>
        <ValueWithLabel label='CreateDate'>
          {parsedConfig.createDate}
        </ValueWithLabel>
        <ValueWithLabel label='UpdateDate'>
          {parsedConfig.updateDate}
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
