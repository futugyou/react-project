import React, { useCallback } from 'react'
import { useReactFlow } from 'reactflow'
import { saveFlow } from '@/Flow/FlowService'
import { useAuth } from '@/Auth/index'

interface SaveFlowProps {
    id: string
    title?: string
}

function SaveFlow(props: SaveFlowProps) {
    const { authService } = useAuth()
    if (!authService.isAuthenticated()) {
        return null
    }

    const title = props.title ?? 'saveToDB'

    const { toObject } = useReactFlow()

    const onSaveFlowToDB = useCallback(() => {
        const flow = toObject()
        saveFlow(props.id, JSON.stringify(flow))

    }, [toObject])

    return (
        <button onClick={onSaveFlowToDB}>{title}</button>
    )
}

export default SaveFlow
