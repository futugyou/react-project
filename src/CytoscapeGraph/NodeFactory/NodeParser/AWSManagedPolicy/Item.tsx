
import { ColumnLayout, SpaceBetween, } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Arn'>
          {parsedConfig.Arn}
        </ValueWithLabel>
        <ValueWithLabel label='AttachmentCount'>
          {parsedConfig.AttachmentCount}
        </ValueWithLabel>
        <ValueWithLabel label='Description'>
          {parsedConfig.Description}
        </ValueWithLabel>
        <ValueWithLabel label='IsAttachable'>
          {parsedConfig.IsAttachable}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='PolicyName'>
          {parsedConfig.PolicyName}
        </ValueWithLabel>
        <ValueWithLabel label='Path'>
          {parsedConfig.Path}
        </ValueWithLabel>
        <ValueWithLabel label='CreateDate'>
          {parsedConfig.CreateDate}
        </ValueWithLabel>
        <ValueWithLabel label='UpdateDate'>
          {parsedConfig.UpdateDate}
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
