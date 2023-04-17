import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function CompletePanel(props: any) {
    return (
        <>
            <Form.Group as={Row} className="mb-3">
                <Form.Control as="textarea" rows={30} value={props.prompt} onChange={e => props.onPromptChange(e.target.value)} />
            </Form.Group>
        </>
    )
}

export default CompletePanel