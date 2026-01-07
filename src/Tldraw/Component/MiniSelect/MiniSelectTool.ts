import { StateNode, TLClickEventInfo, TLPointerEventInfo, TLShape, createShapeId } from 'tldraw'

export class MiniSelectTool extends StateNode {
	static override id = 'select'
	static override children() {
		return [IdleState, PointingState, DraggingState]
	}
	static override initial = 'idle'
}
class IdleState extends StateNode {
	static override id = 'idle'
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
				if (editor.inputs.getShiftKey()) {
					editor.select(...editor.getSelectedShapeIds(), info.shape.id)
				} else {
					if (!editor.getSelectedShapeIds().includes(info.shape.id)) {
						editor.select(info.shape.id)
					}
					this.parent.transition('pointing', info)
				}
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

class PointingState extends StateNode {
	static override id = 'pointing'
	override onPointerUp(info: TLPointerEventInfo) {
		this.parent.transition('idle', info)
	}
	override onPointerMove() {
		if (this.editor.inputs.getIsDragging()) {
			this.parent.transition('dragging', { shapes: [...this.editor.getSelectedShapes()] })
		}
	}
}

class DraggingState extends StateNode {
	static override id = 'dragging'
	private initialDraggingShapes: TLShape[] = []
	override onEnter(info: { shapes: TLShape[] }) {
		this.initialDraggingShapes = info.shapes
	}
	override onPointerUp(info: TLPointerEventInfo) {
		this.parent.transition('idle', info)
	}
	override onPointerMove() {
		const { initialDraggingShapes } = this
		const originPagePoint = this.editor.inputs.getOriginPagePoint()
		const currentPagePoint = this.editor.inputs.getCurrentPagePoint()

		this.editor.updateShapes(
			initialDraggingShapes.map((shape) => {
				return {
					...shape,
					x: shape.x + (currentPagePoint.x - originPagePoint.x),
					y: shape.y + (currentPagePoint.y - originPagePoint.y),
				}
			})
		)
	}
}