import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StopDescribe(props: any) {
    const display: string = props.display
    const subDisplay: string = props.subDisplay

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

export default StopDescribe