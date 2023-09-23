import React, { useState, useCallback, useEffect } from 'react'
import { useReactFlow } from 'reactflow'
import { getFlow } from '@/Flow/FlowService'
import { useAuth } from '@/Auth/index'

function LoadFlow(props: any) {
    const { authService } = useAuth()
    if (!authService.isAuthenticated()) {
        return null
    }

    const { setNodes, setEdges, setViewport } = useReactFlow()

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

    return (
        <button onClick={onLoadFlowFromDB}>loadFromDB</button>
    )
}

export default LoadFlow
