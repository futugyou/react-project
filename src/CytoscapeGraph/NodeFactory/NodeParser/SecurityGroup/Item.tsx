
import { ColumnLayout, SpaceBetween, Table } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={1} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='groupId'>
          {parsedConfig.groupId}
        </ValueWithLabel>
        <ValueWithLabel label='groupName'>
          {parsedConfig.groupName}
        </ValueWithLabel>
        <ValueWithLabel label='vpcId'>
          {parsedConfig.vpcId}
        </ValueWithLabel>
        <ValueWithLabel label='description'>
          {parsedConfig.description}
        </ValueWithLabel>
        <ValueWithLabel label='ipPermissions'>
          <Table
            columnDefinitions={[
              {
                id: "fromPort",
                header: "fromPort",
                cell: (item: any) => item.fromPort || "-",
              },
              {
                id: "ipProtocol",
                header: "ipProtocol",
                cell: (item: any) => item.ipProtocol || "-",
              },
              {
                id: "ipRanges",
                header: "ipRanges",
                cell: (item: any) => item.ipRanges?.map((p: any) => p) || "-"
              },
              {
                id: "toPort",
                header: "ruleAction",
                cell: (item: any) => item.toPort || "-",
              },
              {
                id: "userIdGroupPairs",
                header: "userIdGroupPairs",
                cell: (item: any) => item.userIdGroupPairs?.map((p: any) => p.groupId) || "-"
              }
            ]}
            items={configuration.ipPermissions}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
        <ValueWithLabel label='ipPermissionsEgress'>
          <Table
            columnDefinitions={[
              {
                id: "ipProtocol",
                header: "ipProtocol",
                cell: (item: any) => item.fromPort || "-",
              },
              {
                id: "ipRanges",
                header: "ipRanges",
                cell: (item: any) => item.ipRanges?.map((p: any) => p) || "-"
              },
              {
                id: "toPort",
                header: "ruleAction",
                cell: (item: any) => item.toPort || "-",
              },
              {
                id: "userIdGroupPairs",
                header: "userIdGroupPairs",
                cell: (item: any) => item.userIdGroupPairs?.map((p: any) => p.groupId) || "-"
              }
            ]}
            items={configuration.ipPermissionsEgress}
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
