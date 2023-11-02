
import { ColumnLayout, SpaceBetween, Table } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={1} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='volumeId'>
          {parsedConfig.volumeId}
        </ValueWithLabel>
        <ValueWithLabel label='volumeType'>
          {parsedConfig.volumeType}
        </ValueWithLabel>
        <ValueWithLabel label='encrypted'>
          {parsedConfig.encrypted}
        </ValueWithLabel>
        <ValueWithLabel label='availabilityZone'>
          {parsedConfig.availabilityZone}
        </ValueWithLabel> 
        <ValueWithLabel label='attachments'>
          <Table
            columnDefinitions={[
              {
                id: "instanceId",
                header: "instanceId",
                cell: (item: any) => item.instanceId || "-",
              },
              {
                id: "volumeId",
                header: "volumeId",
                cell: (item: any) => item.volumeId || "-",
              },
              {
                id: "device",
                header: "device",
                cell: (item: any) => item.device || "-",
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
        <ValueWithLabel label='tags'>
          <Table
            columnDefinitions={[
              {
                id: "key",
                header: "key",
                cell: (item: any) => item.key || "-",
              },
              {
                id: "value",
                header: "value",
                cell: (item: any) => item.value || "-",
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
