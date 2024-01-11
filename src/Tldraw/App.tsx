import {
	createTLStore,
	defaultShapeUtils,
	Editor,
	Tldraw,
	throttle,
	TLAnyShapeUtilConstructor,
	TLStateNodeConstructor,
	TLUiEventHandler,
	OfflineIndicator,
} from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { useCallback, useLayoutEffect, useState } from 'react'

import { FilterStyleUi } from './Hook/FilterStyleUi'
import { SneakyFloatyHook } from './Hook/SneakyFloatyHook'
import { components } from './Component/CustomComponent'
import { CardShapeUtil } from './Shape/CardShape/CardShapeUtil'
import { HtmlShapeUtil } from './Shape/HtmlShape/HtmlShapeUtil'
import { CardShapeTool } from './Shape/CardShape/CardShapeTool'
import { CustomAssetUrls, UIOverrides } from './UiOverride/ui-overrides'
import { Hello } from './Mount/Hello'
import { Html } from './Mount/Html'
import { LocalImages } from './Mount/LocalImages'
import { MetaUi } from './Hook/MetaUi'
import { Meta } from './Mount/Meta'
import { ScreenshotTool } from './Tools/ScreenshotTool'
import { SpeechBubbleUtil } from './Shape/SpeechBubble/SpeechBubbleUtil'
import { SpeechBubbleTool } from './Shape/SpeechBubble/SpeechBubbleTool'
import { HostedImages } from './Mount/HostedImages'

const customShapeUtils: TLAnyShapeUtilConstructor[] = [CardShapeUtil, HtmlShapeUtil, SpeechBubbleUtil]
const customTools: TLStateNodeConstructor[] = [CardShapeTool, ScreenshotTool, SpeechBubbleTool]

const PERSISTENCE_KEY = 'tldraw_persistence_key'

const App = () => {
	const [uiEvents, setUiEvents] = useState<string[]>([])
	const handleMount = useCallback((editor: Editor) => {
		Meta(editor)
		editor.registerExternalContentHandler('text', ({ point, sources }) => Html(editor, point, sources))
		Hello(editor)
		LocalImages(editor)
		HostedImages(editor)
	}, [Hello, LocalImages])

	const [store] = useState(() => createTLStore({ shapeUtils: [...defaultShapeUtils, ...customShapeUtils] }))
	const [loadingState, setLoadingState] = useState<
		{ status: 'loading' } | { status: 'ready' } | { status: 'error'; error: string }
	>({
		status: 'loading',
	})

	const handleUiEvent = useCallback<TLUiEventHandler>((name, data) => {
		console.log(`${name} ${JSON.stringify(data)}`)
		setUiEvents((events) => [`${name} ${JSON.stringify(data)}`, ...events])
	}, [])

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
				overrides={UIOverrides}
				store={store}
				assetUrls={CustomAssetUrls}
				onUiEvent={handleUiEvent}
				shareZone={<OfflineIndicator />}
			>
				<FilterStyleUi />
				<SneakyFloatyHook />
				<MetaUi />
			</Tldraw>
		</div>
	)
}

export default App 
