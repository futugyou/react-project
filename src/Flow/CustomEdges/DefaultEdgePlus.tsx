import styles from './DefaultEdgePlus.module.css'

import { useCallback } from 'react'
import { StraightEdge, BezierEdge, StepEdge, SimpleBezierEdge, SmoothStepEdge, EdgeProps } from 'reactflow'

const DefaultEdgePlus = (props: EdgeProps) => {
    const edgeType = props?.data?.pathType ?? 'default'

    return (
        <>
            {props.selected && (<circle className={styles.pathselected} cx={props.sourceX} cy={props.sourceY} r={4} stroke="silver" fill="silver" />)}
            {props.selected && (<circle className={styles.pathselected} cx={props.targetX} cy={props.targetY} r={4} stroke="silver" fill="silver" />)}
            {(edgeType == 'default' || edgeType == 'bezier') && (<BezierEdge {...props} />)}
            {edgeType == 'straight' && (<StraightEdge {...props} />)}
            {edgeType == 'step' && (<StepEdge {...props} />)}
            {edgeType == 'smoothstep' && (<SmoothStepEdge {...props} />)}
            {edgeType == 'simplebezier' && (<SimpleBezierEdge {...props} />)}
        </>
    )
}

export default DefaultEdgePlus