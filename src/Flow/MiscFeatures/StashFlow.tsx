import React, { useCallback } from 'react'
import { useReactFlow } from 'reactflow'
import { stashFlow } from '@/Flow/FlowService'

function StashFlow(props: any) {
    const { toObject } = useReactFlow()

    const onFlowStash = useCallback(() => {
        const flow = toObject()
        stashFlow(props.id, JSON.stringify(flow))
        window.dispatchEvent(new Event("storage"))
    }, [toObject()])

    return (
        <button onClick={onFlowStash}>stash</button>
    )
}

export default StashFlow
