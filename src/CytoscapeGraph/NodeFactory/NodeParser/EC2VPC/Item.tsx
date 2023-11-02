
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
        <ValueWithLabel label='dhcpOptionsId'>
          {parsedConfig.dhcpOptionsId}
        </ValueWithLabel>
        <ValueWithLabel label='cidrBlock'>
          {parsedConfig.cidrBlock}
        </ValueWithLabel>

        <ValueWithLabel label='cidrBlockAssociationSet'>
          <Table
            columnDefinitions={[
              {
                id: "associationId",
                header: "associationId",
                cell: (item: any) => item.associationId || "-",
              },
              {
                id: "cidrBlock",
                header: "cidrBlock",
                cell: (item: any) => item.cidrBlock || "-",
              },
              {
                id: "cidrBlockState",
                header: "cidrBlockState",
                cell: (item: any) => item.cidrBlockState?.state || "-",
              }
            ]}
            items={configuration.cidrBlockAssociationSet}
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
