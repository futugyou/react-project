import { useCallback } from 'react'
import { useReactFlow } from 'reactflow'
import { stashFlow } from '@/Flow/FlowService'

interface StashFlowProps {
    id: string
    title?: string
}

function StashFlow(props: StashFlowProps) {
    const { toObject } = useReactFlow()
    const title = props.title ?? 'stash'
    const onFlowStash = useCallback(() => {
        const flow = toObject()
        stashFlow(props.id, JSON.stringify(flow))
        window.dispatchEvent(new Event("storage"))
    }, [toObject()])

    return (
        <button onClick={onFlowStash}>{title}</button>
    )
}

export default StashFlow
