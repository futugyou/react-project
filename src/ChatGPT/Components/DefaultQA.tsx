import { useState } from 'react'
import './DefaultQA.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DefaultQA() {
    const [count, setCount] = useState(0)

    return (
        <Container>
            <Row>
                <Col>1 of 2</Col>
                <Col>2 of 2</Col>
            </Row>
        </Container>
    )
}

export default DefaultQA
