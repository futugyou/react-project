import './CompletePanel.css'
import Form from 'react-bootstrap/Form';

function CompletePanel(props: any) {
    let text: string = props.prompt + props.completion
    return (
        <div className="container-fluid complete-pg-body">
            <Form.Control as="textarea" rows={30} value={text} onChange={e => props.onPromptChange(e.target.value)} />
        </div>
    )
}

export default CompletePanel