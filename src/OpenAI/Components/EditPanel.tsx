import './EditPanel.css';
import Form from 'react-bootstrap/Form';
import { Fragment } from 'react';

function EditPanel(props: any) {
    return (
        <div className="edit-pg-container">
            <div className="edit-text-tip">
                <span>Input</span>
            </div>
            <div className="edit-input-container">
                <div className="edit-input-container-left">
                    <div className="edit-input-container-input">
                        <Form.Control as="textarea" rows={1} placeholder="We is going to the market." />
                    </div>
                    <div className="edit-text-tip">
                        <span>Instructions</span>
                    </div>
                    <div>
                        <Form.Control as="textarea" rows={2} placeholder="Fix the grammar." />
                    </div>
                </div>
                <div className="edit-input-container-right">
                </div>
            </div>
        </div>
    )
}

export default EditPanel