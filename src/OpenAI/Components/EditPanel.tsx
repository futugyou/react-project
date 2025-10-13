import './EditPanel.css'
import Textarea from "@cloudscape-design/components/textarea"

const EditPanel = (props: any) => {
    const onInputChange = (e: any) => {
        const input = e.target.value
        if (props.onInputChange) {
            props.onInputChange(input)
        }
    }
    const onInstructionsChange = (e: any) => {
        const instructions = e.target.value
        if (props.onInstructionsChange) {
            props.onInstructionsChange(instructions)
        }
    }
    return (
        <div className="edit-pg-container">
            <div className="edit-text-tip">
                <span>Input</span>
            </div>
            <div className="edit-input-container">
                <div className="edit-input-container-left">
                    <div className="edit-input-container-input">
                        <Textarea onChange={onInputChange} value={props.input} rows={1} placeholder="We is going to the market." disabled={props.disabled} />
                    </div>
                    <div className="edit-text-tip">
                        <span>Instructions</span>
                    </div>
                    <div>
                        <Textarea onChange={onInstructionsChange} value={props.instructions} rows={2} placeholder="Fix the grammar." disabled={props.disabled} />
                    </div>
                </div>
                <div className="edit-container-right">
                    <div className="edit-container-right-completion">
                        {props.completion}
                    </div>
                    {props.disabled && props.children}
                </div>
            </div>
        </div>
    )
}

export default EditPanel