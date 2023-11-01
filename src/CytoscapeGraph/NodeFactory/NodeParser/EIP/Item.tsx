
import React from 'react'
import { ColumnLayout, SpaceBetween, } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='allocationId'>
          {parsedConfig.allocationId}
        </ValueWithLabel>
        <ValueWithLabel label='associationId'>
          {parsedConfig.associationId}
        </ValueWithLabel>
        <ValueWithLabel label='domain'>
          {parsedConfig.domain}
        </ValueWithLabel>
        <ValueWithLabel label='networkBorderGroup'>
          {parsedConfig.networkBorderGroup}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='networkInterfaceId'>
          {parsedConfig.networkInterfaceId}
        </ValueWithLabel>
        <ValueWithLabel label='privateIpAddress'>
          {parsedConfig.privateIpAddress}
        </ValueWithLabel>
        <ValueWithLabel label='publicIp'>
          {parsedConfig.publicIp}
        </ValueWithLabel>
        <ValueWithLabel label='publicIpv4Pool'>
          {parsedConfig.publicIpv4Pool}
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
