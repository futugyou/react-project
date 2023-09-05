import React, { useState, useEffect, useCallback } from 'react'
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
import { ClassNodeData, ClassNodeType, DefaultClassNodeType } from './ClassNode'
import { ModifyNode } from './ModifyNode'
import { restoreFlow, getFlow, saveFlow, stashFlow } from './FlowService'

import DownloadFlow from './DownloadFlow'

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
    const [disableRestore, setDisableRestore] = useState(true)
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

    useEffect(() => {
        const storageEventHandler = () => {
            const flow = restoreFlow(props.id)

            if (flow && flow.viewport) {
                setDisableRestore(false)
            } else {
                setDisableRestore(true)
            }
        }

        storageEventHandler()

        // Hook up the event handler
        // Do not change 'storage' type name, beacuse when delete data in 'F12->application->local storage',
        // it will send an event type named 'storage'.
        window.addEventListener("storage", storageEventHandler)
        return () => {
            // Remove the handler when the component unmounts
            window.removeEventListener("storage", storageEventHandler)
        }
    }, [])

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

                    return n;
                })
            )
        }

        setShowModal(false)
        if (selectedNode) {
            setSelectedNode(node)
        }
    }

    // panel operate
    const onFlowRestore = useCallback(() => {
        const restore = async () => {
            const flow = restoreFlow(props.id)

            if (flow && flow.viewport) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport
                setNodes(flow.nodes || [])
                setEdges(flow.edges || [])
                setViewport({ x, y, zoom })
            }
        }

        restore()
    }, [setNodes, setViewport])

    const onFlowStash = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject()
            stashFlow(props.id, JSON.stringify(flow))
            window.dispatchEvent(new Event("storage"))
        }
    }, [rfInstance])

    const onLoadFlowFromDB = useCallback(() => {
        const restore = async () => {
            const flow = await getFlow(props.id)

            if (flow && flow.viewport) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport
                setNodes(flow.nodes || [])
                setEdges(flow.edges || [])
                setViewport({ x, y, zoom })
            }
        }

        restore()
    }, [setNodes, setViewport])

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

    return (
        <div style={{ width: '100%', height: '100%' }}>
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
            >
                <Panel position="top-left">
                    <h2>{props.title}</h2>
                </Panel>
                <Panel position="top-right">
                    <button onClick={onFlowRestore} disabled={disableRestore}>restore</button>
                    <button onClick={onFlowStash}>stash</button>
                    {authService.isAuthenticated() && (
                        <>
                            <button onClick={onLoadFlowFromDB}>loadFromDB</button>
                            <button onClick={onSaveFlowToDB}>saveToDB</button>
                            <button onClick={onNodeAdd}>addNode</button>
                            <button onClick={onNodeChange} disabled={selectedNode == undefined}>updateNode</button>
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