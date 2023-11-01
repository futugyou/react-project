
import * as R from 'ramda'
import React from 'react'
import { fetchImage } from '../../ImageSelector'
import { getStateInformation } from '../../Utils/ResourceStateParser'
import Item from './Item'

const Parse = (node: any) => {
  const properties = R.hasPath(['properties'], node) ? node.properties : node.data('properties')

  let configuration = JSON.parse(properties.configuration)

  configuration = R.is(Object, configuration) ? configuration : JSON.parse(configuration)

  const state = getStateInformation(configuration.State)

  return {
    styling: {
      borderStyle: 'solid',
      borderColour: state.color,
      borderOpacity: 0.25,
      borderSize: 1,
      message: state.text,
      colour: state.color,
    },
    state: state,
    icon: fetchImage(properties.resourceType),
    detailsComponent: React.createElement(Item, configuration),
  }
}

export default Parse