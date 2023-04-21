import './EditPanel.css';
import Form from 'react-bootstrap/Form';

function EditPanel(props: any) {
    return (
        <div className="container-fluid chat-pg-body chat-flex-direction">
            <div className="chat-text-tip">
                <span>Input</span>
            </div>
            <div className="chat-input-container">
                <div className="chat-input-container-left">
                    <div className="chat-input-container-input">
                        <Form.Control as="textarea" rows={1} placeholder="We is going to the market." />
                    </div>
                    <div className="chat-text-tip">
                        <span>Instructions</span>
                    </div>
                    <div>
                        <Form.Control as="textarea" rows={2} placeholder="Fix the grammar." />
                    </div>
                </div>
                <div className="chat-input-container-right">
                </div>
            </div>


        </div>
    )
}

export default EditPanel