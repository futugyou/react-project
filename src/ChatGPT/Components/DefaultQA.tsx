import { useState } from 'react'
import './DefaultQA.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Prompt from './Prompt';
import ModelSelect from './ModelSelect';
import Temperature from './Temperature';
import TopP from './TopP';
import Frequency from './Frequency';
import Presence from './Presence';
import Bestof from './Bestof';

function DefaultQA() {
    const [state, setState] = useState(
        {
            model: "text-davinci-003",
            prompt: "I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ:",
            temperature: 0.0,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            best_of: 1,
            stop: ["\n"]
        })

    const handlePromptChange = (value: string) => {
        var newData = Object.assign({}, state, { prompt: value });
        setState(newData);
        console.log(state);
    }

    const handleModelChange = (value: string) => {
        var newData = Object.assign({}, state, { model: value });
        setState(newData);
        console.log(state);
    }

    const handleTemperatureChange = (value: number | string) => {
        var newData = Object.assign({}, state, { temperature: value });
        setState(newData);
        console.log(state);
    }

    const handleToppChange = (value: number | string) => {
        var newData = Object.assign({}, state, { top_p: value });
        setState(newData);
        console.log(state);
    }

    const handleFrequencyPenaltyChange = (value: number | string) => {
        var newData = Object.assign({}, state, { frequency_penalty: value });
        setState(newData);
        console.log(state);
    }

    const handlePresencePenaltyChange = (value: number | string) => {
        var newData = Object.assign({}, state, { presence_penalty: value });
        setState(newData);
        console.log(state);
    }

    const handleBestofChange = (value: number | string) => {
        var newData = Object.assign({}, state, { best_of: value });
        setState(newData);
        console.log(state);
    }

    return (
        <>
            <Col xs={10}>
                <Prompt prompt={state.prompt} onPromptChange={(prompt: string) => handlePromptChange(prompt)} ></Prompt>
                <Form.Group as={Row} className="mb-3 qa-item-align">
                    <Col>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Form.Group>
            </Col>
            <Col xs={2} className="qa-item-align" >
                <ModelSelect model={state.model} onModelChange={(model: string) => handleModelChange(model)} ></ModelSelect>

                <Temperature temperature={state.temperature} onTemperatureChange={(temperature: number) => handleTemperatureChange(temperature)} ></Temperature>

                <TopP top_p={state.top_p} onToppChange={(top_p: number) => handleToppChange(top_p)} ></TopP>

                <Frequency frequency_penalty={state.frequency_penalty} onFrequencyPenaltyChange={(frequency_penalty: number) => handleFrequencyPenaltyChange(frequency_penalty)} ></Frequency>

                <Presence presence_penalty={state.presence_penalty} onPresencePenaltyChange={(presence_penalty: number) => handlePresencePenaltyChange(presence_penalty)} ></Presence>

                <Bestof best_of={state.best_of} onBestofChange={(best_of: number) => handleBestofChange(best_of)} ></Bestof>
            </Col>
        </>
    )
}

export default DefaultQA
