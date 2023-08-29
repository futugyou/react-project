import React from 'react'
import { NodeTypes, Edge, Node, Position } from 'reactflow'

import CommonFlow from '@/Flow/CommonFlow'
import { ClassNode } from '@/Flow/ClassNode'

import { ServiceDescriptor } from './ServiceDescriptor'
import { ServiceCollection } from './ServiceCollection'
import { ServiceProvider } from './ServiceProvider'
import { IServiceProviderFactory } from './IServiceProviderFactory'
import { ActivatorUtilities } from './ActivatorUtilities'

const initialNodes: Node[] = [
    {
        ...ServiceCollection,
        position: { x: 0, y: 0 },
        data: {
            ...ServiceCollection.data,
            connects: [{
                position: Position.Bottom,
                type: 'source',
            }, {
                position: Position.Right,
                type: 'source',
            }]
        },
    },
    {
        ...ServiceDescriptor,
        position: { x: 0, y: 300 },
        data: {
            ...ServiceDescriptor.data,
            connects: [{
                position: Position.Top,
                type: 'target',
            }]
        },
    },
    {
        ...ServiceProvider,
        position: { x: 700, y: 200 },
        data: {
            ...ServiceProvider.data,
            connects: [{
                position: Position.Top,
                type: 'target',
            }]
        },
    },
    {
        ...IServiceProviderFactory,
        position: { x: 900, y: 0 },
        data: {
            ...IServiceProviderFactory.data,
            connects: [{
                position: Position.Bottom,
                type: 'source',
            }]
        },
    },
    {
        ...ActivatorUtilities,
        position: { x: 700, y: 400 },
    },
]

const initialEdges: Edge[] = [
    {
        id: ServiceCollection.id + '-' + ServiceDescriptor.id,
        source: ServiceCollection.id,
        target: ServiceDescriptor.id,
    },
    {
        id: ServiceCollection.id + '-' + ServiceProvider.id,
        source: ServiceCollection.id,
        target: ServiceProvider.id,
        sourceHandle: 'IServiceCollectionrightsource',
    },
    {
        id: IServiceProviderFactory.id + '-' + ServiceProvider.id,
        source: IServiceProviderFactory.id,
        target: ServiceProvider.id,
    },
]

const nodeTypes: NodeTypes = {
    custom: ClassNode,
}

export default function DI() {
    return (
        <CommonFlow
            title={'Dependency Injection'}
            initialNodes={initialNodes}
            initialEdges={initialEdges}
            nodeTypes={nodeTypes} >
        </CommonFlow>
    )
}