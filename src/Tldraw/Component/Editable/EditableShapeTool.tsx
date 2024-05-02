import {
	BaseBoxShapeTool,
	Editor,
	TLUiToolsContextType,
	useTools,
	useIsToolSelected,
	TldrawUiMenuItem,
} from '@tldraw/tldraw'

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

export const EditableToolBar = (props: {}) => {
	const tools = useTools()

	const iseditableSelected = useIsToolSelected(tools['editable-shape'])

	return (
		<TldrawUiMenuItem {...tools['editable-shape']} isSelected={iseditableSelected} />
	)
}
