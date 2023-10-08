import styles from './HandlePlus.module.css'
import { Handle, Position } from 'reactflow'

interface HandlePlusProps {
    id: string
    selected: boolean
    type?: string
}

const getids = (id: string, type?: string) => {
    if (type == 'custom') {
        return ['topsource', 'bottomsource', 'leftsource', 'rightsource',
            'toptarget', 'bottomtarget', 'lefttarget', 'righttarget'].map(p => id + p)
    } else {
        return ['01', '02', '03', '04', '05', '06', '07', '08'].map(p => id + p)
    }
}
const HandlePlus = ({ id, selected, type }: HandlePlusProps) => {
    const getidkeys = getids(id, type)

    return (
        <>
            <Handle id={getidkeys[0]} key={getidkeys[0]} position={Position.Top} type='source' className={`${selected ? styles.showSource : styles.hiddenSource}`} />
            <Handle id={getidkeys[1]} key={getidkeys[1]} position={Position.Bottom} type='source' className={`${selected ? styles.showSource : styles.hiddenSource}`} />
            <Handle id={getidkeys[2]} key={getidkeys[2]} position={Position.Left} type='source' className={`${selected ? styles.showSource : styles.hiddenSource}`} />
            <Handle id={getidkeys[3]} key={getidkeys[3]} position={Position.Right} type='source' className={`${selected ? styles.showSource : styles.hiddenSource}`} />
            <Handle id={getidkeys[4]} key={getidkeys[4]} position={Position.Top} type='target' className={styles.hiddenTarget} />
            <Handle id={getidkeys[5]} key={getidkeys[5]} position={Position.Bottom} type='target' className={styles.hiddenTarget} />
            <Handle id={getidkeys[6]} key={getidkeys[6]} position={Position.Left} type='target' className={styles.hiddenTarget} />
            <Handle id={getidkeys[7]} key={getidkeys[7]} position={Position.Right} type='target' className={styles.hiddenTarget} />
        </>
    )
}

export default HandlePlus