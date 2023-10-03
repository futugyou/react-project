import React from 'react'
import { NodeTypes } from 'reactflow'

import CommonFlow from '@/Flow/CommonFlow'
import { ClassNode } from '@/Flow/CustomNode/ClassNode'


const initialNodes = [
    {
        id: '1',
        data: { label: 'Hello' },
        position: { x: 0, y: 0 },
        type: 'input',
    },
    {
        id: '2',
        data: { label: 'World' },
        position: { x: 100, y: 100 },
    },
]

const initialEdges = [{ id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' }]

const nodeTypes: NodeTypes = {
    custom: ClassNode,
}

export default function DemoFlow() {
    return (
        <CommonFlow
            id={'demoflow'}
            title={'Demo'}
            initialNodes={initialNodes}
            initialEdges={initialEdges}
            nodeTypes={nodeTypes} >
        </CommonFlow>
    )
}