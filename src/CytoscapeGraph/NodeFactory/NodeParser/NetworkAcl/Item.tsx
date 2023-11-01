
import { ColumnLayout, SpaceBetween, Table } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  
  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='entries'>
          <Table
            columnDefinitions={[
              {
                id: "cidrBlock",
                header: "cidrBlock",
                cell: (item: any) => item.cidrBlock || "-",
              },
              {
                id: "egress",
                header: "egress",
                cell: (item: any) => item.egress || "-",
              },
              {
                id: "protocol",
                header: "protocol",
                cell: (item: any) => item.protocol || "-"
              },
              {
                id: "ruleAction",
                header: "ruleAction",
                cell: (item: any) => item.ruleAction || "-",
              },
              {
                id: "ruleNumber",
                header: "ruleNumber",
                cell: (item: any) => item.ruleNumber || "-"
              }
            ]}
            items={configuration.entries}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='networkAclId'>
          {parsedConfig.networkAclId}
        </ValueWithLabel>
        <ValueWithLabel label='associations'>
          <Table
            columnDefinitions={[
              {
                id: "networkAclAssociationId",
                header: "networkAclAssociationId",
                cell: (item: any) => item.networkAclAssociationId || "-",
              },
              {
                id: "networkAclId",
                header: "networkAclId",
                cell: (item: any) => item.networkAclId || "-",
              },
              {
                id: "subnetId",
                header: "subnetId",
                cell: (item: any) => item.subnetId || "-"
              }
            ]}
            items={configuration.associations}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
