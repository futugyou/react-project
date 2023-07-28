import './Dropdown.css'

import { useState } from "react"
import { BsChevronDown } from "react-icons/bs"

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

export interface DropdownItem {
    key: string
    value: string
    popover?: string
    choose?: boolean
}

interface DropdownProps {
    items: DropdownItem[]
    onDropdownChange?: (key: string) => void;
    children?: React.ReactNode
}

const Dropdown = (props: DropdownProps) => {
    if (props.items.length < 1) {
        return (<></>)
    }

    const [showDropdown, setShowDropdown] = useState(false)
    const [emptyDisplay, setEmptyDisplay] = useState(props.items[0].value)
    const ulClassName = showDropdown ? "dropdown-menu show" : "dropdown-menu"

    const itemPopover = (item: string) => (
        <Popover id={item + "-popover"}>
            <Popover.Body>
                {item}
            </Popover.Body>
        </Popover>
    )

    const HandleContainerClick = (e: any) => {
        setShowDropdown(f => !f)
    }

    const HandleContainerBlur = (e: any) => {
        setShowDropdown(false)
    }

    const HandleDropdownClick = (key: string) => {
        const value = props.items.find(i => i.key === key)!.value
        setEmptyDisplay(value)

        if (props.onDropdownChange) {
            props.onDropdownChange(key)
        }
    }

    const dropdownitems = props.items.map(i => {
        if (!i.popover) {
            return (
                <li key={i.key} className={i.value == emptyDisplay ? "dropdown-item selected" : "dropdown-item"} onClick={() => HandleDropdownClick(i.key)}> {i.value} </li>
            )
        }

        return (
            <OverlayTrigger key={i.key} placement="left" overlay={itemPopover(i.popover)}>
                <li className={i.value == emptyDisplay ? "dropdown-item selected" : "dropdown-item"} onClick={() => HandleDropdownClick(i.key)}> {i.value} </li>
            </OverlayTrigger>
        )
    })

    return (
        <div className="dropdown-container" onClick={HandleContainerClick} onBlur={HandleContainerBlur}>
            <div className="dropdown-display-container">
                <div className="dropdown-display" >
                    {emptyDisplay}
                </div>
                <div className="dropdown-icon">
                    <BsChevronDown></BsChevronDown>
                </div>
            </div>
            <ul className={ulClassName}>
                {dropdownitems}
            </ul>
        </div>
    )
}

export default Dropdown