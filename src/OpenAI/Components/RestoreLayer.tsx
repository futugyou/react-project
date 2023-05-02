import './RestoreLayer.css'

function RestoreLayer(props: any) {
    return (
        <div className="restore-layer">
            <div className="restore-left">left</div>
            <div className="restore-center">
                <div className="restore-center-date">Viewing 2023年4月21日 18:05</div>
                <div className="restore-center-label">Restoring this version will overwrite your current session.</div>
            </div>
            <div className="restore-right">
                <div className="restore-center-btn">Restore</div>
            </div>
        </div>
    )
}

export default RestoreLayer