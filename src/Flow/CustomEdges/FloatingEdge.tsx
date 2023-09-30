import styles from './FloatingEdge.module.css'

import { useCallback } from 'react'
import { useStore, getBezierPath, EdgeProps, getSmoothStepPath, getStraightPath, EdgeLabelRenderer } from 'reactflow'

import { getEdgeParams } from './utils'

export interface EdgeData {
    pathType: 'bezier' | 'smoothstep' | 'straight' | 'step'
}

const FloatingEdge = (props: EdgeProps<EdgeData>) => {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(props.source), [props.source]))
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(props.target), [props.target]))

    if (!sourceNode || !targetNode) {
        return null
    }

    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode)

    let edgePath = '', labelX = 0, labelY = 0
    switch (props.data?.pathType) {
        case 'smoothstep':
            [edgePath, labelX, labelY] = getSmoothStepPath({
                sourceX: sx,
                sourceY: sy,
                sourcePosition: sourcePos,
                targetPosition: targetPos,
                targetX: tx,
                targetY: ty,
            })
            break
        case 'step':
            [edgePath, labelX, labelY] = getSmoothStepPath({
                borderRadius: 0,
                sourceX: sx,
                sourceY: sy,
                sourcePosition: sourcePos,
                targetPosition: targetPos,
                targetX: tx,
                targetY: ty,
            })
            break
        case 'straight':
            [edgePath, labelX, labelY] = getStraightPath({
                sourceX: sx,
                sourceY: sy,
                targetX: tx,
                targetY: ty,
            })
            break
        default:
            [edgePath, labelX, labelY] = getBezierPath({
                sourceX: sx,
                sourceY: sy,
                sourcePosition: sourcePos,
                targetPosition: targetPos,
                targetX: tx,
                targetY: ty,
            })
            break
    }

    return (
        <>
            {props.selected && (<circle className={styles.pathselected} cx={sx} cy={sy} r={4} stroke="silver" fill="silver" />)}
            {props.selected && (<circle className={styles.pathselected} cx={tx} cy={ty} r={4} stroke="silver" fill="silver" />)}

            <path id={props.id} className={"react-flow__edge-path"}
                d={edgePath} markerEnd={props.markerEnd} markerStart={props.markerStart}
                style={props.style} />
            <EdgeLabelRenderer>
                {
                    props.label && (
                        <div
                            style={{
                                position: 'absolute',
                                background: 'transparent',
                                padding: 10,
                                color: props.labelStyle?.color ?? '#000000',
                                fontSize: 12,
                                fontWeight: 400,
                                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            }}
                            className="nodrag nopan"
                        >
                            {props.label}
                        </div>
                    )}
            </EdgeLabelRenderer>
        </>

    )
}

export default FloatingEdge
