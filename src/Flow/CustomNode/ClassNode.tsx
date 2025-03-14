import './ClassNode.css'

import { useState, useEffect } from 'react'
import { Node, NodeProps } from 'reactflow'

import NodeResize from '@/Flow/CustomNode/NodeResize'
import HandlePlus from '@/Flow/CustomNode/HandlePlus'
import { NodeOperation } from '@/Flow/CustomNode/utils'
import { getRandomId } from '@/Flow/utils'
import { JSX } from 'react/jsx-runtime'

export type ClassNodeData = {
    name?: string
    parent?: string
    methods?: string[]
    properties?: string[]
    op?: NodeOperation
}

export type ClassNodeType = Node<ClassNodeData>

export const getClassNodeInitData = (): ClassNodeType => {
    return {
        id: getRandomId(),
        position: {
            x: Math.random() * window.innerWidth - 100,
            y: Math.random() * window.innerHeight,
        },
        type: 'custom',
        data: {
        }
    }
}

const ClassNode = ({ data, selected, id }: NodeProps<ClassNodeData>) => {
    const [emptyBody, setEmptyBody] = useState({})
    let methods: JSX.Element[] = []
    if (data.methods) {
        methods = data.methods.map((t: string) => {
            return (
                <li key={t} >
                    {t}
                </li>
            )
        })
    }

    let properties: JSX.Element[] = []
    if (data.properties) {
        properties = data.properties.map((t: string) => {
            return (
                <li key={t} >
                    {t}
                </li>
            )
        })
    }

    useEffect(() => {
        if ((data.methods && data.methods.length > 0) || (data.properties && data.properties.length > 0)) {
            setEmptyBody({})
        } else {
            setEmptyBody({ top: 'calc(50% - 6px)' })
        }
    }, [data.methods, data.properties])

    return (
        <div className='node-container'>
            {(data?.op?.allowResizer ?? true) && (<NodeResize isVisible={selected} keepAspectRatio={data?.op?.keepAspectRatio} minWidth={300} minHeight={50} />)}

            <div className='class-name' style={emptyBody} >
                {data.name} {data.parent ? " : " + data.parent : ""}
            </div>

            {properties.length > 0 && (
                <div>
                    <ul className='list-display'>
                        {properties}
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

            <HandlePlus id={id} selected={selected} type='custom'></HandlePlus>
        </div>
    )
}

export default ClassNode