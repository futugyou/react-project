import './Playground.css'
import { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { useParams } from "react-router-dom"

import { Button, FormField, SpaceBetween, Grid, Box } from "@cloudscape-design/components"
import {
    AppLayout,
    BreadcrumbGroup,
    Container,
    ContentLayout,
    Flashbar,
    Header,
    HelpPanel,
    Link,
    SideNavigation,
    SplitPanel,
} from '@cloudscape-design/components'

import HeadContainer from "./HeadContainer"
import EditorContainer from './EditorContainer'
import ParameterPanel from './ParameterPanel'
import History from './History'

import convert from '../Models/convert'

import { OpenAIModel } from '../Models/OpenAIModel'
import { DefaultExampleModel, ExampleModel } from '../Models/ExampleModel'
import completionService from '../Services/Completion'

import { ChatModel } from '../Models/ChatModel'
import chatService from '../Services/Chat'

import { EditModel } from '../Models/EditModel'
import editService from '../Services/Edit'

import { PlaygroundModel } from '../Models/PlaygroundModel'
import playgroundService from '../Services/Playground'
import { ChatLog } from '../Models/PlaygroundModel'

import { BsClockHistory } from "react-icons/bs"

import set from '../Services/Example'


const Playground = () => {
    const { parameter } = useParams()
    const { data: nodeData, isLoading, isFetching, isError } = set.useQueryExample()


    let searchParams = new URLSearchParams(location.search || "")
    let modeParam = searchParams.get("mode") || ""
    let modelParam = searchParams.get("model") || ""

    const rawdata = convert.mapExampleModelToPlaygroundModel(DefaultExampleModel)

    const [playgroundModel, setPlaygroundModel] = useState(rawdata)
    const [mode, setMode] = useState('Complete')
    const [currentData, setCurrentData] = useState<PlaygroundModel>(rawdata)
    const [showHistory, setShowHistory] = useState(false)
    const [showTools, setShowTools] = useState(true)

    const disabled = currentData == null || currentData.createdAt == playgroundModel.createdAt ? false : true
    const opertionContainerClassName = disabled ? "opertion-container playground-disabled" : "opertion-container"

    useEffect(() => {
        let dataModel: ExampleModel = DefaultExampleModel
        if (!isLoading && nodeData && parameter) {
            dataModel = nodeData.find((d: ExampleModel) => d.key == parameter) ?? DefaultExampleModel
        }

        const data = convert.mapExampleModelToPlaygroundModel(dataModel)
        if (modelParam !== "") {
            data.model = modelParam
        }

        setPlaygroundModel(data)
        setCurrentData(data)
    }, [nodeData, isLoading, parameter, modelParam])

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
        setPlaygroundModel(data)
    }

    const handleCompletion = async () => {
        let data: OpenAIModel = convert.mapPlaygroundModelToOpenAIModel(playgroundModel, mode)

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
        let data: OpenAIModel = convert.mapPlaygroundModelToOpenAIModel(playgroundModel, mode)
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

        let data: ChatModel = convert.mapPlaygroundModelToChatModel(playgroundModel)
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

        const promptsuffix = (playgroundModel.prompt + playgroundModel.suffix).split("[insert]")
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
        <AppLayout
            disableContentPaddings={true}
            navigationOpen={showHistory}
            onNavigationChange={() => setShowHistory(!showHistory)}
            navigation={
                <History
                    key={currentData.createdAt}
                    onHistoryRecordClick={handlePlaygroundModelChange}
                    onHistoryShow={handleCurrentDataChange}
                    current={currentData}
                />
            }
            toolsOpen={showTools}
            onToolsChange={() => setShowTools(!showTools)}
            tools={
                <HelpPanel header={<h2>Model Operation</h2>}>
                    <Box className={opertionContainerClassName}>
                        <ParameterPanel
                            key={playgroundModel}
                            data={playgroundModel}
                            mode={mode}
                            onModeChange={handleModeChange}
                            onPlaygroundModelChange={handlePlaygroundModelChange}
                        />
                    </Box>
                </HelpPanel>
            }
            content={
                <Box className="text-container" data-style="height100">
                    <EditorContainer
                        mode={mode}
                        data={playgroundModel}
                        disabled={disabled}
                        onPlaygroundModelChange={handlePlaygroundModelChange}
                        onRestoreClick={handleRestoreClick}
                    />

                    <Box data-style="button-group">
                        {(mode === "Complete") && (
                            <>
                                <Button variant="primary" onClick={handleCompletion} disabled={disabled}>
                                    Submit
                                </Button>
                                <Button variant="primary" onClick={handleCompletionStream} disabled={disabled}>
                                    StreamSubmit
                                </Button>
                            </>
                        )}
                        {(mode === "Chat") && (
                            <Button variant="primary" onClick={handleChatStream} disabled={disabled}>
                                Submit
                            </Button>
                        )}
                        {(mode === "Insert") && (
                            <Button variant="primary" onClick={handleInsertStream} disabled={disabled}>
                                Submit
                            </Button>
                        )}
                        {(mode === "Edit") && (
                            <Button variant="primary" onClick={handleEdit} disabled={disabled}>
                                Submit
                            </Button>
                        )}
                    </Box>
                </Box>
            }
        />
    )
}

export default Playground
