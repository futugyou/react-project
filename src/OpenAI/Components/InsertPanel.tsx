import './InsertPanel.css'

import { useState } from "react";

import Form from 'react-bootstrap/Form';

function InsertPanel(props: any) {
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [text, setText] = useState(props.text ?? '')

    const HandleTextChange = (e: any) => {
        const t: string = e.target.value;
        if (t.length > 0) {
            setShowPlaceholder(false)
        } else {
            setShowPlaceholder(true)
        }

        if (props.onPromptChange) {
            props.onPromptChange(t)
        }
    }

    return (
        <div className="container-fluid insert-pg-body">
            <div className="insert-container-left">
                <Form.Control as="textarea" rows={1} onChange={HandleTextChange} />
                {showPlaceholder && (<div className="insert-placeholder">
                    <div className="insert-placeholder-lg">We're writing to [insert]. Congrats from OpenAI!</div>
                    <div className="insert-placeholder-md">Use [insert] to indicate where the model should insert text.</div>
                </div>)}
            </div>
            <div className="insert-container-right">
            </div>
        </div>
    )
}

export default InsertPanel;