import {
	DefaultColorStyle,
	Editor,
	TLGeoShape,
	TLShapePartial,
	Tldraw,
	createShapeId,
	useEditor,
	TLEventInfo,
} from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { useCallback, useState } from 'react'

import { InsideOfEditorContext } from './InsideOfEditorContext'
import { components } from './CustomComponent'
import { CardShapeUtil } from './CardShape/CardShapeUtil'
import { CardShapeTool } from './CardShape/CardShapeTool'
import { uiOverrides } from './ui-overrides'

const customShapeUtils = [CardShapeUtil]
const customTools = [CardShapeTool]

export default function () {
	const [events, setEvents] = useState<string[]>([])
	const handleEvent = useCallback((data: TLEventInfo) => {
		setEvents((events) => [JSON.stringify(data, null, 2), ...events.slice(0, 100)])
	}, [])

	const handleMount = (editor: Editor) => {
		// Create a shape id
		const id = createShapeId('hello')

		// Create a shape
		editor.createShapes<TLGeoShape>([
			{
				id,
				type: 'geo',
				x: 128 + Math.random() * 500,
				y: 128 + Math.random() * 500,
				props: {
					geo: 'rectangle' as any,
					w: 100,
					h: 100,
					dash: 'draw' as any,
					color: 'blue' as any,
					size: 'm' as any,
				},
			},
		])

		// Get the created shape
		const shape = editor.getShape<TLGeoShape>(id)!

		const shapeUpdate: TLShapePartial<TLGeoShape> = {
			id,
			type: 'geo',
			props: {
				h: shape.props.h * 3,
				text: 'hello world!',
			},
		}

		// Update the shape
		editor.updateShapes([shapeUpdate])

		// Select the shape
		editor.select(id)

		// Rotate the shape around its center
		editor.rotateShapesBy([id], Math.PI / 8)

		// Clear the selection
		editor.selectNone()

		// Zoom the camera to fit both shapes
		editor.zoomToFit()

		editor.on('event', (event) => handleEvent(event))
	}
	return (
		<div style={{ inset: 0 }}>
			<Tldraw
				onMount={handleMount}
				shapeUtils={customShapeUtils}
				tools={customTools}
				components={components}
				overrides={uiOverrides}
			>
				<InsideOfEditorContext />
			</Tldraw>
		</div>
	)
}
