
import { ColumnLayout, SpaceBetween, Table, } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='attachments'>
          <Table
            columnDefinitions={[
              {
                id: "vpcId",
                header: "vpcId",
                cell: (item: any) => item.vpcId || "-",
              },
              {
                id: "state",
                header: "state",
                cell: (item: any) => item.state || "-",
              }
            ]}
            items={configuration.attachments}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='tags'>
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
            items={configuration.tags}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
