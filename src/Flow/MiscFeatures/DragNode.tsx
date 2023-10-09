
interface DragNodeProps {
    title?: string
}

export const DragNodeType: string = 'application/reactflow'

// this component is unused
const DragNode = (props: DragNodeProps) => {
    const title = props.title ?? 'Class Node'

    const onDragStart = (event: any, nodeType: string) => {
        event.dataTransfer.setData(DragNodeType, nodeType)
        event.dataTransfer.effectAllowed = 'move'
    }

    return (
        <button onDragStart={(event) => onDragStart(event, 'custom')} draggable>{title}</button>
    )
}

export default DragNode
