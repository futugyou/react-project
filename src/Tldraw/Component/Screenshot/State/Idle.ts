import { StateNode, TLEventHandlers } from '@tldraw/tldraw'

export class ScreenshotIdle extends StateNode {
    static override id = 'idle'

    // When we the user makes a pointer down event, we transition to the pointing state.
    override onPointerDown: TLEventHandlers['onPointerUp'] = () => {
        this.parent.transition('pointing')
    }
}
