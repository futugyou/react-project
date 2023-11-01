
import { ColumnLayout, SpaceBetween } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const sgs = parsedConfig.keyUsages?.map((p: any) => <li key={p.name}>{p.name}</li>)
  const sns = parsedConfig.subjectAlternativeNames?.map((p: any) => <li key={p}>{p}</li>)

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='domainName'>
          {parsedConfig.domainName}
        </ValueWithLabel>
        <ValueWithLabel label='issuedAt'>
          {parsedConfig.issuedAt}
        </ValueWithLabel>
        <ValueWithLabel label='issuer'>
          {parsedConfig.issuer}
        </ValueWithLabel>
        <ValueWithLabel label='keyAlgorithm'>
          {parsedConfig.keyAlgorithm}
        </ValueWithLabel>        
        <ValueWithLabel label='signatureAlgorithm'>
          {parsedConfig.signatureAlgorithm}
        </ValueWithLabel>
        <ValueWithLabel label='subject'>
          {parsedConfig.subject}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='keyUsages'>
          <ul>
            {sgs}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='subjectAlternativeNames'>
          <ul>
            {sns}
          </ul>
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
