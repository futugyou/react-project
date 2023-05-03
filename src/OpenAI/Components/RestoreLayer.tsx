import './RestoreLayer.css'
import { BsStopwatch } from "react-icons/bs"
import moment from 'moment'

function RestoreLayer(props: any) {
    if (props.data == null) {
        return (<></>)
    }
    
    const formatDate = (t: number) => {
        var day = moment(t)
        return day.format('LL dddd')
    }

    return (
        <div className="restore-layer">
            <div className="restore-left">
                <BsStopwatch />
            </div>
            <div className="restore-center">
                <div className="restore-center-date">Viewing {formatDate(props.data.createdAt)}</div>
                <div className="restore-center-label">Restoring this version will overwrite your current session.</div>
            </div>
            <div className="restore-right">
                <div className="restore-center-btn">
                    <span>Restore</span>
                </div>
            </div>
        </div>
    )
}

export default RestoreLayer