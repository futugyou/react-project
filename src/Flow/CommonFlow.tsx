import React, { useState, useEffect, useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'
import ReactFlow, {
    ReactFlowProvider, DefaultEdgeOptions, MarkerType, NodeTypes, Edge, Node, Controls, Background,
    useNodesState, useEdgesState, updateEdge, addEdge, BackgroundVariant, Panel, Connection,
    useOnSelectionChange, applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange,
    NodeDimensionChange, NodeSelectionChange
} from 'reactflow'

import 'reactflow/dist/style.css'

import { DefaultClassNodeType, getNodeId, ClassNode } from '@/Flow/CustomNode/ClassNode'
import ShapeNode from '@/Flow/CustomNode/ShapeNode'
import DefaultNodePlus from '@/Flow/CustomNode/DefaultNodePlus'
import FloatingConnectionLine from '@/Flow/CustomEdges/FloatingConnectionLine'
import FloatingEdge from '@/Flow/CustomEdges/FloatingEdge'
import DefaultEdgePlus from '@/Flow/CustomEdges/DefaultEdgePlus'

import RestoreFlow from '@/Flow/MiscFeatures/RestoreFlow'
import StashFlow from '@/Flow/MiscFeatures/StashFlow'
import LoadFlow from '@/Flow/MiscFeatures/LoadFlow'
import SaveFlow from '@/Flow/MiscFeatures/SaveFlow'
import UpdateNode from '@/Flow/MiscFeatures/UpdateNode'
import DownloadFlow from '@/Flow/MiscFeatures/DownloadFlow'

import EdgeStyle from '@/Flow/MiscFeatures/EdgeStyle'
import NodeStyle from '@/Flow/MiscFeatures/NodeStyle'
import FlowStyle, { DragNodeType } from '@/Flow/MiscFeatures/FlowStyle'

const defaultEdgeOptions: DefaultEdgeOptions = {
    style: { strokeWidth: 2, stroke: 'black' },
    type: 'default',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'black',
    },
}

const edgeTypes = {
    default: DefaultEdgePlus,
    straight: DefaultEdgePlus,
    step: DefaultEdgePlus,
    smoothstep: DefaultEdgePlus,
    simplebezier: DefaultEdgePlus,
    floating: FloatingEdge,
}

let nodeTypes: NodeTypes = {
    input: DefaultNodePlus,
    default: DefaultNodePlus,
    output: DefaultNodePlus,
    group: DefaultNodePlus,
    custom: ClassNode,
    shape: ShapeNode,
}

interface CommonFlow {
    id: string
    title: string
    initialNodes: Node[]
    initialEdges: Edge[]
    nodeTypes?: NodeTypes
    children?: React.ReactNode
}

const CommonFlow = (props: CommonFlow) => {
    // const [nodes, setNodes, onNodesChange] = useNodesState(props.initialNodes)
    // const [edges, setEdges, onEdgesChange] = useEdgesState(props.initialEdges)

    const [selectedNode, setSelectedNode] = useState<Node>()
    const [selectedEdge, setSelectedEdge] = useState<Edge>()

    const [nodes, setNodes] = useState(props.initialNodes)
    const [edges, setEdges] = useState(props.initialEdges)

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        setNodes((nds) => {
            const change = changes.find(p => p.type == 'dimensions') as NodeDimensionChange
            if (change && change.dimensions && selectedNode) {
                setSelectedNode({ ...selectedNode, style: { ...selectedNode.style, width: change.dimensions.width, height: change.dimensions.height } })
            }

            const nodes = applyNodeChanges(changes, nds)
            return nodes
        })
    }, [selectedNode])

    const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])

    const onConnect = useCallback((params: any) => {
        setEdges((eds) => addEdge({ ...params, type: 'default', markerEnd: { type: MarkerType.ArrowClosed, color: 'black', } }, eds))
    }, [setEdges])

    const onEdgeUpdate = useCallback(
        (oldEdge: Edge<any>, newConnection: Connection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
        []
    )

    const [rfInstance, setRfInstance] = useState<any>(null)
    const reactFlowWrapper = useRef<any>(null)

    const onDragOver = useCallback((event: any) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }, [])

    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault()

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
            const nodeType = JSON.parse(event.dataTransfer.getData(DragNodeType) ?? '{}')

            // check if the dropped element is valid
            if (typeof nodeType.type === 'undefined' || !nodeType.type) {
                return
            }

            const position = rfInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            })

            const newNode: Node = {
                ...DefaultClassNodeType,
                id: getNodeId(),
                type: nodeType.type,
                data: { ...DefaultClassNodeType.data, shape: nodeType.shape },
                resizing: true,
                position,
            }

            setNodes((nds) => nds.concat(newNode))
        },
        [rfInstance]
    )


    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            if (nodes.length == 1) {
                setSelectedNode(nodes[0])
            } else {
                setSelectedNode(undefined)
            }
            if (edges.length == 1) {
                setSelectedEdge(edges[0])
            } else {
                setSelectedEdge(undefined)
            }
        }
    })

    return (
        <div style={{ width: '100%', height: '100%' }} ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeUpdate={onEdgeUpdate}
                defaultEdgeOptions={defaultEdgeOptions}
                fitView
                nodeTypes={nodeTypes}
                onInit={setRfInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                edgeTypes={edgeTypes}
                connectionLineComponent={FloatingConnectionLine}
            >
                <Panel position="top-left">
                    <h2>{props.title}</h2>
                </Panel>
                <Panel position="top-right">
                    <RestoreFlow id={props.id} />
                    <StashFlow id={props.id} />
                    <LoadFlow id={props.id} />
                    <SaveFlow id={props.id} />
                    <UpdateNode selectedNode={selectedNode} />
                    <DownloadFlow />
                </Panel>
                <Controls />
                {selectedEdge && (<EdgeStyle selectedEdge={selectedEdge} key={selectedEdge?.id ?? getNodeId()} />)}
                {selectedNode && (<NodeStyle selectedNode={selectedNode} key={selectedNode?.id ?? getNodeId()} />)}
                {(!selectedEdge && !selectedNode) && (<FlowStyle></FlowStyle>)}
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