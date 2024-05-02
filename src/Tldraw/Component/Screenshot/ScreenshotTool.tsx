import {
    TLUiToolsContextType,
    Editor,
    useTools,
    TldrawUiMenuItem,
    useIsToolSelected,
    StateNode,
    TLInterruptEvent,
    TLCancelEvent,
} from '@tldraw/tldraw'

import { ScreenshotDragging } from './State/Dragging'
import { ScreenshotIdle } from './State/Idle'
import { ScreenshotPointing } from './State/Pointing'

export class ScreenshotTool extends StateNode {
    // It has three child state nodes, ScreenshotIdle, 
    // ScreenshotPointing, and ScreenshotDragging. 
    // Its initial state is `idle`.
    static override id = 'screenshot'
    static override initial = 'idle'
    static override children = () => [ScreenshotIdle, ScreenshotPointing, ScreenshotDragging]

    // When the screenshot tool is entered,
    // we set the cursor to a crosshair. 
    // When it is exited, we set the cursor back to the default cursor. 
    override onEnter = () => {
        this.editor.setCursor({ type: 'cross', rotation: 0 })
    }

    override onExit = () => {
        this.editor.setCursor({ type: 'default', rotation: 0 })
    }

    // When the screenshot tool is interrupted or cancelled, 
    // we transition back to the select tool.
    override onInterrupt: TLInterruptEvent = () => {
        this.complete()
    }

    override onCancel: TLCancelEvent = () => {
        this.complete()
    }

    private complete() {
        this.parent.transition('select', {})
    }
}

export const ConfigScreenshotTool = (editor: Editor, tools: TLUiToolsContextType) => {
    tools.screenshot = {
        id: 'screenshot',
        label: 'Screenshot',
        readonlyOk: false,
        icon: 'tool-screenshot',
        kbd: 'j',
        onSelect() {
            editor.setCurrentTool('screenshot')
        },
    }
}

export const ScreenshotToolBar = () => {
    const tools = useTools()

    const isScreenshotSelected = useIsToolSelected(tools['screenshot'])

    return (
        <TldrawUiMenuItem {...tools['screenshot']} isSelected={isScreenshotSelected} />
	)
}
