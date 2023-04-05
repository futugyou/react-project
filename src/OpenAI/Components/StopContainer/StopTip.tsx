import './StopTip.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StopTip({ show, tip }: { show: boolean, tip: string }) {
    return (
        <>
            {show && (
                <Row className='disabled-input'>
                    <Col>
                        <Form.Control type="text" disabled placeholder="Enter a sequence" value={tip} />
                    </Col>
                </Row>
            )}
        </>
    )
}

export default StopTip