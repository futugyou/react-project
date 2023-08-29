import React, { useCallback, useMemo } from 'react'
import ReactFlow, {
    DefaultEdgeOptions, MarkerType, NodeTypes, Edge, Node, Position, HandleType,
    MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, BackgroundVariant, Panel
} from 'reactflow'

import 'reactflow/dist/style.css'
import { ClassNode } from '../ClassNode'
import { ServiceDescriptor } from './ServiceDescriptor'
import { ServiceCollection } from './ServiceCollection'
import { ServiceProvider } from './ServiceProvider'

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
        sourceHandle:'IServiceCollectionrightsource',
    },
]

const nodeTypes: NodeTypes = {
    custom: ClassNode,
}

const defaultEdgeOptions: DefaultEdgeOptions = {
    style: { strokeWidth: 1, stroke: 'black' },
    type: 'default',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'black',
    },
}

export default function DI() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const onConnect = useCallback((params: any) => {
        setEdges((eds) => addEdge(params, eds))
    }, [setEdges])

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                defaultEdgeOptions={defaultEdgeOptions}
                fitView
                nodeTypes={nodeTypes}
            >
                <Panel position="top-left">
                    <h2>Dependency Injection</h2>
                </Panel>
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    )
}