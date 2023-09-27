import styles from './EdgeStyleGroup.module.css'

export interface EdgeStyleGroupProps {
    edgeType?: string
    edgeColor?: string
    animated?: boolean
    startMarkerType?: string
    startMarkerColor?: string
    endMarkerType?: string
    endMarkerColor?: string
}

const EdgeStyleGroup = (props: EdgeStyleGroupProps) => {
    return (
        <>
            <div className={styles.groupContainer}>
                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>EdgeType</div>
                    <div className={styles.groupLayer}>
                        <div className={styles.groupLayerItem}>
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>bezier</title>
                                <path d="M 0 0 C 0 0, 0 40, 40 40" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem}>
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>smoothStep</title>

                            </svg>
                        </div>
                        <div className={styles.groupLayerItem}>
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>straight</title>
                                <path d="M 0 0 L 40 40" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                        <div className={styles.groupLayerItem}>
                            <svg width='40' height='40' xmlns='http://wwww.w3.org/2000/svg'>
                                <title>step</title>
                                <path d="M 10 0 V 20" stroke="black" fill="transparent" />
                                <path d="M 10 20 H 30" stroke="black" fill="transparent" />
                                <path d="M 30 20 V 40" stroke="black" fill="transparent" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>EdgeType</div>
                    <div className={styles.groupLayer}>
                        <div>bezier</div>
                        <div>smoothStep</div>
                        <div>straight</div>
                        <div>step</div>
                    </div>
                </div>
                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>EdgeType</div>
                    <div className={styles.groupLayer}>
                        <div>bezier</div>
                        <div>smoothStep</div>
                        <div>straight</div>
                        <div>step</div>
                    </div>
                </div>
                <div className={styles.groupLayerContainer}>
                    <div className={styles.groupLayerTitle}>EdgeType</div>
                    <div className={styles.groupLayer}>
                        <div>bezier</div>
                        <div>smoothStep</div>
                        <div>straight</div>
                        <div>step</div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EdgeStyleGroup