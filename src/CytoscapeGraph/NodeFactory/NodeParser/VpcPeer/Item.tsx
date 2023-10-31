
import { ColumnLayout, SpaceBetween, } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration

  const li1 = parsedConfig.accepterVpcInfo.cidrBlockSet.map((p: any) => <li key={p.cidrBlock}>{p.cidrBlock}</li>)
  const li2 = parsedConfig.requesterVpcInfo.cidrBlockSet.map((p: any) => <li key={p.cidrBlock}>{p.cidrBlock}</li>)
  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='accepter-cidrBlock'>
          {parsedConfig.accepterVpcInfo.cidrBlock}
        </ValueWithLabel>
        <ValueWithLabel label='accepter-cidrBlockSet'>
          <ul>
            {li1}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='accepter-ownerId'>
          {parsedConfig.accepterVpcInfo.ownerId}
        </ValueWithLabel>
        <ValueWithLabel label='accepter-region'>
          {parsedConfig.accepterVpcInfo.region}
        </ValueWithLabel>
        <ValueWithLabel label='accepter-vpcId'>
          {parsedConfig.accepterVpcInfo.vpcId}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='requester-cidrBlock'>
          {parsedConfig.requesterVpcInfo.cidrBlock}
        </ValueWithLabel>
        <ValueWithLabel label='requester-cidrBlockSet'>
          <ul>
            {li2}
          </ul>
        </ValueWithLabel>
        <ValueWithLabel label='requester-ownerId'>
          {parsedConfig.requesterVpcInfo.ownerId}
        </ValueWithLabel>
        <ValueWithLabel label='requester-region'>
          {parsedConfig.requesterVpcInfo.region}
        </ValueWithLabel>
        <ValueWithLabel label='requester-vpcId'>
          {parsedConfig.requesterVpcInfo.vpcId}
        </ValueWithLabel>
      </SpaceBetween>

    </ColumnLayout>
  )
}

export default Item
