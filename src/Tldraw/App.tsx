import {
	Editor,
	Tldraw,
} from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { useCallback, useState } from 'react'

import { InsideOfEditorContext } from './Hook/InsideOfEditorContext'
import { FilterStyleUi } from './Hook/FilterStyleUi'
import { SneakyFloatyHook } from './Hook/SneakyFloatyHook'
import { components } from './Component/CustomComponent'
import { CardShapeUtil } from './Shape/CardShape/CardShapeUtil'
import { HtmlShapeUtil } from './Shape/HtmlShape/HtmlShapeUtil'
import { CardShapeTool } from './Shape/CardShape/CardShapeTool'
import { uiOverrides } from './ui-overrides'
import { Hello } from './Mount/Hello'
import { Html } from './Mount/Html'
import { LocalImages } from './Mount/LocalImages'

const customShapeUtils = [CardShapeUtil, HtmlShapeUtil]
const customTools = [CardShapeTool]

let initflag = false
const App = () => {
	const handleMount = useCallback((editor: Editor) => {
		if (initflag) {
			return
		}

		Hello(editor)
		editor.registerExternalContentHandler('text', ({ point, sources }) => Html(editor, point, sources))
		LocalImages(editor)
		initflag = true
	}, [Hello, LocalImages])

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
				<SneakyFloatyHook />
			</Tldraw>
		</div>
	)
}

export default App 
