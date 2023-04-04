import { useState, useEffect } from 'react'
import './DefaultQA.css'
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
import Stop from './StopContainer/Stop';
import { OpenAIModel } from '../Models/OpenAIModel';
import set from '../Services/Setting';
import { useLoaderData } from "react-router-dom";
import completion from '../Services/Completion';

export async function qaloader() {
    const data = await set.getSetting("default-qa");
    return data;
}

function DefaultQA() {
    const data = useLoaderData() as OpenAIModel;
    const [state, setState] = useState(data)
    useEffect(() => {
        setState(data)
    }, [data]);

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

    const handleStopChange = (value: string) => {
        let stop: string[] = []
        stop.push(value)
        setState({
            ...state,
            stop: stop
        })
    }

    const handleCompletion = async () => {
        const response = await completion.createCompletion(state)
        if (response.error != '') {
            setState({
                ...state,
                prompt: state.prompt + response.error
            })
        } else {
            let text = state.prompt
            response.texts.forEach(t => {
                text += t
            });
            setState({
                ...state,
                prompt: text
            })
        }
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
            <Col xs={2} className="qa-item-align" >
                <ModelSelect model={state.model} onModelChange={(model: string) => handleModelChange(model)} ></ModelSelect>

                <Temperature temperature={state.temperature} onTemperatureChange={(temperature: number) => handleTemperatureChange(temperature)} ></Temperature>

                <MaxTokens max_tokens={state.max_tokens} onMaxTokensChange={(max_tokens: number) => handleMaxTokensChange(max_tokens)} ></MaxTokens>

                <Stop stop={state.stop} onStopChange={(stop: string) => handleStopChange(stop)} ></Stop>

                <TopP top_p={state.top_p} onToppChange={(top_p: number) => handleToppChange(top_p)} ></TopP>

                <Frequency frequency_penalty={state.frequency_penalty} onFrequencyPenaltyChange={(frequency_penalty: number) => handleFrequencyPenaltyChange(frequency_penalty)} ></Frequency>

                <Presence presence_penalty={state.presence_penalty} onPresencePenaltyChange={(presence_penalty: number) => handlePresencePenaltyChange(presence_penalty)} ></Presence>

                <Bestof best_of={state.best_of} onBestofChange={(best_of: number) => handleBestofChange(best_of)} ></Bestof>
            </Col>
        </>
    )
}

export default DefaultQA
