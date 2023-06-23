import './ChatPanel.css'

import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import Form from 'react-bootstrap/Form';
import { BsPlusCircle } from "react-icons/bs";
import ChatMessage from './ChatMessage';
import { ChatLog } from '../Models/PlaygroundModel';

const ChatPanel = (props: any) => {
    const [messages, setMessages] = useState<any[]>(props.chatLog)
    const adddivRef = useRef<HTMLDivElement>(null);
    const chatExchangeClassName = props.disabled ? "chat-pg-exchange playground-disabled" : "chat-pg-exchange"

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
                const updatedmessage: any = {
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
        flushSync(() => {
            setMessages(newMessageList)
        })

        adddivRef.current!.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <div className='chat-pg-instructions'>
                <div className="text-input-header-subheading subheading">System</div>
                <div className='text-input-header-wrapper'>
                    <Form.Control as="textarea" placeholder="You are a helpful assistant." value={props.instruction} onChange={e => props.onInstructionChange(e.target.value)} disabled={props.disabled} />
                </div>
            </div>
            <div className="chat-pg-right-wrapper">
                <div className="chat-pg-panel-wrapper">
                    <div className="chat-pg-exchange-container">
                        <div className={chatExchangeClassName} >
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

                            <div className='chat-pg-message add-message' ref={adddivRef} onClick={handleMessageAdded}>
                                <BsPlusCircle />
                                <span className="text">Add message</span>
                            </div>
                        </div>
                    </div>
                </div>
                {props.disabled && props.children}
            </div>
        </>
    )
}

export default ChatPanel