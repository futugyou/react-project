
import { ColumnLayout, SpaceBetween } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const gs = parsedConfig.encryptionAlgorithms.map((p: any) => <li key={p}>{p}</li>)
  const gs1 = parsedConfig.macAlgorithms.map((p: any) => <li key={p}>{p}</li>)
  const gs2 = parsedConfig.signingAlgorithms.map((p: any) => <li key={p}>{p}</li>)

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='arn'>
          {parsedConfig.arn}
        </ValueWithLabel>
        <ValueWithLabel label='customerMasterKeySpec'>
          {parsedConfig.customerMasterKeySpec}
        </ValueWithLabel>
        <ValueWithLabel label='description'>
          {parsedConfig.description}
        </ValueWithLabel>
        <ValueWithLabel label='keyId'>
          {parsedConfig.keyId}
        </ValueWithLabel>
        <ValueWithLabel label='keyManager'>
          {parsedConfig.keyManager}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='keySpec'>
          {parsedConfig.keySpec}
        </ValueWithLabel>
        <ValueWithLabel label='keyUsage'>
          {parsedConfig.keyUsage}
        </ValueWithLabel>
        <ValueWithLabel label='encryptionAlgorithms'>
          <ul>
            {gs}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='macAlgorithms'>
          <ul>
            {gs1}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='signingAlgorithms'>
          <ul>
            {gs2}
          </ul>
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
