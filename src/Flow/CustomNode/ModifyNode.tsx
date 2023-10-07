import styles from './ModifyNode.module.css'

import { useState } from 'react'
import { BsPlusCircle, BsDashCircle } from "react-icons/bs"

import { ClassNodeType, ClassNodeData } from '@/Flow/CustomNode/ClassNode'

interface ModifyNodeProps {
    data: ClassNodeType
    updateNode: (data: ClassNodeType) => void
}

export const ModifyNode = ({ data, updateNode }: ModifyNodeProps) => {
    const [nodeData, setNodeData] = useState<ClassNodeData>(data.data)

    const HandleNameChange = (value: string) => {
        value = value.trim()
        setNodeData({
            ...nodeData,
            name: value,
        })
    }

    const HandleParentChange = (value: string) => {
        value = value.trim()
        setNodeData({
            ...nodeData,
            parent: value,
        })
    }

    const HandlePropertyChange = (index: number, value: string) => {
        value = value.trim()
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
        value = value.trim()
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

    const HandeSaveNode = () => {
        const newData = {
            ...data,
        }

        newData.data = nodeData
        updateNode(newData)
    }

    return (
        <div className={styles.nodeContainer}>
            <div className={styles.nodeItemContainer}>
                {/* class name */}
                <div className={styles.nodeItem}>
                    <div className={styles.nodeItemLable}>
                        <label htmlFor="nodeName2">ClassName:</label >
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
                        <input id="nodeParent" className={styles.textInput} value={nodeData.parent ?? ''}
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
                                    <div style={{ flex: '0.9' }}>
                                        <input className={styles.textInput} style={{ width: '100%' }} value={message} onChange={e => HandlePropertyChange(index, e.target.value)}></input>
                                    </div>
                                    <div className={styles.textInputDelete}>
                                        <BsDashCircle onClick={() => HandlePropertyReomve(index)} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.nodeItemOperator} onClick={() => AddNewProperty()}>
                        <BsPlusCircle />
                        <span>Add Property</span>
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
                                    <div style={{ flex: '0.9' }}>
                                        <input className={styles.textInput} style={{ width: '100%' }} value={message} onChange={e => HandleMethodChange(index, e.target.value)}></input>
                                    </div>
                                    <div className={styles.textInputDelete}>
                                        <BsDashCircle onClick={() => HandleMethodReomve(index)} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.nodeItemOperator} onClick={() => AddNewMethod()} >
                        <BsPlusCircle />
                        <span>Add Method</span>
                    </div>
                </div>
            </div>
            {/* save change */}
            <div className={styles.nodeSave}>
                <button onClick={() => HandeSaveNode()}>Save Node</button>
            </div>
        </div>
    )
}