import './Tip.css'
import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface ITipProps {
    show: boolean
    tip: string
}

const Tip = ({ show = false, tip }: ITipProps) => {
    console.log("tip")
    if (!show) {
        return null
    }

    return (
        <Row className='disabled-input'>
            <Col>
                <Form.Control type="text" disabled placeholder="Enter a sequence" value={tip} />
            </Col>
        </Row>
    )
}

export default React.memo(Tip) 