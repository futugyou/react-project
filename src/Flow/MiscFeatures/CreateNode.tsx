import React, { useState } from 'react'
import { ClassNodeData, ClassNodeType, DefaultClassNodeType } from '@/Flow/CustomNode/ClassNode'
import { useAuth } from '@/Auth/index'

import MiniModal from '@/Common/MiniModal'

import { ModifyNode } from '@/Flow/CustomNode/ModifyNode'

interface CreateNodeProps {
    addOrUpdtateNode: ClassNodeType
    setAddOrUpdtateNode: (arg0: ClassNodeType) => void
    updateNode: (data: ClassNodeData) => void
}

const CreateNode = (props: CreateNodeProps) => {
    const { authService } = useAuth()
    if (!authService.isAuthenticated()) {
        return null
    }

    const [showModal, setShowModal] = useState(false)
    const onNodeAdd = () => {
        const newNode = DefaultClassNodeType
        props.setAddOrUpdtateNode(newNode)
        setShowModal(true)
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
            <button onClick={onNodeAdd}>addNode</button>
        </>

    )
}

export default CreateNode