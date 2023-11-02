
import { ColumnLayout, SpaceBetween, Table, } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={1} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='vpcId'>
          {parsedConfig.vpcId}
        </ValueWithLabel>
        <ValueWithLabel label='subnetId'>
          {parsedConfig.subnetId}
        </ValueWithLabel>
        <ValueWithLabel label='natGatewayId'>
          {parsedConfig.natGatewayId}
        </ValueWithLabel>
        <ValueWithLabel label='connectivityType'>
          {parsedConfig.connectivityType}
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
        <ValueWithLabel label='natGatewayAddresses'>
          <Table
            columnDefinitions={[
              {
                id: "allocationId",
                header: "allocationId",
                cell: (item: any) => item.allocationId || "-",
              },
              {
                id: "associationId",
                header: "associationId",
                cell: (item: any) => item.associationId || "-",
              }, {
                id: "isPrimary",
                header: "isPrimary",
                cell: (item: any) => item.isPrimary || "-",
              },
              {
                id: "networkInterfaceId",
                header: "networkInterfaceId",
                cell: (item: any) => item.networkInterfaceId || "-",
              }, {
                id: "privateIp",
                header: "privateIp",
                cell: (item: any) => item.privateIp || "-",
              },
              {
                id: "publicIp",
                header: "publicIp",
                cell: (item: any) => item.publicIp || "-",
              }
            ]}
            items={configuration.natGatewayAddresses}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
