import './ModelSelect.css'
import { useState, useEffect } from 'react'

import { ColumnLayout, Popover, Box } from "@cloudscape-design/components"

import ModelService, { BaseModel } from '../Services/Model'
import Dropdown, { DropdownItem } from "@/Common/Components/Dropdown"

const popover_text: string = "The model which will generate the completion. Some models are suitable for natural language tasks, others specialize in code. <a href='https://platform.openai.com/docs/models'>Learn more</a>."

interface IModelSelectProps {
    model: string
    disableHeader?: boolean
    disablePopover?: boolean
    onModelChange: (model: string) => void
}

const ModelSelect = (props: IModelSelectProps) => {
    const [model, setModel] = useState<string>(props.model)
    const [models, setModels] = useState<BaseModel[]>([])

    let didInit = false
    useEffect(() => {
        if (!didInit) {
            didInit = true
            const fetchData = async () => {
                const data = await ModelService.getModelList()
                setModels(data)
            }

            fetchData()
        }
    }, [])

    const onModelChange = (value: any) => {
        setModel(value)
        props.onModelChange(value)
    }

    const items: DropdownItem[] = models.map((data, index) => {
        if (props.disablePopover) {
            return {
                key: data.name,
                value: data.name,
            }
        }

        return {
            key: data.name,
            value: data.name,
            popover: data.describe,
        }
    })

    return (
        <>
            <Box className="mb-3" >
                {!props.disableHeader && (
                    <ColumnLayout columns={1} borders="vertical">
                        <Popover
                            dismissButton={false}
                            content={
                                <span>{popover_text}</span>
                            }
                            position="left"
                            triggerType="hover"
                            size="small"
                        >
                            <div>Model</div>
                        </Popover>
                    </ColumnLayout>
                )}

                <ColumnLayout columns={1} borders="vertical">
                    <Dropdown items={items} onDropdownChange={onModelChange}></Dropdown>
                </ColumnLayout>
            </Box>
        </>
    )
}

export default ModelSelect