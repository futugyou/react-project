import './ClassNode.css'

import { useState, useEffect } from 'react'
import { Handle, Position, Node, NodeProps } from 'reactflow'

import NodeResize from '@/Flow/CustomNode/NodeResize'
import { NodeOperation } from './utils'

export type ClassNodeData = {
    name: string
    parent?: string
    methods?: string[]
    properties?: string[]
    op?: NodeOperation
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

export const ClassNode = ({ data, selected, id }: NodeProps<ClassNodeData>) => {
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

            <Handle id={id + 'topsource'} key={id + 'topsource'} position={Position.Top} type='source' className={`${selected ? 'nodeHandleDisplay' : 'nodeHandleHidden'}`} />
            <Handle id={id + 'bottomsource'} key={id + 'bottomsource'} position={Position.Bottom} type='source' className={`${selected ? 'nodeHandleDisplay' : 'nodeHandleHidden'}`} />
            <Handle id={id + 'leftsource'} key={id + 'leftsource'} position={Position.Left} type='source' className={`${selected ? 'nodeHandleDisplay' : 'nodeHandleHidden'}`} />
            <Handle id={id + 'rightsource'} key={id + 'rightsource'} position={Position.Right} type='source' className={`${selected ? 'nodeHandleDisplay' : 'nodeHandleHidden'}`} />
            <Handle id={id + 'toptarget'} key={id + 'toptarget'} position={Position.Top} type='target' className={'nodeHandleHidden2'} />
            <Handle id={id + 'bottomtarget'} key={id + 'bottomtarget'} position={Position.Bottom} type='target' className={'nodeHandleHidden2'} />
            <Handle id={id + 'lefttarget'} key={id + 'lefttarget'} position={Position.Left} type='target' className={'nodeHandleHidden2'} />
            <Handle id={id + 'righttarget'} key={id + 'righttarget'} position={Position.Right} type='target' className={'nodeHandleHidden2'} />
        </div>
    )
}