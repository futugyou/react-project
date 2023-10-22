
import { ColumnLayout, SpaceBetween, } from '@cloudscape-design/components'
import { ValueWithLabel } from '@/CytoscapeGraph/NodeFactory/Shared/ValueWithLabel'

export const DatabaseInstanceItem = (configuration: any) => {
  const parsedConfig = configuration

  return (
    <ColumnLayout columns={2} variant='text-grid'>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Engine'>
          {`${parsedConfig.engine} - ${parsedConfig.engineVersion}`}
        </ValueWithLabel>
        <ValueWithLabel label='Instance class'>
          {parsedConfig.dBInstanceClass}
        </ValueWithLabel>
        <ValueWithLabel label='Database name'>
          {parsedConfig.dBName}
        </ValueWithLabel>
        <ValueWithLabel label='Backup window'>
          {parsedConfig.preferredBackupWindow}
        </ValueWithLabel>
        <ValueWithLabel label='Maintainance window'>
          {`${parsedConfig.preferredMaintenanceWindow}`}
        </ValueWithLabel>
      </SpaceBetween>
      <SpaceBetween size='l'>
        <ValueWithLabel label='Certificate'>
          {parsedConfig.cACertificateIdentifier}
        </ValueWithLabel>
        <ValueWithLabel label='Storage encrypted'>
          {`${parsedConfig.storageEncrypted}`}
        </ValueWithLabel>
        <ValueWithLabel label='Endpoint'>
          {parsedConfig.endpoint ? `${parsedConfig.endpoint.address}:${parsedConfig.endpoint.port}` : ''}
        </ValueWithLabel>
        <ValueWithLabel label='Latest restorable time'>
          {parsedConfig.latestRestorableTime}
        </ValueWithLabel>
      </SpaceBetween>
    </ColumnLayout>
  )
}

export default DatabaseInstanceItem
