import React, { useState, useCallback } from 'react'
import ReactFlow, {
    ReactFlowProvider,
    DefaultEdgeOptions, MarkerType, NodeTypes, Edge, Node, Position, HandleType, useReactFlow,
    MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, BackgroundVariant, Panel
} from 'reactflow'

import 'reactflow/dist/style.css'

const defaultEdgeOptions: DefaultEdgeOptions = {
    style: { strokeWidth: 2, stroke: 'black' },
    type: 'default',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'black',
    },
}

interface CommonFlow {
    title: string
    initialNodes: Node[]
    initialEdges: Edge[]
    nodeTypes: NodeTypes
    children?: React.ReactNode
}

const CommonFlow = (props: CommonFlow) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(props.initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.initialEdges)

    const onConnect = useCallback((params: any) => {
        setEdges((eds) => addEdge(params, eds))
    }, [setEdges])

    const [rfInstance, setRfInstance] = useState<any>(null)
    const { setViewport } = useReactFlow()

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject()
            localStorage.setItem('example-flow', JSON.stringify(flow))
        }
    }, [rfInstance])

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem('example-flow') ?? '{}')

            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }
        };

        restoreFlow();
    }, [setNodes, setViewport])

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
                nodeTypes={props.nodeTypes}
                onInit={setRfInstance}
            >
                <Panel position="top-left">
                    <h2>{props.title}</h2>
                </Panel>
                <Panel position="top-right">
                    <button onClick={onSave}>save</button>
                    <button onClick={onRestore}>restore</button>
                </Panel>
                <Controls />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    )
}

function FlowWithProvider(props: CommonFlow) {
    return (
        <ReactFlowProvider>
            <CommonFlow {...props} />
        </ReactFlowProvider>
    )
}

export default React.memo(FlowWithProvider)