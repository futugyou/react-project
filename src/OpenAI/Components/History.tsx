import './Histort.css'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsClockHistory } from "react-icons/bs";

import { HistoryModel } from '../Models/HistoryModel';
import historyService from '../Services/History';

function History() {
    const [show, setShow] = useState(false);
    const [historyList, setHistoryList] = useState<HistoryModel[]>([]);

    const historyItems = historyList.map((data, index) => {
        return (
            <li className="timeline-item mb-5" key={index}>
                <p className="text-muted mb-2 fw-bold">{data.createdAt}</p>
                <p className="text-muted">
                    {data.prompt}
                </p>
            </li>

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