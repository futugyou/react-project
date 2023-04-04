import './StopTip.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StopTip(props: any) {
    const show: boolean = props.show
    const tip: string = props.tip

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