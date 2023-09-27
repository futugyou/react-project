import React, { useState, useEffect, useCallback, useRef } from 'react'
import ReactFlow, {
    ReactFlowProvider, DefaultEdgeOptions, MarkerType, NodeTypes, Edge, Node, Controls, Background,
    useNodesState, useEdgesState, updateEdge, addEdge, BackgroundVariant, Panel, Connection,
    useOnSelectionChange
} from 'reactflow'

import 'reactflow/dist/style.css'

import { DefaultClassNodeType, getNodeId } from '@/Flow/CustomNode/ClassNode'
import FloatingConnectionLine from '@/Flow/CustomEdges/FloatingConnectionLine'
import FloatingEdge from '@/Flow/CustomEdges/FloatingEdge'

import DownloadFlow from '@/Flow/MiscFeatures/DownloadFlow'
import StashFlow from '@/Flow/MiscFeatures/StashFlow'
import RestoreFlow from '@/Flow/MiscFeatures/RestoreFlow'
import LoadFlow from '@/Flow/MiscFeatures/LoadFlow'
import SaveFlow from '@/Flow/MiscFeatures/SaveFlow'
import CreateNode from '@/Flow/MiscFeatures/CreateNode'
import UpdateNode from '@/Flow/MiscFeatures/UpdateNode'
import DragNode, { DragNodeType } from '@/Flow/MiscFeatures/DragNode'
import EdgeStyleGroup from '@/Flow/MiscFeatures/EdgeStyleGroup'

const defaultEdgeOptions: DefaultEdgeOptions = {
    style: { strokeWidth: 1, stroke: 'black' },
    type: 'default',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'black',
    },
}

const edgeTypes = {
    floating: FloatingEdge,
}

interface CommonFlow {
    id: string
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
        // setEdges((eds) => addEdge(params, eds))
        setEdges((eds) => addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow, color: 'black', } }, eds))
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
            const type = event.dataTransfer.getData(DragNodeType)

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return
            }

            const position = rfInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            })

            const newNode = {
                ...DefaultClassNodeType,
                id: getNodeId(),
                type,
                position,
            }

            setNodes((nds) => nds.concat(newNode))
        },
        [rfInstance]
    )

    useOnSelectionChange({
        onChange: ({ edges }) => {
            if (edges.length == 1) {
                const e = edges[0]
                setEdges((eds) => eds.map((n) => {
                    let animated = false
                    if (n.id === e.id) {
                        animated = true
                    }

                    return { ...n, animated: animated }
                }))
            } else {
                setEdges((eds) => eds.map((n) => {
                    n = {
                        ...n,
                        animated: false
                    }
                    return n
                }))
            }
        },
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
                nodeTypes={props.nodeTypes}
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
                    <CreateNode type='custom' ></CreateNode>
                    <UpdateNode />
                    <DragNode />
                    <DownloadFlow />
                </Panel>
                <Controls />
                <EdgeStyleGroup />
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