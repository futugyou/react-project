import styles from './NodeStyle.module.css'
import { CSSProperties, useEffect, useState } from 'react'
import { Sketch, ColorResult } from '@uiw/react-color'
import { useReactFlow, Node } from 'reactflow'
import MiniModal from '@/Common/MiniModal'

export interface NodeStyleProps {
    selectedNode: Node
}

const getBorderStyle = (node: Node) => {
    const style = node.style
    if (style == undefined) {
        return 'solid'
    }

    if (node.type == 'shape') {
        if (style.strokeWidth == 0) {
            return 'none'
        }

        if (style.strokeDasharray as number > 0) {
            return 'dashed'
        }
        return 'solid'
    } else {
        if (style.borderWidth == 0) {
            return 'none'
        }

        if (style.borderStyle) {
            return style.borderStyle as string
        }
        return 'solid'
    }
}

const getNodeType = (t: string | undefined) => {
    if (t == undefined) {
        return 'default'
    }

    return t
}
const checkNodeLableDisplay = (t: string) => {
    if (t == 'default' || t == 'input' || t == 'shape' || t == 'output') {
        return true
    }

    return false
}

const getBackgroundColor = (node: Node) => {
    const t = node.type
    let color = ''

    if (t == 'shape') {
        color = node.style?.fill ?? '#ff6700'
    } else {
        color = node.style?.backgroundColor ?? 'transparent'
    }

    return color
}

const getBorderColor = (node: Node) => {
    const t = node.type
    let color = ''

    if (t == 'shape') {
        color = node.style?.stroke ?? '#fff'
    } else {
        color = node.style?.borderColor ?? '#000000'
    }

    return color
}

const getColor = (node: Node) => {
    const t = node.type
    let color = node.style?.color ?? "#000000"

    if (t == 'shape') {
        color = 'white'
    }
    return color
}

const NodeStyle = (props: NodeStyleProps) => {
    const [selectedNode, setSelectedNode] = useState(props.selectedNode)
    const [nodeType, setNodeType] = useState(getNodeType(props.selectedNode.type))
    const [borderStyle, setBorderStyle] = useState(getBorderStyle(selectedNode))
    const [borderColor, setBorderColor] = useState<string>(getBorderColor(selectedNode))
    const [backgroundColor, setBackgroundColor] = useState<string>(getBackgroundColor(selectedNode))
    const [color, setColor] = useState<string>(getColor(selectedNode))
    const [colorSelect, setColorSelect] = useState('color')
    const [resizer, setResizer] = useState<boolean>(selectedNode?.data?.op?.allowResizer == undefined ? true : selectedNode?.data?.op?.allowResizer)
    const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(selectedNode?.data?.op?.keepAspectRatio == undefined ? false : selectedNode?.data?.op?.keepAspectRatio)

    const [hex, setHex] = useState("transparent")
    const [showModal, setShowModal] = useState(false)

    const onColorChange = (color: ColorResult) => {
        let style = selectedNode.style ?? {}
        if (colorSelect == 'border-color') {
            setBorderColor(color.hex)
            if (selectedNode.type == 'shape') {
                style.stroke = color.hex
            } else {
                style.borderColor = color.hex
            }
        }

        if (colorSelect == 'background-color') {
            setBackgroundColor(color.hex)
            if (selectedNode.type == 'shape') {
                style.fill = color.hex
            } else {
                style.backgroundColor = color.hex
            }
        }

        if (colorSelect == 'color') {
            setColor(color.hex)
            style.color = color.hex
        }

        setSelectedNode({ ...selectedNode, style: style })
    }

    const onColorClick = (selected: string) => {
        if (selected == 'border-color') {
            setHex(borderColor)
        } else if (selected == 'background-color') {
            setHex(backgroundColor)
        } else if (selected == 'color') {
            setHex(color)
        }

        setColorSelect(selected)
        setShowModal(true)
    }

    const onChangeBorder = (t: string) => {
        let style = selectedNode.style ?? {}
        if (t == 'none') {
            if (selectedNode.type == 'shape') {
                style.strokeWidth = 0
            } else {
                style.borderWidth = 0
                style.borderStyle = undefined
            }
        } else if (t == 'solid') {
            if (selectedNode.type == 'shape') {
                style.strokeWidth = 1
                style.strokeDasharray = 0
                style.stroke = borderColor
            } else {
                style.borderWidth = '1px'
                style.borderStyle = 'solid'
                style.borderColor = borderColor
            }
        } else if (t == 'dashed') {
            if (selectedNode.type == 'shape') {
                style.strokeWidth = 1
                style.strokeDasharray = 4
                style.stroke = borderColor
            } else {
                style.borderWidth = '1px'
                style.borderStyle = 'dashed'
                style.borderColor = borderColor
            }
        }

        setBorderStyle(t)
        setSelectedNode({ ...selectedNode, style: style })
    }

    const onLableChange = (e: any) => {
        const l = e.target.value
        setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, label: l } })
    }

    const ChangeResizerState = () => {
        const data = { ...selectedNode.data, op: { ...selectedNode?.data?.op, allowResizer: !resizer } }

        setResizer(!resizer)
        setSelectedNode({ ...selectedNode, data: data })
    }

    const ChangeRatioState = () => {
        const data = { ...selectedNode.data, op: { ...selectedNode?.data?.op, keepAspectRatio: !keepAspectRatio } }

        setKeepAspectRatio(!keepAspectRatio)
        setSelectedNode({ ...selectedNode, data: data })
    }

    const { setNodes } = useReactFlow()

    useEffect(() => {
        if (selectedNode) {
            setNodes((eds) => eds.map((node) => {
                if (node.id === selectedNode.id) {
                    // node = { ...selectedNode }
                    node.style = { ...selectedNode.style }
                    node.data = { ...selectedNode.data }
                }

                return node
            }))
        }
    }, [selectedNode, setNodes])

    useEffect(() => {
        setSelectedNode({ ...props.selectedNode })
    }, [props.selectedNode])

    return (
        <>
            <MiniModal show={showModal} setShow={setShowModal} size='auto'>
                <Sketch color={hex} onChange={onColorChange} />
            </MiniModal>
            <div className={styles.groupContainer} >

                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>node border</div>
                    <div className={styles.groupLayer}>
                        <div className={`${styles.groupLayerItem} ${borderStyle == 'none' ? styles.selected : ''}`} onClick={() => onChangeBorder('none')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>none</title>
                                <circle cx="20" cy="20" r="15" stroke="silver" fill="transparent" />
                                <path d="M 6 20 H 36" stroke="silver" fill="transparent" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${borderStyle == 'solid' ? styles.selected : ''}`} onClick={() => onChangeBorder('solid')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>solid</title>
                                <path d="M 5 5 L 35 35" stroke="silver" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${borderStyle == 'dashed' ? styles.selected : ''}`} onClick={() => onChangeBorder('dashed')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>dashed</title>
                                <path d="M 5 5 L 35 35" stroke="silver" strokeDasharray="4" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${styles.color}`}>
                            <div onClick={() => onColorClick('border-color')} style={{ width: '100%', height: '50%', backgroundColor: borderColor, color: borderColor }} >

                            </div>
                        </div>

                    </div>
                </div>

                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>background color</div>
                    <div className={styles.groupLayer} style={{ height: '52px' }}>
                        <div className={`${styles.groupLayerItem} ${styles.color}`}>
                            <div onClick={() => onColorClick('background-color')} style={{ width: '100%', height: '50%', backgroundColor: backgroundColor, color: backgroundColor }} >

                            </div>
                        </div>
                        <div className={styles.groupLayerItem} style={{ border: 0 }}></div>
                        <div className={styles.groupLayerItem} style={{ border: 0 }}></div>
                        <div className={styles.groupLayerItem} style={{ border: 0 }}></div>
                    </div>
                </div>

                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>font color</div>
                    <div className={styles.groupLayer} style={{ height: '52px' }}>
                        <div className={`${styles.groupLayerItem} ${styles.color}`} >
                            <div onClick={() => onColorClick('color')} style={{ width: '100%', height: '50%', backgroundColor: color, color: color }} >

                            </div>
                        </div>
                        <div className={styles.groupLayerItem} style={{ border: 0 }}></div>
                        <div className={styles.groupLayerItem} style={{ border: 0 }}></div>
                        <div className={styles.groupLayerItem} style={{ border: 0 }}></div>
                    </div>
                </div>

                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>resizer and aspect ratio</div>
                    <div className={styles.groupLayer} style={{ height: '52px' }}>
                        <div className={`${styles.groupLayerItem} ${styles.color}`} >
                            <input id="resizer" type="checkbox" value="" checked={resizer} onChange={ChangeResizerState} style={{ flex: 0.3 }} />
                            <label htmlFor='resizer' style={{ flex: 1 }} >
                                {resizer ? 'allow resizer' : 'forbid resizer'}
                            </label>
                        </div>
                        <div className={`${styles.groupLayerItem} ${styles.color}`} >
                            <input id="keepAspectRatio" type="checkbox" value="" disabled={!resizer} checked={keepAspectRatio} onChange={ChangeRatioState} style={{ flex: 0.3 }} />
                            <label htmlFor='keepAspectRatio' style={{ flex: 1 }} >
                                {keepAspectRatio ? 'keep ratio' : 'not keep ratio'}
                            </label>
                        </div>
                    </div>
                </div>

                {checkNodeLableDisplay(nodeType) && (
                    <div className={styles.groupLayerContainer}>
                        <div className={styles.groupLayerTitle}>lable</div>
                        <div className={styles.groupLayer} style={{ height: '52px' }}>
                            <div className={`${styles.groupLayerItem}`} style={{ flex: '1' }} >
                                <input className={styles.lableinput} value={selectedNode.data?.label as string ?? ''} onChange={onLableChange} />
                            </div>
                            <div className={`${styles.groupLayerItem}`} style={{ border: 0, width: '52px', height: '52px' }}>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default NodeStyle