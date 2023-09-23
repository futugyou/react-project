import data from './data.json'

import React from 'react'
import { NodeTypes, Edge, Node, Position } from 'reactflow'

import CommonFlow from '@/Flow/CommonFlow'
import { ClassNode } from '@/Flow/CustomNode/ClassNode'

const initialNodes: Node[] = data.nodes
const initialEdges: any[] = data.edges

const nodeTypes: NodeTypes = {
    custom: ClassNode,
}

export default function Flow() {
    return (
        <CommonFlow
            id={'exception'}
            title={'Exception'}
            initialNodes={initialNodes}
            initialEdges={initialEdges}
            nodeTypes={nodeTypes} >
        </CommonFlow>
    )
}