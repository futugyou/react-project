import './ChatMessage.css'

import React, { useRef, useEffect } from 'react';
import { BsDashCircle } from "react-icons/bs";

interface IChatMessageProps {
    index: number;
    role?: string;
    content?: string;
    placeholder?: string;
    onRoleChange?: (index: number) => void;
    onContentChange?: (index: number, content: string) => void;
    onRemoved?: (index: number) => void;
    focus?: boolean;
    children?: React.ReactNode;
}

function ChatMessage(message: IChatMessageProps) {
    const chatpgmessageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textRef.current!.style.height = "48px";
        let height = textRef.current!.scrollHeight
        textRef.current!.style.height = (height) + "px";
    }, [])

    const HandleTextDivClick = () => {
        chatpgmessageRef.current!.className = "chat-pg-message active"
        textRef.current!.focus();
    }

    const HandleTextChange = (e: { target: { value: string; }; }) => {
        textRef.current!.style.height = "48px";
        let height = textRef.current!.scrollHeight
        textRef.current!.style.height = (height) + "px";

        let text: string = e.target.value;
        if (message.onContentChange) {
            message.onContentChange(message.index, text)
        }
    }

    const HandleTextBlur = () => {
        chatpgmessageRef.current!.className = "chat-pg-message"
    }

    const HandleRoleChange = (e: any) => {
        if (message.onRoleChange) {
            message.onRoleChange(message.index)
        }
    }

    const HandleReomved = (e: any) => {
        if (message.onRemoved) {
            message.onRemoved(message.index)
        }
    }

    return (
        <div className='chat-pg-message' ref={chatpgmessageRef}>
            <div className='chat-message-role'>
                <div className='chat-message-subheading subheading'>
                    <span className='chat-message-role-text' onClick={HandleRoleChange}>{message.role}</span>
                </div>
            </div>
            <div className='text-input-with-focus' onClick={HandleTextDivClick}>
                <textarea className="text-input" rows={1} autoFocus={message.focus}
                    placeholder={message.placeholder}
                    value={message.content}
                    ref={textRef}
                    onChange={HandleTextChange}
                    onBlur={HandleTextBlur}></textarea>
            </div>
            <div className='chat-message-button-container'>
                <BsDashCircle className='chat-message-remove-button' onClick={HandleReomved} />
            </div>
        </div>
    )
}

export default ChatMessage;