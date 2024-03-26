import { useState, useCallback, useEffect } from 'react'
import { useReactFlow, Node, Edge } from 'reactflow'
import { restoreFlow } from '@/Flow/FlowService'

interface RestoreFlowProps {
    id: string
    nodes: Node[]
    edges: Edge[]
    title?: string
}

function RestoreFlow(props: RestoreFlowProps) {
    // const [disableRestore, setDisableRestore] = useState(true)
    const { setNodes, setEdges, setViewport } = useReactFlow()
    const title = props.title ?? 'Restore'
    // panel operate
    const onFlowRestore = useCallback(() => {
        const restore = async () => {
            const flow = restoreFlow(props.id)

            if (flow && flow.viewport) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport
                setNodes(flow.nodes || [])
                setEdges(flow.edges || [])
                setViewport({ x, y, zoom })
            } else {
                setNodes(props.nodes || [])
                setEdges(props.edges || [])
            }
        }

        restore()
    }, [setNodes, setViewport])

    // useEffect(() => {
    //     const storageEventHandler = () => {
    //         const flow = restoreFlow(props.id)

    //         if (flow && flow.viewport) {
    //             setDisableRestore(false)
    //         } else {
    //             setDisableRestore(true)
    //         }
    //     }

    //     storageEventHandler()

    //     // Hook up the event handler
    //     // Do not change 'storage' type name, beacuse when delete data in 'F12->application->local storage',
    //     // it will send an event type named 'storage'.
    //     window.addEventListener("storage", storageEventHandler)
    //     return () => {
    //         // Remove the handler when the component unmounts
    //         window.removeEventListener("storage", storageEventHandler)
    //     }
    // }, [])

    return (
        <button onClick={onFlowRestore} >{title}</button>
        // <button onClick={onFlowRestore} disabled={disableRestore}>{title}</button>
    )
}

export default RestoreFlow
