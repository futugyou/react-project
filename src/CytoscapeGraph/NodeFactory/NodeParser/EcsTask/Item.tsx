
import { ColumnLayout, SpaceBetween, Table } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const sgs = parsedConfig.NetworkConfiguration?.AwsvpcConfiguration?.SecurityGroups?.map((p: any) => <li key={p}>{p}</li>)
  const sns = parsedConfig.NetworkConfiguration?.AwsvpcConfiguration?.Subnets?.map((p: any) => <li key={p}>{p}</li>)

  return (
    <ColumnLayout columns={1} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Group'>
          {parsedConfig.Group}
        </ValueWithLabel>
        <ValueWithLabel label='AvailabilityZone'>
          {parsedConfig.AvailabilityZone}
        </ValueWithLabel>
        <ValueWithLabel label='PlatformFamily'>
          {parsedConfig.PlatformFamily}
        </ValueWithLabel>
        <ValueWithLabel label='ClusterArn'>
          {parsedConfig.ClusterArn}
        </ValueWithLabel>
        <ValueWithLabel label='TaskArn'>
          {parsedConfig.TaskArn}
        </ValueWithLabel>
        <ValueWithLabel label='TaskDefinitionArn'>
          {parsedConfig.TaskDefinitionArn}
        </ValueWithLabel>
        <ValueWithLabel label='Cpu'>
          {parsedConfig.Cpu}
        </ValueWithLabel>
        <ValueWithLabel label='Memory'>
          {parsedConfig.Memory}
        </ValueWithLabel> 
        <ValueWithLabel label='Containers'>
          <Table
            columnDefinitions={[
              {
                id: "Name",
                header: "Name",
                cell: (item: any) => item.Name || "-",
              },
              {
                id: "Image",
                header: "Image",
                cell: (item: any) => item.Image || "-",
              },
              {
                id: "TaskArn",
                header: "TaskArn",
                cell: (item: any) => item.TaskArn || "-"
              }
            ]}
            items={configuration.Containers}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
