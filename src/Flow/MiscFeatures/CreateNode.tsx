import React, { useState } from 'react'
import { DefaultClassNodeType } from '@/Flow/CustomNode/ClassNode'
import { Node, useReactFlow } from 'reactflow'

import MiniModal from '@/Common/MiniModal'

import { ModifyNode } from '@/Flow/CustomNode/ModifyNode'

interface CreateNodeProps {
    type: string
    title?: string
}

const CreateNode = (props: CreateNodeProps) => {
    // TODO: initNodeData should init by props.type
    const initNodeData = DefaultClassNodeType

    const { setNodes, getNodes } = useReactFlow()
    const title = props.title ?? 'addNode'
    const [showModal, setShowModal] = useState(false)

    const onNodeAdd = () => {
        setShowModal(true)
    }

    const updateNode = (data: Node) => {
        const nodes = getNodes()
        const index = nodes.findIndex(n => n.id == data.id)
        if (index == -1) {
            setNodes((nds) => nds.concat(data))
        }

        setShowModal(false)
    }

    return (
        <>
            <MiniModal show={showModal} setShow={setShowModal}  >
                <ModifyNode data={initNodeData} updateNode={updateNode} ></ModifyNode>
            </MiniModal>
            <button onClick={onNodeAdd}>{title}</button>
        </>

    )
}

export default CreateNode