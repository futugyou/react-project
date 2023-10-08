import styles from './DefaultNodePlus.module.css'

import { useState, useEffect } from 'react'
import { Handle, useStore, ReactFlowState, Position, NodeProps, useNodeId, useReactFlow, NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow'
import { NodeOperation } from './utils'
import HandlePlus from './HandlePlus'

interface DefaultNodePlusData {
    label?: ''
    op?: NodeOperation
}


const DefaultNodePlus = (props: NodeProps<DefaultNodePlusData>) => {
    const nodeType = props.type ?? 'default'

    return (
        <div className={styles.DefaultNodePlus}>
            {(props.data?.op?.allowResizer ?? true) && (<NodeResizer minWidth={30} minHeight={30} isVisible={props.selected} keepAspectRatio={props.data?.op?.keepAspectRatio} lineClassName={styles.DefaultNodePlusResizerLine} handleClassName={styles.DefaultNodePlusResizerHandle} />)}
            <HandlePlus id={props.id} selected={props.selected}></HandlePlus>
            {nodeType != 'group' ? props.data.label : ''}
        </div >
    )
}

export default DefaultNodePlus