import styles from './ModifyNode.module.css'

import { ReactElement, JSXElementConstructor, ReactNode, useState } from 'react'
import { Handle, Position, Node, NodeProps, HandleType } from 'reactflow'
import { ClassNodeData, ConnectInfo } from './ClassNode'

interface ModifyNodeProps {
    data: ClassNodeData
    updateNode: (data: ClassNodeData) => void
}

export const ModifyNode = ({ data, updateNode }: ModifyNodeProps) => {
    const [nodeData, setNodeData] = useState<ClassNodeData>(data)

    let methods: JSX.Element[] = []
    if (nodeData.methods) {
        methods = nodeData.methods.map((t: string) => {
            return (
                <li key={t} >
                    {t}
                </li>
            )
        })
    }

    let propertys: JSX.Element[] = []
    if (nodeData.propertys) {
        propertys = nodeData.propertys.map((t: string) => {
            return (
                <li key={t} >
                    {t}
                </li>
            )
        })
    }

    let connects: JSX.Element[] = []
    if (nodeData.connects) {
        connects = nodeData.connects.map((t: ConnectInfo) => {
            return (
                <Handle id={nodeData.name + t.position + t.type} key={nodeData.name + t.position} position={t.position} type={t.type} />
            )
        })
    }

    const HandleNameChange = (value: string) => {
        setNodeData({
            ...nodeData,
            name: value,
        })
    }

    return (
        <div className={styles.nodeContainer}>
            <div className={styles.nodeItem}>
                <div className={styles.nodeItemLable}>
                    <label htmlFor="nodeName">NodeName:</label >
                </div>
                <div className={styles.nodeItemContent}>
                    <input id="nodeName" value={nodeData.name}
                        onChange={e => HandleNameChange(e.target.value)}></input>
                </div>
            </div>

            {propertys.length > 0 && (
                <div>
                    <ul className='list-display'>
                        {propertys}
                    </ul>
                </div>
            )}

            {methods.length > 0 && (
                <div>
                    <ul className='list-display'>
                        {methods}
                    </ul>
                </div>
            )}

            {connects.length > 0 && (
                <>
                    {connects}
                </>
            )}
        </div>
    )
}