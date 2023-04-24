import './CompletePanel.css'
import Form from 'react-bootstrap/Form';

function CompletePanel(props: any) {
    let text: string = props.prompt + props.completion
    return (
        <>
            <Form.Control as="textarea" rows={30} value={text} onChange={e => props.onPromptChange(e.target.value)} />
        </>
    )
}

export default CompletePanel