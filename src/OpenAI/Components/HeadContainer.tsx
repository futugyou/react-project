import './HeadContainer.css'

import Dropdown, { DropdownItem } from "./Dropdown"

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

    return (
        <div className="playground-header">
            <div className="playground-header-title">Playground</div>
            <div className="playground-header-right">
                <div className="playground-header-select">
                    <Dropdown items={selects} onDropdownChange={HandleSelectChange}></Dropdown>
                </div>
                <div className="playground-header-save">
                    <span>Save</span>
                </div>
            </div>
        </div>)
}

export default HeadContainer