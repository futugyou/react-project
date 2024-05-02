import { BaseBoxShapeTool, Editor, TLUiToolsContextType } from '@tldraw/tldraw'

export class EditableShapeTool extends BaseBoxShapeTool {
	static override id = 'editable-shape'
	static override initial = 'idle'
	override shapeType = 'editable-shape'
}

export const ConfigEditableTool = (editor: Editor, tools: TLUiToolsContextType) => {
	tools['editable-shape'] = {
		id: 'editable-shape',
		icon: '',
		label: 'Editable-shape',
		onSelect: () => {
			editor.setCurrentTool('editable-shape')
		},
	}
}