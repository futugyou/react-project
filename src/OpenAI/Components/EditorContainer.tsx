
import CompletePanel from './CompletePanel'
import ChatPanel from './ChatPanel'
import EditPanel from './EditPanel'
import InsertPanel from './InsertPanel'
import RestoreLayer from './RestoreLayer'

import { PlaygroundModel } from '../Models/PlaygroundModel'
import { ChatLog } from '../Models/PlaygroundModel'

const defaultPalygroundModelChange = (_data: PlaygroundModel) => { }

const EditorContainer = (props: any) => {
    const playgroundModel: PlaygroundModel = props.data
    const mode: string = props.mode
    const disabled: boolean = props.disabled
    const setPlaygroundModel = props.onPlaygroundModelChange ?? defaultPalygroundModelChange

    const handleRestoreClick = (data: PlaygroundModel) => {
        if (props.onRestoreClick) {
            props.onRestoreClick(data)
        }
    }

    const handlePromptChange = (text: string) => {
        setPlaygroundModel({
            ...playgroundModel,
            prompt: text,
        })
    }

    const HandleMessageChange = (messages: ChatLog[]) => {
        let m: ChatLog[] = messages
            .filter((m) => m.content != '')
            .map((m) => { return { role: m.role, content: m.content } })

        if (m.length > 0) {
            setPlaygroundModel(
                {
                    ...playgroundModel,
                    chatLog: m,
                }
            )
        }
    }

    const HandleInstructionChange = (instruction: string) => {
        setPlaygroundModel(
            {
                ...playgroundModel,
                instruction: instruction,
            }
        )
    }

    const handleInsertPromptChange = (prompt: string) => {
        setPlaygroundModel(
            {
                ...playgroundModel,
                prompt: prompt,
                suffix: "",
            }
        )
    }

    const HandleEditInputChange = (text: string) => {
        setPlaygroundModel({
            ...playgroundModel,
            prompt: text,
        })
    }

    const HandleEditInstructionsChange = (text: string) => {
        setPlaygroundModel({
            ...playgroundModel,
            instruction: text,
        })
    }

    return (<>
        {(mode == "Complete") && (
            <CompletePanel
                prompt={playgroundModel.prompt}
                completion={playgroundModel.completion}
                onPromptChange={handlePromptChange}
                disabled={disabled}>
                <RestoreLayer data={playgroundModel} onRestoreClick={handleRestoreClick}></RestoreLayer>
            </CompletePanel>
        )}
        {(mode == "Chat") && (
            <ChatPanel
                key={playgroundModel.chatLog}
                instruction={playgroundModel.instruction}
                chatLog={playgroundModel.chatLog}
                onMessageChange={HandleMessageChange}
                onInstructionChange={HandleInstructionChange}
                disabled={disabled}>
                <RestoreLayer data={playgroundModel} onRestoreClick={handleRestoreClick}></RestoreLayer>
            </ChatPanel>
        )}
        {(mode == "Insert") && (
            <InsertPanel
                prompt={playgroundModel.prompt}
                suffix={playgroundModel.suffix}
                completion={playgroundModel.completion}
                onPromptChange={handleInsertPromptChange}
                disabled={disabled}>
                <RestoreLayer data={playgroundModel} onRestoreClick={handleRestoreClick}></RestoreLayer>
            </InsertPanel>
        )}
        {(mode == "Edit") && (
            <EditPanel
                input={playgroundModel.prompt}
                instructions={playgroundModel.instruction}
                completion={playgroundModel.completion}
                onInputChange={HandleEditInputChange}
                onInstructionsChange={HandleEditInstructionsChange}
                disabled={disabled}>
                <RestoreLayer data={playgroundModel} onRestoreClick={handleRestoreClick}></RestoreLayer>
            </EditPanel>
        )}
    </>)
}

export default EditorContainer