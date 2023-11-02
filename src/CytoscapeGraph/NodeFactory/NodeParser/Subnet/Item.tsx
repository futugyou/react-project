
import { ColumnLayout, SpaceBetween, Table } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={1} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='vpcId'>
          {parsedConfig.vpcId}
        </ValueWithLabel>
        <ValueWithLabel label='availabilityZone'>
          {parsedConfig.availabilityZone}
        </ValueWithLabel>
        <ValueWithLabel label='availabilityZoneId'>
          {parsedConfig.availabilityZoneId}
        </ValueWithLabel>
        <ValueWithLabel label='availableIpAddressCount'>
          {parsedConfig.availableIpAddressCount}
        </ValueWithLabel>
        <ValueWithLabel label='cidrBlock'>
          {parsedConfig.cidrBlock}
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
