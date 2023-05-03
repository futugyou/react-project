import './InsertPanel.css'

import { useState, useEffect } from "react";

import Form from 'react-bootstrap/Form';

function InsertPanel(props: any) {
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const text = props.prompt + (props.suffix ?? "")
    const [completion, setCompletion] = useState("");

    useEffect(() => {
        if (props.completion && props.completion.length > 0) {
            setCompletion(props.prompt + props.completion + (props.suffix ?? ""))
        }
    }, [props.completion])

    useEffect(() => {
        if (text.length > 0) {
            setShowPlaceholder(false)
        } else {
            setShowPlaceholder(true)
        }
    }, [props.prompt, props.suffix])

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
        <>
            <div className="insert-container-left">
                <Form.Control as="textarea" rows={1} onChange={HandleTextChange} value={text} disabled={props.disabled}/>
                {showPlaceholder && (<div className="insert-placeholder">
                    <div className="insert-placeholder-lg">We're writing to [insert]. Congrats from OpenAI!</div>
                    <div className="insert-placeholder-md">Use [insert] to indicate where the model should insert text.</div>
                </div>)}
            </div>
            <div className="insert-container-right">
                <div className="insert-container-right-completion">
                    {completion}
                </div>
                {props.disabled && props.children}
            </div>
        </>
    )
}

export default InsertPanel;