import { useState } from "react";

import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BaseRange = (props: any) => {
    let value: number = props.value
    if (value > props.max) {
        value = props.max
    } else if (value < props.min) {
        value = props.min
    }

    const [stringValue, setStringValue] = useState<string>(value + '')

    const modelPopover = (
        <Popover id="model-popover">
            <Popover.Body>
                {props.popover}
            </Popover.Body>
        </Popover>
    );

    const handleValueChange = (value: string) => {
        if (value === '') {
            setStringValue("0")
            return
        }

        if (value === '.') {
            setStringValue("0.")
            return
        }

        setStringValue(value)
        if (value.charAt(value.length - 1) === '.') {
            return
        }


        const t = parseFloat(value) + ''
        setStringValue(t)
        if (props.onValueChange) {
            props.onValueChange(t)
        }
    }
    return (
        <>
            {/* <OverlayTrigger placement="left" overlay={modelPopover} delay={{ show: 100, hide: 1000 }} > */}
            <OverlayTrigger placement="left" overlay={modelPopover}>
                <Form.Group className="mb-3" >
                    <Row>
                        <Col>
                            <Form.Label>{props.display}</Form.Label>
                        </Col>
                        <Col xs="4">
                            <Form.Control value={stringValue} className="display-value" onChange={e => handleValueChange(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Range min={props.min} max={props.max} step={props.step} value={value} onChange={e => handleValueChange(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>
            </OverlayTrigger>
        </>
    )
}

export default BaseRange

