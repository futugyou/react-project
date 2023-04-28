import './Dropdown.css'

import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export interface DropdownItem {
    key: string
    value: string
    choose?: boolean
}

interface DropdownProps {
    items: DropdownItem[]
    onDropdownChange?: (key: string) => void;
    children?: React.ReactNode
}

function Dropdown(props: DropdownProps) {
    if (props.items.length < 1) {
        return (<></>)
    }

    const [showDropdown, setShowDropdown] = useState(false)
    const [emptyDisplay, setEmptyDisplay] = useState(props.items[0].value)
    const ulClassName = showDropdown ? "dropdown-menu show" : "dropdown-menu"

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
        return (
            <li key={i.key} className={i.value == emptyDisplay ? "dropdown-item selected" : "dropdown-item"} onClick={() => HandleDropdownClick(i.key)}> {i.value} </li>
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