import styles from './EdgeStyle.module.css'
import { useEffect, useState } from 'react'
import { Sketch, ColorResult } from '@uiw/react-color'
import { useReactFlow, Edge, EdgeMarkerType, MarkerType, EdgeMarker } from 'reactflow'
import MiniModal from '@/Common/MiniModal'


export interface EdgeStyleProps {
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

const getMarkerType = (t: string) => {
    if (t == "arrow") {
        return MarkerType.Arrow
    } else {
        return MarkerType.ArrowClosed
    }
}

const getEdgeMarker = (marker: EdgeMarkerType | undefined) => {
    if (marker == undefined) {
        return undefined
    }

    if (typeof marker == "string") {
        return { type: getMarkerType(marker), color: 'black' }
    }

    return { ...marker }
}

const changeMarkerType = (mark: string, marker: EdgeMarker | undefined) => {
    let tmp = marker
    if (mark == '') {
        tmp = undefined
    }

    if (mark == 'arrow') {
        if (tmp == undefined) {
            tmp = { type: MarkerType.Arrow, color: 'black' }
        } else {
            tmp = { ...tmp, type: MarkerType.Arrow }
        }
    }

    if (mark == 'arrowclosed') {
        if (tmp == undefined) {
            tmp = { type: MarkerType.ArrowClosed, color: 'black' }
        } else {
            tmp = { ...tmp, type: MarkerType.ArrowClosed }
        }
    }

    return tmp
}

const EdgeStyle = (props: EdgeStyleProps) => {
    const [selectedEdge, setSelectedEdge] = useState(props.selectedEdge)
    const [edgeType, setEdgeType] = useState(getEdgeTypeUtils(props.selectedEdge.type))
    const [pathType, setPathType] = useState<string>(props.selectedEdge.data?.pathType ?? "bezier")
    const [startMarker, setStartMarker] = useState<EdgeMarker | undefined>(getEdgeMarker(props.selectedEdge.markerStart))
    const [endMarker, setEndMarker] = useState<EdgeMarker | undefined>(getEdgeMarker(props.selectedEdge.markerEnd))

    const [colorMark, setColorMark] = useState('start')
    const [hex, setHex] = useState("#000000")
    const [showModal, setShowModal] = useState(false)

    const onColorChange = (color: ColorResult) => {
        if (!!startMarker && colorMark == 'start') {
            const start = { ...startMarker, color: color.hex }
            setStartMarker(start)
            setSelectedEdge({ ...selectedEdge, markerStart: start })
        }

        if (!!endMarker && colorMark == 'end') {
            const end = { ...endMarker, color: color.hex }
            setEndMarker(end)
            setSelectedEdge({ ...selectedEdge, markerEnd: end })
        }

        if (colorMark == 'line') {
            setSelectedEdge({ ...selectedEdge, style: { ...selectedEdge.style, stroke: color.hex } })
        }

        if (colorMark == 'lable') {
            if (edgeType == 'default') {
                setSelectedEdge({ ...selectedEdge, labelStyle: { ...selectedEdge.labelStyle, fill: color.hex, color: color.hex } })
            } else {
                setSelectedEdge({ ...selectedEdge, labelStyle: { ...selectedEdge.labelStyle, color: color.hex } })
            }
        }
    }

    const onColorClick = (mark: string) => {
        if (mark == 'start') {
            setHex(startMarker?.color ?? "#000000")
        } else if (mark == 'end') {
            setHex(endMarker?.color ?? "#000000")
        } else if (mark == 'line') {
            setHex(selectedEdge.style?.stroke ?? "#000000")
        } else if (mark == 'lable') {
            setHex(selectedEdge.labelStyle?.color ?? "#000000")
        }

        setColorMark(mark)
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

    const changeStartMarkerType = (mark: string) => {
        let markerStart = changeMarkerType(mark, startMarker)
        setStartMarker(markerStart)
        let edge: Edge = { ...selectedEdge!, markerStart: markerStart }
        setSelectedEdge(edge)
    }

    const changeEndMarkerType = (mark: string) => {
        let markerEnd = changeMarkerType(mark, endMarker)
        setEndMarker(markerEnd)
        let edge: Edge = { ...selectedEdge!, markerEnd: markerEnd }
        setSelectedEdge(edge)
    }

    const changeLineType = (line: string) => {
        let edge: Edge = { ...selectedEdge }
        if (line == 'straight') {
            edge = { ...edge, animated: false, style: { ...edge.style, strokeDasharray: undefined } }
        } else if (line == 'dashed') {
            edge = { ...edge, animated: false, style: { ...edge.style, strokeDasharray: 5 } }
        } else {
            edge.animated = true
        }

        setSelectedEdge(edge)
    }

    const onLableChange = (e: any) => {
        const l = e.target.value
        let edge: Edge = { ...selectedEdge, label: l }
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

    return (
        <>
            <MiniModal show={showModal} setShow={setShowModal} size='auto'>
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
                        <div className={styles.groupLayerItem} style={{ border: 0 }}></div>
                        <div className={styles.groupLayerItem} style={{ border: 0 }}></div>
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
                    <div className={styles.groupLayerTitle}>PathStyle</div>
                    <div className={styles.groupLayer}>
                        <div className={`${styles.groupLayerItem} ${!selectedEdge.style?.strokeDasharray && !selectedEdge.animated ? styles.selected : ''}`}
                            onClick={() => changeLineType('straight')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>straight</title>
                                <path d="M 5 5 L 35 35" stroke="silver" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${selectedEdge.style?.strokeDasharray && !selectedEdge.animated ? styles.selected : ''}`}
                            onClick={() => changeLineType('dashed')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>dashed</title>
                                <path d="M 5 5 L 35 35" stroke="silver" strokeDasharray="4" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${selectedEdge.animated ? styles.selected : ''}`}
                            onClick={() => changeLineType('animated')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>animated</title>
                                <path d="M 5 5 L 35 35" stroke="silver" strokeDasharray="4" >
                                    <animate attributeName="stroke-dashoffset" values="100;0" dur="5s" calcMode="linear" repeatCount="indefinite" />
                                </path>
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${styles.color}`}>
                            <div onClick={() => onColorClick('line')} style={{ width: '100%', height: '50%', backgroundColor: selectedEdge.style?.stroke, color: selectedEdge.style?.stroke }} >

                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>StartMarker</div>
                    <div className={styles.groupLayer}>
                        <div className={`${styles.groupLayerItem} ${startMarker == undefined ? styles.selected : ''}`}
                            onClick={() => changeStartMarkerType('')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>Empty</title>
                                <circle cx="20" cy="20" r="15" stroke="silver" fill="transparent" />
                                <path d="M 6 20 H 36" stroke="silver" fill="transparent" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${startMarker?.type == 'arrowclosed' ? styles.selected : ''}`}
                            onClick={() => changeStartMarkerType('arrowclosed')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>ArrowClosed</title>
                                <path d="M 20 10 L 10 20 L 30 20 L 20 10" stroke="black" fill="black" />
                                <path d="M 20 10 L 20 35" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${startMarker?.type == 'arrow' ? styles.selected : ''}`}
                            onClick={() => changeStartMarkerType('arrow')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>Arrow</title>
                                <path d="M 10 20 L 20 10 L 30 20" stroke="black" fill="transparent" />
                                <path d="M 20 10 L 20 35" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${styles.color}`}>
                            <div onClick={() => onColorClick('start')} style={{ width: '100%', height: '50%', backgroundColor: startMarker?.color, color: startMarker?.color }} >

                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>EndMarker</div>
                    <div className={styles.groupLayer}>
                        <div className={`${styles.groupLayerItem} ${endMarker == undefined ? styles.selected : ''}`}
                            onClick={() => changeEndMarkerType('')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>Empty</title>
                                <circle cx="20" cy="20" r="15" stroke="silver" fill="transparent" />
                                <path d="M 6 20 H 36" stroke="silver" fill="transparent" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${endMarker?.type == 'arrowclosed' ? styles.selected : ''}`}
                            onClick={() => changeEndMarkerType('arrowclosed')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>ArrowClosed</title>
                                <path d="M 20 35 L 10 25 L 30 25 L 20 35" stroke="black" fill="black" />
                                <path d="M 20 10 L 20 35" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${endMarker?.type == 'arrow' ? styles.selected : ''}`}
                            onClick={() => changeEndMarkerType('arrow')} >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>Arrow</title>
                                <path d="M 10 25 L 20 35 L 30 25" stroke="black" fill="transparent" />
                                <path d="M 20 10 L 20 35" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                        <div className={`${styles.groupLayerItem} ${styles.color}`}>
                            <div onClick={() => onColorClick('end')} style={{ width: '100%', height: '50%', backgroundColor: endMarker?.color, color: endMarker?.color }} >

                            </div>
                        </div>
                    </div>
                </div>


                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>PathLable</div>
                    <div className={styles.groupLayer}>
                        <div className={`${styles.groupLayerItem}`} style={{ flex: '1' }} >
                            <input className={styles.lableinput} value={selectedEdge.label as string ?? ''} onChange={onLableChange} />
                        </div>
                        <div className={`${styles.groupLayerItem} ${styles.color}`} style={{ width: '52px', height: '52px' }}>
                            <div onClick={() => onColorClick('lable')}
                                style={{
                                    width: '100%', height: '50%',
                                    backgroundColor: selectedEdge.labelStyle?.color ?? "#000000",
                                    color: selectedEdge.labelStyle?.color ?? "#000000"
                                }} >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EdgeStyle