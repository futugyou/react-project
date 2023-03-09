import './DefaultQA.css'
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function BaseRange(props: any) {
    const modelPopover = (
        <Popover id="model-popover">
            <Popover.Body>
                props.popover
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <OverlayTrigger placement="left" overlay={modelPopover} delay={{ show: 100, hide: 3000 }} >
                <Form.Group className="mb-3" >
                    <Row>
                        <Col>
                            <Form.Label>{props.display}</Form.Label>
                        </Col>
                        <Col xs="4">
                            <Form.Control value={props.value} onChange={e => props.onValueChange(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Range min={props.min} max={props.max} step={props.step} value={props.value} onChange={e => props.onValueChange(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>
            </OverlayTrigger>
        </>
    )
}

export default BaseRange

