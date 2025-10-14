import "./Dropdown.css"

import { useState } from "react"

import Select from "@cloudscape-design/components/select"

export interface DropdownItem {
    key: string
    value: string
    popover?: string
    choose?: boolean
}

interface DropdownProps {
    items: DropdownItem[]
    onDropdownChange?: (key: string) => void
    children?: React.ReactNode
}

const Dropdown = (props: DropdownProps) => {
    if (props.items.length < 1) {
        return <></>
    }

    const [selectedOption, setSelectedOption] = useState(props.items.find((i) => i.choose) ?? {})

    const dropdownitems = props.items.map((i) => {
        return { label: i.key, value: i.value, description: i.popover }
    })

    return (
        <Select
            selectedOption={selectedOption}
            onChange={({ detail }) => {
                setSelectedOption(detail.selectedOption)
                props.onDropdownChange(detail.selectedOption.label)
            }}
            options={dropdownitems}
            empty="No options"
        />
    )
}

export default Dropdown
