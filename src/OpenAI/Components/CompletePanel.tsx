import './CompletePanel.css'
import Form from 'react-bootstrap/Form';

function CompletePanel(props: any) {
    return (
        <div className="container-fluid chat-pg-body">
            <Form.Control as="textarea" rows={30} value={props.prompt} onChange={e => props.onPromptChange(e.target.value)} />
        </div>
    )
}

export default CompletePanel