import './DefaultQA.css';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function BaseRange(props: any) {
    let value: number = props.value
    if (value > props.max) {
        value = props.max
    } else if (value < props.min) {
        value = props.min
    }

    const modelPopover = (
        <Popover id="model-popover">
            <Popover.Body>
                {props.popover}
            </Popover.Body>
        </Popover>
    );

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
                            <Form.Control value={value} className="display-value" onChange={e => props.onValueChange(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Range min={props.min} max={props.max} step={props.step} value={value} onChange={e => props.onValueChange(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>
            </OverlayTrigger>
        </>
    )
}

export default BaseRange

