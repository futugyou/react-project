import styles from './EdgeStyleGroup.module.css'
import { useEffect, useState } from 'react'
import { Sketch, ColorResult } from '@uiw/react-color'
import { useReactFlow, Edge } from 'reactflow'
import MiniModal from '@/Common/MiniModal'


export interface EdgeStyleGroupProps {
    // pathType?: string
    // edgeColor?: string
    // animated?: boolean
    // startMarkerType?: string
    // startMarkerColor?: string
    // endMarkerType?: string
    // endMarkerColor?: string
    selectedEdge: Edge
}

const baseEdgeTypes = ['default', 'bezier', 'straight', 'step', 'smoothstep']

const getEdgeTypeUtils = (t?: string) => {
    if (t == undefined || baseEdgeTypes.includes(t)) {
        return 'default'
    }

    return t
}

const setEdgeTypeUtils = (edge: string, path: string) => {
    if (edge == 'floating') {
        return { edge: 'floating', path: path }
    }

    if (path == 'bezier') {
        return { edge: 'default', path: path }
    }

    return { edge: path, path: path }
}

const EdgeStyleGroup = (props: EdgeStyleGroupProps) => {
    const [selectedEdge, setSelectedEdge] = useState(props.selectedEdge)
    const [edgeType, setEdgeType] = useState(getEdgeTypeUtils(props.selectedEdge.type))
    const [pathType, setPathType] = useState<string>(props.selectedEdge.data?.pathType ?? "bezier")

    const [hex, setHex] = useState("#000000")
    const [showModal, setShowModal] = useState(false)

    const onColorChange = (color: ColorResult) => {
        setHex(color.hex)
    }

    const onColorClick = () => {
        setShowModal(true)
    }

    const onChangeEdgeType = (edgeType: string) => {
        const e = setEdgeTypeUtils(edgeType, pathType)
        let edge: Edge = { ...selectedEdge!, type: e.edge, data: { pathType: e.path } }
        setEdgeType(e.edge)
        setPathType(e.path)
        setSelectedEdge(edge)
    }

    const onChangePathType = (pathType: string) => {
        const e = setEdgeTypeUtils(edgeType, pathType)
        let edge: Edge = { ...selectedEdge!, type: e.edge, data: { pathType: e.path } }
        setEdgeType(e.edge)
        setPathType(e.path)
        setSelectedEdge(edge)
    }

    const { setEdges } = useReactFlow()
    useEffect(() => {
        if (selectedEdge) {
            setEdges((eds) => eds.map((n) => {
                if (n.id === selectedEdge.id) {
                    return { ...n, ...selectedEdge }
                }

                return n
            }))
        }
    }, [selectedEdge, setEdges])

    // console.log(props.selectedEdge)


    return (
        <>
            <MiniModal show={showModal} setShow={setShowModal} >
                <Sketch color={hex} onChange={onColorChange} />
            </MiniModal>
            <div className={styles.groupContainer} >
                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>EdgeType</div>
                    <div className={styles.groupLayer}>
                        <div className={`${styles.groupLayerItem} ${edgeType == 'default' ? styles.selected : ''}`}
                            onClick={() => onChangeEdgeType('default')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>default</title>
                                <text x="8" y="25" >Def</text>
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${edgeType == 'floating' ? styles.selected : ''}`}
                            onClick={() => onChangeEdgeType('floating')} >
                            <svg width="40" height="40" xmlns="http://wwww.w3.org/2000/svg">
                                <title>floating</title>
                                <text x="8" y="25" >Flo</text>
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem}></div>
                        <div className={styles.groupLayerItem}></div>
                    </div>
                </div>

                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>PathType</div>
                    <div className={styles.groupLayer}>
                        <div className={`${styles.groupLayerItem} ${pathType == 'bezier' ? styles.selected : ''}`}
                            onClick={() => onChangePathType('bezier')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>Bezier</title>
                                <path d="M 0 0 Q 0 40, 40 40" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${pathType == 'smoothstep' ? styles.selected : ''}`}
                            onClick={() => onChangePathType('smoothstep')} >
                            <svg width="40" height="40" xmlns="http://wwww.w3.org/2000/svg">
                                <title>SmoothStep</title>
                                <path d="M 5 0 V 10" stroke="black" fill="transparent"></path>
                                <path d="M 5 10 Q 5 20, 15 20," stroke="black" fill="transparent"></path>
                                <path d="M 15 20 H 25" stroke="black" fill="transparent"></path>
                                <path d="M 25 20 Q 35 20, 35 30," stroke="black" fill="transparent"></path>
                                <path d="M 35 30 V 40" stroke="black" fill="transparent"></path>
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${pathType == 'straight' ? styles.selected : ''}`}
                            onClick={() => onChangePathType('straight')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>Straight</title>
                                <path d="M 0 0 L 40 40" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${pathType == 'step' ? styles.selected : ''}`}
                            onClick={() => onChangePathType('step')}>
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>Step</title>
                                <path d="M 10 0 V 20" stroke="black" fill="transparent" />
                                <path d="M 10 20 H 30" stroke="black" fill="transparent" />
                                <path d="M 30 20 V 40" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>StartMarker</div>
                    <div className={styles.groupLayer}>
                        <div className={styles.groupLayerItem}>
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>Empty</title>
                                <circle cx="20" cy="20" r="15" stroke="silver" fill="transparent" />
                                <path d="M 6 20 H 36" stroke="silver" fill="transparent" />
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem}>
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>ArrowClosed</title>
                                <path d="M 20 10 L 10 20 L 30 20 L 20 10" stroke="black" fill="black" />
                                <path d="M 20 10 L 20 35" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem}>
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>Arrow</title>
                                <path d="M 10 20 L 20 10 L 30 20" stroke="black" fill="transparent" />
                                <path d="M 20 10 L 20 35" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${styles.color}`}>
                            <div onClick={onColorClick} style={{ width: '100%', height: '50%', backgroundColor: hex, color: hex }} >

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>EndMarker</div>
                    <div className={styles.groupLayer}>
                        <div className={styles.groupLayerItem}>
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>Empty</title>
                                <circle cx="20" cy="20" r="15" stroke="silver" fill="transparent" />
                                <path d="M 6 20 H 36" stroke="silver" fill="transparent" />
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem}>
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>ArrowClosed</title>
                                <path d="M 20 35 L 10 25 L 30 25 L 20 35" stroke="black" fill="black" />
                                <path d="M 20 10 L 20 35" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem}>
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>Arrow</title>
                                <path d="M 10 25 L 20 35 L 30 25" stroke="black" fill="transparent" />
                                <path d="M 20 10 L 20 35" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem}>Color</div>
                    </div>
                </div>
                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>pathType</div>
                    <div className={styles.groupLayer}>
                        <div>bezier</div>
                        <div>smoothStep</div>
                        <div>straight</div>
                        <div>step</div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EdgeStyleGroup