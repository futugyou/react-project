import './Histort.css'

import { useState, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsClockHistory } from "react-icons/bs";

import { HistoryModel } from '../Models/HistoryModel';
import historyService from '../Services/History';
import * as moment from 'moment';

function History() {
    const [show, setShow] = useState(false);
    const [historyList, setHistoryList] = useState<HistoryModel[]>([]);

    const formatDate = (t: number) => {
        var day = moment(t);
        return day.format('LL dddd')
    }

    const formatTime = (t: number) => {
        var day = moment(t);
        return day.format('HH:mm')
    }

    let lastDate = moment().format('YYYYMMDD');

    const historyItems = historyList.map((data, index) => {
        let currectDate = data.Date as string;
        let dayDisplay = <></>

        if (lastDate != currectDate) {
            dayDisplay = <div style={{ textAlign: 'left' }}> {formatDate(data.createdAt)}</div >
        }

        lastDate = currectDate

        return (
            <Fragment key={index}>
                {dayDisplay}
                <li className="timeline-item mb-5">
                    <p className="text-muted mb-2 fw-bold">{formatTime(data.createdAt)}</p>
                    <p className="text-muted">
                        {data.prompt}
                    </p>
                </li>
            </Fragment>
        );
    });

    const handleClose = () => setShow(false);
    const handleShow = () => {
        const data = historyService.getHistory();
        setHistoryList(data)
        setShow(true);
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
                    <section className="py-5">
                        <ul className="timeline">
                            {historyItems}
                        </ul>
                    </section>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default History;