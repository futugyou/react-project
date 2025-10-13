import './CompletePanel.css'
import Textarea from "@cloudscape-design/components/textarea"

const CompletePanel = (props: any) => {
    let text: string = props.prompt + props.completion
    return (
        <>
            <div className="complete-panel">
                <div className="prompt-input-layer">
                    <Textarea onChange={e => props.onPromptChange(e.detail.value)} value={text} rows={1} disabled={props.disabled} />
                </div>
                {props.disabled && props.children}
            </div>
        </>
    )
}

export default CompletePanel