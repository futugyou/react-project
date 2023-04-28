import './Dropdown.css'

import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface DropdownItem {
    key: string
    value: string
    choose: boolean
}

interface DropdownProps {
    items: DropdownItem[]
    onDropdownChange?: (key: string) => void;
    children?: React.ReactNode
}

function Dropdown(props: DropdownProps) {
    const [showDropdown, setShowDropdown] = useState(false)
    const ulClassName = showDropdown ? "dropdown-menu show" : "dropdown-menu"

    const HandleContainerClick = (e: any) => {
        setShowDropdown(f => !f)
    }

    return (
        <div className="dropdown-container" onClick={HandleContainerClick}>
            <div className="dropdown-display-container">
                <div className="dropdown-display" >
                    Dropdown button
                </div>
                <div className="dropdown-icon">
                    <BsChevronDown></BsChevronDown>
                </div>
            </div>
            <ul className={ulClassName}>
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
        </div>
    )
}

export default Dropdown