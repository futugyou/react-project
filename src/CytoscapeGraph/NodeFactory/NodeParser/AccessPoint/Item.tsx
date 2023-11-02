
import React from 'react'
import { ColumnLayout, SpaceBetween, Table, } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='AccessPointId'>
          {parsedConfig.AccessPointId}
        </ValueWithLabel>
        <ValueWithLabel label='Arn'>
          {parsedConfig.Arn}
        </ValueWithLabel>
        <ValueWithLabel label='ClientToken'>
          {parsedConfig.ClientToken}
        </ValueWithLabel>
        <ValueWithLabel label='FileSystemId'>
          {parsedConfig.FileSystemId}
        </ValueWithLabel>
        <ValueWithLabel label='RootDirectory'>
          {parsedConfig.RootDirectory?.Path}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='AccessPointTags'>
          <Table
            columnDefinitions={[
              {
                id: "Key",
                header: "Key",
                cell: (item: any) => item.Key || "-",
              },
              {
                id: "Value",
                header: "Value",
                cell: (item: any) => item.Value || "-",
              }
            ]}
            items={configuration.AccessPointTags}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
