import {
	createTLStore,
	defaultShapeUtils,
	Editor,
	Tldraw,
	throttle,
} from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { useCallback, useLayoutEffect, useState } from 'react'

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
import { MetaUi } from './Hook/MetaUi'
import { Meta } from './Mount/Meta'

const customShapeUtils = [CardShapeUtil, HtmlShapeUtil]
const customTools = [CardShapeTool]

let initflag = false
const PERSISTENCE_KEY = 'tldraw_persistence_key'
const App = () => {
	const handleMount = useCallback((editor: Editor) => {
		Meta(editor)
		editor.registerExternalContentHandler('text', ({ point, sources }) => Html(editor, point, sources))

		if (initflag) {
			return
		}

		Hello(editor)
		LocalImages(editor)
		initflag = true
	}, [Hello, LocalImages])

	const [store] = useState(() => createTLStore({ shapeUtils: [...defaultShapeUtils, ...customShapeUtils] }))
	const [loadingState, setLoadingState] = useState<
		{ status: 'loading' } | { status: 'ready' } | { status: 'error'; error: string }
	>({
		status: 'loading',
	})

	useLayoutEffect(() => {
		setLoadingState({ status: 'loading' })

		// Get persisted data from local storage
		const persistedSnapshot = localStorage.getItem(PERSISTENCE_KEY)

		if (persistedSnapshot) {
			try {
				const snapshot = JSON.parse(persistedSnapshot)
				store.loadSnapshot(snapshot)
				setLoadingState({ status: 'ready' })
			} catch (error: any) {
				setLoadingState({ status: 'error', error: error.message }) // Something went wrong
			}
		} else {
			setLoadingState({ status: 'ready' }) // Nothing persisted, continue with the empty store
		}

		// Each time the store changes, run the (debounced) persist function
		const cleanupFn = store.listen(
			throttle(() => {
				const snapshot = store.getSnapshot()
				localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(snapshot))
			}, 500)
		)

		return () => {
			cleanupFn()
		}
	}, [store])

	if (loadingState.status === 'loading') {
		return (
			<div className="tldraw__editor">
				<h2>Loading...</h2>
			</div>
		)
	}

	if (loadingState.status === 'error') {
		return (
			<div className="tldraw__editor">
				<h2>Error!</h2>
				<p>{loadingState.error}</p>
			</div>
		)
	}

	return (
		<div style={{ inset: 0 }}>
			<Tldraw
				onMount={handleMount}
				shapeUtils={customShapeUtils}
				tools={customTools}
				components={components}
				overrides={uiOverrides}
				store={store}
			>
				{/* <InsideOfEditorContext /> */}
				<FilterStyleUi />
				<SneakyFloatyHook />
				<MetaUi />
			</Tldraw>
		</div>
	)
}

export default App 