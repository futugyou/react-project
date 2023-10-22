
import React from 'react'
import { ColumnLayout, SpaceBetween, } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration

  const associations = parsedConfig.associations.map((a: any) => (
    <SpaceBetween size='l' key={a.routeTableAssociationId}>
      <ValueWithLabel label='RouteTableId'>{a.routeTableId}</ValueWithLabel>
      <ValueWithLabel label='SubnetId'>{a.subnetId}</ValueWithLabel>
      <ValueWithLabel label='State'>{a.associationState.state}</ValueWithLabel>
    </SpaceBetween>
  ))

  const routes = parsedConfig.routes.map((a: any) => (
    <SpaceBetween size='l' key={a.destinationCidrBlock}>
      <ValueWithLabel label='AestinationCidrBlock'>{a.destinationCidrBlock}</ValueWithLabel>
      <ValueWithLabel label='GatewayId'>{a.gatewayId}</ValueWithLabel>
      <ValueWithLabel label='State'>{a.state}</ValueWithLabel>
    </SpaceBetween>
  ))

  const columns = associations.length + routes.length
  return (
    <ColumnLayout columns={columns} variant='text-grid'>
      {associations}
      {routes}
    </ColumnLayout>
  )
}

export default Item
