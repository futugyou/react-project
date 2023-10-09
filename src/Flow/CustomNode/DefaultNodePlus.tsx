import styles from './DefaultNodePlus.module.css'

import { NodeProps, NodeResizer } from 'reactflow'
import { NodeOperation } from '@/Flow/CustomNode/utils'
import HandlePlus from '@/Flow/CustomNode/HandlePlus'

interface DefaultNodePlusData {
    label?: ''
    op?: NodeOperation
}


const DefaultNodePlus = (props: NodeProps<DefaultNodePlusData>) => {
    const nodeType = props.type ?? 'default'

    return (
        <div className={styles.DefaultNodePlus}>
            {(props.data?.op?.allowResizer ?? true) && (<NodeResizer minWidth={30} minHeight={30} isVisible={props.selected} keepAspectRatio={props.data?.op?.keepAspectRatio} lineClassName={styles.DefaultNodePlusResizerLine} handleClassName={styles.DefaultNodePlusResizerHandle} />)}
            <HandlePlus id={props.id} selected={props.selected}></HandlePlus>
            {nodeType != 'group' ? props.data.label : ''}
        </div >
    )
}

export default DefaultNodePlus