import './Playground.css';
import { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Prompt from './Prompt';
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

import { OpenAIModel } from '../Models/OpenAIModel';
import { ExampleModel } from '../Models/ExampleModel';
import set from '../Services/Example';
import completion from '../Services/Completion';

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
    const [state, setState] = useState(data)
    useEffect(() => {
        setState(data)
    }, [data]);


    const [injectStart, setInjectStart] = useState({
        checked: false,
        text: "\nA: "
    })

    const [injectRestart, setInjectRestart] = useState({
        checked: false,
        text: "\n\nQ: "
    })

    const handlePromptChange = (value: string) => {
        var newData = Object.assign({}, state, { prompt: value });
        setState(newData);
    }

    const handleModelChange = (value: string) => {
        var newData = Object.assign({}, state, { model: value });
        setState(newData);
    }

    const handleTemperatureChange = (value: number) => {
        setState({
            ...state,
            temperature: +value
        })
    }

    const handleMaxTokensChange = (value: number) => {
        setState({
            ...state,
            max_tokens: +value
        })
    }

    const handleToppChange = (value: number) => {
        setState({
            ...state,
            top_p: +value
        })
    }

    const handleFrequencyPenaltyChange = (value: number) => {
        setState({
            ...state,
            frequency_penalty: +value
        })
    }

    const handlePresencePenaltyChange = (value: number) => {
        setState({
            ...state,
            presence_penalty: +value
        })
    }

    const handleBestofChange = (value: number) => {
        setState({
            ...state,
            best_of: +value
        })
    }

    const handleStopChange = (value: string[]) => {
        setState({
            ...state,
            stop: value
        })
    }

    const handleCompletion = async () => {
        let data: OpenAIModel = state
        if (injectStart.checked && injectStart.text.length > 0) {
            data = {
                ...data,
                prompt: data.prompt + injectStart.text
            }
        }

        const response = await completion.createCompletion(data)
        if (response.error != '') {
            setState({
                ...data,
                prompt: data.prompt + response.error
            })
        } else {
            let text = data.prompt
            response.texts.forEach(t => {
                text += t
            });

            if (injectRestart.checked && injectRestart.text.length > 0) {
                text += injectRestart.text
            }

            setState({
                ...data,
                prompt: text
            })
        }
    }

    let stateCopy: OpenAIModel
    const handleCompletionStream = async () => {
        let data: OpenAIModel = state
        if (injectStart.checked && injectStart.text.length > 0) {
            data = {
                ...data,
                prompt: data.prompt + injectStart.text
            }
        }

        stateCopy = data
        await completion.createCompletionStream(data, handleStreamResponse)
        let text = stateCopy.prompt
        if (injectRestart.checked && injectRestart.text.length > 0) {
            text += injectRestart.text
        }

        setState({
            ...stateCopy,
            prompt: text
        })
    }

    const handleStreamResponse = (data: any) => {
        setState({
            ...stateCopy,
            prompt: stateCopy.prompt + data
        })
        stateCopy.prompt = stateCopy.prompt + data
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

    return (
        <>
            <Col xs={10}>
                <Prompt prompt={state.prompt} onPromptChange={(prompt: string) => handlePromptChange(prompt)} ></Prompt>
                <Form.Group as={Row} className="mb-3 qa-item-align">
                    <Col xs={1}>
                        <Button variant="success" type="submit" onClick={() => handleCompletion()}>
                            Submit
                        </Button>
                    </Col>
                    <Col xs={1}>
                        <Button variant="success" onClick={() => handleCompletionStream()}>
                            StreamSubmit
                        </Button>
                    </Col>
                </Form.Group>
            </Col>
            <Col xs={2} className="qa-item-align opertion-container" >
                <ModeSelect></ModeSelect>

                <ModelSelect model={state.model} onModelChange={(model: string) => handleModelChange(model)} ></ModelSelect>

                <Temperature temperature={state.temperature} onTemperatureChange={(temperature: number) => handleTemperatureChange(temperature)} ></Temperature>

                <MaxTokens max_tokens={state.max_tokens} onMaxTokensChange={(max_tokens: number) => handleMaxTokensChange(max_tokens)} ></MaxTokens>

                <Stop stop={state.stop} onStopChange={(stop: string[]) => handleStopChange(stop)} ></Stop>

                <TopP top_p={state.top_p} onToppChange={(top_p: number) => handleToppChange(top_p)} ></TopP>

                <Frequency frequency_penalty={state.frequency_penalty} onFrequencyPenaltyChange={(frequency_penalty: number) => handleFrequencyPenaltyChange(frequency_penalty)} ></Frequency>

                <Presence presence_penalty={state.presence_penalty} onPresencePenaltyChange={(presence_penalty: number) => handlePresencePenaltyChange(presence_penalty)} ></Presence>

                <Bestof best_of={state.best_of} onBestofChange={(best_of: number) => handleBestofChange(best_of)} ></Bestof>

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
