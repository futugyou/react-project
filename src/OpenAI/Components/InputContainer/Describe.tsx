import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Describe = ({ display, subDisplay }: { display: string, subDisplay: string }) => {
    return (
        <>
            <Row>
                <Col>
                    <Form.Label>{display}</Form.Label>
                </Col>
            </Row>
            {
                subDisplay && (
                    <Row>
                        <Col>
                            <Form.Label className='control-note' >{subDisplay}</Form.Label>
                        </Col>
                    </Row>
                )
            }
        </>
    )
}

export default Describe