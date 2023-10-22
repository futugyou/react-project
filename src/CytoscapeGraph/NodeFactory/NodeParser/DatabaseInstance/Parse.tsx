
import * as R from 'ramda'
import React from 'react'
import { fetchImage } from '../../ImageSelector'
import { getStateInformation } from '../../Utils/ResourceStateParser'
import Item from './Item'

const Parse = (node: any) => {
  const properties = R.hasPath(['properties'], node) ? node.properties : node.data('properties')

  let configuration = JSON.parse(properties.configuration)

  configuration = R.is(Object, configuration) ? configuration : JSON.parse(configuration)

  const state = getStateInformation(configuration.dBInstanceStatus)

  const getEngineType = () => {
    if (configuration.engine) {
      return `AWS::RDS::DBInstance-${configuration.engine}`
    } else {
      return 'AWS::RDS::DBInstance'
    }
  }

  return {
    styling: {
      borderStyle: 'dotted',
      borderColour: state.color,
      borderOpacity: 0.25,
      borderSize: 1,
      message: state.text,
      colour: state.color,
    },
    state: state,
    icon: fetchImage(getEngineType(), state),
    detailsComponent: React.createElement(Item, configuration),
  }
}

export default Parse