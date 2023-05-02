import './Histort.css'

import { useState, Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { BsClockHistory } from "react-icons/bs"

import { PlaygroundModel } from '../Models/PlaygroundModel'
import playgroundService from '../Services/Playground'
import moment from 'moment'

function History(props: any) {
    const [show, setShow] = useState(false)
    const [historyList, setHistoryList] = useState<PlaygroundModel[]>([])
    const [historySelected, setHistorySelected] = useState(-1)

    const formatDate = (t: number) => {
        var day = moment(t)
        return day.format('LL dddd')
    }

    const formatTime = (t: number) => {
        var day = moment(t)
        return day.format('HH:mm')
    }

    let lastDate = ''

    const handleRecordClick = (data: PlaygroundModel) => {
        setHistorySelected(data.createdAt)
        if (props.onHistoryRecordClick) {
            props.onHistoryRecordClick(data)
        }
    }

    const historyItems = historyList.map((data, index) => {
        let currectDate = data.Date as string
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
        if (props.current != null) {
            data.unshift(props.current)
        }
        setHistoryList(data)
        setShow(true)
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
                            {historyItems}
                        </ul>
                    </div>
                </Offcanvas.Body>
            </Offcanvas >
        </>
    )
}

export default History