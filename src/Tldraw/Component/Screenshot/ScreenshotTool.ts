import { StateNode, TLCancelEvent, TLInterruptEvent } from '@tldraw/tldraw'
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
