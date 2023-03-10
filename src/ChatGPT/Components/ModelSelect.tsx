import './DefaultQA.css';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Dropdown from 'react-bootstrap/Dropdown';
import Popover from 'react-bootstrap/Popover';
import ModelService from '../Services/Model';

function ModelSelect(props: any) {
    const [model, setModel] = useState(props.model)
    const [models, setModels] = useState([])

    const modelPopover = (
        <Popover id="model-popover">
            <Popover.Body>
                The model which will generate the completion. Some models are suitable for natural language tasks, others specialize in code. <a href='https://platform.openai.com/docs/models'>Learn more</a>.
            </Popover.Body>
        </Popover>
    );

    useEffect(() => {
        ModelService
            .getModelList()
            .then(data => {
                setModels(data)
                console.log(data)
            });
    }, [model])

    const dropdown_options = models.map((item, index) => {
        return (
            <Dropdown.Item eventKey={item} key={item}>
                {item}
            </Dropdown.Item>
        );
    });
    return (
        <>
            <OverlayTrigger placement="left" overlay={modelPopover}>
                <Form.Group className="mb-3" >
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {model}
                        </Dropdown.Toggle>

                        <Dropdown.Menu >{dropdown_options}</Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
            </OverlayTrigger>
        </>
    )
}

export default ModelSelect