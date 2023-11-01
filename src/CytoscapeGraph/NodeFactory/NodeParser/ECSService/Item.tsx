
import { ColumnLayout, SpaceBetween, Table } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const sgs = parsedConfig.NetworkConfiguration?.AwsvpcConfiguration?.SecurityGroups?.map((p: any) => <li key={p}>{p}</li>)
  const sns = parsedConfig.NetworkConfiguration?.AwsvpcConfiguration?.Subnets?.map((p: any) => <li key={p}>{p}</li>)

  return (
    <ColumnLayout columns={1} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Name'>
          {parsedConfig.Name}
        </ValueWithLabel>
        <ValueWithLabel label='Cluster'>
          {parsedConfig.Cluster}
        </ValueWithLabel>
        <ValueWithLabel label='TaskDefinition'>
          {parsedConfig.TaskDefinition}
        </ValueWithLabel>
        <ValueWithLabel label='SecurityGroups'>
          <ul>
            {sgs}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='Subnets'>
          <ul>
            {sns}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='LoadBalancers'>
          <Table
            columnDefinitions={[
              {
                id: "ContainerName",
                header: "ContainerName",
                cell: (item: any) => item.ContainerName || "-",
              },
              {
                id: "ContainerPort",
                header: "ContainerPort",
                cell: (item: any) => item.ContainerPort || "-",
              },
              {
                id: "TargetGroupArn",
                header: "TargetGroupArn",
                cell: (item: any) => item.TargetGroupArn || "-"
              }
            ]}
            items={configuration.LoadBalancers}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
