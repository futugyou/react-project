
import { ColumnLayout, SpaceBetween, Table } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const networkInterfaceIds = parsedConfig.networkInterfaceIds.map((p: any) => <li key={p}>{p}</li>)
  const subnetIds = parsedConfig.subnetIds.map((p: any) => <li key={p}>{p}</li>)

  return (
    <ColumnLayout columns={1} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='vpcId'>
          {parsedConfig.vpcId}
        </ValueWithLabel>
        <ValueWithLabel label='vpcEndpointId'>
          {parsedConfig.vpcEndpointId}
        </ValueWithLabel>
        <ValueWithLabel label='vpcEndpointType'>
          {parsedConfig.vpcEndpointType}
        </ValueWithLabel>
        <ValueWithLabel label='serviceName'>
          {parsedConfig.serviceName}
        </ValueWithLabel>
        <ValueWithLabel label='ipAddressType'>
          {parsedConfig.ipAddressType}
        </ValueWithLabel>
        <ValueWithLabel label='networkInterfaceIds'>
          <ul>
            {networkInterfaceIds}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='subnetIds'>
          <ul>
            {subnetIds}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='groups'>
          <Table
            columnDefinitions={[
              {
                id: "groupId",
                header: "groupId",
                cell: (item: any) => item.groupId || "-",
              },
              {
                id: "groupName",
                header: "groupName",
                cell: (item: any) => item.groupName || "-",
              }
            ]}
            items={configuration.groups}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
        <ValueWithLabel label='dnsEntries'>
          <Table
            columnDefinitions={[
              {
                id: "hostedZoneId",
                header: "hostedZoneId",
                cell: (item: any) => item.hostedZoneId || "-",
              },
              {
                id: "dnsName",
                header: "dnsName",
                cell: (item: any) => item.dnsName || "-",
              }
            ]}
            items={configuration.dnsEntries}
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
