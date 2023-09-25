import React, { useState, useCallback, useEffect } from 'react'
import { useReactFlow } from 'reactflow'
import { getFlow } from '@/Flow/FlowService'
import { useAuth } from '@/Auth/index'

interface DragNodeProps {
    title?: string
}

export const DragNodeType: string = 'application/reactflow'

function DragNode(props: DragNodeProps) {
    const { authService } = useAuth()
    if (!authService.isAuthenticated()) {
        return null
    }

    const title = props.title ?? 'Class Node'

    const onDragStart = (event: any, nodeType: string) => {
        event.dataTransfer.setData(DragNodeType, nodeType)
        event.dataTransfer.effectAllowed = 'move'
    }

    return (
        <button onDragStart={(event) => onDragStart(event, 'custom')} draggable>{title}</button>
    )
}

export default DragNode
