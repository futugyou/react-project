import './History.css'

import { useState, Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { BsClockHistory } from "react-icons/bs"

import { PlaygroundModel, DefaultPlayground } from '../Models/PlaygroundModel'
import playgroundService from '../Services/Playground'
import moment from 'moment'

function History(props: any) {
    const [show, setShow] = useState(false)
    const [historyList, setHistoryList] = useState<PlaygroundModel[]>([])
    const currentEdit: PlaygroundModel = props.current ?? DefaultPlayground
    const [historySelected, setHistorySelected] = useState(currentEdit.createdAt)

    const formatDate = (t: number) => {
        var day = moment(t)
        return day.format('LL dddd')
    }

    const formatTime = (t: number) => {
        var day = moment(t)
        return day.format('HH:mm')
    }

    let lastDate = formatDate(currentEdit.createdAt)

    const handleRecordClick = (data: PlaygroundModel) => {
        setHistorySelected(data.createdAt)
        if (props.onHistoryRecordClick) {
            const t: PlaygroundModel = {
                ...data,
            }
            props.onHistoryRecordClick(t)
        }
    }

    const currentItems = <>
        <li className="history-day-display"> {formatDate(currentEdit.createdAt)}</li >
        <li className={historySelected === currentEdit.createdAt ? "history-item-wrap history-selected history-current" : "history-item-wrap history-current"} onClick={() => handleRecordClick(currentEdit)}>
            <div className="history-item">
                <div className="history-item-time">Now</div>
                <div className="history-item-prompt">Current editor</div>
            </div>
        </li>
    </>
    const historyItems = historyList.map((data, index) => {
        let currectDate = formatDate(data.createdAt)
        let dayDisplay = <></>

        if (lastDate != currectDate) {
            dayDisplay = <li className="history-day-display"> {formatDate(data.createdAt)}</li >
        }

        lastDate = currectDate

        return (
            <Fragment key={index}>
                {dayDisplay}
                <li className={historySelected === data.createdAt ? "history-item-wrap history-selected" : "history-item-wrap"} onClick={() => handleRecordClick(data)}>
                    <div className="history-item">
                        <div className="history-item-time">{formatTime(data.createdAt)}</div>
                        <div className="history-item-prompt"> {data.prompt}</div>
                    </div>
                </li>
            </Fragment>
        )
    })

    const handleClose = () => setShow(false)
    const handleShow = () => {
        let data = playgroundService.getPlayground()
        setHistoryList(data)
        setShow(true)

        if (props.onHistoryShow) {
            props.onHistoryShow()
        }
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                <BsClockHistory></BsClockHistory>
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>History</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="history-container" >
                        <ul className="timeline-3">
                            {currentItems}
                            {historyItems}
                        </ul>
                    </div>
                </Offcanvas.Body>
            </Offcanvas >
        </>
    )
}

export default History