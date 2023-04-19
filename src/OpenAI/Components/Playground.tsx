import './Playground.css';
import { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BsClockHistory } from "react-icons/bs";

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

import { OpenAIModel } from '../Models/OpenAIModel';
import { CompletionModel } from '../Models/CompletionModel';
import { ExampleModel } from '../Models/ExampleModel';
import set from '../Services/Example';
import completionService from '../Services/Completion';

import { PlaygroundModel } from '../Models/PlaygroundModel';
import playgroundService from '../Services/Playground';
import { ChatLog } from '../Models/PlaygroundModel';

export async function qaloader() {
    const data = await set.getExample("default-grammar");
    return mapExampleModelToOpenAIModel(data);
}

const mapExampleModelToOpenAIModel = (data: ExampleModel): OpenAIModel => {
    let result: OpenAIModel = {
        model: data.model,
        prompt: data.prompt,
        max_tokens: data.max_tokens,
        top_p: data.top_p,
        temperature: data.temperature,
        frequency_penalty: data.frequency_penalty,
        presence_penalty: data.presence_penalty,
        stop: data.stop,
        best_of: 1,
        echo: false,
        logprobs: 0,
    };
    return result
}

function Playground() {
    const data = useLoaderData() as OpenAIModel;

    const [openAIModel, setOpenAIModel] = useState(data)
    useEffect(() => {
        setOpenAIModel(data)
    }, [data]);


    const [injectStart, setInjectStart] = useState({
        checked: false,
        text: "\nA: "
    })

    const [injectRestart, setInjectRestart] = useState({
        checked: false,
        text: "\n\nQ: "
    })

    const [completion, setCompletion] = useState('')

    let playground: PlaygroundModel = {
        "createdAt": Date.now(),
        "prompt": openAIModel.prompt,
        "suffix": null,
        "instruction": "",
        "completion": completion,
        "chatLog": [{
            "role": "user",
            "content": ""
        }],
        "completionMode": "freeform",
        "stopSequence": openAIModel.stop,
        "startSequence": injectStart.text,
        "startSequenceEnabled": injectStart.checked,
        "restartSequence": injectRestart.text,
        "restartSequenceEnabled": injectRestart.checked,
        "model": openAIModel.model,
        "temperature": openAIModel.temperature,
        "responseLength": openAIModel.max_tokens,
        "topP": openAIModel.top_p,
        "frequencyPenalty": openAIModel.frequency_penalty,
        "presencePenalty": openAIModel.presence_penalty,
        "bestOf": openAIModel.best_of
    }

    const handlePromptChange = (value: string) => {
        var newData = Object.assign({}, openAIModel, { prompt: value });
        setOpenAIModel(newData);
    }

    const handleModelChange = (value: string) => {
        var newData = Object.assign({}, openAIModel, { model: value });
        setOpenAIModel(newData);
    }

    const handleTemperatureChange = (value: number) => {
        setOpenAIModel({
            ...openAIModel,
            temperature: +value
        })
    }

    const handleMaxTokensChange = (value: number) => {
        setOpenAIModel({
            ...openAIModel,
            max_tokens: +value
        })
    }

    const handleToppChange = (value: number) => {
        setOpenAIModel({
            ...openAIModel,
            top_p: +value
        })
    }

    const handleFrequencyPenaltyChange = (value: number) => {
        setOpenAIModel({
            ...openAIModel,
            frequency_penalty: +value
        })
    }

    const handlePresencePenaltyChange = (value: number) => {
        setOpenAIModel({
            ...openAIModel,
            presence_penalty: +value
        })
    }

    const handleBestofChange = (value: number) => {
        setOpenAIModel({
            ...openAIModel,
            best_of: +value
        })
    }

    const handleStopChange = (value: string[]) => {
        setOpenAIModel({
            ...openAIModel,
            stop: value
        })
    }

    const handleCompletion = async () => {
        let data: OpenAIModel = openAIModel
        if (injectStart.checked && injectStart.text.length > 0) {
            data = {
                ...data,
                prompt: data.prompt + injectStart.text
            }
        }

        const response = await completionService.createCompletion(data)
        if (response.error != '') {
            setOpenAIModel({
                ...data,
                prompt: data.prompt + response.error
            })
        } else {
            playground.completion = response.texts.join('')

            let text = data.prompt + response.texts.join('')

            if (injectRestart.checked && injectRestart.text.length > 0) {
                text += injectRestart.text
            }

            storeHistory()

            setOpenAIModel({
                ...data,
                prompt: text
            })

            setCompletion('')
        }
    }

    const storeHistory = () => {
        playgroundService.storePlayground(playground)
    }

    const handleCompletionStream = async () => {
        let data: OpenAIModel = openAIModel
        if (injectStart.checked && injectStart.text.length > 0) {
            data = {
                ...data,
                prompt: data.prompt + injectStart.text
            }
        }

        await completionService.createCompletionStream(data, handleStreamProcess, handleStreamEnd)
    }

    const handleStreamProcess = (data: string) => {
        playground.completion += data
    }

    const handleStreamEnd = () => {
        storeHistory()

        let text = openAIModel.prompt + playground.completion
        if (injectRestart.checked && injectRestart.text.length > 0) {
            text += injectRestart.text
        }

        setOpenAIModel({
            ...openAIModel,
            prompt: text
        })

        setCompletion('')
    }

    const HandleInjectStartChanged = (injectText: string) => {
        setInjectStart(
            {
                ...injectStart,
                text: injectText,
            }
        )
    }

    const HandleCheckStartChanged = (checked: boolean) => {
        setInjectStart(
            {
                ...injectStart,
                checked: checked,
            }
        )
    }

    const HandleInjectRestartChanged = (injectText: string) => {
        setInjectRestart(
            {
                ...injectRestart,
                text: injectText,
            }
        )
    }

    const HandleCheckRestartChanged = (checked: boolean) => {
        setInjectRestart(
            {
                ...injectRestart,
                checked: checked,
            }
        )
    }

    const HandleMessageChange = (messages: ChatLog[]) => {
        let m: ChatLog[] = messages
            .filter((m) => m.content != '')
            .map((m) => { return { role: m.role, content: m.content } })
        console.log(m)
    }

    return (
        <>
            <Col xs={10}>
                <ChatPanel onMessageChange={HandleMessageChange}></ChatPanel>
                {/* <CompletePanel prompt={openAIModel.prompt} onPromptChange={(prompt: string) => handlePromptChange(prompt)} ></CompletePanel> */}
                <Form.Group as={Row} className="mb-3 qa-item-align">
                    <Button variant="success" type="submit" onClick={() => handleCompletion()}>
                        Submit
                    </Button>

                    <Button variant="success" onClick={() => handleCompletionStream()}>
                        StreamSubmit
                    </Button>
                    <History />
                </Form.Group>
            </Col>
            <Col xs={2} className="qa-item-align opertion-container" >
                <ModeSelect></ModeSelect>

                <ModelSelect model={openAIModel.model} onModelChange={(model: string) => handleModelChange(model)} ></ModelSelect>

                <Temperature temperature={openAIModel.temperature} onTemperatureChange={(temperature: number) => handleTemperatureChange(temperature)} ></Temperature>

                <MaxTokens max_tokens={openAIModel.max_tokens} onMaxTokensChange={(max_tokens: number) => handleMaxTokensChange(max_tokens)} ></MaxTokens>

                <Stop stop={openAIModel.stop} onStopChange={(stop: string[]) => handleStopChange(stop)} ></Stop>

                <TopP top_p={openAIModel.top_p} onToppChange={(top_p: number) => handleToppChange(top_p)} ></TopP>

                <Frequency frequency_penalty={openAIModel.frequency_penalty} onFrequencyPenaltyChange={(frequency_penalty: number) => handleFrequencyPenaltyChange(frequency_penalty)} ></Frequency>

                <Presence presence_penalty={openAIModel.presence_penalty} onPresencePenaltyChange={(presence_penalty: number) => handlePresencePenaltyChange(presence_penalty)} ></Presence>

                <Bestof best_of={openAIModel.best_of} onBestofChange={(best_of: number) => handleBestofChange(best_of)} ></Bestof>

                <InjectText
                    text={injectStart.text}
                    checked={injectStart.checked}
                    label="Inject start text"
                    descript="Text to append after the user's input to format the model for a response."
                    onInjectChanged={(text: string) => HandleInjectStartChanged(text)}
                    onCheckChanged={(checked: boolean) => HandleCheckStartChanged(checked)}
                ></InjectText>

                <InjectText
                    text={injectRestart.text}
                    checked={injectRestart.checked}
                    label="Inject restart text"
                    descript="Text to append after the model's generation to continue the patterned structure."
                    onInjectChanged={(text: string) => HandleInjectRestartChanged(text)}
                    onCheckChanged={(checked: boolean) => HandleCheckRestartChanged(checked)}
                ></InjectText>
            </Col>
        </>
    )
}

export default Playground
