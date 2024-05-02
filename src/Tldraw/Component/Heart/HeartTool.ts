import { StateNode } from 'tldraw'

// Check out the custom tool example for a more detailed explanation of the tool class.

const OFFSET = 12
export class HeartTool extends StateNode {
	static override id = 'hearter'

	override onEnter = () => {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	override onPointerDown = () => {
		const { currentPagePoint } = this.editor.inputs
		this.editor.createShape({
			type: 'text',
			x: currentPagePoint.x - OFFSET,
			y: currentPagePoint.y - OFFSET,
			props: { text: '❤️' },
		})
	}
}