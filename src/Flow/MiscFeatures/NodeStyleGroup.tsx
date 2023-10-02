import styles from './NodeStyleGroup.module.css'
import { useEffect, useState } from 'react'
import { Sketch, ColorResult } from '@uiw/react-color'
import { useReactFlow, Node } from 'reactflow'
import MiniModal from '@/Common/MiniModal'

export interface NodeStyleGroupProps {
    selectedNode: Node
}

const NodeStyleGroup = (props: NodeStyleGroupProps) => {
    const [selectedNode, setSelectedNode] = useState(props.selectedNode)
    const [borderColor, setBorderColor] = useState<string>(selectedNode.style?.borderColor ?? "#000000")

    const [hex, setHex] = useState("#000000")
    const [showModal, setShowModal] = useState(false)

    const onColorChange = (color: ColorResult) => {
        setHex(color.hex)
    }

    const onColorClick = (mark: string) => {
        setShowModal(true)
    }

    const onChangeBorder = (t: string) => {
        let style = selectedNode.style ?? {}
        if (t == 'none') {
            style.borderWidth = 0
        } else if (t == 'straight') {
            style.borderWidth = '1px'
            style.borderStyle = 'solid'
            style.borderColor = borderColor
        } else if (t == 'dashed') {
            style.borderWidth = '1px'
            style.borderStyle = 'dashed'
            style.borderColor = borderColor
        }

        setSelectedNode({ ...selectedNode, style: style })
    }

    const { setNodes } = useReactFlow()

    useEffect(() => {
        if (selectedNode) {
            setNodes((eds) => eds.map((node) => {
                if (node.id === selectedNode.id) {
                    node = { ...selectedNode }
                    node.style = { ...selectedNode.style }
                }

                return node
            }))
        }
    }, [selectedNode, setNodes])

    return (
        <>
            <MiniModal show={showModal} setShow={setShowModal} size='auto'>
                <Sketch color={hex} onChange={onColorChange} />
            </MiniModal>
            <div className={styles.groupContainer} >

                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>NodeBorder</div>
                    <div className={styles.groupLayer}>
                        <div className={`${styles.groupLayerItem}`} onClick={() => onChangeBorder('none')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>noborder</title>
                                <circle cx="20" cy="20" r="15" stroke="silver" fill="transparent" />
                                <path d="M 6 20 H 36" stroke="silver" fill="transparent" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem}`} onClick={() => onChangeBorder('straight')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>straight</title>
                                <path d="M 5 5 L 35 35" stroke="silver" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem}`} onClick={() => onChangeBorder('dashed')} >
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
                    <div className={styles.groupLayerTitle}>Color</div>
                    <div className={styles.groupLayer} style={{ height: '52px' }}>
                        <div className={`${styles.groupLayerItem} ${styles.color}`}>
                            <div onClick={() => onColorClick('background-color')} style={{ width: '100%', height: '50%', backgroundColor: selectedNode.style?.backgroundColor, color: selectedNode.style?.backgroundColor }} >

                            </div>
                        </div>
                        <div className={`${styles.groupLayerItem} ${styles.color}`}>
                            <div onClick={() => onColorClick('color')} style={{ width: '100%', height: '50%', backgroundColor: selectedNode.style?.color, color: selectedNode.style?.color }} >

                            </div>
                        </div>
                        <div className={styles.groupLayerItem}></div>
                        <div className={styles.groupLayerItem}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NodeStyleGroup