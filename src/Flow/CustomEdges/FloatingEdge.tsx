import styles from './FloatingEdge.module.css'

import { useCallback } from 'react'
import { useStore, getBezierPath, EdgeProps, getSmoothStepPath, getStraightPath } from 'reactflow'

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

    let edgePath = ''
    switch (props.data?.pathType) {
        case 'smoothstep':
            edgePath = getSmoothStepPath({
                sourceX: sx,
                sourceY: sy,
                sourcePosition: sourcePos,
                targetPosition: targetPos,
                targetX: tx,
                targetY: ty,
            })[0]
            break
        case 'step':
            edgePath = getSmoothStepPath({
                borderRadius: 0,
                sourceX: sx,
                sourceY: sy,
                sourcePosition: sourcePos,
                targetPosition: targetPos,
                targetX: tx,
                targetY: ty,
            })[0]
            break
        case 'straight':
            edgePath = getStraightPath({
                sourceX: sx,
                sourceY: sy,
                targetX: tx,
                targetY: ty,
            })[0]
            break
        default:
            edgePath = getBezierPath({
                sourceX: sx,
                sourceY: sy,
                sourcePosition: sourcePos,
                targetPosition: targetPos,
                targetX: tx,
                targetY: ty,
            })[0]
            break
    }

    return (
        <>
            {props.selected && (<circle className={styles.pathselected} cx={sx} cy={sy} r={4} stroke="silver" fill="silver" />)}
            {props.selected && (<circle className={styles.pathselected} cx={tx} cy={ty} r={4} stroke="silver" fill="silver" />)}

            <path id={props.id} className={"react-flow__edge-path"}
                d={edgePath} markerEnd={props.markerEnd} markerStart={props.markerStart}
                style={props.style} />
        </>

    )
}

export default FloatingEdge
