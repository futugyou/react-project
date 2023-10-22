
import * as R from 'ramda'
import React from 'react'
import { fetchImage } from '../ImageSelector'
import DatabaseInstanceItem from './DatabaseInstanceDetails/DatabaseInstanceItem'

export const DatabaseInstanceParse = (node: any) => {
  const properties = R.hasPath(['properties'], node) ? node.properties : node.data('properties')

  let configuration = JSON.parse(properties.configuration)

  configuration = R.is(Object, configuration) ? configuration : JSON.parse(configuration)

  const state = {
    status: 'status-warning',
    text: 'no state data',
    color: '#FF9900',
  }

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
    detailsComponent: React.createElement(DatabaseInstanceItem, configuration),
  }
}
