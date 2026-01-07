import { StateNode, TLClickEventInfo, TLPointerEventInfo, createShapeId } from 'tldraw'

const BOX_TYPE = 'box'

declare module 'tldraw' {
	export interface TLGlobalShapePropsMap {
		[BOX_TYPE]: { w: number; h: number; color: string }
	}
}

export class MicroSelectTool extends StateNode {
	static override id = 'select'
	override onPointerDown(info: TLPointerEventInfo) {
		const { editor } = this

		switch (info.target) {
			case 'canvas': {
				const hitShape = editor.getShapeAtPoint(editor.inputs.getCurrentPagePoint())

				if (hitShape) {
					this.onPointerDown({
						...info,
						shape: hitShape,
						target: 'shape',
					})
					return
				}

				editor.selectNone()
				break
			}
			case 'shape': {
				editor.select(info.shape.id)
				break
			}
		}
	}
	override onDoubleClick(info: TLClickEventInfo) {
		const { editor } = this

		if (info.phase !== 'up') return

		switch (info.target) {
			case 'canvas': {
				const hitShape = editor.getShapeAtPoint(editor.inputs.getCurrentPagePoint())

				if (hitShape) {
					this.onDoubleClick({
						...info,
						shape: hitShape,
						target: 'shape',
					})
					return
				}
				const currentPagePoint = editor.inputs.getCurrentPagePoint()
				editor.createShapes([
					{
						id: createShapeId(),
						type: 'box',
						x: currentPagePoint.x - 50,
						y: currentPagePoint.y - 50,
						props: {
							w: 100,
							h: 100,
						},
					},
				])
				break
			}
			case 'shape': {
				editor.deleteShapes([info.shape.id])
				break
			}
		}
	}
}