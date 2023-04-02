
import './Stop.css'
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Stop(props: any) {
    let display = "Stop sequences"
    let subDisplay = "Enter sequence and press Tab"
    let popover = "Up to four sequences where the API will stop generating further tokens.The returned text will not contain the stop sequence."

    const modelPopover = (
        <Popover id="model-popover">
            <Popover.Body>
                {popover}
            </Popover.Body>
        </Popover>
    );
    return (
        <>
            <OverlayTrigger placement="left" overlay={modelPopover}>
                <Form.Group className="mb-3" >
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
                            <Form.Control type="text" onChange={e => props.onStopChange(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>
            </OverlayTrigger>
        </>
    )
}
export default Stop

