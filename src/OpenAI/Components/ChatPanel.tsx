import './ChatPanel.css'

import Form from 'react-bootstrap/Form';
import { BsPlusCircle } from "react-icons/bs";
import ChatMessage from './ChatMessage';

function ChatPanel(props: any) {
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
                    <ChatMessage></ChatMessage>
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