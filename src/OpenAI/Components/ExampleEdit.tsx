import './ExampleDetail.css'

import { useState, useEffect } from "react"
import { BsBinoculars } from "react-icons/bs"
import Form from 'react-bootstrap/Form'
import isEqual from 'lodash-es/isEqual'

const ExampleEdit = (props: any) => {
    const [exampleData, setExampleData] = useState(props.data)
    const handleTitleChanged = (value: string) => {
        setExampleData({
            ...exampleData,
            title: value,
        })
    }

    const handleDescChanged = (value: string) => {
        setExampleData({
            ...exampleData,
            description: value,
        })
    }

    const handlePromptChange = (value: string) => {
        setExampleData({
            ...exampleData,
            prompt: value,
        })
    }

    const handleResponseChange = (value: string) => {
        setExampleData({
            ...exampleData,
            sample_response: value,
        })
    }

    const onCancelClick = () => {
        if (props.onCancelClick) {
            if (isEqual(props.data, exampleData)) {
                props.onCancelClick()
            } else {
                const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
                if (answer) {
                    props.onCancelClick()
                }
            }
        }
    }

    const onSaveChangeClick = () => {
        if (isEqual(props.data, exampleData)) {
            return
        }
    }

    return (
        <div className="detail-container">
            <div className="detail-header">
                <div className="detail-header-icon">
                    <BsBinoculars></BsBinoculars>
                </div>
                <div className="detail-header-title-group">
                    <div className="detail-header-title">
                        <input className="form-control" type="text" value={exampleData.title} onChange={(e) => handleTitleChanged(e.target.value)}></input>
                    </div>
                    <div className="detail-header-tags">....</div>
                </div>
                <div className="detail-header-link" >
                    <a href="#" onClick={() => onCancelClick()} >
                        <span>
                            Cancel
                        </span>
                    </a>
                </div>
                <div className="detail-header-link">
                    <a href="#" onClick={() => onSaveChangeClick()}>
                        <span>
                            SaveChange
                        </span>
                    </a>
                </div>
            </div>
            <div className="detail-body">
                <div className="detail-body-left">
                    <div className="detail-description">
                        <Form.Control as="textarea" rows={3} value={exampleData.description} onChange={e => handleDescChanged(e.target.value)} />
                    </div>
                    <div className="detail-prompt">
                        <div className="detail-prompt-header">
                            Prompt
                        </div>
                        <div className="detail-prompt-content">
                            <Form.Control as="textarea" rows={10} value={exampleData.prompt} onChange={e => handlePromptChange(e.target.value)} />
                        </div>
                    </div>
                    <div className="detail-response">
                        <div className="detail-response-header">
                            Sample response
                        </div>
                        <div className="detail-response-content">
                            <Form.Control as="textarea" rows={10} value={exampleData.sample_response} onChange={e => handleResponseChange(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="detail-body-right">
                    <div className="detail-setting-header">Settings</div>
                    <div className="detail-setting-details">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExampleEdit