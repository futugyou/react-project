import { StateNode, TLEventHandlers } from '@tldraw/tldraw'

export class ScreenshotPointing extends StateNode {
    static override id = 'pointing'

    // When the user makes a pointer move event, we check if they are dragging.
    // If they are, we transition to the dragging state. 
    // If they are not yet dragging, we stay in this state.
    override onPointerMove: TLEventHandlers['onPointerUp'] = () => {
        if (this.editor.inputs.isDragging) {
            this.parent.transition('dragging')
        }
    }

    // When the user cancelles or makes a pointer up event 
    // (while this state is still active, 
    // so after the user has started pointing 
    // but before they've moved their pointer far enough to start dragging), 
    // then we transition back to the idle state.
    override onPointerUp: TLEventHandlers['onPointerUp'] = () => {
        this.complete()
    }

    override onCancel: TLEventHandlers['onCancel'] = () => {
        this.complete()
    }

    private complete() {
        this.parent.transition('idle')
    }
}
