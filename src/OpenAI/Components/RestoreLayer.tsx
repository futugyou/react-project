import './RestoreLayer.css'
import { BsStopwatch } from "react-icons/bs"
import moment from 'moment'
import { PlaygroundModel } from '../Models/PlaygroundModel'

function RestoreLayer(props: any) {
    if (props.data == null) {
        return (<></>)
    }

    const formatDate = (t: number) => {
        var day = moment(t)
        return day.format('LL dddd')
    }

    const onRestoreClick = (data: PlaygroundModel) => {
        if (props.onRestoreClick) {
            props.onRestoreClick(data)
        }
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
                <div className="restore-center-btn" onClick={() => onRestoreClick(props.data)}>
                    <span>Restore</span>
                </div>
            </div>
        </div>
    )
}

export default RestoreLayer