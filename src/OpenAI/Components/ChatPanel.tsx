import './ChatPanel.css'

import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { BsPlusCircle } from "react-icons/bs";
import ChatMessage from './ChatMessage';
import { ChatLog } from '../Models/PlaygroundModel';

function ChatPanel(props: any) {
    const demo: ChatLog = {
        role: "User",
        content: "",
    }
    const [messages, setMessages] = useState<ChatLog[]>([demo])

    const handleMessageRemoved = (index: number) => {
        setMessages(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        })
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
                    {messages.map((message, index) => {
                        return (
                            <ChatMessage
                                key={index}
                                index={index}
                                role={message.role.toUpperCase()}
                                content={message.content}
                                placeholder={"Enter an " + message.role.toLowerCase() + " message here."}
                                onRemoved={handleMessageRemoved}>
                            </ChatMessage>
                        )
                    })}

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