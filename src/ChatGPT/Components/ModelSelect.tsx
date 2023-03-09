import './DefaultQA.css'
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function ModelSelect(props: any) {
    const modelPopover = (
        <Popover id="model-popover">
            <Popover.Body>
                The model which will generate the completion. Some models are suitable for natural language tasks, others specialize in code. <a href='https://platform.openai.com/docs/models'>Learn more</a>.
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <OverlayTrigger placement="left" overlay={modelPopover}>
                <Form.Group className="mb-3" >
                    <Form.Label>Model</Form.Label>
                    <Form.Select value={props.model} onChange={e => props.onModelChange(e.target.value)} >
                        <option value="text-davinci-003">text-davinci-003</option>
                        <option value="text-davinci-002">text-davinci-002</option>
                        <option value="text-davinci-001">text-davinci-001</option>
                    </Form.Select>
                </Form.Group>
            </OverlayTrigger>
        </>
    )
}

export default ModelSelect