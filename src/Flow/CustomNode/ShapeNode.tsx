import styles from './ShapeNode.module.css'

import { useState, useEffect, CSSProperties } from 'react'
import { Handle, Position, Node, NodeProps, HandleType, useNodeId, useReactFlow, NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow'

interface ShapeNodeData {
    color?: string
    shape?: 'diamond' | 'circle'
}

const getPathD = (width: number, height: number, shape: string) => {
    if (shape == 'diamond') {
        return "M0," + height / 2 + " L" + width / 2 + ",0 L" + width + "," + height / 2 + " L" + width / 2 + "," + height + " z"
    }

    if (shape == 'circle') {
        return "M0," + height / 2 + " L" + width / 2 + ",0 L" + width + "," + height / 2 + " L" + width / 2 + "," + height + " z"
    }

    return ''
}

const getStyleNumber = (t: string) => {
    const n = parseInt(t)
    if (isNaN(n)) {
        return 100
    }
    return n
}

const ShapeNode = (props: NodeProps<ShapeNodeData>) => {
    const nodeId = useNodeId()!
    const { getNode } = useReactFlow()
    const node = getNode(nodeId)!
    const shape = props.data?.shape ?? 'diamond'

    let [width, setWidth] = useState(getStyleNumber(node.style?.width as string))
    let [height, setHeight] = useState(getStyleNumber(node.style?.height as string))
    let backgroundColor = props.data?.color ?? "#ff6700"

    let [d, setD] = useState(getPathD(width, height, shape))

    useEffect(() => {

    }, [props.xPos, props.yPos])

    const onResize = (event: ResizeDragEvent, params: ResizeParams) => {
        // setWidth(params.width)
        // setHeight(params.height)
        // setD(getPathD(params.width, params.height, shape))
    }

    useEffect(() => {
        if (node.style?.width && node.style?.height) {
            const w = getStyleNumber(node.style.width as string)
            const h = getStyleNumber(node.style.height as string)
            setWidth(w)
            setHeight(h)
            setD(getPathD(w, h, shape))
        }

    }, [node.style?.width, node.style?.height])

    return (
        <div >
            <NodeResizer minWidth={30} minHeight={30} onResize={onResize} isVisible={props.selected} />
            <Handle id={props.id + '01'} key={props.id + '01'} position={Position.Top} type='source' className={`${props.selected ? styles.nodeHandleDisplay : styles.nodeHandleHidden}`} />
            <Handle id={props.id + '02'} key={props.id + '02'} position={Position.Bottom} type='source' className={`${props.selected ? styles.nodeHandleDisplay : styles.nodeHandleHidden}`} />
            <Handle id={props.id + '03'} key={props.id + '03'} position={Position.Left} type='source' className={`${props.selected ? styles.nodeHandleDisplay : styles.nodeHandleHidden}`} />
            <Handle id={props.id + '04'} key={props.id + '04'} position={Position.Right} type='source' className={`${props.selected ? styles.nodeHandleDisplay : styles.nodeHandleHidden}`} />
            <Handle id={props.id + '05'} key={props.id + '05'} style={{ top: height / 2, left: width / 2 }} position={Position.Top} type='target' className={styles.nodeHandleHidden} />

            <svg width={width} height={height}  >
                <path d={d} fill={backgroundColor} strokeWidth="2" stroke="#fff"></path>
            </svg >
        </div >
    )
}

export default ShapeNode