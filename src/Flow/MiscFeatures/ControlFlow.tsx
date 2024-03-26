import { useState } from 'react'

interface ControlFlowProps {
    show: boolean
    onClick: (show: boolean) => void
}

const ControlFlow = (props: ControlFlowProps) => {
    const title = props.show ? "Hide Panel" : "Show Panel"
    const onNodeChange = () => {
        props.onClick(!props.show)
    }

    return (
        <button onClick={onNodeChange} >{title}</button>
    )
}

export default ControlFlow