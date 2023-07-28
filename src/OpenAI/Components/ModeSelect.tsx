
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Dropdown, { DropdownItem } from "@/Common/Dropdown"

const ModeSelect = (props: any) => {
    const mode = props.mode ?? 'Complete'
    const modes: string[] = ['Complete', 'Chat', 'Insert', 'Edit']

    const modeDescriptPopover = (
        <Popover id="mode-popover">
            <Popover.Body>
                Choose the interface that best suits your task. You can provide: a simple prompt to complete, starting and ending text to insert a completion within, or some text with instructions to edit it.
            </Popover.Body>
        </Popover>
    )

    const HandleModeChange = (value: string) => {
        if (props.onModeChange) {
            props.onModeChange(value)
        }
    }

    const selects: DropdownItem[] = modes.map(data => {
        return {
            key: data,
            value: data,
        }
    })

    return (
        <>
            <Form.Group className="mb-3" >
                <Row>
                    <Col>
                        <OverlayTrigger placement="left" overlay={modeDescriptPopover}>
                            <Form.Label>Mode</Form.Label>
                        </OverlayTrigger>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Dropdown items={selects} onDropdownChange={HandleModeChange}></Dropdown>
                    </Col>
                </Row>
            </Form.Group>
        </>
    )
}

export default ModeSelect