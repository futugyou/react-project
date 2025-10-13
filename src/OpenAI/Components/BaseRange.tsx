
import { useState, useEffect } from "react"
import {
    Box,
    ColumnLayout,
    FormField,
    Input,
    Slider,
    Popover,
    SpaceBetween,
} from "@cloudscape-design/components"

interface IBaseRangeProps {
    value: number
    max: number
    min: number
    step: number
    popover?: any
    display?: any
    disablePopover?: boolean
    onValueChange?: (value: any) => void
    children?: React.ReactNode
}

const BaseRange = (props: IBaseRangeProps) => {
    let value: number = props.value
    if (value > props.max) {
        value = props.max
    } else if (value < props.min) {
        value = props.min
    }

    const [stringValue, setStringValue] = useState<string>(value.toString())

    const handleInputChange = (value: string) => {
        if (value === "") {
            setStringValue("0")
            return
        }

        if (value === ".") {
            setStringValue("0.")
            return
        }

        if (value.charAt(value.length - 1) === ".") {
            setStringValue(value)
            return
        }

        setStringValue(parseFloat(value).toString())
    }

    const handleValueChange = (value: number) => {
        setStringValue(value + "")
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            const t = parseFloat(stringValue).toString()
            if (props.onValueChange) {
                props.onValueChange(t)
            }
        }, 500)
        return () => clearTimeout(timeOutId)
    }, [stringValue])

    const renderRange = () => (
        <SpaceBetween size="s">
            <ColumnLayout columns={2} variant="text-grid">
                <FormField label={props.display}>
                    <Input
                        value={stringValue}
                        onChange={(e) => handleInputChange(e.detail.value)}
                    />
                </FormField>
            </ColumnLayout>
            <FormField>
                <Slider
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    value={parseFloat(stringValue)}
                    onChange={(e) => handleValueChange(e.detail.value)}
                />
            </FormField>
        </SpaceBetween>
    )

    if (props.disablePopover) {
        return renderRange()
    }

    return (
        <Popover
            size="small"
            position="right"
            dismissButton={false}
            triggerType="custom"
            content={props.popover}
        >
            {renderRange()}
        </Popover>
    )
}

export default BaseRange
