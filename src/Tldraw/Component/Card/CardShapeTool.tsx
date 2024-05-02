import {
	BaseBoxShapeTool,
	TLUiToolsContextType,
	Editor,
	useTools,
	TldrawUiMenuItem,
	useIsToolSelected,
} from '@tldraw/tldraw'

export class CardShapeTool extends BaseBoxShapeTool {
	static override id = 'card'
	static override initial = 'idle'
	override shapeType = 'card'
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

export const CardToolBar = (props: {}) => {
	const tools = useTools()

	const isCardSelected = useIsToolSelected(tools['card'])

	return (
		<TldrawUiMenuItem {...tools['card']} isSelected={isCardSelected} />
	)
}
