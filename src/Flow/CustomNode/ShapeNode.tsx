import styles from './ShapeNode.module.css'

import { useState, useEffect, CSSProperties } from 'react'
import { Handle, Position, Node, NodeProps, HandleType, useNodeId, useReactFlow, NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow'

interface ShapeNodeData {
    shape?: 'diamond' | 'circle' | 'ellipse' | 'parallelogram' | 'rect' | 'radiusrect' | 'db' | 'bus'
    label?: ''
}

const ratio = 0.2

const getPathD = (width: number, height: number, shape: string) => {
    if (shape == 'diamond') {
        return "M0," + height / 2 + " L" + width / 2 + ",0 L" + width + "," + height / 2 + " L" + width / 2 + "," + height + " z"
    }

    if (shape == 'parallelogram') {
        return "M0," + height + " L" + width * ratio + ",0 L" + width + ",0 L" + width * (1 - ratio) + "," + height + " z"
    }

    if (shape == 'db') {
        const h = height * ratio / 2
        const w = width * ratio / 2
        //M0,10  L 0,70 A 50 10 0 1 0 100 70 L 100,10 A 50 10 0 1 1 0 10 A 50 10 0 1 1 100 10 A 50 10 0 1 1 0 10 z
        return `
        M0,${h}  
        L 0,${height - h} 
        A ${width / 2} ${h} 0 1 0 ${width} ${height - h} 
        L ${width},${h} 
        A ${width / 2} ${h} 0 1 1 0 ${h} 
        A ${width / 2} ${h} 0 1 1 ${width} ${h} 
        A ${width / 2} ${h} 0 1 1 0 ${h} z`
    }

    if (shape == 'bus') {
        const h = height * ratio / 2
        const w = width * ratio / 2
        //M0,10  L 0,70 A 50 10 0 1 0 100 70 L 100,10 A 50 10 0 1 1 0 10 A 50 10 0 1 1 100 10 A 50 10 0 1 1 0 10 z
        return `
        M ${width - w},0
        L ${w},0
        A ${w} ${height / 2} 0 1 0 ${w} ${height} 
        L ${width - w},${height} 
        A ${w} ${height / 2} 0 1 1 ${width - w},0
        A ${w} ${height / 2} 0 1 1 ${width - w},${height} 
        A ${w} ${height / 2} 0 1 1 ${width - w},0 z`
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
    // let backgroundColor = props.data?.color ?? "#ff6700"

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
        <div className={styles.ShapeNode}>
            <NodeResizer minWidth={30} minHeight={30} onResize={onResize} isVisible={props.selected} keepAspectRatio={shape == 'circle' ? true : false} />
            <Handle id={props.id + '01'} key={props.id + '01'} position={Position.Top} type='source' className={`${props.selected ? styles.nodeHandleDisplay : styles.nodeHandleHidden}`} />
            <Handle id={props.id + '02'} key={props.id + '02'} position={Position.Bottom} type='source' className={`${props.selected ? styles.nodeHandleDisplay : styles.nodeHandleHidden}`} />
            <Handle id={props.id + '03'} key={props.id + '03'} position={Position.Left} type='source' className={`${props.selected ? styles.nodeHandleDisplay : styles.nodeHandleHidden}`} />
            <Handle id={props.id + '04'} key={props.id + '04'} position={Position.Right} type='source' className={`${props.selected ? styles.nodeHandleDisplay : styles.nodeHandleHidden}`} />
            <Handle id={props.id + '05'} key={props.id + '05'} style={{ top: height / 2, left: width / 2 }} position={Position.Top} type='target' className={styles.nodeHandleHidden2} />
            <div className={styles.nodeDisplayContainer}>
                <div className={styles.nodeDisplayLable} style={{ color: node.style?.color }}>{props.data.label}</div>
            </div>
            <svg width={width} height={height} className={styles.svg}>
                {(shape == 'diamond' || shape == 'parallelogram') && (<path d={d} fill={node.style?.fill ?? '#ff6700'} strokeWidth={node.style?.strokeWidth} stroke={node.style?.stroke} strokeDasharray={node.style?.strokeDasharray} ></path>)}
                {(shape == 'db' || shape == 'bus') && (<path d={d} fill={node.style?.fill ?? '#ff6700'} strokeWidth={node.style?.strokeWidth ?? 1} stroke={node.style?.stroke ?? "#fff"} strokeDasharray={node.style?.strokeDasharray} ></path>)}
                {shape == 'circle' && (<circle cx={width / 2} cy={height / 2} r={(width + height) / 4} fill={node.style?.fill ?? '#ff6700'} strokeWidth={node.style?.strokeWidth} stroke={node.style?.stroke} strokeDasharray={node.style?.strokeDasharray} />)}
                {shape == 'ellipse' && (<ellipse cx={width / 2} cy={height / 2} rx={width / 2} ry={height / 2} fill={node.style?.fill ?? '#ff6700'} strokeWidth={node.style?.strokeWidth} stroke={node.style?.stroke} strokeDasharray={node.style?.strokeDasharray} />)}
                {shape == 'rect' && (<rect x="0" y="0" width={width} height={height} fill={node.style?.fill ?? '#ff6700'} strokeWidth={node.style?.strokeWidth} stroke={node.style?.stroke} strokeDasharray={node.style?.strokeDasharray} />)}
                {shape == 'radiusrect' && (<rect x="0" y="0" width={width} height={height} rx={width * ratio} ry={width * ratio} fill={node.style?.fill ?? '#ff6700'} strokeWidth={node.style?.strokeWidth} stroke={node.style?.stroke} strokeDasharray={node.style?.strokeDasharray} />)}
            </svg >
        </div >
    )
}

export default ShapeNode