import './ChatPanel.css'

import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { BsPlusCircle } from "react-icons/bs";
import ChatMessage from './ChatMessage';
import { ChatLog } from '../Models/PlaygroundModel';

function ChatPanel(props: any) {
    const initChatLog: ChatLog = {
        role: "user",
        content: "",
    }

    const [messages, setMessages] = useState<any[]>([initChatLog])

    const handleMessageRemoved = (index: number) => {
        const newMessageList = messages.filter((_, i) => i !== index)
        setMessages(newMessageList)

        if (props.onMessageChange) {
            props.onMessageChange(newMessageList)
        }
    }

    const handleRoleChange = (index: number) => {
        const newMessageList = messages.map((message, ind) => {
            if (ind === index) {
                const updatedmessage: any = {
                    ...message,
                    role: message.role === "user" ? "assistant" : "user",
                };

                return updatedmessage;
            }

            return message;
        });

        setMessages(newMessageList)

        if (props.onMessageChange) {
            props.onMessageChange(newMessageList)
        }
    }

    const handleMessageChange = (index: number, text: string) => {
        const newMessageList = messages.map((message, ind) => {
            if (ind === index) {
                const updatedmessage = {
                    ...message,
                    content: text,
                };

                return updatedmessage;
            }

            return message;
        });

        setMessages(newMessageList)

        if (props.onMessageChange) {
            props.onMessageChange(newMessageList)
        }
    }

    const handleMessageAdded = (e: any) => {
        let newChatLog = {
            role: "user",
            content: "",
            focus: true,
        }

        let count = messages.length;
        if (count > 0) {
            const lastChatLog = messages[count - 1];
            if (lastChatLog.role === "user") {
                newChatLog.role = "assistant"
            }
        }

        const newMessageList = messages.concat([newChatLog])
        setMessages(newMessageList)
    }

    return (
        <div className="container-fluid chat-pg-body">
            <div className='chat-pg-instructions'>
                <div className="text-input-header-subheading subheading">System</div>
                <div className='text-input-header-wrapper'>
                    <Form.Control as="textarea" placeholder="You are a helpful assistant." value={props.instruction} onChange={e => props.onInstructionChange(e.target.value)} />
                </div>
            </div>
            <div className='chat-pg-right-wrapper'>
                <div className="chat-pg-exchange-container">
                    <div className='chat-pg-exchange' >
                        {messages.map((message, index) => {
                            return (
                                <ChatMessage
                                    key={index}
                                    index={index}
                                    role={message.role}
                                    content={message.content}
                                    focus={message.focus}
                                    placeholder={"Enter an " + message.role + " message here."}
                                    onRemoved={handleMessageRemoved}
                                    onRoleChange={handleRoleChange}
                                    onContentChange={handleMessageChange}
                                >
                                </ChatMessage>
                            )
                        })}

                        <div className='chat-pg-message add-message' onClick={handleMessageAdded}>
                            <BsPlusCircle />
                            <span className="text">Add message</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPanel