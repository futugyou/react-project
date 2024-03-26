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
import ControlFlow from '@/Flow/MiscFeatures/ControlFlow'
import HelpLine, { HelpLineHandler } from '@/Flow/MiscFeatures/HelpLine'

import EdgeStyle from '@/Flow/MiscFeatures/EdgeStyle'
import NodeStyle from '@/Flow/MiscFeatures/NodeStyle'
import FlowStyle, { DragNodeType } from '@/Flow/MiscFeatures/FlowStyle'

import { getRandomId, getAllChildrens } from '@/Flow/utils'

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

    const [showControl, setShowControl] = useState<boolean>(false)

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
    const helpLine = useRef<HelpLineHandler>({} as HelpLineHandler)

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
        const children = getAllChildrens(getNodes(), node).map((n) => n.id)
        const intersections = getIntersectingNodes(node)
            .filter(p => p.type == 'group' && !children.includes(p.id))
            .sort((a, b) => (b.style?.zIndex as number ?? 1000) - (a.style?.zIndex as number ?? 1000))

        let parentNode: Node | undefined
        if (intersections.length > 0) {
            parentNode = intersections[0]
        }

        // remove parentNode
        if (parentNode == undefined && node.parentNode) {
            setNodes((ns) =>
                ns.map(p => {
                    let className = (p.className ?? '').replaceAll('highlight', '').trim()
                    if (p.id == node.id) {
                        return {
                            ...node,
                            parentNode: undefined,
                            position: node.positionAbsolute!,
                            positionAbsolute: node.positionAbsolute,
                            className: className,
                        }
                    } else {
                        return { ...p, className: className }
                    }
                })
            )
        } else if (parentNode != undefined && node.parentNode != parentNode.id) {
            const parent = parentNode
            setNodes((ns) =>
                ns.map(p => {
                    let className = (p.className ?? '').replaceAll('highlight', '').trim()
                    if (p.id == node.id) {
                        // Theoretically, the positionAbsolute cannot be undefined
                        const position: XYPosition = {
                            x: (node.positionAbsolute?.x ?? node.position.x) - (parent.positionAbsolute?.x ?? parent.position.x),
                            y: (node.positionAbsolute?.y ?? node.position.y) - (parent.positionAbsolute?.y ?? parent.position.y),
                        }
                        return {
                            ...node,
                            parentNode: parent.id,
                            position: position,
                            className: className,
                        }
                    } else {
                        return { ...p, className: className }
                    }
                })
            )
        } else {
            setNodes((ns) =>
                ns.map(p => {
                    let className = (p.className ?? '').replaceAll('highlight', '').trim()
                    return { ...p, className: className }
                })
            )
        }

        helpLine.current.clearHelpLinePosition()
    }, [])

    const onNodeDrag = useCallback((event: MouseEvent, node: Node) => {
        const nodes = getNodes()
        const children = getAllChildrens(nodes, node).map((n) => n.id)
        const intersections = getIntersectingNodes(node)
            .filter(p => p.type == 'group' && !children.includes(p.id))
            .sort((a, b) => (b.style?.zIndex as number ?? 1000) - (a.style?.zIndex as number ?? 1000))

        let parentNode: Node | undefined
        let zIndex = 1000
        if (intersections.length > 0) {
            parentNode = intersections[0]
            const pzindex = parentNode.style?.zIndex
            if (pzindex) {
                zIndex = (pzindex as number) + 1
            } else {
                zIndex = 1001
            }
        }
        setNodes((ns) =>
            ns.map((n) => {
                let className = n.className ?? ''
                let style = n.style
                if (parentNode != undefined && parentNode.id == n.id) {
                    if (!className.includes('highlight')) {
                        className = className + ' highlight'
                    }
                } else {
                    if (n.id == node.id) {
                        style = { ...style, zIndex: zIndex }
                    }
                    className = className.replaceAll('highlight', '').trim()
                }
                return {
                    ...n,
                    className: className,
                    style: style,
                }
            })
        )

        helpLine.current.execHelpLinePosition(node)
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
                    <RestoreFlow id={props.id} nodes={props.initialNodes} edges={props.initialEdges} />
                    <StashFlow id={props.id} />
                    <LoadFlow id={props.id} />
                    <SaveFlow id={props.id} />
                    <UpdateNode selectedNode={selectedNode} />
                    <DownloadFlow />
                    <ControlFlow show={showControl} onClick={(s: boolean) => { setShowControl(s) }} />
                </Panel>
                <Panel position="top-center" >
                    <h2>{props.title}</h2>
                </Panel>
                <Controls />
                <HelpLine ref={helpLine} ></HelpLine>
                {showControl && selectedEdge && (<EdgeStyle selectedEdge={selectedEdge} key={selectedEdge?.id ?? getRandomId()} />)}
                {showControl && selectedNode && (<NodeStyle selectedNode={selectedNode} key={selectedNode?.id ?? getRandomId()} />)}
                {showControl && (!selectedEdge && !selectedNode) && (<FlowStyle></FlowStyle>)}
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