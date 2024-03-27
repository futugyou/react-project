import './ModelSelect.css'
import { useState, useEffect } from 'react'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

import ModelService, { BaseModel } from '../Services/Model'
import Dropdown, { DropdownItem } from "@/Common/Components/Dropdown"

interface IModelSelectProps {
    model: string
    disableHeader?: boolean
    disablePopover?: boolean
    onModelChange: (model: string) => void
}

const ModelSelect = (props: IModelSelectProps) => {
    const [model, setModel] = useState<string>(props.model)
    const [models, setModels] = useState<BaseModel[]>([])

    const modelPopover = (display: string) => (
        <Popover id="model-popover">
            <Popover.Body>
                {display}
            </Popover.Body>
        </Popover>
    )

    const modelDescriptPopover = (
        <Popover id="model-popover">
            <Popover.Body>
                The model which will generate the completion. Some models are suitable for natural language tasks, others specialize in code. <a href='https://platform.openai.com/docs/models'>Learn more</a>.
            </Popover.Body>
        </Popover>
    )

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
            <Form.Group className="mb-3" >
                {!props.disableHeader && (
                    <Row>
                        <Col>
                            <OverlayTrigger placement="left" overlay={modelDescriptPopover}>
                                <Form.Label>Model</Form.Label>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col>
                        <Dropdown items={items} onDropdownChange={onModelChange}></Dropdown>
                    </Col>
                </Row>
            </Form.Group>
        </>
    )
}

export default ModelSelect