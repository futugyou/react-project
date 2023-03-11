import './ModelSelect.css';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Dropdown from 'react-bootstrap/Dropdown';
import Popover from 'react-bootstrap/Popover';
import ModelService from '../Services/Model';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ModelSelect(props: any) {
    const [model, setModel] = useState<string>(props.model)
    const [models, setModels] = useState<string[]>([])

    const modelPopover = (display: string) => (
        <Popover id="model-popover">
            <Popover.Body>
                {display}
            </Popover.Body>
        </Popover>
    );

    const modelDescriptPopover = (
        <Popover id="model-popover">
            <Popover.Body>
                The model which will generate the completion. Some models are suitable for natural language tasks, others specialize in code. <a href='https://platform.openai.com/docs/models'>Learn more</a>.
            </Popover.Body>
        </Popover>
    );

    useEffect(() => {
        const fetchData = async () => {
            const data = await ModelService.getModelList();
            setModels(data)
        };

        fetchData();
    }, [])

    const onModelChange = (value: any) => {
        setModel(value);
        props.onModelChange(value);
    }

    const dropdown_options = models.map((item, index) => {
        return (
            <OverlayTrigger key={item} placement="left" overlay={modelPopover(item)}>
                <Dropdown.Item eventKey={item}>
                    {item}
                </Dropdown.Item>
            </OverlayTrigger>
        );
    });
    return (
        <>
            <Form.Group className="mb-3" >
                <Row>
                    <Col>
                        <OverlayTrigger placement="left" overlay={modelDescriptPopover}>
                            <Form.Label>Model</Form.Label>
                        </OverlayTrigger>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Dropdown onSelect={onModelChange}>
                            <Dropdown.Toggle variant="select" id="dropdown-basic">
                                {model}
                            </Dropdown.Toggle>
                            <Dropdown.Menu >{dropdown_options}</Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

            </Form.Group>
        </>
    )
}

export default ModelSelect