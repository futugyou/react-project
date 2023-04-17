import './ChatPanel.css'

import { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { BsDashCircle } from "react-icons/bs";

function ChatPanel(props: any) {
    const chatpgmessageRef = useRef(null);
    const textRef = useRef(null);
    const HandleTextClick = () => {
        chatpgmessageRef.current!.className = "chat-pg-message active"
        textRef.current!.focus();
    }

    const HandleTextBlur = () => {
        chatpgmessageRef.current!.className = "chat-pg-message"
    }
    return (
        <div className="container-fluid chat-pg-body">
            <div className='chat-pg-instructions'>
                <div className="text-input-header-subheading subheading">System</div>
                <div className='text-input-header-wrapper'>
                    <Form.Control as="textarea" placeholder="You are a helpful assistant." value={props.prompt} onChange={e => props.onPromptChange(e.target.value)} />
                </div>
            </div>
            <div className='chat-pg-right-wrapper'>
                <div className='chat-pg-exchange' >
                    <div className='chat-pg-message' ref={chatpgmessageRef}>
                        <div className='chat-message-role'>
                            <div className='chat-message-subheading subheading'>
                                <span className='chat-message-role-text'>User</span>
                            </div>
                        </div>
                        <div className='text-input-with-focus' onClick={HandleTextClick}>
                            <textarea className="text-input" rows={1} placeholder="Enter a user message here."
                                ref={textRef}
                                onBlur={HandleTextBlur}></textarea>
                        </div>
                        <div className='chat-message-button-container'>
                            <BsDashCircle className='chat-message-remove-button' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPanel