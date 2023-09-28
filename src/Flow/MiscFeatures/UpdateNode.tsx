import React, { useState } from 'react'
import { ClassNodeData, ClassNodeType, DefaultClassNodeType } from '@/Flow/CustomNode/ClassNode'
import { Node, useReactFlow, useUpdateNodeInternals } from 'reactflow'
import { useAuth } from '@/Auth/index'

import MiniModal from '@/Common/MiniModal'

import { ModifyNode } from '@/Flow/CustomNode/ModifyNode'

interface UpdateNodeProps {
    title?: string
    selectedNode?: ClassNodeType
}

const UpdateNode = (props: UpdateNodeProps) => {
    const { authService } = useAuth()
    if (!authService.isAuthenticated()) {
        return null
    }

    const { setNodes } = useReactFlow()
    const updateNodeInternals = useUpdateNodeInternals()
    const [showModal, setShowModal] = useState(false)
    const title = props.title ?? 'updateNode'


    const onNodeChange = () => {
        setShowModal(true)
    }

    const updateNode = (data: ClassNodeType) => {
        setNodes((nds) =>
            nds.map((n) => {
                if (n.id === data.id) {
                    n = {
                        ...data,
                        selected: false
                    }
                }

                return n
            })
        )

        updateNodeInternals(data.id)
        setShowModal(false)
    }

    return (
        <>
            <MiniModal show={showModal} setShow={setShowModal}  >
                <ModifyNode data={props.selectedNode!} updateNode={updateNode} ></ModifyNode>
            </MiniModal>
            <button onClick={onNodeChange} disabled={props.selectedNode == undefined}>{title}</button>
        </>

    )
}

export default UpdateNode