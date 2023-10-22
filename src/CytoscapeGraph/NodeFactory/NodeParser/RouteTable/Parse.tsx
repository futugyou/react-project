
import * as R from 'ramda'
import React from 'react'
import { fetchImage } from '../../ImageSelector'
import { getStateInformation } from '../../Utils/ResourceStateParser'
import Item from './Item'

const Parse = (node: any) => {
  const properties = R.hasPath(['properties'], node) ? node.properties : node.data('properties')
  let configuration = JSON.parse(properties.configuration)
  configuration = R.is(Object, configuration) ? configuration : JSON.parse(configuration)

  const getType = (properties: any) => {
    return `${properties.resourceType}`
  }

  let stateCode = 'available'
  for (let index = 0; index < configuration.associations.length; index++) {
    const element = configuration.associations[index]
    if (element.associationState?.state != 'associated') {
      stateCode = 'pending'
      break
    }
  }

  if (stateCode == 'available') {
    for (let index = 0; index < configuration.routes.length; index++) {
      const element = configuration.routes[index]
      if (element.state != 'active') {
        stateCode = 'pending'
        break
      }
    }
  }

  const state = getStateInformation(stateCode)

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
    icon: fetchImage(getType(properties)),
    detailsComponent: React.createElement(Item, configuration),
  }
}

export default Parse