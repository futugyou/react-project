import { useState, useEffect } from "react"

import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


interface IBaseRangeProps {
    value: number
    max: number
    min: number
    step: number
    popover?: any
    display?: any
    disablePopover?: boolean
    onValueChange?: (value: any) => void
    children?: React.ReactNode
}

const BaseRange = (props: IBaseRangeProps) => {
    let value: number = props.value
    if (value > props.max) {
        value = props.max
    } else if (value < props.min) {
        value = props.min
    }

    let rawstring = value + ''
    const [stringValue, setStringValue] = useState<string>(rawstring)

    const modelPopover = (
        <Popover id="model-popover">
            <Popover.Body>
                {props.popover}
            </Popover.Body>
        </Popover>
    )

    const handleInputChange = (value: string) => {
        if (value === '') {
            setStringValue("0")
            return
        }

        if (value === '.') {
            setStringValue("0.")
            return
        }

        if (value.charAt(value.length - 1) === '.') {
            setStringValue(value)
            return
        }

        const t = parseFloat(value) + ''
        setStringValue(t)
    }

    const handleValueChange = (value: string) => {
        setStringValue(value)
    }

    const handleChange = () => {
        // if (props.onValueChange) {
        //     props.onValueChange(t)
        // }
    }

    useEffect(() => {
        if (rawstring != stringValue) {
            const timeOutId = setTimeout(() => {
                const t = parseFloat(stringValue) + ''
                if (props.onValueChange) {
                    props.onValueChange(t)
                    rawstring = new Date().toDateString()
                }
            }, 500)
            return () => clearTimeout(timeOutId)
        }
    }, [stringValue])

    const renderRange = () => {
        return <Form.Group className="mb-3" >
            <Row>
                <Col>
                    <Form.Label>{props.display}</Form.Label>
                </Col>
                <Col xs="4">
                    <Form.Control value={stringValue} className="display-value" onChange={e => handleInputChange(e.target.value)} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Range min={props.min} max={props.max} step={props.step} value={stringValue} onMouseUp={handleChange} onChange={e => handleValueChange(e.target.value)} />
                </Col>
            </Row>
        </Form.Group>
    }

    if (props.disablePopover) {
        return (
            renderRange()
        )
    }

    return (
        <>
            {/* <OverlayTrigger placement="left" overlay={modelPopover} delay={{ show: 100, hide: 1000 }} > */}
            <OverlayTrigger placement="left" overlay={modelPopover}>
                {renderRange()}
            </OverlayTrigger>
        </>
    )
}

export default BaseRange

