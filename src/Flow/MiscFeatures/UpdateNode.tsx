import React, { useState } from 'react'
import { ClassNodeData, ClassNodeType, DefaultClassNodeType } from '@/Flow/CustomNode/ClassNode'

import MiniModal from '@/Common/MiniModal'

import { ModifyNode } from '@/Flow/CustomNode/ModifyNode'

interface UpdateNodeProps {
    addOrUpdtateNode: ClassNodeType
    setAddOrUpdtateNode: (arg0: ClassNodeType) => void
    updateNode: (data: ClassNodeData) => void
    selectedNode?: ClassNodeType
}

const UpdateNode = (props: UpdateNodeProps) => {
    const [showModal, setShowModal] = useState(false)
    const selectedNode = props.selectedNode

    const onNodeChange = () => {
        if (selectedNode) {
            props.setAddOrUpdtateNode(selectedNode)
            setShowModal(true)
        }
    }

    const updateNode = (data: ClassNodeData) => {
        props.updateNode(data)
        setShowModal(false)
    }

    return (
        <>
            <MiniModal show={showModal} setShow={setShowModal}  >
                <ModifyNode data={props.addOrUpdtateNode.data} updateNode={updateNode} ></ModifyNode>
            </MiniModal>
            <button onClick={onNodeChange} disabled={selectedNode == undefined}>updateNode</button>
        </>

    )
}

export default UpdateNode