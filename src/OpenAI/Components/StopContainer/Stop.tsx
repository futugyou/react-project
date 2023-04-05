import './Stop.css';
import { KeyboardEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import StopDescribe from './StopDescribe';
import StopInputContainer from './StopInputContainer';
import StopTip from './StopTip';
import CleanAllStop from './CleanAllStop';

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

    const HandleOpenTip = () => {
        setShow(!show);
        setTip('')
        setState('')
    }

    const HandleRemoveStop = (value: string) => {
        let s = stop
        s.delete(value)
        setStop(s)
        props.onStopChange(Array.from(s.values()))
    }

    const HandleRemoveAllStop = () => {
        let s = new Set<string>();
        setStop(s)
        props.onStopChange(Array.from(s.values()))
    }

    const HandleStopChange = (value: string) => {
        setState(value)
        setShow(true)
        if (value.length > 0) {
            setTip("Add \"" + value + "\"")
        } else {
            setTip('')
        }
    }

    const HandleStopAdded = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key == "Enter" && state != '') {
            let s = stop
            s.add(state)
            setStop(s)
            setTip('')
            setState('')
            props.onStopChange(Array.from(s.values()))
        }
    }

    return (
        <>
            <OverlayTrigger placement="left" overlay={stopPopover}>
                <Form.Group className="mb-3 stop-container" >
                    <StopDescribe display={display} subDisplay={subDisplay} ></StopDescribe>

                    <StopInputContainer stop={stop} state={state}
                        onRemoveStop={(key: string) => HandleRemoveStop(key)}
                        onOpenTip={() => HandleOpenTip()}
                        onStopChange={(key: string) => HandleStopChange(key)}
                        onStopAdded={(e: any) => HandleStopAdded(e)} >
                        <CleanAllStop show={stop.size > 0} onRemoveAllStop={() => HandleRemoveAllStop()}></CleanAllStop>
                    </StopInputContainer>

                    <StopTip show={show} tip={tip}></StopTip>
                </Form.Group>
            </OverlayTrigger>
        </>
    )
}
export default Stop

