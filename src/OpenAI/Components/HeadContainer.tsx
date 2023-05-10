import './HeadContainer.css'

import { useState, useEffect } from 'react'
import Dropdown, { DropdownItem } from "./Dropdown"
import SavePanel from "./SavePanel"

import convert from '../Models/convert'
import { ExampleModel } from '../Models/ExampleModel'
import exampleService from '../Services/Example'


function HeadContainer(props: any) {
    let didInit = false;
    const [examples, setExamples] = useState<ExampleModel[]>([])
    const [customExamples, setCustomExamples] = useState<ExampleModel[]>([])

    useEffect(() => {
        if (!didInit) {
            didInit = true;
            const fetchData = async () => {
                const examples = await exampleService.getAllExamples();
                setExamples(examples)
                const customExamples = await exampleService.getAllCustomExamples();
                setCustomExamples(customExamples)
            };

            fetchData();
        }
    }, [])

    const selects: DropdownItem[] = examples.concat(customExamples).map(data => {
        return {
            key: data.key,
            value: data.title,
        }
    })

    const HandleSelectChange = (value: string) => {
        console.log(value)
    }

    const handleSaveClick = async (data: any) => {
        let perset: ExampleModel = convert.convertOpenAIToExample(props.data)
        perset.key = data.key
        perset.title = data.key
        perset.description = data.description

        const persets: ExampleModel[] = await exampleService.createCustomExample(perset)
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