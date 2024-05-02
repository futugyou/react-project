import { BaseBoxShapeTool, TLClickEvent, TLUiToolsContextType, Editor } from '@tldraw/tldraw'
export class CardShapeTool extends BaseBoxShapeTool {
	static override id = 'card'
	static override initial = 'idle'
	override shapeType = 'card'

	override onDoubleClick: TLClickEvent = (_info) => {
		// you can handle events in handlers like this one;
		// check the BaseBoxShapeTool source as an example
	}
}

export const ConfigCardTool = (editor: Editor, tools: TLUiToolsContextType) => {
	tools.card = {
		id: 'card',
		icon: 'color',
		label: 'Card',
		kbd: 'c',
		readonlyOk: false,
		onSelect: () => {
			editor.setCurrentTool('card')
		},
	}
}