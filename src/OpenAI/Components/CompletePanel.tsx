import './CompletePanel.css'
import Form from 'react-bootstrap/Form';

function CompletePanel(props: any) {
    let text: string = props.prompt + props.completion
    return (
        <>
            <div className="complete-panel">
                <div className="prompt-input-layer">
                    <Form.Control as="textarea" rows={1} value={text} onChange={e => props.onPromptChange(e.target.value)} disabled={props.disabled} />
                </div>
                {props.disabled && props.children}
            </div>
        </>
    )
}

export default CompletePanel