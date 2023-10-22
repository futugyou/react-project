import React from 'react'
import * as R from 'ramda'
import { fetchImage } from '@/CytoscapeGraph/NodeFactory/ImageSelector'
import { InstanceItem } from '@/CytoscapeGraph/NodeFactory/EC2Instance/InstanceDetails/InstanceItem'
import { getStateInformation } from '../Utils/ResourceStateParser'

export const EC2InstanceParse = (node: any) => {
    const properties = R.hasPath(['properties'], node) ? node.properties : node.data('properties')

    const getImageType = () => {
        try {
            return R.head(configuration.instanceType.split('.'))
        } catch (error) {
            return 'AWS::EC2::Instance'
        }
    }

    let configuration = JSON.parse(properties.configuration)
    configuration = R.is(Object, configuration) ? configuration : JSON.parse(configuration)

    const state = getStateInformation(configuration.state.name)

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
        icon: fetchImage(getImageType(), state),
        detailsComponent: React.createElement(InstanceItem, configuration),
    }
}
