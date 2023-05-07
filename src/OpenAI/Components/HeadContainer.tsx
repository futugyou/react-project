import './HeadContainer.css'

import { useState } from 'react'
import Dropdown, { DropdownItem } from "./Dropdown"
import SavePanel from "./SavePanel"

import { OpenAIModel } from '../Models/OpenAIModel'
import { ExampleModel, DefaultExampleModel } from '../Models/ExampleModel'
import exampleService from '../Services/Example';

const convertOpenAIToExample = (data: OpenAIModel): ExampleModel => {
    const response: ExampleModel = {
        key: '',
        title: '',
        subTitle: '',
        model: data.model,
        prompt: data.prompt,
        temperature: data.temperature,
        max_tokens: data.max_tokens,
        top_p: data.top_p,
        frequency_penalty: data.frequency_penalty,
        presence_penalty: data.presence_penalty,
        tags: [],
        stop: data.stop,
        description: '',
        sample_response: ''
    }

    return response
}

function HeadContainer(props: any) {

    const selects: DropdownItem[] = [
        {
            key: "default-qa",
            value: "Q&A",
        }
    ]

    const HandleSelectChange = (value: string) => {
        console.log(value)
    }

    const handleSaveClick = async (data: any) => {
        let perset: ExampleModel = convertOpenAIToExample(props.data)
        perset.key = data.key
        perset.title = data.key
        perset.description = data.description

        const persets: ExampleModel[] = await exampleService.createExample(perset)
        console.log(persets.length)
    }

    return (
        <div className="playground-header">
            <div className="playground-header-title">Playground</div>
            <div className="playground-header-right">
                <div className="playground-header-select">
                    <Dropdown items={selects} onDropdownChange={HandleSelectChange}></Dropdown>
                </div>
                <div className="playground-header-save" data-bs-toggle="modal" data-bs-target="#exampleSave"  >
                    <span>Save</span>
                </div>
            </div>
            <div className="modal fade" id="exampleSave" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: "520px" }}>
                    <SavePanel onSaveClick={handleSaveClick}></SavePanel>
                </div>
            </div >
        </div>)
}

export default HeadContainer