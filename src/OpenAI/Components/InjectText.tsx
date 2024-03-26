import './InjectText.css'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface IInjectTextProps {
    text: string
    checked: boolean
    label: string
    descript?: string
    onInjectChanged?: (text: string) => void
    onCheckChanged?: (checked: boolean) => void

}

const InjectText = ({ text = '', label = '', checked = false, descript, onInjectChanged, onCheckChanged }: IInjectTextProps) => {
    const [inject, setInject] = useState<string>(text)
    const [check, setCheck] = useState<boolean>(checked)
    const input_className = "inject-text-ta" + (check ? "" : " off")

    const injectDescriptPopover = (
        <Popover id="inject-popover">
            <Popover.Body>
                {descript}
            </Popover.Body>
        </Popover>
    )

    const handleInjectChanged = (value: string) => {
        setInject(value)
        if (onInjectChanged) {
            onInjectChanged(value)
        }
    }

    const handleCheckChanged = () => {
        let c: boolean = !check
        setCheck(c)
        if (onCheckChanged) {
            onCheckChanged(c)
        }
    }

    return (
        <>
            <Form.Group className="mb-3" >
                <Row>
                    <Col>
                        {descript && (
                            <OverlayTrigger placement="left" overlay={injectDescriptPopover}>
                                <Form.Label>{label}</Form.Label>
                            </OverlayTrigger>)}
                        {!descript && (
                            <Form.Label>{label}</Form.Label>
                        )}
                    </Col>
                </Row>
                <Row className='inject-text-ta-wrap'>
                    <Col>
                        <Form.Check className='inject-text-cb' type="checkbox" checked={check} onChange={handleCheckChanged} />
                        <input className={input_className} type="text" value={inject} onChange={(e) => handleInjectChanged(e.target.value)}></input>
                    </Col>
                </Row>

            </Form.Group>
        </>
    )
}

export default InjectText