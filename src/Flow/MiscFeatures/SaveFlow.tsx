import React, { useCallback } from 'react'
import { useReactFlow } from 'reactflow'
import { saveFlow } from '@/Flow/FlowService'
import { useAuth } from '@/Auth/index'

function SaveFlow(props: any) {
    const { authService } = useAuth()
    if (!authService.isAuthenticated()) {
        return null
    }

    const { toObject } = useReactFlow()

    const onSaveFlowToDB = useCallback(() => {
        const flow = toObject()
        saveFlow(props.id, JSON.stringify(flow))

    }, [toObject])

    return (
        <button onClick={onSaveFlowToDB}>saveToDB</button>
    )
}

export default SaveFlow
