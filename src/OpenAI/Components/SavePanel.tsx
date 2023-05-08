
import './SavePanel.css'

import { useState } from 'react'

function SavePanel(props: any) {
    const [state, setState] = useState({
        "key": "",
        "description": "",
    })
    const [showError, setShowError] = useState(false)
    const [showSuccess, setSuccess] = useState(false)

    const handleKeyChange = (e: any) => {
        const t: string = e.target.value
        setState({
            ...state,
            key: t,
        })
    }

    const handleDescriptionChange = (e: any) => {
        const t: string = e.target.value
        setState({
            ...state,
            description: t,
        })
    }

    const HandleSaveClick = (e: any) => {
        console.log(state)

        if (state.key.length == 0) {
            setShowError(true)
            setTimeout(function () {
                setShowError(false)
            }, 3000)
            return
        }

        if (props.onSaveClick) {
            props.onSaveClick(state)
        }

        setSuccess(true)
        setTimeout(function () {
            setSuccess(false)
            document.getElementById('closeModal')!.click();
        }, 3000)
    }

    return (
        <div className="save-container">
            {showError && <div className="alert alert-danger check-message" role="alert">
                Name can not be empty !
            </div>}
            {showSuccess && <div className="alert alert-success check-message" role="alert">
                Data is already saved  !
            </div>}
            <div className="save-title">Save preset</div>
            <div className="save-subtitle">This will save the current playground state as a preset which you can access later or share with others.</div>
            <div className="save-label">Name</div>
            <div className="save-input">
                <input value={state.key} onChange={handleKeyChange}></input>
            </div>
            <div className="save-label">Description <span className="save-label-option">Optional</span>
            </div>
            <div className="save-input">
                <input value={state.description} onChange={handleDescriptionChange}></input>
            </div>
            <div className="save-buttons">
                <button type="button" className="btn btn-secondary" id="closeModal" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                <button type="button" className="btn btn-success" onClick={HandleSaveClick}>Save</button>
            </div>
        </div>)
}

export default SavePanel