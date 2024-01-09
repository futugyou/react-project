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
import { FilterStyleUi } from './FilterStyleUi'
import { components } from './CustomComponent'
import { CardShapeUtil } from './CardShape/CardShapeUtil'
import { HtmlShapeUtil } from './HtmlShape/HtmlShapeUtil'
import { CardShapeTool } from './CardShape/CardShapeTool'
import { uiOverrides } from './ui-overrides'

const customShapeUtils = [CardShapeUtil, HtmlShapeUtil]
const customTools = [CardShapeTool]

export default function () {
	const [events, setEvents] = useState<string[]>([])
	const handleEvent = useCallback((data: TLEventInfo) => {
		setEvents((events) => [JSON.stringify(data, null, 2), ...events.slice(0, 100)])
	}, [])

	const handleMount = useCallback((editor: Editor) => {
		const id = createShapeId('hello')
		const shape = editor.getShape<TLGeoShape>(id)
		if (!shape) {
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
			const shape = editor.getShape<TLGeoShape>(id)!
			const shapeUpdate: TLShapePartial<TLGeoShape> = {
				id,
				type: 'geo',
				props: {
					h: shape.props.h * 3,
					text: 'hello world!',
				},
			}

			editor.updateShapes([shapeUpdate])
			editor.select(id)
			editor.rotateShapesBy([id], Math.PI / 8)
			editor.selectNone()
			editor.zoomToFit()
		}

		editor.on('event', (event) => handleEvent(event))
		editor.registerExternalContentHandler('text', async ({ point, sources }) => {
			const htmlSource = sources?.find((s) => s.type === 'text' && s.subtype === 'html')

			if (htmlSource) {
				const center = point ?? editor.getViewportPageCenter()

				editor.createShape({
					type: 'html',
					x: center.x - 250,
					y: center.y - 150,
					props: {
						html: htmlSource.data,
					},
				})
			}
		})
	}, [])

	return (
		<div style={{ inset: 0 }}>
			<Tldraw
				onMount={handleMount}
				shapeUtils={customShapeUtils}
				tools={customTools}
				components={components}
				overrides={uiOverrides}
			>
				{/* <InsideOfEditorContext /> */}
				<FilterStyleUi />
			</Tldraw>
		</div>
	)
}
