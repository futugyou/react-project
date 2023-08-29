import React, { useCallback, useMemo } from 'react'
import ReactFlow, {
    MarkerType, NodeTypes, Edge, Node, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, BackgroundVariant, Panel
} from 'reactflow'

import 'reactflow/dist/style.css'
import { ClassNode } from '../ClassNode'
import { ServiceDescriptor } from './ServiceDescriptor'
import { ServiceCollection } from './ServiceCollection'

const initialNodes: Node[] = [
    {
        ...ServiceCollection,
        position: { x: 0, y: 0 },
    },
    {
        ...ServiceDescriptor,
        position: { x: 0, y: 300 },
    },
]
console.log(ServiceCollection.id + '-' + ServiceDescriptor.id)
const initialEdges: Edge[] = [
    {
        id: ServiceCollection.id + '-' + ServiceDescriptor.id,
        source: ServiceCollection.id,
        target: ServiceDescriptor.id,
    }
] 

const nodeTypes: NodeTypes = {
    custom: ClassNode,
}

const defaultEdgeOptions = {
    style: { strokeWidth: 1, stroke: 'black' },
    type: 'floating',
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