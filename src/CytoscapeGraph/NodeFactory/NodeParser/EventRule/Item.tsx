
import { ColumnLayout, SpaceBetween } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const gs = parsedConfig.Targets.map((p: any) => <li key={p.Arn}>{p.Arn}</li>)
  
  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Arn'>
          {parsedConfig.Arn}
        </ValueWithLabel>
        <ValueWithLabel label='EventBusName'>
          {parsedConfig.EventBusName}
        </ValueWithLabel>
        <ValueWithLabel label='Id'>
          {parsedConfig.Id}
        </ValueWithLabel>
        <ValueWithLabel label='Name'>
          {parsedConfig.Name}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='ScheduleExpression'>
          {parsedConfig.ScheduleExpression}
        </ValueWithLabel>
        <ValueWithLabel label='State'>
          {parsedConfig.State}
        </ValueWithLabel>
        <ValueWithLabel label='encryptionAlgorithms'>
          <ul>
            {gs}
          </ul>
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
