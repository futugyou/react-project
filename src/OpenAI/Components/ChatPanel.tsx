import './ChatPanel.css'

import { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { BsDashCircle, BsPlusCircle } from "react-icons/bs";

function ChatPanel(props: any) {
    const chatpgmessageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);

    const HandleTextDivClick = () => {
        chatpgmessageRef.current!.className = "chat-pg-message active"
        textRef.current!.focus();
    }

    const HandleTextChange = (e: { target: { value: string; }; }) => {
        textRef.current!.style.height = "48px";
        let height = textRef.current!.scrollHeight
        textRef.current!.style.height = (height) + "px";

        let text: string = e.target.value;
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
                        <div className='text-input-with-focus' onClick={HandleTextDivClick}>
                            <textarea className="text-input" rows={1} placeholder="Enter a user message here."
                                ref={textRef}
                                onChange={HandleTextChange}
                                onBlur={HandleTextBlur}></textarea>
                        </div>
                        <div className='chat-message-button-container'>
                            <BsDashCircle className='chat-message-remove-button' />
                        </div>
                    </div>
                    <div className='chat-pg-message add-message'>
                        <BsPlusCircle />
                        <span className="text">Add message</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPanel