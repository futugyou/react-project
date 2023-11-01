import * as R from 'ramda'
import { ColumnLayout, SpaceBetween, Table } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const images = parsedConfig.ContainerDefinitions?.map((p: any) => <li key={p.Image}>{p.Image}</li>)
  const secrets = R.flatten(parsedConfig.ContainerDefinitions?.map((p: any) => p.Secrets))
  const volumes = parsedConfig.Volumes?.map((p: any) => <li key={p.Name}>{p.Name}</li>)

  return (
    <ColumnLayout columns={1} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Family'>
          {parsedConfig.Family}
        </ValueWithLabel>
        <ValueWithLabel label='ExecutionRoleArn'>
          {parsedConfig.ExecutionRoleArn}
        </ValueWithLabel>
        <ValueWithLabel label='TaskDefinitionArn'>
          {parsedConfig.TaskDefinitionArn}
        </ValueWithLabel>
        <ValueWithLabel label='TaskRoleArn'>
          {parsedConfig.TaskRoleArn}
        </ValueWithLabel>
        <ValueWithLabel label='Image'>
          <ul>
            {images}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='Volumes'>
          <ul>
            {volumes}
          </ul>
        </ValueWithLabel>

        <ValueWithLabel label='Secrets'>
          <Table
            columnDefinitions={[
              {
                id: "Name",
                header: "Name",
                cell: (item: any) => item.Name || "-",
              },
              {
                id: "ValueFrom",
                header: "ValueFrom",
                cell: (item: any) => item.ValueFrom || "-",
              }
            ]}
            items={secrets}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
