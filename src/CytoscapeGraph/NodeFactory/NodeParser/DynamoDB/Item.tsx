
import { ColumnLayout, SpaceBetween } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const sgs = parsedConfig.keySchema?.map((p: any) => <li key={p.attributeName}>{p.attributeName}</li>)
  const sns = parsedConfig.attributeDefinitions?.map((p: any) => <li key={p.attributeName}>{p.attributeName}</li>)

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='tableArn'>
          {parsedConfig.tableArn}
        </ValueWithLabel>
        <ValueWithLabel label='tableId'>
          {parsedConfig.tableId}
        </ValueWithLabel>
        <ValueWithLabel label='tableName'>
          {parsedConfig.tableName}
        </ValueWithLabel>
        <ValueWithLabel label='tableStatus'>
          {parsedConfig.tableStatus}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='creationDateTime'>
          {parsedConfig.creationDateTime}
        </ValueWithLabel>
        <ValueWithLabel label='keySchema'>
          <ul>
            {sgs}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='attributeDefinitions'>
          <ul>
            {sns}
          </ul>
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
