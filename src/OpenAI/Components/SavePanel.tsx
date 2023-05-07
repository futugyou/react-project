
import './SavePanel.css'

function SavePanel(props: any) {

    return (
        <div className="save-container">
            <div className="save-title">Save preset</div>
            <div className="save-subtitle">This will save the current playground state as a preset which you can access later or share with others.</div>
            <div className="save-label">Name</div>
            <div className="save-input">
                <input></input>
            </div>
            <div className="save-label">Description <span className="save-label-option">Optional</span>
            </div>
            <div className="save-input"><input></input></div>
            <div className="save-buttons">
                <button type="button" className="btn btn-secondary">Cancel</button><button type="button" className="btn btn-success">Save</button>
            </div>
        </div>)
}

export default SavePanel