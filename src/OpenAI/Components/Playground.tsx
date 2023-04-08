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
import set from '../Services/Setting';
import completion from '../Services/Completion';

export async function qaloader() {
    const data = await set.getSetting("default-qa");
    return data;
}

function Playground() {
    const data = useLoaderData() as OpenAIModel;
    const [state, setState] = useState(data)
    useEffect(() => {
        setState(data)
    }, [data]);

    let enableInjectStart: boolean = false;
    let enableInjectRestart: boolean = false;
    let enableInjectStartText: string = '';
    let enableInjectRestartText: string = '';

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
        console.log(enableInjectStart, enableInjectStartText)
        if (enableInjectStart && enableInjectStartText.length > 0) {
            data = {
                ...data,
                prompt: data.prompt + enableInjectStartText
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

            if (enableInjectRestart && enableInjectRestartText.length > 0) {
                text += enableInjectRestartText
            }

            setState({
                ...data,
                prompt: text
            })
        }
    }

    const HandleInjectStartChanged = (injectText: string) => {
        enableInjectStartText = injectText
    }

    const HandleCheckStartChanged = (checked: boolean) => {
        enableInjectStart = checked;
    }

    const HandleInjectRestartChanged = (injectText: string) => {
        enableInjectRestartText = injectText
    }

    const HandleCheckRestartChanged = (checked: boolean) => {
        enableInjectRestart = checked;
    }

    return (
        <>
            <Col xs={10}>
                <Prompt prompt={state.prompt} onPromptChange={(prompt: string) => handlePromptChange(prompt)} ></Prompt>
                <Form.Group as={Row} className="mb-3 qa-item-align">
                    <Col>
                        <Button variant="success" type="submit" onClick={() => handleCompletion()}>
                            Submit
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
                    text='↵A: '
                    label="Inject start text"
                    descript="Text to append after the user's input to format the model for a response."
                    onInjectChanged={(text: string) => HandleInjectStartChanged(text)}
                    onCheckChanged={(checked: boolean) => HandleCheckStartChanged(checked)}
                ></InjectText>

                <InjectText
                    text='↵↵Q: '
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
