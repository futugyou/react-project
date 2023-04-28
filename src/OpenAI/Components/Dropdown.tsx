import './Dropdown.css'

import { BsChevronDown } from "react-icons/bs";

function Dropdown(props: any) {
    return (
        <div className="dropdown-container">
            <div className="dropdown-display-container">
                <div className="dropdown-display" >
                    Dropdown button
                </div>
                <div className="dropdown-icon">
                    <BsChevronDown></BsChevronDown>
                </div>
            </div>
            <ul className="dropdown-menu show">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
        </div>
    )
}

export default Dropdown