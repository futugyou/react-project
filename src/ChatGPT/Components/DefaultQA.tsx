import { useState } from 'react'
import './DefaultQA.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Prompt from './Prompt';
import ModelSelect from './ModelSelect';

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

                <Form.Group className="mb-3" >
                    <Row>
                        <Col>
                            <Form.Label>Temperature</Form.Label>
                        </Col>
                        <Col xs="4">
                            <Form.Control value={state.temperature} onChange={e => handleTemperatureChange(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Range min={0.0} max={1.0} step={0.01} value={state.temperature} onChange={e => handleTemperatureChange(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Row>
                        <Col>
                            <Form.Label>Top P</Form.Label>
                        </Col>
                        <Col xs="4">
                            <Form.Control value={state.top_p} onChange={e => handleToppChange(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Range min={0.0} max={1.0} step={0.01} value={state.top_p} onChange={e => handleToppChange(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Row>
                        <Col>
                            <Form.Label>Frequency penalty</Form.Label>
                        </Col>
                        <Col xs="4">
                            <Form.Control value={state.frequency_penalty} onChange={e => handleFrequencyPenaltyChange(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Range min={0.0} max={2.0} step={0.01} value={state.frequency_penalty} onChange={e => handleFrequencyPenaltyChange(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Row>
                        <Col>
                            <Form.Label>Presence penalty</Form.Label>
                        </Col>
                        <Col xs="4">
                            <Form.Control value={state.presence_penalty} onChange={e => handlePresencePenaltyChange(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Range min={0.0} max={2.0} step={0.01} value={state.presence_penalty} onChange={e => handlePresencePenaltyChange(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Row>
                        <Col>
                            <Form.Label>Best of</Form.Label>
                        </Col>
                        <Col xs="4">
                            <Form.Control value={state.best_of} onChange={e => handleBestofChange(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Range min={1} max={20} step={1} value={state.best_of} onChange={e => handleBestofChange(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>
            </Col>
        </>
    )
}

export default DefaultQA
