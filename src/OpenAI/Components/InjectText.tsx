import './InjectText.css'
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
                <Row className='inject-text-ta-wrap'>
                    <Col>
                        <Form.Check className='inject-text-cb' type="checkbox" checked={check} onChange={() => setCheck(!check)} />
                        <input className='inject-text-ta' type="text" value={inject} onChange={(e) => setInject(e.target.value)}></input>
                    </Col>
                </Row>

            </Form.Group>
        </>
    )
}

export default InjectText