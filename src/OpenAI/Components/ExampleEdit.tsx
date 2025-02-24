import './ExampleEdit.css'

import { useState, useEffect, lazy } from "react"
import { BsBinoculars } from "react-icons/bs"
import Form from 'react-bootstrap/Form'
import isEqual from 'lodash-es/isEqual'

const ModelSelect = lazy(() => import('./ModelSelect'))
const MaxTokens = lazy(() => import('./MaxTokens'))
const Temperature = lazy(() => import('./Temperature'))
const TopP = lazy(() => import('./TopP'))
const Frequency = lazy(() => import('./Frequency'))

const Presence = lazy(() => import('./Presence'))
const Stop = lazy(() => import('./Stop'))
import CheckBox, { CheckBoxItem } from "@/Common/Components/CheckBox"
import set from '../Services/Example'
import { ExampleModel } from '../Models/ExampleModel'

const ExampleEdit = (props: any) => {
    const [showSuccess, setSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const [exampleData, setExampleData] = useState<ExampleModel>(props.data)
    const handleTitleChanged = (value: string) => {
        setExampleData({
            ...exampleData,
            title: value,
        })
    }

    let tags: CheckBoxItem[] = [
        {
            key: "answers",
            value: "answers",
        },
        {
            key: "classification",
            value: "classification",
        },
        {
            key: "code",
            value: "code",
        },
        {
            key: "conversation",
            value: "conversation",
        },
        {
            key: "generation",
            value: "generation",
        },
        {
            key: "translation",
            value: "translation",
        },
        {
            key: "transformation",
            value: "transformation",
        },
    ]

    tags = tags.map(t => {
        if (props.data.tags
            && props.data.tags.findIndex((element: string) => {
                return element.toLowerCase() === t.key.toLowerCase()
            }) >= 0) {
            t.choose = true
        }

        return t
    })

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

    const onSaveChangeClick = async () => {
        if (isEqual(props.data, exampleData)) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000)
            return
        }

        console.log(exampleData)
        // backend not ready
        //await set.createExample(exampleData)
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
            if (props.onSaveClick) {
                props.onSaveClick()
            }
        }, 3000)
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

    const handleToppChange = (value: number) => {
        setExampleData({
            ...exampleData,
            top_p: +value
        })
    }

    const handleFrequencyPenaltyChange = (value: number) => {
        setExampleData({
            ...exampleData,
            frequency_penalty: +value
        })
    }

    const handlePresencePenaltyChange = (value: number) => {
        setExampleData({
            ...exampleData,
            presence_penalty: +value
        })
    }

    const handleStopChange = (value: string[]) => {
        setExampleData({
            ...exampleData,
            stop: value
        })
    }

    const handleCheckBoxChange = (items: CheckBoxItem[]) => {
        let checkedTags = items.map(i => i.key)
        setExampleData({
            ...exampleData,
            tags: checkedTags
        })
    }

    return (
        <>
            {showError && <div className="alert alert-danger check-message" role="alert">
                No change for exmaple data !
            </div>}
            {showSuccess && <div className="alert alert-success check-message" role="alert">
                Data is already saved  !
            </div>}
            <div className="edit-container">
                <div className="edit-header">
                    <div className="edit-header-icon">
                        <BsBinoculars></BsBinoculars>
                    </div>
                    <div className="edit-header-title-group">
                        <div className="edit-header-title">
                            <input className="form-control" type="text" value={exampleData.title} onChange={(e) => handleTitleChanged(e.target.value)}></input>
                        </div>
                        <div className="edit-header-tags">
                            <CheckBox items={tags} onCheckBoxChange={handleCheckBoxChange}></CheckBox>
                        </div>
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
                        <div className="edit-item">
                            <div className="edit-item-header">
                                Description
                            </div>
                            <div className="edit-item-content">
                                <Form.Control as="textarea" rows={3} value={props.data.description} onChange={e => handleDescChanged(e.target.value)} />
                            </div>
                        </div>
                        <div className="edit-item">
                            <div className="edit-item-header">
                                Prompt
                            </div>
                            <div className="edit-item-content">
                                <Form.Control as="textarea" rows={10} value={props.data.prompt} onChange={e => handlePromptChange(e.target.value)} />
                            </div>
                        </div>
                        <div className="edit-item" style={{ marginBottom: "0px" }}>
                            <div className="edit-item-header">
                                Sample response
                            </div>
                            <div className="edit-item-content">
                                <Form.Control as="textarea" rows={10} value={props.data.sample_response} onChange={e => handleResponseChange(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="edit-body-right">
                        <div className="edit-setting-header">Settings</div>
                        <div className="edit-setting-edits">
                            <div className="edit-setting-container">
                                <div className="edit-setting-text">
                                    <ModelSelect disablePopover={true} model={props.data.model} onModelChange={handleModelChange} ></ModelSelect>
                                </div>
                            </div>

                            <div className="edit-setting-container">
                                <div className="edit-setting-text">
                                    <MaxTokens max_tokens={props.data.max_tokens} onMaxTokensChange={handleMaxTokensChange} ></MaxTokens>
                                </div>
                            </div>

                            <div className="edit-setting-container">
                                <div className="edit-setting-text">
                                    <Temperature temperature={props.data.temperature} onTemperatureChange={handleTemperatureChange} ></Temperature>
                                </div>
                            </div>

                            <div className="edit-setting-container">
                                <div className="edit-setting-text">
                                    <TopP top_p={props.data.top_p} onToppChange={handleToppChange} ></TopP>
                                </div>
                            </div>

                            <div className="edit-setting-container">
                                <div className="edit-setting-text">
                                    <Frequency frequency_penalty={props.data.frequency_penalty} onFrequencyPenaltyChange={handleFrequencyPenaltyChange} ></Frequency>
                                </div>
                            </div>

                            <div className="edit-setting-container">
                                <div className="edit-setting-text">
                                    <Presence presence_penalty={props.data.frequency_penalty} onPresencePenaltyChange={handlePresencePenaltyChange} ></Presence>
                                </div>
                            </div>

                            <div className="edit-setting-container">
                                <div className="edit-setting-text">
                                    <Stop stop={props.data.stop} onStopChange={handleStopChange} ></Stop>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExampleEdit