
import { ColumnLayout, SpaceBetween } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const mps = parsedConfig.attachedManagedPolicies.map((p: any) => <li key={p.policyName}>{p.policyName}</li>)
  const ups = parsedConfig.groupPolicyList.map((p: any) => <li key={p.policyName}>{p.policyName}</li>)

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='arn'>
          {parsedConfig.arn}
        </ValueWithLabel>
        <ValueWithLabel label='groupId'>
          {parsedConfig.groupId}
        </ValueWithLabel>
        <ValueWithLabel label='groupName'>
          {parsedConfig.groupName}
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
        <ValueWithLabel label='groupPolicyList'>
          <ul>
            {ups}
          </ul>
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
