import './HeadContainer.css'

import { useState, useEffect } from 'react'
import Dropdown, { DropdownItem } from "@/Common/Components/Dropdown"
import SavePanel from "./SavePanel"

import convert from '../Models/convert'
import { ExampleModel } from '../Models/ExampleModel'
import exampleService from '../Services/Example'
import { PlaygroundModel, DefaultPlayground } from '../Models/PlaygroundModel'


const HeadContainer = (props: any) => {
    let didInit = false
    const [examples, setExamples] = useState<ExampleModel[]>([])
    const [customExamples, setCustomExamples] = useState<ExampleModel[]>([])
    const [showSuccess, setSuccess] = useState(false)

    useEffect(() => {
        if (!didInit) {
            didInit = true
            const fetchData = async () => {
                const examples = await exampleService.getAllExamples()
                setExamples(examples)
                const customExamples = await exampleService.getAllCustomExamples()
                setCustomExamples(customExamples)
            }

            fetchData()
        }
    }, [])

    const selects: DropdownItem[] = [{ key: "", value: "Load a preset..." }].concat(examples.concat(customExamples).map(data => {
        return {
            key: data.key,
            value: data.title,
        }
    }))

    const HandleSelectChange = (value: string) => {
        if (props.onPresetChange) {
            let playground: PlaygroundModel

            if (value == "") {
                playground = DefaultPlayground
            } else {
                const example = examples.concat(customExamples).find(p => p.key == value)
                playground = example == null ? DefaultPlayground : convert.mapExampleModelToPlaygroundModel(example)
            }

            props.onPresetChange(playground)
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 2000)
        }
    }

    const handleSaveClick = async (data: any) => {
        let perset: ExampleModel = convert.convertOpenAIToExample(props.data)
        perset.key = data.key
        perset.title = data.key
        perset.description = data.description

        await exampleService.createCustomExample(perset)
    }

    return (
        <div className="playground-header">
            {showSuccess && <div className="alert alert-success setting-change-tip" role="alert">
                Settings updated!
            </div>}
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