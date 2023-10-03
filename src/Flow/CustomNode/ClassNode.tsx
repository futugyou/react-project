import './ClassNode.css'

import { useState, useEffect } from 'react'
import { Handle, Position, Node, NodeProps, HandleType, useNodeId, useReactFlow } from 'reactflow'

import NodeResize from '@/Flow/CustomNode/NodeResize'

export type ClassNodeData = {
    name: string
    parent?: string
    methods?: string[]
    properties?: string[]
    connects?: ConnectInfo[]
}

export type ConnectInfo = {
    position: Position
    type: HandleType
}

export type ClassNodeType = Node<ClassNodeData>

export const getNodeId = () => `randomnode_${+new Date()}`

export const DefaultClassNodeType: ClassNodeType = {
    id: '',
    position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
    },
    type: 'custom',
    data: {
        name: '',
    }
}

export const ClassNode = ({ data, selected }: NodeProps<ClassNodeData>) => {
    const [emptyBody, setEmptyBody] = useState({})
    const className = (selected ? 'node-container node-container-selected ' : 'node-container ')
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

    let connects: JSX.Element[] = []
    if (data.connects) {
        connects = data.connects.map((t: ConnectInfo) => {
            return (
                <Handle className='customHandle' id={data.name + t.position + t.type} key={data.name + t.position + t.type} position={t.position} type={t.type} />
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
        <div className={className}>
            <NodeResize isVisible={selected} minWidth={300} minHeight={50} />

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

            {connects.length > 0 && (
                <>
                    {connects}
                </>
            )}
        </div>
    )
}