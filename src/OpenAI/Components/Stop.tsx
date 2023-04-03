
import './Stop.css'
import { KeyboardEvent, useState } from 'react'
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
function Stop(props: any) {
    const [stop, setStop] = useState<string[]>(props.stop)
    const [state, setState] = useState('');
    const [tip, setTip] = useState('');
    const [show, setShow] = useState(false);
    let display = "Stop sequences"
    let subDisplay = "Enter sequence and press Tab"
    let popover = "Up to four sequences where the API will stop generating further tokens.The returned text will not contain the stop sequence."
    const elements: any[] = [];
    stop.forEach((item) => {
        elements.push(
            <div key={item} className="stop-multiValue">
                <div className="stop-item">  {item == '\n' ? '↵' : item}</div>

                <div className="stop-close">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="14px" width="14px" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"></path></svg>
                </div>
            </div>
        )
    });
    const stopPopover = (
        <Popover id="stop-popover">
            <Popover.Body>
                {popover}
            </Popover.Body>
        </Popover>
    );

    const openTip = () => {
        setShow(!show);
    }

    const onStopChange = (value: string) => {
        setState(value)
        if (show) {
            setTip("Add \"" + value + "\"")
        } else {
            setTip('')
        }
    }

    const onStopAdded = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key == "Enter" && state != '') {
            let s = stop
            s.push(state)
            setStop(s)
            setTip('')
            setState('')
        }
    }

    return (
        <>
            <OverlayTrigger placement="left" overlay={stopPopover}>
                <Form.Group className="mb-3 stop-container" >
                    <Row>
                        <Col>
                            <Form.Label>{display}</Form.Label>
                        </Col>
                    </Row>
                    {subDisplay && (
                        <Row>
                            <Col>
                                <Form.Label className='control-note' >{subDisplay}</Form.Label>
                            </Col>
                        </Row>
                    )}
                    <div className='stop-sub-container'>
                        <div className='stop-without-close'>
                            {stop && (elements)}
                            <div>
                                <Form.Control type="text" onChange={e => onStopChange(e.target.value)} onClick={e => openTip()} value={state} onKeyDown={(e) => onStopAdded(e)} />
                            </div>
                        </div>
                        {stop.length > 0 && (
                            <div className='closs-container'>
                                <div className='closs-indicatorContainer'>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"></path>
                                    </svg>
                                </div>
                            </div>)}
                    </div>
                    {show && (
                        <>
                            <Row className='disabled-input' >
                                <Col>
                                    <Form.Control type="text" disabled placeholder="Enter a sequence" value={tip} />
                                </Col>
                            </Row>
                        </>
                    )}
                </Form.Group>
            </OverlayTrigger>
        </>
    )
}
export default Stop

