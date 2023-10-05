import styles from './FlowStyle.module.css'
import { CSSProperties, useEffect, useState } from 'react'
import { Sketch, ColorResult } from '@uiw/react-color'
import { useReactFlow, Node } from 'reactflow'
import MiniModal from '@/Common/MiniModal'

export interface FlowStyleProps {

}

export const DragNodeType: string = 'application/reactflow/nodeType'

const FlowStyle = (props: FlowStyleProps) => {
    const onDragStart = (event: any, nodeType: string, shape?: string) => {
        event.dataTransfer.setData(DragNodeType, JSON.stringify({ type: nodeType, shape: shape }))
        event.dataTransfer.effectAllowed = 'move'
    }

    return (
        <>
            {/* <MiniModal show={showModal} setShow={setShowModal} size='auto'>
                <Sketch color={hex} onChange={onColorChange} />
            </MiniModal> */}
            <div className={styles.groupContainer} >
                {/* base node type */}
                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>base node type</div>
                    <div className={styles.groupLayer}>
                        <div className={styles.groupLayerItem} draggable onDragStart={(event) => onDragStart(event, 'default')}  >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>default</title>
                                <circle cx="20" cy="10" r="2" stroke="#ff6700" fill="#ff6700" />
                                <rect x="0" y="10" width='40' rx='3' ry='3' height='20' stroke="#ff6700" fill="transparent" />
                                <circle cx="20" cy="30" r="2" stroke="#ff6700" fill="#ff6700" />
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem} draggable onDragStart={(event) => onDragStart(event, 'input')}  >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>input</title>
                                <rect x="0" y="10" width='40' rx='3' ry='3' height='20' stroke="#ff6700" fill="transparent" />
                                <circle cx="20" cy="30" r="2" stroke="#ff6700" fill="#ff6700" />
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem} draggable onDragStart={(event) => onDragStart(event, 'output')}  >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>output</title>
                                <circle cx="20" cy="10" r="2" stroke="#ff6700" fill="#ff6700" />
                                <rect x="0" y="10" width='40' rx='3' ry='3' height='20' stroke="#ff6700" fill="transparent" />
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem} style={{ border: 0 }} >
                        </div>
                    </div>
                </div>

                {/* shape node type */}
                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>shape node type</div>
                    <div className={styles.groupLayer}>
                        <div className={styles.groupLayerItem} draggable onDragStart={(event) => onDragStart(event, 'shape', 'diamond')}  >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>diamond</title>
                                <path d="M0,20 L20,0 L40,20 L 20,40 z" fill="#ff6700"></path>
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem} draggable onDragStart={(event) => onDragStart(event, 'shape', 'circle')}  >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>circle</title>
                                <circle cx="20" cy="20" r="20" fill="#ff6700" />
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem} draggable onDragStart={(event) => onDragStart(event, 'shape', 'ellipse')}  >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>ellipse</title>
                                <ellipse cx="20" cy="20" rx="20" ry="15" fill="#ff6700" />
                            </svg>
                        </div>

                        <div className={styles.groupLayerItem} draggable onDragStart={(event) => onDragStart(event, 'shape', 'parallelogram')}  >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>parallelogram</title>
                                <path d="M0,40 L10,0 L40,0 L 30,40 z" fill="#ff6700"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}> </div>
                    <div className={styles.groupLayer}>
                        <div className={styles.groupLayerItem} draggable onDragStart={(event) => onDragStart(event, 'shape', 'rect')}  >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>rect</title>
                                <rect x="0" y="10" width='40' height='20' fill="#ff6700" />
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem} draggable onDragStart={(event) => onDragStart(event, 'shape', 'radiusrect')}  >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>radiusrect</title>
                                <rect x="0" y="10" width='40' rx='5' ry='5' height='20' fill="#ff6700" />
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem} draggable onDragStart={(event) => onDragStart(event, 'shape', 'db')}  >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>database</title>
                                <path d="M0,5L 0,35A 20 5 0 1 0 40 35L 40,5 A 20 5 0 1 1 0 5A 20 5 0 1 1 40 5 A 20 5 0 1 1 0 5 z" fill="#ff6700" stroke="#fff" ></path>
                            </svg>
                        </div>

                        <div className={styles.groupLayerItem} draggable onDragStart={(event) => onDragStart(event, 'shape', 'bus')}  >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>service bus</title>
                                <path d="M 35,0L 5,0A 5 20 0 1 0 5 40L 35,40A 5 20 0 1 1 35,0A 5 20 0 1 1 35,40A 5 20 0 1 1 35,0 z" fill="#ff6700" stroke="#fff"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* class node type */}
                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>shape node type</div>
                    <div className={styles.groupLayer}>
                        <div className={styles.groupLayerItem} draggable onDragStart={(event) => onDragStart(event, 'custom')}  >
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>class node</title>
                                <path d="M0,0 L0,40 L40,40 L40,0 z" stroke='#ff6700' fill="transparent"></path>
                                <path d="M0,14 L40,14" stroke='#ff6700' fill="transparent"></path>
                                <text x="4" y="12" fill='#ff6700'>class</text>
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem} style={{ border: 0 }}></div>
                        <div className={styles.groupLayerItem} style={{ border: 0 }}></div>
                        <div className={styles.groupLayerItem} style={{ border: 0 }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FlowStyle