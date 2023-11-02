import * as R from 'ramda'
import { ColumnLayout, SpaceBetween, Table } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration 

  return (
    <ColumnLayout columns={1} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Name'>
          {parsedConfig.Name}
        </ValueWithLabel>
        <ValueWithLabel label='NamespaceId'>
          {parsedConfig.NamespaceId}
        </ValueWithLabel>
        <ValueWithLabel label='Type'>
          {parsedConfig.Type}
        </ValueWithLabel>
        <ValueWithLabel label='Description'>
          {parsedConfig.Description}
        </ValueWithLabel>
        <ValueWithLabel label='NamespaceId'>
          {parsedConfig.DnsConfig?.NamespaceId}
        </ValueWithLabel>
        <ValueWithLabel label='RoutingPolicy'>
          {parsedConfig.DnsConfig?.RoutingPolicy}
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
