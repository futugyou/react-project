import './ClassNode.css'

import { ReactElement, JSXElementConstructor, ReactNode } from 'react'
import { Handle, Position, Node, NodeProps, HandleType } from 'reactflow'

export type ClassNodeData = {
    id: string
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

const getNodeId = () => `randomnode_${+new Date()}`

export const DefaultClassNodeType: ClassNodeType = {
    id: '',
    position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
    },
    type: 'custom',
    data: {
        id: '',
        name: '',
    }
}

export const ClassNode = ({ data, selected }: NodeProps<ClassNodeData>) => {
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
                <Handle className='customHandle' id={data.name + t.position + t.type} key={data.name + t.position} position={t.position} type={t.type} />
            )
        })
    }

    return (
        <div className={selected ? 'node-container node-container-selected' : 'node-container'}>
            <div className='class-name' >
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