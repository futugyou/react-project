import styles from './DefaultNodePlus.module.css'

import { useState, useEffect } from 'react'
import { Handle, useStore, ReactFlowState, Position, NodeProps, useNodeId, useReactFlow, NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow'
import { NodeOperation } from './utils'

interface DefaultNodePlusData {
    label?: ''
    op?: NodeOperation
}


const DefaultNodePlus = (props: NodeProps<DefaultNodePlusData>) => {
    const nodeType = props.type ?? 'default'

    return (
        <div className={styles.DefaultNodePlus}>
            {(props.data?.op?.allowResizer ?? true) && (<NodeResizer minWidth={30} minHeight={30} isVisible={props.selected} keepAspectRatio={props.data?.op?.keepAspectRatio} lineClassName={styles.DefaultNodePlusResizerLine} handleClassName={styles.DefaultNodePlusResizerHandle} />)}
            <Handle id={props.id + '01'} key={props.id + '01'} position={Position.Top} type='source' className={`${props.selected ? styles.nodeHandleDisplay : styles.nodeHandleHidden}`} />
            <Handle id={props.id + '02'} key={props.id + '02'} position={Position.Bottom} type='source' className={`${props.selected ? styles.nodeHandleDisplay : styles.nodeHandleHidden}`} />
            <Handle id={props.id + '03'} key={props.id + '03'} position={Position.Left} type='source' className={`${props.selected ? styles.nodeHandleDisplay : styles.nodeHandleHidden}`} />
            <Handle id={props.id + '04'} key={props.id + '04'} position={Position.Right} type='source' className={`${props.selected ? styles.nodeHandleDisplay : styles.nodeHandleHidden}`} />
            <Handle id={props.id + '05'} key={props.id + '05'} position={Position.Top} type='target' className={styles.nodeHandleHidden2} />
            <Handle id={props.id + '06'} key={props.id + '06'} position={Position.Bottom} type='target' className={styles.nodeHandleHidden2} />
            <Handle id={props.id + '07'} key={props.id + '07'} position={Position.Left} type='target' className={styles.nodeHandleHidden2} />
            <Handle id={props.id + '08'} key={props.id + '08'} position={Position.Right} type='target' className={styles.nodeHandleHidden2} />
            {nodeType != 'group' ? props.data.label : ''}
        </div >
    )
}

export default DefaultNodePlus