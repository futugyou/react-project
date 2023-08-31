import styles from './ModifyNode.module.css'

import { ReactElement, JSXElementConstructor, ReactNode, useState } from 'react'
import { Handle, Position, Node, NodeProps, HandleType } from 'reactflow'
import { BsPlusCircle, BsDashCircle } from "react-icons/bs"

import { ClassNodeData, ConnectInfo } from './ClassNode'

interface ModifyNodeProps {
    data: ClassNodeData
    updateNode: (data: ClassNodeData) => void
}

export const ModifyNode = ({ data, updateNode }: ModifyNodeProps) => {
    const [nodeData, setNodeData] = useState<ClassNodeData>(data)
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

    const HandleParentChange = (value: string) => {
        setNodeData({
            ...nodeData,
            parent: value,
        })
    }

    const HandlePropertyChange = (index: number, value: string) => {
        if (nodeData.properties) {
            const newList = nodeData.properties.map((property, ind) => {
                if (ind === index) {
                    return value
                }

                return property
            })

            setNodeData({
                ...nodeData,
                properties: newList,
            })
        }
    }

    const AddNewProperty = () => {
        let list = nodeData.properties ?? []
        list = list.concat('')

        setNodeData({
            ...nodeData,
            properties: list,
        })
    }

    const HandlePropertyReomve = (index: number) => {
        let list = nodeData.properties ?? []
        list = list.filter((_, i) => i !== index)

        setNodeData({
            ...nodeData,
            properties: list,
        })
    }

    const HandleMethodChange = (index: number, value: string) => {
        if (nodeData.methods) {
            const newList = nodeData.methods.map((property, ind) => {
                if (ind === index) {
                    return value
                }

                return property
            })

            setNodeData({
                ...nodeData,
                methods: newList,
            })
        }
    }

    const AddNewMethod = () => {
        let list = nodeData.methods ?? []
        list = list.concat('')

        setNodeData({
            ...nodeData,
            methods: list,
        })
    }

    const HandleMethodReomve = (index: number) => {
        let list = nodeData.methods ?? []
        list = list.filter((_, i) => i !== index)

        setNodeData({
            ...nodeData,
            methods: list,
        })
    }
    return (
        <div className={styles.nodeContainer}>
            {/* class node name */}
            <div className={styles.nodeItem}>
                <div className={styles.nodeItemLable}>
                    <label htmlFor="nodeName2">NodeName:</label >
                </div>
                {/* nodeName is special id, it will cause 'TypeError elem.nodeName.toLowerCase is not a function' */}
                <div className={styles.nodeItemContent}>
                    <input id="nodeName2" className={styles.textInput} value={nodeData.name}
                        onChange={e => HandleNameChange(e.target.value)}></input>
                </div>
            </div>

            {/* class node parent */}
            <div className={styles.nodeItem}>
                <div className={styles.nodeItemLable}>
                    <label htmlFor="nodeParent">Parent:</label >
                </div>
                <div className={styles.nodeItemContent}>
                    <input id="nodeParent" className={styles.textInput} value={nodeData.parent}
                        onChange={e => HandleParentChange(e.target.value)}></input>
                </div>
            </div>

            {/* class node property */}
            <div className={styles.nodeItem}>
                <div className={styles.nodeItemLable}>
                    <label >Properties:</label >
                </div>
                <div className={styles.nodeItemContent}>
                    {nodeData.properties?.map((message, index) => {
                        return (
                            <div key={index} className={styles.nodeItemContentList} >
                                <div>
                                    <input className={styles.textInput} value={message} onChange={e => HandlePropertyChange(index, e.target.value)}></input>
                                </div>
                                <div className={styles.textInputDelete}>
                                    <BsDashCircle onClick={() => HandlePropertyReomve(index)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.nodeItemOperator} >
                    <BsPlusCircle />
                    <span onClick={() => AddNewProperty()}>Add Property</span>
                </div>
            </div>

            {/* class node methods */}
            <div className={styles.nodeItem}>
                <div className={styles.nodeItemLable}>
                    <label >Methods:</label >
                </div>
                <div className={styles.nodeItemContent}>
                    {nodeData.methods?.map((message, index) => {
                        return (
                            <div key={index} className={styles.nodeItemContentList} >
                                <div>
                                    <input className={styles.textInput} value={message} onChange={e => HandleMethodChange(index, e.target.value)}></input>
                                </div>
                                <div className={styles.textInputDelete}>
                                    <BsDashCircle onClick={() => HandleMethodReomve(index)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.nodeItemOperator} >
                    <BsPlusCircle />
                    <span onClick={() => AddNewMethod()}>Add Method</span>
                </div>
            </div>


            {connects.length > 0 && (
                <>
                    {connects}
                </>
            )}
        </div>
    )
}