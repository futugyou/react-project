
import { ColumnLayout, SpaceBetween } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const sgs = parsedConfig.vpcConfig?.securityGroupIds?.map((p: any) => <li key={p}>{p}</li>)
  const sns = parsedConfig.vpcConfig?.subnetIds?.map((p: any) => <li key={p}>{p}</li>)

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='functionArn'>
          {parsedConfig.functionArn}
        </ValueWithLabel>
        <ValueWithLabel label='functionName'>
          {parsedConfig.functionName}
        </ValueWithLabel>
        <ValueWithLabel label='handler'>
          {parsedConfig.handler}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='role'>
          {parsedConfig.role}
        </ValueWithLabel>
        <ValueWithLabel label='securityGroup'>
          <ul>
            {sgs}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='subnet'>
          <ul>
            {sns}
          </ul>
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
