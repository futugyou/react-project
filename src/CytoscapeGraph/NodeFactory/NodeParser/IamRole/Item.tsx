
import { ColumnLayout, SpaceBetween } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const mps = parsedConfig.attachedManagedPolicies.map((p: any) => <li key={p.policyName}>{p.policyName}</li>)
  const ups = parsedConfig.rolePolicyList.map((p: any) => <li key={p.policyName}>{p.policyName}</li>)
  const ips = parsedConfig.instanceProfileList.map((p: any) => <li key={p.policyName}>{p.policyName}</li>)

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='arn'>
          {parsedConfig.arn}
        </ValueWithLabel>
        <ValueWithLabel label='roleId'>
          {parsedConfig.roleId}
        </ValueWithLabel>
        <ValueWithLabel label='roleName'>
          {parsedConfig.roleName}
        </ValueWithLabel>
        <ValueWithLabel label='createDate'>
          {parsedConfig.createDate}
        </ValueWithLabel>
        <ValueWithLabel label='path'>
          {parsedConfig.path}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='attachedManagedPolicies'>
          <ul>
            {mps}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='rolePolicyList'>
          <ul>
            {ups}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='instanceProfileList'>
          <ul>
            {ips}
          </ul>
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
