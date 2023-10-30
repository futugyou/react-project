
import { ColumnLayout, SpaceBetween } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const mps = parsedConfig.attachedManagedPolicies.map((p: any) => <li>{p.policyName}</li>)
  const ups = parsedConfig.userPolicyList.map((p: any) => <li>{p.policyName}</li>)
  const gs = parsedConfig.groupList.map((p: any) => <li>{p}</li>)

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='arn'>
          {parsedConfig.arn}
        </ValueWithLabel>
        <ValueWithLabel label='userId'>
          {parsedConfig.userId}
        </ValueWithLabel>
        <ValueWithLabel label='userName'>
          {parsedConfig.userName}
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
        <ValueWithLabel label='userPolicyList'>
          <ul>
            {ups}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='groupList'>
          <ul>
            {gs}
          </ul>
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
