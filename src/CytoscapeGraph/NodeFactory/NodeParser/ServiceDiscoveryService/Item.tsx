import * as R from 'ramda'
import { ColumnLayout, SpaceBetween, Table } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const images = parsedConfig.ContainerDefinitions?.map((p: any) => <li key={p.Image}>{p.Image}</li>)
  const secrets = R.flatten(parsedConfig.ContainerDefinitions?.map((p: any) => p.Secrets))
  const volumes = parsedConfig.Volumes?.map((p: any) => <li key={p.Name}>{p.Name}</li>)

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
