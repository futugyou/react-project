import './ExampleEdit.css'

import { useState, useEffect, lazy } from "react"
import { BsBinoculars } from "react-icons/bs"
import Form from 'react-bootstrap/Form'
import isEqual from 'lodash-es/isEqual'

const ModelSelect = lazy(() => import('./ModelSelect'))
const MaxTokens = lazy(() => import('./MaxTokens'))
const Temperature = lazy(() => import('./Temperature'))

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

        console.log(exampleData)
    }

    const handleModelChange = (value: string) => {
        setExampleData({
            ...exampleData,
            model: value,
        })
    }

    const handleMaxTokensChange = (value: number) => {
        setExampleData({
            ...exampleData,
            max_tokens: +value
        })
    }

    const handleTemperatureChange = (value: number) => {
        setExampleData({
            ...exampleData,
            temperature: +value
        })
    }

    return (
        <div className="edit-container">
            <div className="edit-header">
                <div className="edit-header-icon">
                    <BsBinoculars></BsBinoculars>
                </div>
                <div className="edit-header-title-group">
                    <div className="edit-header-title">
                        <input className="form-control" type="text" value={exampleData.title} onChange={(e) => handleTitleChanged(e.target.value)}></input>
                    </div>
                    <div className="edit-header-tags">....</div>
                </div>
                <div className="edit-header-link" >
                    <a href="#" onClick={() => onCancelClick()} >
                        <span>
                            Cancel
                        </span>
                    </a>
                </div>
                <div className="edit-header-link">
                    <a href="#" onClick={() => onSaveChangeClick()}>
                        <span>
                            SaveChange
                        </span>
                    </a>
                </div>
            </div>
            <div className="edit-body">
                <div className="edit-body-left">
                    <div className="edit-description">
                        <Form.Control as="textarea" rows={3} value={props.data.description} onChange={e => handleDescChanged(e.target.value)} />
                    </div>
                    <div className="edit-prompt">
                        <div className="edit-prompt-header">
                            Prompt
                        </div>
                        <div className="edit-prompt-content">
                            <Form.Control as="textarea" rows={10} value={props.data.prompt} onChange={e => handlePromptChange(e.target.value)} />
                        </div>
                    </div>
                    <div className="edit-response">
                        <div className="edit-response-header">
                            Sample response
                        </div>
                        <div className="edit-response-content">
                            <Form.Control as="textarea" rows={10} value={props.data.sample_response} onChange={e => handleResponseChange(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="edit-body-right">
                    <div className="edit-setting-header">Settings</div>
                    <div className="edit-setting-edits">
                        <div className="edit-setting-container">
                            <div className="edit-setting-label">Engine</div>
                            <div className="edit-setting-text">
                                <ModelSelect disableHeader={true} disablePopover={true} model={props.data.model} onModelChange={handleModelChange} ></ModelSelect>
                            </div>
                        </div>

                        <div className="edit-setting-container">
                            <div className="edit-setting-label">Max tokens</div>
                            <div className="edit-setting-text">
                                <MaxTokens max_tokens={props.data.max_tokens} onMaxTokensChange={(max_tokens: number) => handleMaxTokensChange(max_tokens)} ></MaxTokens>
                            </div>
                        </div>

                        <div className="edit-setting-container">
                            <div className="edit-setting-label">Temperature</div>
                            <div className="edit-setting-text">
                                <Temperature temperature={props.data.temperature} onTemperatureChange={(temperature: number) => handleTemperatureChange(temperature)} ></Temperature>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExampleEdit