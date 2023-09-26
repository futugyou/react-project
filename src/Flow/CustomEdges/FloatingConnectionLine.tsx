import React from 'react'
import { getBezierPath, ConnectionLineComponentProps } from 'reactflow'

function FloatingConnectionLine(props: ConnectionLineComponentProps) {
    if (!props.fromNode) {
        return null
    }

    const [edgePath] = getBezierPath({
        sourceX: props.fromX,
        sourceY: props.fromY,
        sourcePosition: props.fromPosition,
        targetPosition: props.toPosition,
        targetX: props.toX,
        targetY: props.toY
    })

    return (
        <g>
            <path fill="none" stroke="#222" strokeWidth={1.5} className="animated" d={edgePath} />
            <circle cx={props.toX} cy={props.toY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
        </g>
    )
}

export default FloatingConnectionLine
