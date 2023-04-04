import './Stop.css'
import { KeyboardEvent, useState } from 'react'
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StopDescribe from './StopDescribe';
import StopInputContainer from './StopInputContainer';

function Stop(props: any) {
    let stops = new Set<string>(props.stop);
    const [stop, setStop] = useState<Set<string>>(stops)
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
        setTip('')
        setState('')
    }

    const HandleRemoveStop = (value: string) => {
        let s = stop
        s.delete(value)
        setStop(s)
    }

    const removeAllStop = () => {
        let s = new Set<string>();
        setStop(s)
    }

    const onStopChange = (value: string) => {
        setState(value)
        setShow(true)
        if (value.length > 0) {
            setTip("Add \"" + value + "\"")
        } else {
            setTip('')
        }
    }

    const onStopAdded = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key == "Enter" && state != '') {
            let s = stop
            s.add(state)
            setStop(s)
            setTip('')
            setState('')
        }
    }

    return (
        <>
            <OverlayTrigger placement="left" overlay={stopPopover}>
                <Form.Group className="mb-3 stop-container" >
                    <StopDescribe display={display} subDisplay={subDisplay} ></StopDescribe>

                    <StopInputContainer stop={stop} state={state}
                        HandleRemoveStop={(key: string) => HandleRemoveStop(key)}
                        openTip={() => openTip()}
                        onStopChange={(key: string) => onStopChange(key)}
                        onStopAdded={(e: any) => onStopAdded(e)}
                        removeAllStop={() => removeAllStop()}>
                    </StopInputContainer>

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

