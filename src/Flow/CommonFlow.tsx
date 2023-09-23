import React, { useState, useEffect, useCallback, useRef } from 'react'
import ReactFlow, {
    ReactFlowProvider,
    DefaultEdgeOptions, MarkerType, NodeTypes, Edge, Node, Position, HandleType, useReactFlow,
    MiniMap, Controls, Background, useNodesState, useEdgesState, updateEdge, addEdge, BackgroundVariant, Panel,
    useOnSelectionChange,
    Connection
} from 'reactflow'

import 'reactflow/dist/style.css'

import { useAuth } from '@/Auth/index'
import MiniModal from '@/Common/MiniModal'
import { ClassNodeData, ClassNodeType, DefaultClassNodeType, getNodeId } from '@/Flow/CustomNode/ClassNode'
import { ModifyNode } from '@/Flow/CustomNode/ModifyNode'
import { restoreFlow, getFlow, saveFlow, stashFlow } from '@/Flow/FlowService'

import DownloadFlow from '@/Flow/MiscFeatures/DownloadFlow'
import StashFlow from '@/Flow/MiscFeatures/StashFlow'
import RestoreFlow from '@/Flow/MiscFeatures/RestoreFlow'
import LoadFlow from '@/Flow/MiscFeatures/LoadFlow'
import SaveFlow from '@/Flow/MiscFeatures/SaveFlow'

const defaultEdgeOptions: DefaultEdgeOptions = {
    style: { strokeWidth: 2, stroke: 'black' },
    type: 'default',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'black',
    },
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
    const { authService } = useAuth()
    const [showModal, setShowModal] = useState(false)
    const [addOrUpdtateNode, setAddOrUpdtateNode] = useState<ClassNodeType>(DefaultClassNodeType)
    const [selectedNode, setSelectedNode] = useState<ClassNodeType>()

    const [nodes, setNodes, onNodesChange] = useNodesState(props.initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.initialEdges)

    const onConnect = useCallback((params: any) => {
        setEdges((eds) => addEdge(params, eds))
    }, [setEdges])

    const onEdgeUpdate = useCallback(
        (oldEdge: Edge<any>, newConnection: Connection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
        []
    )

    const [rfInstance, setRfInstance] = useState<any>(null)
    const reactFlowWrapper = useRef<any>(null)
    const { setViewport } = useReactFlow()

    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            if (nodes.length > 0) {
                const selected = nodes[0]
                setSelectedNode(selected)
            } else {
                setSelectedNode(undefined)
            }
        }
    })

    // ModifyNode callback
    const updateNode = (data: ClassNodeData) => {
        const node = {
            ...addOrUpdtateNode,
            id: data.id,
            data: data,
        }

        const index = nodes.findIndex(n => n.id == node.id)
        if (index == -1) {
            setNodes((nds) => nds.concat(node))
        } else {
            setNodes((nds) =>
                nds.map((n) => {
                    if (n.id === node.id) {
                        n = {
                            ...node,
                        }
                    }

                    return n
                })
            )
        }

        setShowModal(false)
        if (selectedNode) {
            setSelectedNode(node)
        }
    }

    const onSaveFlowToDB = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject()
            saveFlow(props.id, JSON.stringify(flow))
        }
    }, [rfInstance])

    const onNodeAdd = () => {
        const newNode = DefaultClassNodeType
        setAddOrUpdtateNode(newNode)
        setShowModal(true)
    }

    const onNodeChange = () => {
        if (selectedNode) {
            setAddOrUpdtateNode(selectedNode)
            setShowModal(true)
        }
    }

    const onDragStart = (event: any, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType)
        event.dataTransfer.effectAllowed = 'move'
    }

    const onDragOver = useCallback((event: any) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }, [])

    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault()

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
            const type = event.dataTransfer.getData('application/reactflow')

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

    return (
        <div style={{ width: '100%', height: '100%' }} ref={reactFlowWrapper}>
            <MiniModal show={showModal} setShow={setShowModal}  >
                <ModifyNode data={addOrUpdtateNode.data} updateNode={updateNode} ></ModifyNode>
            </MiniModal>
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
            >
                <Panel position="top-left">
                    <h2>{props.title}</h2>
                </Panel>
                <Panel position="top-right">
                    <RestoreFlow id={props.id} />
                    <StashFlow id={props.id} />
                    <LoadFlow id={props.id} />
                    <SaveFlow id={props.id} />
                    {authService.isAuthenticated() && (
                        <>
                            <button onClick={onNodeAdd}>addNode</button>
                            <button onClick={onNodeChange} disabled={selectedNode == undefined}>updateNode</button>
                            <button onDragStart={(event) => onDragStart(event, 'custom')} draggable>Class Node</button>
                        </>
                    )}
                    <DownloadFlow />
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