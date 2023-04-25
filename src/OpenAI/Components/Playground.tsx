import './Playground.css';
import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import CompletePanel from './CompletePanel';
import ModelSelect from './ModelSelect';
import Temperature from './Temperature';
import MaxTokens from './MaxTokens';
import TopP from './TopP';

import Frequency from './Frequency';
import Presence from './Presence';
import Bestof from './Bestof';
import Stop from './Stop';
import ModeSelect from './ModeSelect';

import InjectText from './InjectText';
import History from './History';
import ChatPanel from './ChatPanel';
import EditPanel from './EditPanel';
import InsertPanel from './InsertPanel';

import { OpenAIModel } from '../Models/OpenAIModel';
import { ExampleModel } from '../Models/ExampleModel';
import set from '../Services/Example';
import completionService from '../Services/Completion';

import { ChatModel, ChatMessage } from '../Models/ChatModel';
import chatService from '../Services/Chat';

import { EditModel } from '../Models/EditModel';
import editService from '../Services/Edit';

import { PlaygroundModel, DefaultPlayground } from '../Models/PlaygroundModel';
import playgroundService from '../Services/Playground';
import { ChatLog } from '../Models/PlaygroundModel';

export async function qaloader({ params, request }: any) {
    console.log(params, request)
    return await set.getExample("default-grammar");
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
    const navigate = useNavigate();
    const location = useLocation();

    let search = location.search || "";
    let searchParams = new URLSearchParams(search)
    let modeParam = ""
    if (searchParams.has("mode")) {
        modeParam = searchParams.get("mode") || ""
    }

    let modelParam = ""
    if (searchParams.has("model")) {
        modelParam = searchParams.get("model") || ""
    }

    const loaderdata = useLoaderData() as ExampleModel
    const data = mapExampleModelToPlaygroundModel(loaderdata)

    if (modelParam !== "") {
        data.model = modelParam
    }

    const [playgroundModel, setPlaygroundModel] = useState(data)
    const [mode, setMode] = useState('Complete')

    useEffect(() => {
        setPlaygroundModel(data)
    }, [loaderdata]);

    useEffect(() => {
        if (modeParam !== "") {
            modeParam = modeParam.charAt(0).toUpperCase() + modeParam.slice(1);
            setMode(modeParam)
        }
    }, [modeParam]);

    let completion: string = playgroundModel.completion

    const handlePromptChange = (value: string) => {
        var newData = Object.assign({}, playgroundModel, { prompt: value });
        setPlaygroundModel(newData);
    }

    const handleModelChange = (value: string) => {
        var newData = Object.assign({}, playgroundModel, { model: value });
        setPlaygroundModel(newData);

        let path = location.pathname || "/";
        let search = location.search || "";
        let p = new URLSearchParams(search)

        if (p.has("mode")) {
            path += ("?mode=" + p.get("mode"))
        }

        if (path.indexOf("?") > 0) {
            path += ("&model=" + value)
        } else {
            path += ("?model=" + value)
        }

        navigate(path, { replace: true })
    }

    const handleTemperatureChange = (value: number) => {
        setPlaygroundModel({
            ...playgroundModel,
            temperature: +value
        })
    }

    const handleMaxTokensChange = (value: number) => {
        setPlaygroundModel({
            ...playgroundModel,
            responseLength: +value
        })
    }

    const handleToppChange = (value: number) => {
        setPlaygroundModel({
            ...playgroundModel,
            top_p: +value
        })
    }

    const handleFrequencyPenaltyChange = (value: number) => {
        setPlaygroundModel({
            ...playgroundModel,
            frequency_penalty: +value
        })
    }

    const handlePresencePenaltyChange = (value: number) => {
        setPlaygroundModel({
            ...playgroundModel,
            presence_penalty: +value
        })
    }

    const handleBestofChange = (value: number) => {
        setPlaygroundModel({
            ...playgroundModel,
            best_of: +value
        })
    }

    const handleStopChange = (value: string[]) => {
        setPlaygroundModel({
            ...playgroundModel,
            stopSequence: value
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

    const HandleInjectStartChanged = (injectText: string) => {
        setPlaygroundModel(
            {
                ...playgroundModel,
                startSequence: injectText,
            }
        )
    }

    const HandleCheckStartChanged = (checked: boolean) => {
        setPlaygroundModel(
            {
                ...playgroundModel,
                startSequenceEnabled: checked,
            }
        )
    }

    const HandleInjectRestartChanged = (injectText: string) => {
        setPlaygroundModel(
            {
                ...playgroundModel,
                restartSequence: injectText,
            }
        )
    }

    const HandleCheckRestartChanged = (checked: boolean) => {
        setPlaygroundModel(
            {
                ...playgroundModel,
                restartSequenceEnabled: checked,
            }
        )
    }

    const HandleMessageChange = (messages: ChatLog[]) => {
        let m: ChatLog[] = messages
            .filter((m) => m.content != '')
            .map((m) => { return { role: m.role, content: m.content } })

        if (m.length > 0) {
            setPlaygroundModel(
                {
                    ...playgroundModel,
                    chatLog: m,
                }
            )
        }
    }

    const HandleInstructionChange = (instruction: string) => {
        setPlaygroundModel(
            {
                ...playgroundModel,
                instruction: instruction,
            }
        )
    }

    const HandleModeChange = (value: any) => {
        setMode(value);

        let path = location.pathname || "/";
        path += ("?mode=" + value.toLocaleLowerCase())

        let search = location.search || "";
        let p = new URLSearchParams(search)

        if (p.has("model")) {
            if (path.indexOf("?") > 0) {
                path += ("&model=" + p.get("model"))
            } else {
                path += ("?model=" + p.get("model"))
            }
        }

        navigate(path, { replace: true })
    }

    const handleInsertPromptChange = (prompt: string) => {
        setPlaygroundModel(
            {
                ...playgroundModel,
                prompt: prompt,
                suffix: "",
            }
        )
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

    const HandleEditInputChange = (text: string) => {
        setPlaygroundModel({
            ...playgroundModel,
            prompt: text,
        })
    }

    const HandleEditInstructionsChange = (text: string) => {
        setPlaygroundModel({
            ...playgroundModel,
            instruction: text,
        })
    }

    return (
        <>
            <Col xs={10} className='text-container'>
                <div className='container-fluid pg-input-body'>
                    {(mode == "Complete") && (
                        <CompletePanel prompt={playgroundModel.prompt} completion={playgroundModel.completion} onPromptChange={(prompt: string) => handlePromptChange(prompt)} ></CompletePanel>
                    )}
                    {(mode == "Chat") && (
                        <ChatPanel key={playgroundModel.chatLog} instruction={playgroundModel.instruction} chatLog={playgroundModel.chatLog} onMessageChange={HandleMessageChange} onInstructionChange={HandleInstructionChange}></ChatPanel>
                    )}
                    {(mode == "Insert") && (
                        <InsertPanel prompt={playgroundModel.prompt} suffix={playgroundModel.suffix} completion={playgroundModel.completion} onPromptChange={handleInsertPromptChange}></InsertPanel>
                    )}
                    {(mode == "Edit") && (
                        <EditPanel input={playgroundModel.prompt} instructions={playgroundModel.instruction} completion={playgroundModel.completion} onInputChange={HandleEditInputChange} onInstructionsChange={HandleEditInstructionsChange}></EditPanel>
                    )}
                </div>
                <Form.Group as={Row} className="mb-3 qa-item-align">
                    {(mode == "Complete") && (
                        <>
                            <Button variant="success" type="submit" onClick={() => handleCompletion()}>
                                Submit
                            </Button>
                            <Button variant="success" onClick={() => handleCompletionStream()}>
                                StreamSubmit
                            </Button>
                        </>
                    )}
                    {(mode == "Chat") && (
                        <Button variant="success" type="submit" onClick={() => handleChatStream()}>
                            Submit
                        </Button>
                    )}
                    {(mode == "Insert") && (
                        <Button variant="success" type="submit" onClick={() => handleInsertStream()}>
                            Submit
                        </Button>
                    )}

                    {(mode == "Edit") && (
                        <Button variant="success" type="submit" onClick={() => handleEdit()}>
                            Submit
                        </Button>
                    )}
                    <History />
                </Form.Group>
            </Col>
            <Col xs={2} className="qa-item-align opertion-container" >
                <ModeSelect mode={mode} onModeChange={HandleModeChange}></ModeSelect>

                <ModelSelect model={playgroundModel.model} onModelChange={handleModelChange} ></ModelSelect>

                <Temperature temperature={playgroundModel.temperature} onTemperatureChange={(temperature: number) => handleTemperatureChange(temperature)} ></Temperature>

                {(mode != "Edit") && (<MaxTokens max_tokens={playgroundModel.responseLength} onMaxTokensChange={(max_tokens: number) => handleMaxTokensChange(max_tokens)} ></MaxTokens>)}

                {(mode != "Chat" && mode != "Edit") && (<Stop stop={playgroundModel.stopSequence} onStopChange={(stop: string[]) => handleStopChange(stop)} ></Stop>)}

                <TopP top_p={playgroundModel.top_p} onToppChange={(top_p: number) => handleToppChange(top_p)} ></TopP>

                {(mode != "Edit") && (<Frequency frequency_penalty={playgroundModel.frequency_penalty} onFrequencyPenaltyChange={(frequency_penalty: number) => handleFrequencyPenaltyChange(frequency_penalty)} ></Frequency>)}

                {(mode != "Edit") && (<Presence presence_penalty={playgroundModel.presence_penalty} onPresencePenaltyChange={(presence_penalty: number) => handlePresencePenaltyChange(presence_penalty)} ></Presence>)}

                {(mode != "Chat" && mode != "Edit") && (<Bestof best_of={playgroundModel.best_of} onBestofChange={(best_of: number) => handleBestofChange(best_of)} ></Bestof>)}

                {(mode != "Chat" && mode != "Insert" && mode != "Edit") && (<InjectText
                    text={playgroundModel.startSequence}
                    checked={playgroundModel.startSequenceEnabled}
                    label="Inject start text"
                    descript="Text to append after the user's input to format the model for a response."
                    onInjectChanged={(text: string) => HandleInjectStartChanged(text)}
                    onCheckChanged={(checked: boolean) => HandleCheckStartChanged(checked)}
                ></InjectText>)}

                {(mode != "Chat" && mode != "Insert" && mode != "Edit") && (<InjectText
                    text={playgroundModel.restartSequence}
                    checked={playgroundModel.restartSequenceEnabled}
                    label="Inject restart text"
                    descript="Text to append after the model's generation to continue the patterned structure."
                    onInjectChanged={(text: string) => HandleInjectRestartChanged(text)}
                    onCheckChanged={(checked: boolean) => HandleCheckRestartChanged(checked)}
                ></InjectText>)}
            </Col>
        </>
    )
}

export default Playground
