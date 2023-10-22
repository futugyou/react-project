
import React from 'react'
import { ColumnLayout, SpaceBetween, } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

const Item = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Scheme'>{parsedConfig.scheme}</ValueWithLabel>
        <ValueWithLabel label='DNSName'>{parsedConfig.dNSName}</ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Type'>{parsedConfig.type ? parsedConfig.type : 'Classic'}</ValueWithLabel>
        <ValueWithLabel label='IpAddressType'>{parsedConfig.ipAddressType}</ValueWithLabel>
        <ValueWithLabel label='HostedZoneId'>{parsedConfig.canonicalHostedZoneId}</ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
