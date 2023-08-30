import React, { useState, useCallback } from 'react'
import ReactFlow, {
    ReactFlowProvider,
    DefaultEdgeOptions, MarkerType, NodeTypes, Edge, Node, Position, HandleType, useReactFlow,
    MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, BackgroundVariant, Panel
} from 'reactflow'

import 'reactflow/dist/style.css'

import MiniModal from '@/Common/MiniModal'

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

const getNodeId = () => `randomnode_${+new Date()}`

const CommonFlow = (props: CommonFlow) => {
    const [showModal, setShowModal] = useState(false)
    const [newNode, setNewNode] = useState<any>(null)
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
                setNodes(flow.nodes || [])
                setEdges(flow.edges || [])
                setViewport({ x, y, zoom })
            }
        }

        restoreFlow()
    }, [setNodes, setViewport])

    const onAdd = () => {
        const newNode = {
            id: getNodeId(),
            data: { label: 'Added node' },
            position: {
                x: Math.random() * window.innerWidth - 100,
                y: Math.random() * window.innerHeight,
            },
        }

        setNewNode(newNode)
        setShowModal(true)
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MiniModal show={showModal} setShow={setShowModal}  >{newNode?.id}</MiniModal>
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
                    <button onClick={onAdd}>add</button>
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