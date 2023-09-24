import React, { useState } from 'react'
import { ClassNodeData, ClassNodeType, DefaultClassNodeType } from '@/Flow/CustomNode/ClassNode'
import { useAuth } from '@/Auth/index'

import MiniModal from '@/Common/MiniModal'

import { ModifyNode } from '@/Flow/CustomNode/ModifyNode'

interface CreateNodeProps {
    updateNode: (data: ClassNodeData) => void
}

const CreateNode = (props: CreateNodeProps) => {
    const { authService } = useAuth()
    if (!authService.isAuthenticated()) {
        return null
    }

    const [addOrUpdtateNode, setAddOrUpdtateNode] = useState<ClassNodeType>(DefaultClassNodeType)
    const [showModal, setShowModal] = useState(false)

    const onNodeAdd = () => {
        setAddOrUpdtateNode(DefaultClassNodeType)
        setShowModal(true)
    }

    const updateNode = (data: ClassNodeType) => {
        props.updateNode(data.data)
        setShowModal(false)
    }

    return (
        <>
            <MiniModal show={showModal} setShow={setShowModal}  >
                <ModifyNode data={addOrUpdtateNode} updateNode={updateNode} ></ModifyNode>
            </MiniModal>
            <button onClick={onNodeAdd}>addNode</button>
        </>

    )
}

export default CreateNode