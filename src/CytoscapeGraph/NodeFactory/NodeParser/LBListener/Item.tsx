import * as R from 'ramda'
import { ColumnLayout, SpaceBetween, Table } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration
  const certificates = parsedConfig.Certificates?.map((p: any) => <li key={p.CertificateArn}>{p.CertificateArn}</li>)

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Protocol'>
          {parsedConfig.Protocol}
        </ValueWithLabel>
        <ValueWithLabel label='Port'>
          {parsedConfig.Port}
        </ValueWithLabel>
        <ValueWithLabel label='SslPolicy'>
          {parsedConfig.SslPolicy}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='LoadBalancerArn'>
          {parsedConfig.LoadBalancerArn}
        </ValueWithLabel>
        <ValueWithLabel label='Certificates'>
          <ul>
            {certificates}
          </ul>
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
