import { BaseBoxShapeTool, TLClickEvent } from '@tldraw/tldraw'
export class CardShapeTool extends BaseBoxShapeTool {
	static override id = 'card'
	static override initial = 'idle'
	override shapeType = 'card'

	override onDoubleClick: TLClickEvent = (_info) => {
		// you can handle events in handlers like this one;
		// check the BaseBoxShapeTool source as an example
	}
}
