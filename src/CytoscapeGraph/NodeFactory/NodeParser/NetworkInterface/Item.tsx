
import React from 'react'
import { ColumnLayout, SpaceBetween, } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'


export const Item = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Aassociation-IpOwnerId'>{parsedConfig.association?.ipOwnerId}</ValueWithLabel>
        <ValueWithLabel label='Aassociation-PublicDnsName'>{parsedConfig.association?.publicDnsName}</ValueWithLabel>
        <ValueWithLabel label='Aassociation-PublicIp'>{parsedConfig.association?.publicIp}</ValueWithLabel>
        <ValueWithLabel label='Description'>{parsedConfig.description}</ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Attachment-AttachmentId'>{parsedConfig.attachment?.attachmentId}</ValueWithLabel>
        <ValueWithLabel label='Attachment-InstanceOwnerId'>{parsedConfig.attachment?.instanceOwnerId}</ValueWithLabel>
        <ValueWithLabel label='Attachment-Status'>{parsedConfig.attachment?.status}</ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
