import './ClassNode.css'

import { ReactElement, JSXElementConstructor, ReactNode } from 'react'
import { Handle, Position, Node, NodeProps } from 'reactflow'

export type ClassNodeData = {
    name: string
    parent?: string
    methods?: string[]
    propertys?: string[]
}

export type ClassNodeType = Node<ClassNodeData>

export const ClassNode = ({ data }: NodeProps<ClassNodeData>) => {
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

    let propertys: JSX.Element[] = []
    if (data.propertys) {
        propertys = data.propertys.map((t: string) => {
            return (
                <li key={t} >
                    {t}
                </li>
            )
        })
    }

    return (
        <div className='node-container'> 
            <div className='class-name' >
                {data.name} {data.parent ? " : " + data.parent : ""}
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
            <Handle type="target" position={Position.Left} onConnect={(params) => console.log('handle onConnect', params)} />
            <Handle type="source" position={Position.Bottom} id={data.name} />
        </div>
    )
}