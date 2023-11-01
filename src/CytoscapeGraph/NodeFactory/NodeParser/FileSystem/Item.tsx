
import React from 'react'
import { ColumnLayout, SpaceBetween, Table, } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const Item = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Arn'>
          {parsedConfig.Arn}
        </ValueWithLabel>
        <ValueWithLabel label='Encrypted'>
          {parsedConfig.Encrypted}
        </ValueWithLabel>
        <ValueWithLabel label='FileSystemId'>
          {parsedConfig.FileSystemId}
        </ValueWithLabel>
        <ValueWithLabel label='KmsKeyId'>
          {parsedConfig.KmsKeyId}
        </ValueWithLabel>
        <ValueWithLabel label='PerformanceMode'>
          {parsedConfig.PerformanceMode}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='ThroughputMode'>
          {parsedConfig.ThroughputMode}
        </ValueWithLabel>
        <ValueWithLabel label='FileSystemTags'>
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
            items={configuration.FileSystemTags}
            sortingDisabled
            variant="embedded"
          />
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default Item
