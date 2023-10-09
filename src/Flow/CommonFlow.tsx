import './CommonFlow.css'

import React, { useState, useCallback, useRef, MouseEvent, DragEvent } from 'react'
import ReactFlow, {
    ReactFlowProvider, DefaultEdgeOptions, MarkerType, NodeTypes, EdgeTypes, Edge, Node, Controls, Background,
    updateEdge, addEdge, BackgroundVariant, Panel, Connection, NodeChange, EdgeChange, XYPosition,
    useOnSelectionChange, applyEdgeChanges, applyNodeChanges, NodeDimensionChange, useReactFlow
} from 'reactflow'

import 'reactflow/dist/style.css'

import ClassNode from '@/Flow/CustomNode/ClassNode'
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

import { getRandomId } from '@/Flow/utils'

const defaultEdgeOptions: DefaultEdgeOptions = {
    style: { strokeWidth: 2, stroke: 'black' },
    type: 'default',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'black',
    },
}

const edgeTypes: EdgeTypes = {
    default: DefaultEdgePlus,
    straight: DefaultEdgePlus,
    step: DefaultEdgePlus,
    smoothstep: DefaultEdgePlus,
    simplebezier: DefaultEdgePlus,
    floating: FloatingEdge,
}

const nodeTypes: NodeTypes = {
    input: DefaultNodePlus,
    default: DefaultNodePlus,
    output: DefaultNodePlus,
    group: DefaultNodePlus,
    custom: ClassNode,
    class: ClassNode,
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
    const { getNodes, getIntersectingNodes } = useReactFlow()

    const [nodes, setNodes] = useState(props.initialNodes)
    const [edges, setEdges] = useState(props.initialEdges)

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        setNodes((nds) => {
            const change = changes.find(p => p.type == 'dimensions') as NodeDimensionChange
            if (change && change.dimensions && selectedNode) {
                // this is called when node resizer
                const n = nds.find(p => p.id == change.id)!
                setSelectedNode({
                    ...n,
                    style: {
                        ...n.style,
                        width: change.dimensions.width,
                        height: change.dimensions.height
                    }
                })
            }

            const nodes = applyNodeChanges(changes, nds)
            return nodes
        })
    }, [selectedNode])

    const onEdgesChange = useCallback((changes: EdgeChange[]) => {
        setEdges((eds) => applyEdgeChanges(changes, eds))
    }, [])

    const onConnect = useCallback((params: Connection) => {
        setEdges((eds) => addEdge({
            ...params,
            ...defaultEdgeOptions,
        }, eds))
    }, [setEdges])

    const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
        setEdges((els) => updateEdge(oldEdge, newConnection, els))
    }, [])

    const [rfInstance, setRfInstance] = useState<any>(null)
    const reactFlowWrapper = useRef<any>(null)

    const onDragOver = useCallback((event: DragEvent) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }, [])

    const onDrop = useCallback((event: DragEvent) => {
        event.preventDefault()
        const nodeType = JSON.parse(event.dataTransfer.getData(DragNodeType) ?? '{}')

        // check if the dropped element is valid
        if (typeof nodeType.type === 'undefined' || !nodeType.type) {
            return
        }

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
        const position = rfInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        })

        const newNode: Node = {
            id: getRandomId(),
            type: nodeType.type,
            data: { shape: nodeType.shape },
            position,
        }

        if (newNode.type == 'group') {
            newNode.style = { ...newNode.style, height: 200, width: 200 }
        }

        setNodes((nds) => nds.concat(newNode))
    }, [rfInstance])

    const onNodeDragStop = useCallback((event: MouseEvent, node: Node) => {
        const children = getNodes().filter(p => p.parentNode == node.id).map((n) => n.id)
        const intersections = getIntersectingNodes(node)
            .filter(p => p.type == 'group' && !children.includes(p.id))
            .map((n) => n.id)

        // remove parentNode
        if (intersections.length == 0 && node.parentNode) {
            setNodes((ns) =>
                ns.map(p => {
                    if (p.id == node.id) {
                        let zIndex = node.style?.zIndex as number
                        if (zIndex == undefined || zIndex <= 1000) {
                            zIndex = 1000
                        } else {
                            zIndex = zIndex - 1
                        }

                        return {
                            ...node,
                            parentNode: undefined,
                            position: node.positionAbsolute!,
                            positionAbsolute: node.positionAbsolute,
                            style: { ...node.style, zIndex: zIndex },
                            className: '',
                        }
                    } else {
                        return { ...p, className: '' }
                    }
                })
            )
        }

        if (intersections.length == 1 && node.parentNode != intersections[0]) {
            const parentNode = getNodes().find(p => p.id == intersections[0])!
            setNodes((ns) =>
                ns.map(p => {
                    if (p.id == node.id) {
                        const position: XYPosition = {
                            x: (node.positionAbsolute?.x ?? node.position.x) - parentNode.position.x,
                            y: (node.positionAbsolute?.y ?? node.position.y) - parentNode.position.y,
                        }

                        let zIndex = node.style?.zIndex as number
                        if (zIndex == undefined) {
                            zIndex = 1001
                        } else {
                            zIndex = zIndex + 1
                        }

                        return {
                            ...node,
                            parentNode: intersections[0],
                            position: position,
                            style: { ...node.style, zIndex: zIndex },
                            className: '',
                        }
                    } else {
                        return { ...p, className: '' }
                    }
                })
            )
        }
    }, [])

    const onNodeDrag = useCallback((event: MouseEvent, node: Node) => {
        const children = getNodes().filter(p => p.parentNode == node.id).map((n) => n.id)
        const intersections = getIntersectingNodes(node)
            .filter(p => p.type == 'group' && !children.includes(p.id))
            .map((n) => n.id)

        setNodes((ns) =>
            ns.map((n) => ({
                ...n,
                className: intersections.includes(n.id) ? 'highlight' : '',
            }))
        )
    }, [])

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
                onNodeDragStop={onNodeDragStop}
                onNodeDrag={onNodeDrag}
                onDragOver={onDragOver}
                edgeTypes={edgeTypes}
                connectionLineComponent={FloatingConnectionLine}
            >
                <Panel position="top-left">
                    <RestoreFlow id={props.id} />
                    <StashFlow id={props.id} />
                    <LoadFlow id={props.id} />
                    <SaveFlow id={props.id} />
                    <UpdateNode selectedNode={selectedNode} />
                    <DownloadFlow />
                </Panel>
                <Panel position="top-center" >
                    <h2>{props.title}</h2>
                </Panel>
                <Controls />
                {selectedEdge && (<EdgeStyle selectedEdge={selectedEdge} key={selectedEdge?.id ?? getRandomId()} />)}
                {selectedNode && (<NodeStyle selectedNode={selectedNode} key={selectedNode?.id ?? getRandomId()} />)}
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