
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Dropdown from 'react-bootstrap/Dropdown';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ModeSelect(props: any) {
    const mode = props.mode ?? 'Complete';
    const modes: string[] = ['Complete', 'Chat', 'Insert', 'Edit']

    const modeDescriptPopover = (
        <Popover id="mode-popover">
            <Popover.Body>
                Choose the interface that best suits your task. You can provide: a simple prompt to complete, starting and ending text to insert a completion within, or some text with instructions to edit it.
            </Popover.Body>
        </Popover>
    );

    const HandleModeChange = (value: any) => {
        if (props.onModeChange) {
            props.onModeChange(value)
        }
    }

    const dropdown_options = modes.map((data, index) => {
        return (
            <Dropdown.Item key={data} eventKey={data}>
                {data}
            </Dropdown.Item>
        );
    });
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
                        <Dropdown onSelect={HandleModeChange}>
                            <Dropdown.Toggle variant="select" id="dropdown-basic">
                                {mode}
                            </Dropdown.Toggle>
                            <Dropdown.Menu >{dropdown_options}</Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

            </Form.Group>
        </>
    )
}

export default ModeSelect