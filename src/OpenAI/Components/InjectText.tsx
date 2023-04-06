import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InjectText({ text = '', label = '', descript = '' }) {
    const [inject, setInject] = useState<string>(text)
    const [check, setCheck] = useState<boolean>(true)

    const injectDescriptPopover = (
        <Popover id="inject-popover">
            <Popover.Body>
                {descript}
            </Popover.Body>
        </Popover>
    );

    const onInjectChange = (value: string) => {
        setInject(value);
    }

    return (
        <>
            <Form.Group className="mb-3" >
                <Row>
                    <Col>
                        <OverlayTrigger placement="left" overlay={injectDescriptPopover}>
                            <Form.Label>{label}</Form.Label>
                        </OverlayTrigger>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" checked={check} onChange={() => setCheck(!check)} />
                        <Form.Control type="text" value={inject} onChange={() => setInject(inject)} />
                    </Col>
                </Row>

            </Form.Group>
        </>
    )
}

export default InjectText