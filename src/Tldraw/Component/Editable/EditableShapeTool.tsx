import { BaseBoxShapeTool,TLClickEvent } from '@tldraw/tldraw'

export class EditableShapeTool extends BaseBoxShapeTool {
    static override id = 'editable-shape'
    static override initial = 'idle'
    override shapeType = 'editable-shape'

	override onDoubleClick: TLClickEvent = (_info) => {
		// you can handle events in handlers like this one;
		// check the BaseBoxShapeTool source as an example
	}
}
