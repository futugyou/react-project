import React from 'react'
import { NodeTypes } from 'reactflow'

import CommonFlow from '@/Flow/CommonFlow'
import ClassNode from '@/Flow/CustomNode/ClassNode'
import ShapeNode from '@/Flow/CustomNode/ShapeNode'


const initialNodes = [
    {
        id: '1',
        data: { label: 'Hello' },
        position: { x: 0, y: 0 },
        type: 'default',
    },
    {
        id: '2',
        data: { label: 'World' },
        position: { x: 100, y: 100 },
    },
    {
        id: '3',
        data: { shape: 'diamond', label: 'diamond' },
        position: { x: 80, y: 200 },
        type: 'shape',
    },
    {
        id: '4',
        data: { shape: 'circle', label: 'circle' },
        position: { x: 200, y: 300 },
        type: 'shape',
    },
    {
        id: '5',
        data: { shape: 'ellipse', label: 'ellipse' },
        position: { x: 300, y: 200 },
        type: 'shape',
        style: { width: 150, height: 80 }
    },
    {
        id: '6',
        data: { shape: 'parallelogram', label: 'parallelogram' },
        position: { x: -100, y: 200 },
        type: 'shape',
        style: { width: 150, height: 80 }
    },
    {
        id: '7',
        data: { shape: 'rect', label: 'rect' },
        position: { x: -60, y: 100 },
        type: 'shape',
        style: { width: 150, height: 80 }
    },
    {
        id: '8',
        data: { shape: 'radiusrect', label: 'radius-rect' },
        position: { x: 200, y: 0 },
        type: 'shape',
        style: { width: 150, height: 80 }
    },
    {
        id: '9',
        data: { shape: 'db', label: 'database' },
        position: { x: 200, y: 200 },
        type: 'shape',
        style: { width: 90, height: 80 }
    },
    {
        id: '10',
        data: { shape: 'bus', label: 'service bus' },
        position: { x: 350, y: 100 },
        type: 'shape',
        style: { width: 120, height: 60 }
    },
    {
        id: '11',
        data: {
            "name": "IDirectoryContents",
            "parent": "IEnumerable<IFileInfo>",
            "properties": [
                "bool Exists { get; }"
            ],
            "id": "IDirectoryContents"
        },
        position: { x: -100, y: 400 },
        type: 'custom',
    },
]

const initialEdges = [{ id: '1-2', source: '1', sourceHandle: "102", targetHandle: "205", target: '2', label: 'to the', type: 'step', data: { pathType: "step" } }]

const nodeTypes: NodeTypes = {
    custom: ClassNode,
    shape: ShapeNode,
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