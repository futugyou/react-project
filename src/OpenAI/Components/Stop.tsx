
import './Stop.css'
import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Stop(props: any) {
    const [state, setState] = useState('');
    const [tip, setTip] = useState('');
    const [show, setShow] = useState(false);
    let display = "Stop sequences"
    let subDisplay = "Enter sequence and press Tab"
    let popover = "Up to four sequences where the API will stop generating further tokens.The returned text will not contain the stop sequence."

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
                    <Row>
                        <Col>
                            <Form.Control type="text" onChange={e => onStopChange(e.target.value)} onClick={e => openTip()} value={state} />
                        </Col>
                    </Row>
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

