
import { useState, useEffect, CSSProperties } from 'react'
import { Handle, Position, Node, NodeProps, HandleType, useNodeId, useReactFlow, NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow'

interface ShapeNodeData {
    width?: number
    height?: number
    color?: string
    shape?: string
}

const ShapeNode = (props: NodeProps<ShapeNodeData>) => {
    let [width, setWidth] = useState(props.data?.width ?? 100)
    let [height, setHeight] = useState(props.data?.height ?? 100)
    let backgroundColor = props.data?.color ?? "#ff6700"

    let [d, setD] = useState("M0," + height / 2 + " L" + width / 2 + ",0 L" + width + "," + height / 2 + " L" + width / 2 + "," + height + " z")

    useEffect(() => {

    }, [props.xPos, props.yPos])

    const onResize = (event: ResizeDragEvent, params: ResizeParams) => { 
        setWidth(params.width) 
        setHeight(params.height)
        setD("M0," + params.height / 2 + " L" + params.width / 2 + ",0 L" + params.width + "," + params.height / 2 + " L" + params.width / 2 + "," + params.height + " z")
    }
    return (
        <div >
            <NodeResizer minWidth={100} minHeight={30} onResize={onResize} />
            <Handle id={props.id + '01'} key={props.id + '01'} position={Position.Top} type='source' />
            <Handle id={props.id + '02'} key={props.id + '02'} position={Position.Bottom} type='source' />
            <Handle id={props.id + '03'} key={props.id + '03'} position={Position.Left} type='source' />
            <Handle id={props.id + '04'} key={props.id + '04'} position={Position.Right} type='source' />
            <Handle id={props.id + '05'} key={props.id + '05'} style={{ top: height / 2, left: width / 2, opacity: 0 }} position={Position.Top} type='target' />

            <svg width={width} height={height}  >
                <path d={d} fill={backgroundColor} strokeWidth="2" stroke="#fff"></path>
            </svg >
        </div >
    )
}

export default ShapeNode