import './Playground.css'
import { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { useLoaderData } from "react-router-dom"

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import EditorContainer from './EditorContainer'
import ParameterPanel from './ParameterPanel'
import History from './History'

import { OpenAIModel } from '../Models/OpenAIModel'
import { ExampleModel } from '../Models/ExampleModel'
import set from '../Services/Example'
import completionService from '../Services/Completion'

import { ChatModel, ChatMessage } from '../Models/ChatModel'
import chatService from '../Services/Chat'

import { EditModel } from '../Models/EditModel'
import editService from '../Services/Edit'

import { PlaygroundModel, DefaultPlayground } from '../Models/PlaygroundModel'
import playgroundService from '../Services/Playground'
import { ChatLog } from '../Models/PlaygroundModel'

export async function playgroundLoader({ params, request }: any) {
    return await set.getExample(params.parameter ?? "")
}

const mapExampleModelToPlaygroundModel = (data: ExampleModel): PlaygroundModel => {
    let result: PlaygroundModel = {
        ...DefaultPlayground,
        model: data.model,
        prompt: data.prompt,
        responseLength: data.max_tokens,
        top_p: data.top_p,
        temperature: data.temperature,
        frequency_penalty: data.frequency_penalty,
        presence_penalty: data.presence_penalty,
        stopSequence: data.stop,
    }

    return result
}


const mapPlaygroundModelToOpenAIModel = (data: PlaygroundModel, modeParam: string): OpenAIModel => {
    let result: OpenAIModel = {
        model: data.model,
        prompt: data.prompt,
        max_tokens: data.responseLength,
        temperature: data.temperature,
        top_p: data.top_p,
        frequency_penalty: data.frequency_penalty,
        presence_penalty: data.presence_penalty,
        best_of: data.best_of,
        echo: false,
        logprobs: 0,
        stop: data.stopSequence,
        suffix: data.suffix,
    }

    if ((modeParam == "Complete") && data.startSequenceEnabled && data.startSequence.length > 0) {
        result.prompt = data.prompt + data.startSequence
    }

    return result
}

const mapPlaygroundModelToChatModel = (data: PlaygroundModel): ChatModel => {
    let messages: ChatMessage[] = data.chatLog.map(i => { return { role: i.role, content: i.content } })
    if (data.instruction.length > 0) {
        let message: ChatMessage = {
            role: "system",
            content: data.instruction,
        }

        messages.push(message)
    }

    let result: ChatModel = {
        model: data.model,
        temperature: data.temperature,
        top_p: data.top_p,
        max_tokens: data.responseLength,
        frequency_penalty: data.frequency_penalty,
        presence_penalty: data.presence_penalty,
        messages: messages,
    }

    return result
}

function Playground() {
    let searchParams = new URLSearchParams(location.search || "")
    let modeParam = searchParams.get("mode") || ""
    let modelParam = searchParams.get("model") || ""

    const loaderdata = useLoaderData() as ExampleModel
    const data = mapExampleModelToPlaygroundModel(loaderdata)

    if (modelParam !== "") {
        data.model = modelParam
    }

    const [playgroundModel, setPlaygroundModel] = useState(data)
    const [mode, setMode] = useState('Complete')
    const [currentData, setCurrentData] = useState<PlaygroundModel>(data)

    const disabled = currentData == null || currentData.createdAt == playgroundModel.createdAt ? false : true;
    const opertionContainerClassName = disabled ? "qa-item-align opertion-container playground-disabled" : "qa-item-align opertion-container"

    useEffect(() => {
        setPlaygroundModel(data)
    }, [loaderdata])

    useEffect(() => {
        if (modeParam !== "") {
            modeParam = modeParam.charAt(0).toUpperCase() + modeParam.slice(1)
            setMode(modeParam)
        }
    }, [modeParam])

    let completion: string = playgroundModel.completion

    const handleModeChange = (value: string) => {
        setMode(value)
    }

    const handlePlaygroundModelChange = (data: PlaygroundModel) => {
        setPlaygroundModel({
            ...data,
        })
    }

    const handleCompletion = async () => {
        let data: OpenAIModel = mapPlaygroundModelToOpenAIModel(playgroundModel, mode)

        const response = await completionService.createCompletion(data)
        if (response.error != '') {
            setPlaygroundModel({
                ...playgroundModel,
                prompt: data.prompt + response.error
            })
        } else {
            let playgroundForStore: PlaygroundModel = {
                ...playgroundModel
            }

            playgroundForStore.completion = response.texts.join('')
            storeHistory(playgroundForStore)

            let text = data.prompt + response.texts.join('')

            if (playgroundModel.restartSequenceEnabled && playgroundModel.restartSequence.length > 0) {
                text += playgroundModel.restartSequence
            }

            setPlaygroundModel({
                ...playgroundModel,
                prompt: text,
                completion: "",
            })
        }
    }

    const storeHistory = (playgroundForStore: PlaygroundModel) => {
        playgroundService.storePlayground(playgroundForStore)
    }

    const handleCompletionStream = async () => {
        let data: OpenAIModel = mapPlaygroundModelToOpenAIModel(playgroundModel, mode)
        await completionService.createCompletionStream(data, handleStreamProcess, () => handleStreamEnd(data.prompt))
    }

    const handleStreamProcess = (data: string) => {
        if (data == "") {
            return
        }

        completion += data
        flushSync(() => {
            setPlaygroundModel({
                ...playgroundModel,
                completion: completion,
            })
        })
    }

    const handleStreamEnd = (composePrompt: string) => {
        let playgroundForStore: PlaygroundModel = {
            ...playgroundModel,
            completion: completion,
        }

        storeHistory(playgroundForStore)

        let text = composePrompt + completion
        if (playgroundModel.restartSequenceEnabled && playgroundModel.restartSequence.length > 0) {
            text += playgroundModel.restartSequence
        }

        setPlaygroundModel({
            ...playgroundModel,
            prompt: text,
            completion: "",
        })

        completion = ""
    }

    const handleChatStream = async () => {
        if (playgroundModel.chatLog.length == 0 || playgroundModel.chatLog[0].content == "") {
            return
        }

        let data: ChatModel = mapPlaygroundModelToChatModel(playgroundModel)
        await chatService.createChatStream(data, handleChatStreamProcess, handleChatStreamEnd)
    }

    const handleChatStreamProcess = (data: string) => {
        if (data == "") {
            return
        }

        completion += data
        flushSync(() => {
            let messages = playgroundModel.chatLog
            let lastmessage = messages[messages.length - 1]
            let chatLog: ChatLog = {
                role: "assistant",
                content: completion,
            }

            if (lastmessage.role == "user") {
                messages.push(chatLog)
            } else {
                messages[messages.length - 1] = chatLog
            }

            setPlaygroundModel({
                ...playgroundModel,
                chatLog: messages,
            })
        })
    }

    const handleChatStreamEnd = () => {
        storeHistory(playgroundModel)
        completion = ""
    }

    const handleInsertStream = async () => {
        if (playgroundModel.prompt.indexOf("[insert]") == -1) {
            return
        }

        const promptsuffix = (playgroundModel.prompt + playgroundModel.suffix ?? "").split("[insert]")
        let suffix = ""
        if (promptsuffix.length > 1) {
            suffix = promptsuffix[1]
        }

        let data: OpenAIModel = {
            model: playgroundModel.model,
            prompt: promptsuffix[0],
            max_tokens: playgroundModel.responseLength,
            temperature: playgroundModel.temperature,
            top_p: playgroundModel.top_p,
            frequency_penalty: playgroundModel.frequency_penalty,
            presence_penalty: playgroundModel.presence_penalty,
            best_of: playgroundModel.best_of,
            echo: false,
            logprobs: 0,
            stop: playgroundModel.stopSequence,
            suffix: suffix,
        }

        await completionService.createCompletionStream(data, (d: string) => handleInsertStreamProcess(d, data), () => handleInsertStreamEnd(data))
    }

    const handleInsertStreamProcess = (data: string, m: OpenAIModel) => {
        if (data == "") {
            return
        }

        completion += data
        flushSync(() => {
            setPlaygroundModel({
                ...playgroundModel,
                prompt: m.prompt,
                completion: completion,
                suffix: m.suffix ?? "",
            })
        })
    }

    const handleInsertStreamEnd = (data: OpenAIModel) => {
        let playgroundForStore: PlaygroundModel = {
            ...playgroundModel,
            prompt: data.prompt,
            suffix: data.suffix ?? "",
            completion: completion,
        }

        storeHistory(playgroundForStore)

        setPlaygroundModel({
            ...playgroundForStore,
            prompt: data.prompt + "[insert]",
        })

        completion = ""
    }

    const handleEdit = async () => {
        let data: EditModel = {
            model: playgroundModel.model,
            input: playgroundModel.prompt,
            instruction: playgroundModel.instruction,
            temperature: playgroundModel.temperature,
            n: 0,
            top_p: playgroundModel.top_p,
        }

        const response = await editService.createEdit(data)
        if (response.error != '') {
            setPlaygroundModel({
                ...playgroundModel,
                prompt: data.input + response.error
            })
        } else {
            completion = response.texts.join('')
            let playgroundForStore: PlaygroundModel = {
                ...playgroundModel,
                completion: completion
            }

            storeHistory(playgroundForStore)

            setPlaygroundModel({
                ...playgroundModel,
                completion: completion,
            })
        }
    }

    const handleCurrentDataChange = () => {
        if (!disabled) {
            setCurrentData(playgroundModel)
        }
    }

    const handleRestoreClick = (data: PlaygroundModel) => {
        const newData: PlaygroundModel = {
            ...data,
            createdAt: Date.now(),
            completion: "",
        }

        setPlaygroundModel(newData)
        setCurrentData(newData)
    }

    return (
        <>
            <div className="playground-header"><span>some</span></div>
            <Col xs={10} className='text-container'>
                <div className='container-fluid pg-input-body'>
                    <EditorContainer
                        mode={mode}
                        data={playgroundModel}
                        disabled={disabled}
                        onPlaygroundModelChange={handlePlaygroundModelChange}
                        onRestoreClick={handleRestoreClick}>
                    </EditorContainer>
                </div>
                <Form.Group as={Row} className="mb-3 qa-item-align">
                    {(mode == "Complete") && (
                        <>
                            <Button variant="success" type="submit" onClick={() => handleCompletion()} disabled={disabled}>
                                Submit
                            </Button>
                            <Button variant="success" onClick={() => handleCompletionStream()} disabled={disabled}>
                                StreamSubmit
                            </Button>
                        </>
                    )}
                    {(mode == "Chat") && (
                        <Button variant="success" type="submit" onClick={() => handleChatStream()} disabled={disabled}>
                            Submit
                        </Button>
                    )}
                    {(mode == "Insert") && (
                        <Button variant="success" type="submit" onClick={() => handleInsertStream()} disabled={disabled}>
                            Submit
                        </Button>
                    )}

                    {(mode == "Edit") && (
                        <Button variant="success" type="submit" onClick={() => handleEdit()} disabled={disabled}>
                            Submit
                        </Button>
                    )}
                    <History
                        key={currentData.createdAt}
                        onHistoryRecordClick={handlePlaygroundModelChange}
                        onHistoryShow={handleCurrentDataChange}
                        current={currentData} >
                    </History>
                </Form.Group>
            </Col>
            <Col xs={2} className={opertionContainerClassName} >
                <ParameterPanel
                    data={playgroundModel}
                    mode={mode}
                    onModeChange={handleModeChange}
                    onPlaygroundModelChange={handlePlaygroundModelChange}>
                </ParameterPanel>
            </Col>
        </>
    )
}

export default Playground
