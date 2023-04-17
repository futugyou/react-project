import './ChatPanel.css'

import Form from 'react-bootstrap/Form';
import { BsDashCircle } from "react-icons/bs";

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
                <div className='chat-pg-exchange'>
                    <div className='chat-pg-message'>
                        <div className='chat-message-role'>
                            <div className='chat-message-subheading subheading'>
                                <span className='chat-message-role-text'>User</span>
                            </div>
                        </div>
                        <div className='text-input-with-focus'>
                            <Form.Control as="textarea" rows={1} />
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