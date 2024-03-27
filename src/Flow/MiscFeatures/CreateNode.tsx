import React, { useState } from 'react'
import { Node, useReactFlow } from 'reactflow'

import MiniModal from '@/Common/Components/MiniModal'
import { ModifyNode } from '@/Flow/CustomNode/ModifyNode'
import { getClassNodeInitData } from '@/Flow/CustomNode/ClassNode'

interface CreateNodeProps {
    type: string
    title?: string
}

// this component is unused
const CreateNode = (props: CreateNodeProps) => {
    const initNodeData = getClassNodeInitData()

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