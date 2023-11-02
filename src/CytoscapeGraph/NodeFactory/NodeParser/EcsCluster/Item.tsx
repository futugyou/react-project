
import { ColumnLayout, SpaceBetween, Table, } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const capacityProviders = parsedConfig.CapacityProviders?.map((p: any) => <li key={p}>{p}</li>)

  return (
    <ColumnLayout columns={1} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='ClusterName'>
          {parsedConfig.ClusterName}
        </ValueWithLabel>
        <ValueWithLabel label='Arn'>
          {parsedConfig.Arn}
        </ValueWithLabel>
        <ValueWithLabel label='CapacityProviders'>
          <ul>
            {capacityProviders}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='Tags'>
          <Table
            columnDefinitions={[
              {
                id: "Key",
                header: "Key",
                cell: (item: any) => item.Key || "-",
              },
              {
                id: "Value",
                header: "Value",
                cell: (item: any) => item.Value || "-",
              }
            ]}
            items={configuration.Tags}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
        <ValueWithLabel label='ClusterSettings'>
          <Table
            columnDefinitions={[
              {
                id: "Name",
                header: "Name",
                cell: (item: any) => item.Name || "-",
              },
              {
                id: "Value",
                header: "Value",
                cell: (item: any) => item.Value || "-",
              }
            ]}
            items={configuration.ClusterSettings}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
