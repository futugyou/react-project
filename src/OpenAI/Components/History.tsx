import './Histort.css'

import { useState, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsClockHistory } from "react-icons/bs";

import { PlaygroundModel } from '../Models/PlaygroundModel';
import playgroundService from '../Services/Playground';
import moment from 'moment';

function History() {
    const [show, setShow] = useState(false);
    const [historyList, setHistoryList] = useState<PlaygroundModel[]>([]);

    const formatDate = (t: number) => {
        var day = moment(t);
        return day.format('LL dddd')
    }

    const formatTime = (t: number) => {
        var day = moment(t);
        return day.format('HH:mm')
    }

    let lastDate = '';

    const historyItems = historyList.map((data, index) => {
        let currectDate = data.Date as string;
        let dayDisplay = <></>

        if (lastDate != currectDate) {
            dayDisplay = <div style={{ textAlign: 'left', paddingLeft: '20px', fontSize: '16px', fontWeight: 700 }}> {formatDate(data.createdAt)}</div >
        }

        lastDate = currectDate

        return (
            <Fragment key={index}>
                {dayDisplay}
                <li>
                    <a href="#!" className="prompt"> {data.prompt}</a>
                    <a href="#!" className="float-end">{formatTime(data.createdAt)}</a>
                    <p className="completion">
                        {data.completion}
                    </p>
                </li>
            </Fragment>
        );
    });

    const handleClose = () => setShow(false);
    const handleShow = () => {
        const data = playgroundService.getPlayground();
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
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="timeline-3">
                                    {historyItems}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default History;