import React from 'react'
import { NodeTypes, Edge, Node, Position } from 'reactflow'

import CommonFlow from '@/Flow/CommonFlow'
import { ClassNode } from '@/Flow/ClassNode'

import { IChangeToken } from './IChangeToken'
import { IDirectoryContents } from './IDirectoryContents'
import { IFileInfo } from './IFileInfo'
import { IFileProvider } from './IFileProvider'

const initialNodes: Node[] = [
    {
        ...IFileProvider,
        position: { x: 0, y: 0 },
        data: {
            ...IFileProvider.data,
            connects: [{
                position: Position.Bottom,
                type: 'source',
            }, {
                position: Position.Right,
                type: 'source',
            },]
        },
    },
    {
        ...IFileInfo,
        position: { x: 0, y: 300 },
        data: {
            ...IFileInfo.data,
            connects: [{
                position: Position.Top,
                type: 'target',
            }, {
                position: Position.Right,
                type: 'target',
            }]
        },
    },
    {
        ...IDirectoryContents,
        position: { x: 300, y: 300 },
        data: {
            ...IDirectoryContents.data,
            connects: [{
                position: Position.Top,
                type: 'target',
            }, {
                position: Position.Left,
                type: 'source',
            }]
        },
    },
    {
        ...IChangeToken,
        position: { x: 500, y: 0 },
        data: {
            ...IChangeToken.data,
            connects: [{
                position: Position.Left,
                type: 'target',
            }]
        },
    },
]

const initialEdges: Edge[] = [
    {
        id: IFileProvider.id + '-' + IFileInfo.id,
        source: IFileProvider.id,
        target: IFileInfo.id,
    },
    {
        id: IFileProvider.id + '-' + IDirectoryContents.id,
        source: IFileProvider.id,
        target: IDirectoryContents.id,
    },
    {
        id: IFileProvider.id + '-' + IChangeToken.id,
        source: IFileProvider.id,
        target: IChangeToken.id,
        sourceHandle: 'IFileProviderrightsource',
    },
    {
        id: IDirectoryContents.id + '-' + IFileInfo.id,
        source: IDirectoryContents.id,
        target: IFileInfo.id,
        sourceHandle: 'IDirectoryContentsleftsource',
        targetHandle: 'IFileInforighttarget',
    },
]

const nodeTypes: NodeTypes = {
    custom: ClassNode,
}

export default function File() {
    return (
        <CommonFlow
            id={'file-system'}
            title={'File System'}
            initialNodes={initialNodes}
            initialEdges={initialEdges}
            nodeTypes={nodeTypes} >
        </CommonFlow>
    )
}