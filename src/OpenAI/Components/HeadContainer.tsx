import './HeadContainer.css'

import Dropdown, { DropdownItem } from "./Dropdown"
import SavePanel from "./SavePanel"

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
                <div className="playground-header-save" data-bs-toggle="modal" data-bs-target="#exampleSave"  >
                    <span>Save</span>
                </div>
            </div>
            <div className="modal fade" id="exampleSave" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: "520px" }}>
                    <SavePanel></SavePanel>
                </div>
            </div >
        </div>)
}

export default HeadContainer