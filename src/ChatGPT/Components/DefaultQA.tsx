import { useState } from 'react'
import './DefaultQA.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

function DefaultQA() {
    const [temperature, setTemperature] = useState(0.0)

    const handleTemperatureChange = (value: number) => {
        console.log(value)
        setTemperature(value);
    }

    return (
        <>
            <Col xs={10}>
                <Row>
                    <Form.Text muted></Form.Text>
                </Row>
                <Row>

                </Row>
            </Col>
            <Col xs={2}>
                <Form.Label>Mode</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <Form.Label>Temperature</Form.Label>
                <Form.Range min={0.0} max={1.0} step={0.01} value={temperature} onChange={e => handleTemperatureChange(e.target.value)} />
            </Col>
        </>
    )
}

export default DefaultQA
