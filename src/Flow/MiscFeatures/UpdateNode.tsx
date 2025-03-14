import { useState } from 'react'
import { ClassNodeType } from '@/Flow/CustomNode/ClassNode'
import { Node, useReactFlow, useUpdateNodeInternals } from 'reactflow'

import MiniModal from '@/Common/Components/MiniModal'

import { ModifyNode } from '@/Flow/CustomNode/ModifyNode'

interface UpdateNodeProps {
    title?: string
    selectedNode?: Node
}

const UpdateNode = (props: UpdateNodeProps) => {
    const { setNodes } = useReactFlow()
    const updateNodeInternals = useUpdateNodeInternals()
    const [showModal, setShowModal] = useState(false)
    const title = props.title ?? 'Update'
    const disabled = props.selectedNode == undefined ||
        (props.selectedNode.type != 'custom' && props.selectedNode.type != 'class')

    const onNodeChange = () => {
        setShowModal(true)
    }

    const updateNode = (data: ClassNodeType) => {
        setNodes((nds) =>
            nds.map((n) => {
                if (n.id === data.id) {
                    n = {
                        ...data,
                        selected: false,
                        position: n.position,
                        positionAbsolute: n.positionAbsolute,
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
            <button onClick={onNodeChange} disabled={disabled}>{title}</button>
        </>

    )
}

export default UpdateNode